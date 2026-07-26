import { fixupConfigRules } from "@eslint/compat";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  // Next'in legacy pluginleri ESLint 10 rule-context API'sine taşınana kadar kuralları kaldırmadan resmi uyumluluk katmanıyla çalıştırır.
  ...fixupConfigRules(nextVitals),
  ...fixupConfigRules(nextTypeScript),
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
