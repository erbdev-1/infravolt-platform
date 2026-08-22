import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const input = argument("--input");
const output = argument("--output");
const fontSelection = new Set((argument("--fonts") ?? "").split(",").filter(Boolean));
const pageSelection = new Set(
  (argument("--pages") ?? "")
    .split(",")
    .flatMap((part) => {
      const [start, end] = part.split("-").map(Number);
      if (!Number.isFinite(start)) return [];
      if (!Number.isFinite(end)) return [start];
      return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    }),
);

if (!input || !output) {
  throw new Error("Usage: node extract-pdf-text.mjs --input file.pdf --pages 1-3 --output pages.json");
}

const source = fs.readFileSync(input);
const latin = source.toString("latin1");
const objects = new Map();

for (const match of latin.matchAll(/(?:^|[\r\n])(\d+)\s+(\d+)\s+obj\b([\s\S]*?)\bendobj\b/g)) {
  objects.set(Number(match[1]), match[3]);
}

function streamBytes(body) {
  const startMatch = /\bstream(?:\r\n|\n|\r)/.exec(body);
  if (!startMatch) return null;
  const start = startMatch.index + startMatch[0].length;
  const end = body.lastIndexOf("endstream");
  if (end < start) return null;
  let bytes = Buffer.from(body.slice(start, end).replace(/[\r\n]+$/, ""), "latin1");
  if (/\/FlateDecode\b/.test(body.slice(0, startMatch.index))) {
    try {
      bytes = zlib.inflateSync(bytes);
    } catch {
      return null;
    }
  }
  return bytes;
}

for (const [objectNumber, body] of [...objects]) {
  if (!/\/Type\s*\/ObjStm\b/.test(body)) continue;
  const bytes = streamBytes(body);
  const count = Number(/\/N\s+(\d+)/.exec(body)?.[1]);
  const first = Number(/\/First\s+(\d+)/.exec(body)?.[1]);
  if (!bytes || !Number.isFinite(count) || !Number.isFinite(first)) continue;
  const unpacked = bytes.toString("latin1");
  const header = unpacked.slice(0, first).trim().split(/\s+/).map(Number);
  for (let index = 0; index < count; index += 1) {
    const id = header[index * 2];
    const offset = header[index * 2 + 1];
    const nextOffset = index + 1 < count ? header[index * 2 + 3] : unpacked.length - first;
    if (Number.isFinite(id) && Number.isFinite(offset)) {
      objects.set(id, unpacked.slice(first + offset, first + nextOffset));
    }
  }
  objects.set(objectNumber, body);
}

function references(value) {
  return [...value.matchAll(/(\d+)\s+\d+\s+R/g)].map((match) => Number(match[1]));
}

const catalog = [...objects.entries()].find(([, body]) => /\/Type\s*\/Catalog\b/.test(body));
const rootPages = catalog ? Number(/\/Pages\s+(\d+)\s+\d+\s+R/.exec(catalog[1])?.[1]) : undefined;
const pageIds = [];

function walkPages(id) {
  const body = objects.get(id) ?? "";
  if (/\/Type\s*\/Page\b/.test(body)) {
    pageIds.push(id);
    return;
  }
  const kids = /\/Kids\s*\[([\s\S]*?)\]/.exec(body)?.[1];
  if (kids) references(kids).forEach(walkPages);
}

if (rootPages) walkPages(rootPages);
if (pageIds.length === 0) {
  pageIds.push(
    ...[...objects.entries()]
      .filter(([, body]) => /\/Type\s*\/Page\b/.test(body))
      .map(([id]) => id)
      .sort((a, b) => a - b),
  );
}

function inheritedBody(pageId) {
  let id = pageId;
  let combined = "";
  const seen = new Set();
  while (id && !seen.has(id)) {
    seen.add(id);
    const body = objects.get(id) ?? "";
    combined += `\n${body}`;
    id = Number(/\/Parent\s+(\d+)\s+\d+\s+R/.exec(body)?.[1]);
  }
  return combined;
}

function resourceBody(pageId) {
  const body = inheritedBody(pageId);
  const resourceRef = Number(/\/Resources\s+(\d+)\s+\d+\s+R/.exec(body)?.[1]);
  return resourceRef ? `${body}\n${objects.get(resourceRef) ?? ""}` : body;
}

function utf16(hex) {
  const bytes = Buffer.from(hex.replace(/\s/g, ""), "hex");
  if (bytes.length % 2 !== 0) return bytes.toString("latin1");
  let value = "";
  for (let index = 0; index < bytes.length; index += 2) {
    value += String.fromCharCode(bytes.readUInt16BE(index));
  }
  return value;
}

