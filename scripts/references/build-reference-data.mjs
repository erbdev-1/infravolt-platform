import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..", "..");
const generatedDirectory = resolve(root, "src", "data", "references", "generated");
const busbarPdf = resolve(root, "catalog-source", "busbar", "_source", "gersan-busbar-catalog.pdf");
const cablePdf = resolve(root, "public", "assets", "documents", "cable-support", "cable_support.pdf");
const extractor = resolve(root, "scripts", "references", "extract-pdf-text.mjs");

mkdirSync(generatedDirectory, { recursive: true });

function extractPdf(input, pages, outputName) {
  const output = resolve(generatedDirectory, outputName);
  execFileSync(process.execPath, [extractor, "--input", input, "--pages", pages, "--output", output], {
    cwd: root,
    stdio: "inherit",
  });
  return JSON.parse(readFileSync(output, "utf8"));
}

function zipEntry(zipPath, entry) {
  const extractedSource = resolve(generatedDirectory, entry);
  try {
    return readFileSync(extractedSource, "utf8");
  } catch {
    // A direct archive read keeps the generator portable when the host permits child processes.
  }
  return execFileSync("tar", ["-xOf", zipPath, entry], { cwd: root, maxBuffer: 64 * 1024 * 1024 }).toString("utf8");
}

function parseCsv(source) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        value += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        value += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(value);
      value = "";
    } else if (character === "\n") {
      row.push(value.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      value = "";
    } else {
      value += character;
    }
  }

  if (value || row.length) {
    row.push(value.replace(/\r$/, ""));
    rows.push(row);
  }

  const [headings, ...records] = rows;
  return records.filter((record) => record.some(Boolean)).map((record) =>
    Object.fromEntries(headings.map((heading, index) => [heading.replace(/^\uFEFF/, ""), record[index] ?? ""])),
  );
}

function compact(value) {
  return value.replace(/\s+/g, " ").trim();
}

