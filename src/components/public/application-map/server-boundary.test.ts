import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

// Client bileşenleri "use client" ile işaretlenir ve tarayıcıya gönderilir;
// bu dosyalar server-only modülleri (trusted market resolver dahil)
// yanlışlıkla import ederse build zamanında değil, çalışma zamanında
// keşfedilecek bir hata oluşur. Bu test derleme öncesi erken uyarı verir.
const CLIENT_COMPONENT_FILES = [
  "data-centre-application-map.tsx",
  "application-scene.tsx",
  "application-hotspot.tsx",
  "application-navigation.tsx",
  "application-product-panel.tsx",
];

const FORBIDDEN_IMPORT_PATTERNS = [
  "server-only",
  "@/modules/markets/server",
  "next/headers",
];

describe("application-map client component boundary", () => {
  it.each(CLIENT_COMPONENT_FILES)(
    "%s does not import server-only modules",
    (fileName) => {
      const source = readFileSync(join(__dirname, fileName), "utf-8");

      for (const pattern of FORBIDDEN_IMPORT_PATTERNS) {
        expect(source).not.toContain(pattern);
      }
    },
  );
});