function cmapFor(fontBody) {
  const cmapRef = Number(/\/ToUnicode\s+(\d+)\s+\d+\s+R/.exec(fontBody)?.[1]);
  if (!cmapRef) return null;
  const bytes = streamBytes(objects.get(cmapRef) ?? "");
  if (!bytes) return null;
  const text = bytes.toString("latin1");
  const map = new Map();
  for (const section of text.matchAll(/beginbfchar([\s\S]*?)endbfchar/g)) {
    for (const match of section[1].matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g)) {
      map.set(match[1].toUpperCase(), utf16(match[2]));
    }
  }
  for (const section of text.matchAll(/beginbfrange([\s\S]*?)endbfrange/g)) {
    for (const match of section[1].matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g)) {
      const start = Number.parseInt(match[1], 16);
      const end = Number.parseInt(match[2], 16);
      const target = Number.parseInt(match[3], 16);
      const width = match[1].length;
      for (let value = start; value <= end; value += 1) {
        map.set(value.toString(16).toUpperCase().padStart(width, "0"), String.fromCharCode(target + value - start));
      }
    }
  }
  return map;
}

function fontsFor(pageId) {
  const resources = resourceBody(pageId);
  const result = new Map();
  const fontSection = /\/Font\s*<<([\s\S]*?)>>/.exec(resources)?.[1] ?? resources;
  for (const match of fontSection.matchAll(/\/(\S+)\s+(\d+)\s+\d+\s+R/g)) {
    const fontBody = objects.get(Number(match[2])) ?? "";
    result.set(match[1], cmapFor(fontBody));
  }
  return result;
}

function decodeEscapedLiteral(raw) {
  const bytes = [];
  for (let index = 0; index < raw.length; index += 1) {
    let code = raw.charCodeAt(index) & 0xff;
    if (code !== 92) {
      bytes.push(code);
      continue;
    }
    const next = raw[index + 1];
    if (next === "\r" && raw[index + 2] === "\n") {
      index += 2;
      continue;
    }
    if (next === "\r" || next === "\n") {
      index += 1;
      continue;
    }
    const escapes = { n: 10, r: 13, t: 9, b: 8, f: 12, "(": 40, ")": 41, "\\": 92 };
    if (next in escapes) {
      bytes.push(escapes[next]);
      index += 1;
      continue;
    }
    if (/[0-7]/.test(next ?? "")) {
      const octal = raw.slice(index + 1).match(/^[0-7]{1,3}/)?.[0] ?? "";
      bytes.push(Number.parseInt(octal, 8));
      index += octal.length;
      continue;
    }
    if (next) {
      bytes.push(next.charCodeAt(0));
      index += 1;
    }
  }
  return Buffer.from(bytes);
}

function lexer(content) {
  const tokens = [];
  let index = 0;
  while (index < content.length) {
    const char = content[index];
    if (/\s/.test(char)) {
      index += 1;
      continue;
    }
    if (char === "%") {
      index = content.indexOf("\n", index);
      if (index < 0) break;
      continue;
    }
    if (char === "(") {
      let depth = 1;
      let raw = "";
      index += 1;
      while (index < content.length && depth > 0) {
        const current = content[index];
        if (current === "\\") {
          raw += current;
          index += 1;
          if (index < content.length) raw += content[index];
        } else if (current === "(") {
          depth += 1;
          raw += current;
        } else if (current === ")") {
          depth -= 1;
          if (depth > 0) raw += current;
        } else {
          raw += current;
        }
        index += 1;
      }
      tokens.push({ type: "string", value: decodeEscapedLiteral(raw) });
      continue;
    }
    if (char === "<" && content[index + 1] !== "<") {
      const end = content.indexOf(">", index + 1);
      const hex = content.slice(index + 1, end).replace(/\s/g, "");
      tokens.push({ type: "string", value: Buffer.from(hex.length % 2 ? `${hex}0` : hex, "hex") });
      index = end + 1;
      continue;
    }
    if (char === "[") {
      tokens.push({ type: "array-start", value: "[" });
      index += 1;
      continue;
    }
    if (char === "]") {
      tokens.push({ type: "array-end", value: "]" });
      index += 1;
      continue;
    }
    const match = content.slice(index).match(/^([^\s\[\]()<>%]+)/);
    if (!match) {
      index += 1;
      continue;
    }
    const value = match[1];
    tokens.push({
      type: /^[-+]?\d*\.?\d+$/.test(value) ? "number" : value.startsWith("/") ? "name" : "word",
      value: /^[-+]?\d*\.?\d+$/.test(value) ? Number(value) : value,
    });
    index += value.length;
  }
  return tokens;
}

const windows1252 = new TextDecoder("windows-1252");

function decode(bytes, cmap) {
  if (!cmap || cmap.size === 0) return windows1252.decode(bytes).replace(/\u0000/g, "");
  const widths = [...new Set([...cmap.keys()].map((key) => key.length / 2))].sort((a, b) => b - a);
  let value = "";
  for (let index = 0; index < bytes.length; ) {
    let matched = false;
    for (const width of widths) {
      const key = bytes.subarray(index, index + width).toString("hex").toUpperCase();
      if (cmap.has(key)) {
        value += cmap.get(key);
        index += width;
        matched = true;
        break;
      }
    }
    if (!matched) {
      value += windows1252.decode(bytes.subarray(index, index + 1));
      index += 1;
    }
  }
  return value;
}