function joinParts(parts) {
  let output = "";
  let previous;

  for (const part of parts) {
    const text = part.text ?? "";
    if (!text) continue;
    const gap = previous ? part.x - previous.endX : 0;
    const needsSpace = output && gap > 1.75 && !/^[,.;:!?%')\]}]/.test(text) && !/[([{\-/]$/.test(output);
    output += `${needsSpace ? " " : ""}${text}`;
    previous = part;
  }

  return compact(output);
}

function append(current, key, value) {
  if (!value) return;
  current[key] = compact(`${current[key] || ""} ${value}`);
}

function buildEarthingData() {
  const referencesZip = resolve(root, "catalog-source", "earthing-lightning", "packages", "references-complete-package.zip");
  const companiesZip = resolve(root, "catalog-source", "earthing-lightning", "packages", "worldwide-supplier-companies-complete-package.zip");
  const references = parseCsv(zipEntry(referencesZip, "references-data.csv")).map((row) => ({
    id: `earthing-${row.reference_no}`,
    reference: row.reference_text_joined,
    project: row.project_text_before_last_location_suffix,
    location: row.last_location_suffix_as_printed,
    scope: row.reference_scope,
    sourcePage: Number(row.source_pdf_page),
    sourcePrintedPage: Number(row.source_printed_page),
  }));
  const companies = parseCsv(zipEntry(companiesZip, "worldwide-supplier-companies-data.csv")).map((row) => ({
    id: `earthing-company-${row.entry_no}`,
    name: row.catalog_display_name,
    logoIdentity: row.logo_identity_as_printed,
    logo: `/assets/references/earthing-lightning/companies/${row.logo_filename.replace("site-ready/logos/", "site-ready/").replace("low-resolution/logos/", "low-resolution/")}`,
    sourcePage: Number(row.source_pdf_page),
    sourcePrintedPage: Number(row.source_printed_page),
  }));

  return { references, companies };
}

function buildBusbarData(pdf) {
  const customerProjects = [];

  for (const page of pdf.pages.filter((item) => item.page >= 173 && item.page <= 190)) {
    for (const line of page.lines) {
      if (line.y < 45 || line.y > 750) continue;
      const customerBoundary = page.page === 173 ? 220 : 210;
      const locationBoundary = page.page === 173 ? 420 : 430;
      const customer = joinParts(line.parts.filter((part) => part.x < customerBoundary));
      const project = joinParts(line.parts.filter((part) => part.x >= customerBoundary && part.x < locationBoundary));
      const location = joinParts(line.parts.filter((part) => part.x >= locationBoundary));
      if (!customer && !project && !location) continue;
      if (/MÜŞTERİ|customer/i.test(`${customer} ${project}`)) continue;

      if (!customer && customerProjects.length) {
        append(customerProjects.at(-1), "project", project);
        append(customerProjects.at(-1), "location", location);
        continue;
      }

      customerProjects.push({
        id: `busbar-customer-${customerProjects.length + 1}`,
        customer,
        project,
        location,
        sourcePage: page.page,
      });
    }
  }

  const projectContractors = [];
  for (const page of pdf.pages.filter((item) => item.page >= 191 && item.page <= 192)) {
    for (const line of page.lines) {
      if (line.y < 45 || line.y > 750) continue;
      const projectColumn = joinParts(line.parts.filter((part) => part.x < 210));
      const contractor = joinParts(line.parts.filter((part) => part.x >= 210 && part.x < 450));
      const location = joinParts(line.parts.filter((part) => part.x >= 450));
      if (!projectColumn && !contractor && !location) continue;

      const numbered = projectColumn.match(/^(\d+)\s*(.*)$/);
      const isFirstUnnumbered = page.page === 191 && projectContractors.length < 2 && contractor && location;
      const isExpectedNumber = numbered && Number(numbered[1]) === projectContractors.length + 1;
      if (isExpectedNumber || isFirstUnnumbered) {
        projectContractors.push({
          id: `busbar-contractor-${isExpectedNumber ? numbered[1] : projectContractors.length + 1}`,
          number: Number(isExpectedNumber ? numbered[1] : projectContractors.length + 1),
          project: compact(isExpectedNumber ? numbered[2] : projectColumn),
          contractor,
          location,
          sourcePage: page.page,
        });
      } else if (projectContractors.length) {
        append(projectContractors.at(-1), "project", projectColumn);
        append(projectContractors.at(-1), "contractor", contractor);
        append(projectContractors.at(-1), "location", location);
      }
    }
  }

  return { customerProjects, projectContractors };
}

function buildCableData(pdf) {
  const relationships = [];
  const currentBySide = { left: undefined, right: undefined };

  for (const page of pdf.pages.filter((item) => item.page >= 171 && item.page <= 179)) {
    for (const side of ["left", "right"]) {
      const offset = side === "left" ? 0 : 595;
      const contractorStart = offset + 20;
      const projectStart = offset + 210;
      const ownerStart = offset + 450;
      const sideEnd = offset + 595;

      for (const line of page.lines) {
        if (line.y < 45 || line.y > 750) continue;
        const parts = line.parts.filter((part) => part.x >= contractorStart && part.x < sideEnd);
        const contractor = joinParts(parts.filter((part) => part.x < projectStart));
        const project = joinParts(parts.filter((part) => part.x >= projectStart && part.x < ownerStart));
        const owner = joinParts(parts.filter((part) => part.x >= ownerStart));
        if (!contractor && !project && !owner) continue;

        if (contractor) {
          const record = {
            id: `cable-relationship-${relationships.length + 1}`,
            contractor,
            project,
            owner,
            sourcePage: page.page,
          };
          relationships.push(record);
          currentBySide[side] = record;
        } else if (currentBySide[side]) {
          append(currentBySide[side], "project", project);
          append(currentBySide[side], "owner", owner);
        }
      }
    }
  }

  return { relationships };
}

function buildCableRasterData() {
  const sourcePath = resolve(generatedDirectory, "cable-raster-ocr.json");
  let source;
  try {
    source = JSON.parse(readFileSync(sourcePath, "utf8").replace(/^\uFEFF/, ""));
  } catch {
    return [];
  }

  const relationships = [];
  for (const page of source.pages) {
    const sourceLines = page.lines
      .map((line) => ({
        text: compact(line.text),
        x: Math.min(...line.words.map((word) => word.x)),
        y: Math.min(...line.words.map((word) => word.y)),
      }))
      .filter((line) => line.text && line.y >= 120);
    const contractorLines = sourceLines
      .filter((line) => line.x < 330)
      .sort((left, right) => left.y - right.y);
    const records = contractorLines.map((line) => ({
      contractor: line.text,
      project: "",
      owner: "",
      y: line.y,
    }));

    for (const line of sourceLines.filter((item) => item.x >= 330)) {
      if (!records.length) continue;
      const target = records.reduce((closest, record) =>
        Math.abs(record.y - line.y) < Math.abs(closest.y - line.y)
          ? record
          : closest,
      );
      append(target, line.x < 670 ? "project" : "owner", line.text);
    }

    const merged = [];
    for (const record of records) {
      if (!record.project && !record.owner && merged.length) {
        append(merged.at(-1), "contractor", record.contractor);
      } else {
        merged.push(record);
      }
    }

    for (const record of merged) {
      if (!record.project && !record.owner) continue;
      relationships.push({
        id: `cable-raster-${page.sourcePdfPage}-${page.side}-${relationships.length + 1}`,
        contractor: record.contractor,
        project: record.project,
        owner: record.owner,
        sourcePage: page.sourcePdfPage,
        sourcePanel: page.side,
      });
    }
  }

  return relationships;
}

const ledCompanies = [
  "TURKISH AIRLINES", "TCK", "İGA", "Devlet Hava Meydanları İşletmesi", "kalyon", "İSPARK", "TAV Airports", "TOSYALI", "Lila KAĞIT", "MADO", "3M", "NETSER",
  "TCDD", "YHT Yüksek Hızlı Tren", "T.C. ENERJİ VE TABİİ KAYNAKLAR BAKANLIĞI", "GCA GÜRALLAR CAM AMBALAJ", "ÜLKER", "SANKO", "ERDEMİR", "N.A.S", "KÖY ZEKERİYAKÖY", "ZEENNI STEEL", "Besler", "UĞUR",
  "İSTANBUL BÜYÜKŞEHİR BELEDİYESİ", "İSKENDERUN BELEDİYESİ", "SELÇUKLU BELEDİYESİ KONYA - 1989", "PENDİK BELEDİYESİ", "MERSİN BÜYÜKŞEHİR BELEDİYESİ 1993", "GAZİANTEP BÜYÜKŞEHİR BELEDİYESİ", "TEI TUSAŞ MOTOR SANAYİ A.Ş. / TURKISH ENGINE INDUSTRIES, INC.", "SANCAKTEPE BELEDİYESİ 2009",
  "1’NCİ ORDU KOMUTANLIĞI", "TÜRK HAVA KUVVETLERİ / Eskişehir Anajet Komutanlığı", "MİLLİ SAVUNMA BAKANLIĞI", "IŞIKLI ASKERİ LİSESİ", "KONYA HAVALİMANI AIRPORT", "KÜTAHYA OSB 2", "EMO", "SUZUKI",
  "kmk paper / KAHRAMANMARAŞ KAĞIT SAN. VE TİC. A.Ş.", "Ford", "FIAT PROFESSIONAL", "DAF ENERGY", "ÇİMENTO KONYA", "ÖZLER TARIM", "BURSA ORGANİZE SANAYİ BÖLGESİ", "GSE OILLESS", "DALGIÇ KALIP", "AKSARAY BELEDİYESİ TIR GARAJI", "ÖREN BAYAN", "polarvista", "İRFAN EĞİTİM KURUMLARI",
  "KULELİ ASKERİ LİSESİ", "ARNAVUTKÖY BELEDİYESİ 1987", "İSTANBUL TOWER 205", "ASSAN FOODS", "albayrak ŞİRKETLER GRUBU", "BORUSAN LOJİSTİK", "SURYAPI UYGARLIĞIN MİMARI", "Helis More Residence", "ZEKİ MENSUCAT Sanayi ve Ticaret A.Ş.", "VARAKA", "ARKOMAT BULGARIA Ltd. / ARK-O-MAT BULGARIA EOOD", "AssanPort",
];

// Four catalogue marks appear between the second and third named entries on printed page 239.
// Two are logo-only in the source; the repeated catalogue entries remain repeated here.
ledCompanies.splice(
  34,
  0,
  "",
  "",
  "Devlet Hava Meydanları İşletmesi",
  "1’NCİ ORDU KOMUTANLIĞI",
);

const gBusCompanies = ["ŞİŞECAM BURSA", "TRAKYA CAM RUSYA", "NAS", "ZEENNI STEEL", "POLARVISTA", "ASSAN FOODS"];

const busbarPdfData = extractPdf(busbarPdf, "173-192", "busbar-source-layout.json");
const cablePdfData = extractPdf(cablePdf, "171-179", "cable-source-layout.json");
const earthingData = buildEarthingData();
const data = {
  generatedAt: "2026-08-21",
  earthingLightning: earthingData,
  busbar: buildBusbarData(busbarPdfData),
  cableManagement: {
    relationships: [
      ...buildCableRasterData(),
      ...buildCableData(cablePdfData).relationships,
    ],
    companies: earthingData.companies,
  },
  underfloor: {
    companies: earthingData.companies.slice(0, 36).map((company, index) => ({
      ...company,
      id: `underfloor-company-${index + 1}`,
      sourcePage: 29 + Math.floor(index / 8),
    })),
  },
  ledSystems: {
    companies: ledCompanies.map((name, index) => ({
      id: `led-company-${index + 1}`,
      name,
      logo: `/assets/references/led-systems/${String(index + 1).padStart(2, "0")}.webp`,
      sourcePage: 127,
    })),
  },
  gBus: {
    companies: gBusCompanies.map((name, index) => ({
      id: `g-bus-company-${index + 1}`,
      name,
      logo: `/assets/references/g-bus/${String(index + 1).padStart(2, "0")}.png`,
      sourcePage: 7,
    })),
  },
};

const output = resolve(generatedDirectory, "references.json");
writeFileSync(output, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(`Wrote ${output}`);
console.log(JSON.stringify({
  earthingReferences: data.earthingLightning.references.length,
  earthingCompanies: data.earthingLightning.companies.length,
  busbarCustomers: data.busbar.customerProjects.length,
  busbarContractors: data.busbar.projectContractors.length,
  cableRelationships: data.cableManagement.relationships.length,
  underfloorCompanies: data.underfloor.companies.length,
  ledCompanies: data.ledSystems.companies.length,
  gBusCompanies: data.gBus.companies.length,
}, null, 2));
