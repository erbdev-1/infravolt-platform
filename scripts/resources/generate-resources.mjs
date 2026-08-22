import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, extname, join, resolve } from "node:path";
import { deflateSync } from "node:zlib";

const root = resolve(import.meta.dirname, "../..");
const sourceRoot = join(root, "catalog-source");
const publicRoot = join(root, "public", "assets", "resources");
const manifestPath = join(root, "src", "data", "resources", "resources.generated.json");
const work = mkdtempSync(join(tmpdir(), "infravolt-resources-"));
const resources = [];

const systems = {
  busbar: "Busbar Systems",
  cable: "Cable Management",
  earthing: "Earthing & Lightning Protection",
  underfloor: "Underfloor Cable Trunking",
  led: "LED Systems",
  gbus: "Smart Lighting & Automation",
};

function ensure(path) {
  mkdirSync(path, { recursive: true });
}

function run(command, args) {
  return execFileSync(command, args, { encoding: "buffer", maxBuffer: 1024 * 1024 * 256 });
}

function extract(zip, destination) {
  ensure(destination);
  run("tar", ["-xf", zip, "-C", destination]);
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function csv(text) {
  text = text.replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === '"') {
      if (quoted && text[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && text[index + 1] === "\n") index += 1;
      row.push(cell);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else cell += char;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  const [headers, ...values] = rows;
  return values.map((value) => Object.fromEntries(headers.map((header, index) => [header, value[index] ?? ""])));
}

function rawRgb(path, crop) {
  const probe = JSON.parse(run("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "json", path]).toString());
  const source = probe.streams[0];
  let width = crop?.width ?? source.width;
  let height = crop?.height ?? source.height;
  const args = ["-v", "error", "-i", path];
  if (crop) args.push("-vf", `crop=${crop.width}:${crop.height}:${crop.x}:${crop.y}`);
  args.push("-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "rgb24", "pipe:1");
  const pixels = run("ffmpeg", args);
  if (pixels.length !== width * height * 3 && pixels.length % (height * 3) === 0) width = pixels.length / (height * 3);
  if (pixels.length !== width * height * 3 && pixels.length % (width * 3) === 0) height = pixels.length / (width * 3);
  if (pixels.length !== width * height * 3) throw new Error(`Unexpected RGB size for ${path}`);
  return { width, height, pixels: deflateSync(pixels, { level: 9 }) };
}

function createPdf(pages, output) {
  const images = pages.map(({ path, crop }) => rawRgb(path, crop));
  const objects = [];
  const pageObjectNumbers = images.map((_, index) => 3 + index * 3);
  objects[1] = Buffer.from("<< /Type /Catalog /Pages 2 0 R >>");
  objects[2] = Buffer.from(`<< /Type /Pages /Kids [${pageObjectNumbers.map((number) => `${number} 0 R`).join(" ")}] /Count ${images.length} >>`);

  images.forEach((image, index) => {
    const pageNumber = 3 + index * 3;
    const imageNumber = pageNumber + 1;
    const contentNumber = pageNumber + 2;
    const scale = Math.min(595 / image.width, 842 / image.height);
    const width = Number((image.width * scale).toFixed(3));
    const height = Number((image.height * scale).toFixed(3));
    objects[pageNumber] = Buffer.from(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /XObject << /Im${index} ${imageNumber} 0 R >> >> /Contents ${contentNumber} 0 R >>`);
    const imageHeader = Buffer.from(`<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode /Length ${image.pixels.length} >>\nstream\n`);
    objects[imageNumber] = Buffer.concat([imageHeader, image.pixels, Buffer.from("\nendstream")]);
    const drawing = Buffer.from(`q ${width} 0 0 ${height} 0 0 cm /Im${index} Do Q`);
    objects[contentNumber] = Buffer.from(`<< /Length ${drawing.length} >>\nstream\n${drawing}\nendstream`);
  });

  const chunks = [Buffer.from("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n", "binary")];
  const offsets = [0];
  let offset = chunks[0].length;
  for (let number = 1; number < objects.length; number += 1) {
    offsets[number] = offset;
    const object = Buffer.concat([Buffer.from(`${number} 0 obj\n`), objects[number], Buffer.from("\nendobj\n")]);
    chunks.push(object);
    offset += object.length;
  }
  const xref = offset;
  const lines = [`xref`, `0 ${objects.length}`, "0000000000 65535 f "];
  for (let number = 1; number < objects.length; number += 1) lines.push(`${String(offsets[number]).padStart(10, "0")} 00000 n `);
  chunks.push(Buffer.from(`${lines.join("\n")}\ntrailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`));
  ensure(dirname(output));
  writeFileSync(output, Buffer.concat(chunks));
}

function displaySize(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function addResource(resource) {
  const diskPath = join(root, "public", resource.downloadPath);
  const bytes = statSync(diskPath).size;
  resources.push({
    ...resource,
    downloadPath: `/${resource.downloadPath.replaceAll("\\", "/")}`,
    fileType: "PDF",
    fileSize: displaySize(bytes),
    fileSizeBytes: bytes,
    searchText: [resource.title, resource.productSystem, resource.documentType, resource.issuer, resource.documentNumber].filter(Boolean).join(" "),
  });
}

function addPdf({ id, title, system, type, relativePath, pages, issuer, number, sourceCatalogue, sourcePages, subtype }) {
  const diskPath = join(root, "public", relativePath);
  if (!existsSync(diskPath) || id.startsWith("underfloor-lloyds-") || id.startsWith("led-")) createPdf(pages, diskPath);
  addResource({
    id,
    title,
    productSystem: systems[system],
    productSystemKey: system,
    documentType: type,
    documentSubtype: subtype,
    issuer,
    documentNumber: number,
    sourceCatalogue,
    sourcePages,
    downloadPath: relativePath,
  });
}

function addExisting({ id, title, system, type, relativePath, subtype, sourceCatalogue }) {
  addResource({ id, title, productSystem: systems[system], productSystemKey: system, documentType: type, documentSubtype: subtype, sourceCatalogue, downloadPath: relativePath });
}

ensure(publicRoot);

// Product catalogues: exact source PDFs are copied without content modification.
const catalogueCopies = [
  [join(sourceRoot, "underfloor-catalog", "underfloor-catalog-extraction", "source", "underfloor.pdf"), "assets/resources/catalogues/gersan-underfloor-cable-trunking-catalogue.pdf"],
];
for (const [source, relative] of catalogueCopies) {
  ensure(dirname(join(root, "public", relative)));
  copyFileSync(source, join(root, "public", relative));
}
const ledExtract = join(work, "led");
extract(join(sourceRoot, "led-lighting", "LEDBUS-complete-catalog-all-files.zip"), ledExtract);
copyFileSync(join(ledExtract, "LEDBUS-Ar-Ru(1).pdf"), join(publicRoot, "catalogues", "gersan-led-systems-catalogue.pdf"));

[
  ["catalogue-busbar", "Busbar Systems Catalogue", "busbar", "assets/documents/busbar/gersan-busbar-systems-catalogue.pdf"],
  ["catalogue-cable", "Cable Management Catalogue", "cable", "assets/documents/cable-support/cable_support.pdf"],
  ["catalogue-earthing", "Earthing & Lightning Protection Catalogue", "earthing", "assets/documents/earthing-lightning/gersan-earthing-lightning-protection-catalogue-2026.pdf"],
  ["catalogue-underfloor", "Underfloor Cable Trunking Catalogue", "underfloor", "assets/resources/catalogues/gersan-underfloor-cable-trunking-catalogue.pdf"],
  ["catalogue-led", "LED Systems Catalogue", "led", "assets/resources/catalogues/gersan-led-systems-catalogue.pdf"],
  ["catalogue-gbus", "G-BUS Automation Systems Catalogue", "gbus", "assets/documents/g-bus/g-bus.pdf"],
].forEach(([id, title, system, relativePath]) => addExisting({ id, title, system, type: "catalogue", relativePath, subtype: "Product Catalogue", sourceCatalogue: title }));

// Busbar certificates and test reports: every structured catalogue crop is retained.
const busbarExtract = join(work, "busbar");
extract(join(sourceRoot, "busbar", "certificates", "catalog-extract", "certificates-images.zip"), busbarExtract);
const busbarRows = csv(readFileSync(join(sourceRoot, "busbar", "certificates", "catalog-extract", "certificates-data.csv"), "utf8"));
for (const row of busbarRows) {
  const image = walk(busbarExtract).find((path) => basename(path) === basename(row.image_filename));
  if (!image) throw new Error(`Missing busbar image ${row.image_filename}`);
  const isTest = /test/i.test(row.document_type);
  addPdf({
    id: `busbar-${row.document_id}`,
    title: `${row.issuer} — ${row.document_type}`,
    system: "busbar",
    type: "certificate",
    subtype: isTest ? row.document_type : "Certificate",
    issuer: row.issuer,
    number: row.certificate_or_report_number || undefined,
    sourceCatalogue: "Gersan Busbar Systems Catalogue",
    sourcePages: `PDF ${row.source_pdf_page} · Printed ${row.source_printed_page}`,
    relativePath: `assets/resources/${isTest ? "test-reports" : "certificates"}/busbar/${row.document_id}.pdf`,
    pages: [{ path: image }],
  });
}

// Earthing certificates: certificate and annex pages are grouped as source documents.
const earthingOuter = join(work, "earthing-outer");
extract(join(sourceRoot, "earthing-lightning", "packages", "certificates-complete-package.zip"), earthingOuter);
const nestedImages = walk(earthingOuter).find((path) => basename(path) === "certificates-images.zip");
const earthingImages = join(work, "earthing-images");
extract(nestedImages, earthingImages);
const earthingCsv = walk(earthingOuter).find((path) => basename(path) === "certificates-data.csv");
const earthingRows = csv(readFileSync(earthingCsv, "utf8"));
const earthingById = new Map(earthingRows.map((row) => [row.record_id, row]));
const earthingImage = (id) => {
  const row = earthingById.get(id);
  return walk(earthingImages).find((path) => basename(path) === basename(row.source_native_image_filename));
};
const earthingGroups = [
  ["iso9001-tr", "ISO 9001:2015 Management System Certificate — Turkish", ["CERT-001", "CERT-002"], "TÜV NORD CERT GmbH", "44 100 19530004"],
  ["iso9001-en", "ISO 9001:2015 Management System Certificate — English", ["CERT-003", "CERT-004"], "TÜV NORD CERT GmbH", "44 100 19530004"],
  ["iso14001-tr", "ISO 14001:2015 Environmental Management System Certificate — Turkish", ["CERT-005", "CERT-007"], "TÜV NORD CERT GmbH", "44 104 19530004"],
  ["iso14001-en", "ISO 14001:2015 Environmental Management System Certificate — English", ["CERT-006", "CERT-008"], "TÜV NORD CERT GmbH", "44 104 19530004"],
  ["iso45001-tr", "ISO 45001:2018 Occupational Health and Safety Certificate — Turkish", ["CERT-009", "CERT-011"], "TÜV NORD CERT GmbH", "44 126 19530004"],
  ["iso45001-en", "ISO 45001:2018 Occupational Health and Safety Certificate — English", ["CERT-010", "CERT-012"], "TÜV NORD CERT GmbH", "44 126 19530004"],
  ["tse-62561-1-tr", "TS EN 62561-1 Certificate — Turkish", ["CERT-013", "CERT-014"], "Turkish Standards Institution (TSE)", "008237-TSE-07/02"],
  ["tse-62561-1-en", "TS EN 62561-1 Certificate — English", ["CERT-015", "CERT-016"], "Turkish Standards Institution (TSE)", "008237-TSE-07/02"],
  ["tse-62561-2-tr", "TS EN IEC 62561-2 Certificate — Turkish", ["CERT-017", "CERT-018"], "Turkish Standards Institution (TSE)", "008237-TSE-08/03"],
  ["tse-62561-2-en", "TS EN IEC 62561-2 Certificate — English", ["CERT-019", "CERT-020"], "Turkish Standards Institution (TSE)", "008237-TSE-08/03"],
  ["gost-r", "GOST R Certificate of Conformity", ["CERT-021", "CERT-022", "CERT-023"], "GOST R", "РОСС TR.ПР06.Н00911"],
];
for (const [id, title, ids, issuer, number] of earthingGroups) addPdf({ id: `earthing-${id}`, title, system: "earthing", type: "certificate", subtype: "Certificate", issuer, number, sourceCatalogue: "Gersan Earthing & Lightning Protection Catalogue", sourcePages: [...new Set(ids.map((key) => earthingById.get(key).source_pdf_page))].map((page) => `PDF ${page}`).join(", "), relativePath: `assets/resources/certificates/earthing-lightning/${id}.pdf`, pages: ids.map((key) => ({ path: earthingImage(key) })) });

// Underfloor KEMA report and individual Lloyd's Register certificates.
const underfloorCertDir = join(sourceRoot, "underfloor-catalog", "underfloor-catalog-extraction", "technical-only", "certificates");
addPdf({ id: "underfloor-kema-ip43", title: "KEMA — IP43 Test Report for GDK-3 Distribution Box", system: "underfloor", type: "certificate", subtype: "Test Report", issuer: "KEMA", number: "2089974.13-QUA/CPC", sourceCatalogue: "Gersan Underfloor Catalogue", sourcePages: "PDF 23–24", relativePath: "assets/resources/test-reports/underfloor/kema-ip43-test-report-gdk-3.pdf", pages: [23, 24].map((page) => ({ path: join(underfloorCertDir, `certificate-page-${page}.jpg`) })) });
const floorCrops = [
  { key: "top-left", x: 185, y: 350, width: 670, height: 900 },
  { key: "top-right", x: 880, y: 350, width: 670, height: 900 },
  { key: "bottom-left", x: 185, y: 1250, width: 670, height: 950 },
  { key: "bottom-right", x: 880, y: 1250, width: 670, height: 950 },
];
const underfloorStandards = { 25: "ISO 9001:2008", 26: "ISO 14001:2004", 27: "OHSAS 18001:2007" };
for (const page of [25, 26, 27]) for (const [index, crop] of floorCrops.entries()) {
  const language = index % 2 === 0 ? "Turkish" : "English";
  const location = index < 2 ? "Istanbul" : "Çaycuma";
  const locationSlug = location === "Çaycuma" ? "caycuma" : location.toLowerCase();
  addPdf({ id: `underfloor-lloyds-${page}-${index + 1}`, title: `${underfloorStandards[page]} Management System Certificate — ${location}, ${language}`, system: "underfloor", type: "certificate", subtype: "Certificate", issuer: "Lloyd's Register", sourceCatalogue: "Gersan Underfloor Catalogue", sourcePages: `PDF ${page}`, relativePath: `assets/resources/certificates/underfloor/lloyds-${underfloorStandards[page].toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}-${locationSlug}-${language.toLowerCase()}.pdf`, pages: [{ path: join(underfloorCertDir, `certificate-page-${page}.jpg`), crop }] });
}

// Cable Management certificate crops are grouped where the catalogue clearly continues a document.
const cableExtract = join(work, "cable");
extract(join(sourceRoot, "cable-support", "catalog-package", "sertifikalar-ve-referanslar-images.zip"), cableExtract);
const cableFile = (name) => walk(cableExtract).find((path) => basename(path) === name);
const positions = {
  tl: { x: 98, y: 30, width: 380, height: 520 }, tr: { x: 552, y: 30, width: 380, height: 520 },
  bl: { x: 98, y: 662, width: 380, height: 520 }, br: { x: 552, y: 662, width: 380, height: 520 },
  rtl: { x: 62, y: 30, width: 410, height: 520 }, rtr: { x: 520, y: 30, width: 410, height: 520 },
  rbl: { x: 62, y: 662, width: 410, height: 520 }, rbr: { x: 520, y: 662, width: 410, height: 520 },
  centre: { x: 275, y: 645, width: 440, height: 575 },
};
const cp = (page, side, position) => ({ path: cableFile(`p${page}-${side}-full.webp`), crop: positions[position] });
const cableDocs = [
  ["tse-02-03-two-page", "TSE — Certificate of Conformity to Turkish Standards", "Turkish Standards Institution (TSE)", "008237-TSE-02/03", [cp(154,"left","tl"),cp(154,"left","tr")]],
  ["tse-02-03-three-page", "TSE — Certificate of Conformity to Turkish Standards", "Turkish Standards Institution (TSE)", "008237-TSE-02/03", [cp(154,"left","bl"),cp(154,"left","br"),cp(154,"right","rtl")]],
  ["tse-00-02", "TSE — Certificate of Conformity to Turkish Standards", "Turkish Standards Institution (TSE)", "008237-TSE-00/02", [cp(154,"right","rtr")]],
  ["gost-1171084", "GOST R — Certificate of Conformity", "GOST R", "1171084", [cp(154,"right","rbl"),cp(154,"right","rbr"),cp(155,"left","tl")]],
  ["gost-10170226", "GOST R — Certificate of Conformity", "GOST R", "10170226", [cp(155,"left","tr"),cp(155,"left","bl")]],
  ["declaration-tr-ag85-b06497", "Declaration of Conformity", undefined, "Д-TR.AG85.B.06497", [cp(155,"left","br"),cp(155,"right","rtl")]],
  ["fire-safety-011731", "Certificate of Conformity — Fire Safety", undefined, "011731", [cp(155,"right","rtr")]],
  ["iso9001-tr-annex", "ISO 9001:2015 Certificate Annex — Turkish", "TÜV NORD CERT GmbH", "44 100 19530004", [cp(155,"right","rbl")]],
  ["iso9001-en-annex", "ISO 9001:2015 Certificate Annex — English", "TÜV NORD CERT GmbH", "44 100 19530004", [cp(155,"right","rbr")]],
  ["iso14001-tr-annex", "ISO 14001:2015 Certificate Annex — Turkish", "TÜV NORD CERT GmbH", "44 104 19530004", [cp(156,"left","tl")]],
  ["iso14001-en-annex", "ISO 14001:2015 Certificate Annex — English", "TÜV NORD CERT GmbH", "44 104 19530004", [cp(156,"left","tr")]],
  ["ohsas18001-tr-annex", "OHSAS 18001:2007 Certificate Annex — Turkish", "TÜV NORD CERT GmbH", "44 116 19530004", [cp(156,"left","bl")]],
  ["ohsas18001-en-annex", "OHSAS 18001:2007 Certificate Annex — English", "TÜV NORD CERT GmbH", "44 116 19530004", [cp(156,"left","br")]],
  ["intertek-medium-tray-1", "Intertek ETL SEMKO — Certificate of Compliance · Medium Duty Cable Tray", "Intertek ETL SEMKO", "05018619/AIssue 2", [cp(156,"right","rtl")]],
  ["intertek-medium-tray-2", "Intertek ETL SEMKO — Certificate of Compliance · Medium Duty Cable Tray", "Intertek ETL SEMKO", "05018619/AIssue 2", [cp(156,"right","rtr")]],
  ["intertek-cable-ladder", "Intertek ETL SEMKO — Certificate of Compliance · Cable Ladder System", "Intertek ETL SEMKO", "06020329", [cp(156,"right","centre")]],
];
for (const [id,title,issuer,number,pages] of cableDocs) addPdf({ id:`cable-${id}`, title, system:"cable", type:"certificate", subtype:"Certificate", issuer, number, sourceCatalogue:"Gersan Cable Support Systems Catalogue", sourcePages:"PDF 154–156", relativePath:`assets/resources/certificates/cable-management/${id}.pdf`, pages });

// LED certificates: each visible certificate is extracted; the photometric image is excluded.
const ledCertDir = join(ledExtract, "ledbus-catalog-final-74-133", "technical-only", "certificates");
const ledCrops = [
  { key:"left-top-left", x:70,y:75,width:610,height:900 }, { key:"left-top-right", x:785,y:75,width:610,height:900 },
  { key:"left-bottom-left", x:70,y:1050,width:610,height:900 }, { key:"left-bottom-right", x:785,y:1050,width:610,height:900 },
  { key:"right-top-left", x:1570,y:75,width:610,height:900 }, { key:"right-top-right", x:2255,y:75,width:600,height:900 },
  { key:"right-bottom-left", x:1570,y:1050,width:610,height:900 }, { key:"right-bottom-right", x:2255,y:1050,width:600,height:900 },
];
const ledDocs = [
  [129, ["ISO 9001:2015 Certificate Annex — English","ISO 9001:2015 Certificate Annex — Turkish","ISO 9001:2015 Management System Certificate — English","ISO 9001:2015 Management System Certificate — Turkish","ISO 14001:2015 Certificate Annex — English","ISO 14001:2015 Certificate Annex — Turkish","ISO 14001:2015 Environmental Management System Certificate — English","ISO 14001:2015 Environmental Management System Certificate — Turkish"]],
  [130, ["ISO 45001:2018 Certificate Annex — English","ISO 45001:2018 Certificate Annex — Turkish","ISO 45001:2018 Occupational Health and Safety Certificate — Turkish","ISO 45001:2018 Occupational Health and Safety Certificate — English","TSE Certificate of Conformity — LED Systems 01","TSE Certificate of Conformity — LED Systems 02","ENEC Product Certificate and Licence — LED Systems 01","ENEC Product Certificate and Licence — LED Systems 02"]],
  [131, ["TSE Type Examination Certificate — LED Systems · Page 1","TSE Type Examination Certificate Annex — LED Systems","TSE Type Examination Certificate Annex — LED Systems · Catalogue Copy","Domestic Goods Certificate — LED Systems"]],
];
for (const [page, titles] of ledDocs) titles.forEach((title,index) => addPdf({ id:`led-${page}-${index+1}`, title, system:"led", type:"certificate", subtype:"Certificate", issuer: title.startsWith("ISO") ? "TÜV NORD CERT GmbH" : title.startsWith("TSE") || title.startsWith("ENEC") ? "Turkish Standards Institution (TSE)" : undefined, sourceCatalogue:"Gersan LED Systems Catalogue", sourcePages:`PDF ${page}`, relativePath:`assets/resources/certificates/led-systems/catalogue-page-${page}-${index+1}.pdf`, pages:[{ path:join(ledCertDir,`p${page}-certificates.webp`), crop:ledCrops[index] }] }));

// Existing installation guides remain canonical technical documents.
for (const family of ["ggd","gl","gm","gnl","gr","gs"]) addExisting({ id:`busbar-${family}-installation`, title:`${family.toUpperCase()} Busbar — Installation Guide`, system:"busbar", type:"technical", subtype:"Installation Guide", relativePath:`assets/products/busbar/${family}/installation/${family.toUpperCase()}_Busbar_Installation_Guide.pdf`, sourceCatalogue:"Gersan Busbar Systems Catalogue" });

const underfloorTechnical = join(sourceRoot,"underfloor-catalog","underfloor-catalog-extraction","technical-only");
addPdf({ id:"underfloor-system-overview", title:"Underfloor Cable Trunking — System Overview", system:"underfloor", type:"technical", subtype:"System Overview", sourceCatalogue:"Gersan Underfloor Catalogue", sourcePages:"Catalogue-derived system diagrams", relativePath:"assets/resources/technical-documents/underfloor/underfloor-system-overview.pdf", pages:["system-overviews/underfloor-system-layout-overview.webp","system-overviews/underfloor-system-exploded-overview.webp","system-overviews/junction-box-exploded-components.webp"].map((file)=>({path:join(underfloorTechnical,file)})) });
addPdf({ id:"underfloor-technical-drawings", title:"Underfloor Junction Boxes — Technical Drawings", system:"underfloor", type:"technical", subtype:"Technical Drawings", sourceCatalogue:"Gersan Underfloor Catalogue", sourcePages:"Catalogue-derived dimensional drawings", relativePath:"assets/resources/technical-documents/underfloor/underfloor-junction-box-technical-drawings.pdf", pages:["drawings/gdk-01-02-03-technical-drawing.png","drawings/gdk-18-24-30-technical-drawings.png","drawings/gdk-18b-24b-30b-technical-drawings.png","drawings/gdk-31-32-33-technical-drawing.png"].map((file)=>({path:join(underfloorTechnical,file)})) });

const gbusTechnical = join(sourceRoot,"g-bus","gbus_catalog_complete","series","g-bus-automation-system","assets","technical-only");
addPdf({ id:"gbus-architecture-wiring", title:"G-BUS Automation — Architecture & Wiring Guide", system:"gbus", type:"technical", subtype:"System Architecture", sourceCatalogue:"G-BUS Catalogue", sourcePages:"Catalogue-derived architecture and wiring diagrams", relativePath:"assets/resources/technical-documents/g-bus/g-bus-architecture-and-wiring-guide.pdf", pages:["drawings/g-bus-network-architecture.png","drawings/g-bus-powerline-communication-flow.webp","drawings/g-bus-transmitter-unit-layout.png","drawings/g-bus-wiring-topology-1.png","drawings/g-bus-wiring-topology-2.png","drawings/g-bus-wiring-topology-3.png","drawings/g-bus-wiring-topology-4.png","installation/g-bus-system-workflow.png"].map((file)=>({path:join(gbusTechnical,file)})) });

addPdf({ id:"cable-support-mounting-drawings", title:"Cable Support Systems — Mounting Technical Drawings", system:"cable", type:"technical", subtype:"Technical Drawings", sourceCatalogue:"Gersan Cable Support Systems Catalogue", sourcePages:"PDF 153", relativePath:"assets/resources/technical-documents/cable-management/cable-support-mounting-technical-drawings.pdf", pages:[{path:cableFile("p153-left-full.webp")},{path:cableFile("p153-right-full.webp")}] });

resources.sort((a,b) => ({catalogue:0,certificate:1,technical:2}[a.documentType] - ({catalogue:0,certificate:1,technical:2}[b.documentType]) || a.productSystem.localeCompare(b.productSystem) || a.title.localeCompare(b.title)));
resources.forEach((resource,index) => { resource.sortOrder = index + 1; });
ensure(dirname(manifestPath));
writeFileSync(manifestPath, `${JSON.stringify({ generatedFrom: "Repository catalogue source material", resourceCount: resources.length, resources }, null, 2)}\n`);
console.log(`Generated ${resources.length} public resources.`);