function fragmentsFor(pageId) {
  const pageBody = objects.get(pageId) ?? "";
  const contents = /\/Contents\s*\[([\s\S]*?)\]/.exec(pageBody)?.[1];
  const contentIds = contents
    ? references(contents)
    : [Number(/\/Contents\s+(\d+)\s+\d+\s+R/.exec(pageBody)?.[1])].filter(Number.isFinite);
  const content = contentIds
    .map((id) => streamBytes(objects.get(id) ?? "")?.toString("latin1") ?? "")
    .join("\n");
  const fonts = fontsFor(pageId);
  const tokens = lexer(content);
  const fragments = [];
  const operands = [];
  let array = null;
  let font = null;
  let fontSize = 10;
  let x = 0;
  let y = 0;
  let lineX = 0;
  let lineY = 0;
  let scaleX = 1;
  let scaleY = 1;
  let leading = 12;

  function show(value) {
    const fontName = font?.replace(/^\//, "");
    if (fontSelection.size > 0 && !fontSelection.has(fontName)) return;
    const text = decode(value, fonts.get(fontName)).replace(/\s+/g, " ");
    const startX = x;
    x += text.length * fontSize * scaleX * 0.45;
    if (text.trim()) fragments.push({ x: startX, endX: x, y, text, font: fontName });
  }

  for (const token of tokens) {
    if (token.type === "array-start") {
      array = [];
      continue;
    }
    if (token.type === "array-end") {
      operands.push(array);
      array = null;
      continue;
    }
    if (array) {
      array.push(token);
      continue;
    }
    if (token.type !== "word") {
      operands.push(token);
      continue;
    }
    const values = operands.map((operand) => operand?.value ?? operand);
    if (token.value === "Tf") {
      font = values.at(-2);
      fontSize = Number(values.at(-1)) || fontSize;
    } else if (token.value === "Tm") {
      scaleX = Math.abs(Number(values.at(-6))) || 1;
      scaleY = Math.abs(Number(values.at(-3))) || scaleX;
      lineX = Number(values.at(-2)) || 0;
      lineY = Number(values.at(-1)) || 0;
      x = lineX;
      y = lineY;
    } else if (token.value === "Td" || token.value === "TD") {
      lineX += (Number(values.at(-2)) || 0) * scaleX;
      lineY += (Number(values.at(-1)) || 0) * scaleY;
      x = lineX;
      y = lineY;
      if (token.value === "TD") leading = -(Number(values.at(-1)) || leading);
    } else if (token.value === "TL") {
      leading = Number(values.at(-1)) || leading;
    } else if (token.value === "T*") {
      lineY -= leading * scaleY;
      x = lineX;
      y = lineY;
    } else if (token.value === "Tj") {
      const value = operands.at(-1)?.value;
      if (Buffer.isBuffer(value)) show(value);
    } else if (token.value === "TJ") {
      for (const item of operands.at(-1) ?? []) {
        if (Buffer.isBuffer(item.value)) show(item.value);
        else if (item.type === "number") x -= (item.value / 1000) * fontSize * scaleX;
      }
    } else if (token.value === "'" || token.value === '"') {
      lineY -= leading * scaleY;
      x = lineX;
      y = lineY;
      const value = operands.at(-1)?.value;
      if (Buffer.isBuffer(value)) show(value);
    }
    operands.length = 0;
  }
  return fragments;
}

function linesFrom(fragments) {
  const lines = [];
  for (const fragment of fragments.sort((a, b) => b.y - a.y || a.x - b.x)) {
    let line = lines.find((candidate) => Math.abs(candidate.y - fragment.y) <= 2);
    if (!line) {
      line = { y: fragment.y, fragments: [] };
      lines.push(line);
    }
    line.fragments.push(fragment);
  }
  return lines
    .sort((a, b) => b.y - a.y)
    .map((line) => ({
      y: Math.round(line.y * 100) / 100,
      parts: line.fragments
        .sort((a, b) => a.x - b.x)
        .map((fragment) => ({
          x: Math.round(fragment.x * 100) / 100,
          endX: Math.round(fragment.endX * 100) / 100,
          text: fragment.text,
          font: fragment.font,
        })),
      text: line.fragments
        .sort((a, b) => a.x - b.x)
        .reduce(
          (value, fragment, index, sorted) =>
            `${value}${index > 0 && fragment.x - sorted[index - 1].endX > 2.5 ? " " : ""}${fragment.text}`,
          "",
        )
        .replace(/\s+/g, " ")
        .trim(),
    }))
    .filter((line) => line.text);
}

const pages = pageIds
  .map((id, index) => ({ id, page: index + 1 }))
  .filter(({ page }) => pageSelection.size === 0 || pageSelection.has(page))
  .map(({ id, page }) => ({ page, objectId: id, lines: linesFrom(fragmentsFor(id)) }));

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify({ source: input, pageCount: pageIds.length, pages }, null, 2)}\n`);
console.log(`Extracted ${pages.length} of ${pageIds.length} pages to ${output}`);
