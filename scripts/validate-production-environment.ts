import { readClientEnvironment } from "../src/config/env/client.ts";
import { readServerEnvironment } from "../src/config/env/server.ts";
import { EnvironmentValidationError } from "../src/config/env/validation.ts";

try {
  readClientEnvironment("production");
  readServerEnvironment();
  console.log("Production environment validation passed.");
} catch (error) {
  const message =
    error instanceof EnvironmentValidationError
      ? error.message
      : "Production environment validation failed.";

  console.error(message);
  process.exitCode = 1;
}
