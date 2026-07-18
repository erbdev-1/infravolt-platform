export const TEST_SERVER_PORT = 3100;

export const LOCAL_TEST_URLS = Object.freeze({
  uk: `http://uk.infravolt.localhost:${TEST_SERVER_PORT}`,
  ua: `http://ua.infravolt.localhost:${TEST_SERVER_PORT}`,
  unknown: `http://unknown.infravolt.localhost:${TEST_SERVER_PORT}`,
});

const OPERATIONAL_ENVIRONMENT_VARIABLES = [
  "APPDATA",
  "CI",
  "COMSPEC",
  "HOME",
  "LOCALAPPDATA",
  "PATH",
  "Path",
  "PATHEXT",
  "PLAYWRIGHT_BROWSERS_PATH",
  "SYSTEMROOT",
  "SystemRoot",
  "TEMP",
  "TMP",
  "USERPROFILE",
  "WINDIR",
] as const;

const APPLICATION_ENVIRONMENT_VARIABLES = [
  "NEXT_PUBLIC_SITE_URL_UK",
  "NEXT_PUBLIC_SITE_URL_UA",
  "NEXT_PUBLIC_PROTECTED_APP_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "SUPABASE_SECRET_KEY",
  "RESEND_API_KEY",
  "RESEND_WEBHOOK_SECRET",
  "TURNSTILE_SECRET_KEY",
  "CRON_SECRET",
  "EMAIL_FROM_UK",
  "EMAIL_REPLY_TO_UK",
  "EMAIL_FROM_UA",
  "EMAIL_REPLY_TO_UA",
  "LOG_LEVEL",
] as const;

export function createSafeTestProcessEnvironment(
  source: NodeJS.ProcessEnv = process.env,
): NodeJS.ProcessEnv & Record<string, string> {
  const environment: NodeJS.ProcessEnv & Record<string, string> = {
    NODE_ENV: "development",
  };

  for (const name of OPERATIONAL_ENVIRONMENT_VARIABLES) {
    const value = source[name];

    if (value !== undefined) {
      environment[name] = value;
    }
  }

  // Playwright webServer mevcut process env ile merge yaptığı için uygulama değişkenleri güvenli değerlerle açıkça ezilir.
  for (const name of APPLICATION_ENVIRONMENT_VARIABLES) {
    environment[name] = "";
  }

  environment.NEXT_TELEMETRY_DISABLED = "1";
  environment.NEXT_PUBLIC_SITE_URL_UK = LOCAL_TEST_URLS.uk;
  environment.NEXT_PUBLIC_SITE_URL_UA = LOCAL_TEST_URLS.ua;

  return environment;
}
