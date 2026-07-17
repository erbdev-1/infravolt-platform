import { strict as assert } from "node:assert";

import {
  CLIENT_ENVIRONMENT_VARIABLES,
  parseClientEnvironment,
  readClientEnvironment,
} from "../src/config/env/client";
import { parseServerEnvironment } from "../src/config/env/server";
import { EnvironmentValidationError } from "../src/config/env/validation";

type Check = {
  readonly name: string;
  readonly run: () => void;
};

const safeProductionFixture = {
  NEXT_PUBLIC_SITE_URL_UK: "https://uk.example.test",
  NEXT_PUBLIC_SITE_URL_UA: "https://ua.example.test",
};

function expectEnvironmentError(
  run: () => unknown,
  variable: string,
  forbiddenValue?: string,
): void {
  assert.throws(run, (error: unknown) => {
    assert(error instanceof EnvironmentValidationError);
    assert.deepEqual(error.variables, [variable]);
    assert.match(error.message, new RegExp(variable));

    if (forbiddenValue) {
      assert(!error.message.includes(forbiddenValue));
    }

    return true;
  });
}

function withProcessEnvironment(
  values: Readonly<Record<string, string | undefined>>,
  run: () => void,
): void {
  const previousValues = Object.fromEntries(
    Object.keys(values).map((variable) => [variable, process.env[variable]]),
  );

  try {
    for (const [variable, value] of Object.entries(values)) {
      if (value === undefined) {
        delete process.env[variable];
      } else {
        process.env[variable] = value;
      }
    }

    run();
  } finally {
    for (const [variable, value] of Object.entries(previousValues)) {
      if (value === undefined) {
        delete process.env[variable];
      } else {
        process.env[variable] = value;
      }
    }
  }
}

const checks: readonly Check[] = [
  {
    name: "valid safe production fixture passes",
    run: () => {
      const environment = parseClientEnvironment(
        safeProductionFixture,
        "production",
      );

      assert.equal(environment.NEXT_PUBLIC_SITE_URL_UK?.protocol, "https:");
      assert.equal(environment.NEXT_PUBLIC_SITE_URL_UA?.protocol, "https:");
    },
  },
  {
    name: "missing required variable reports only its name",
    run: () => {
      expectEnvironmentError(
        () =>
          parseClientEnvironment(
            { NEXT_PUBLIC_SITE_URL_UA: "https://ua.example.test" },
            "production",
          ),
        "NEXT_PUBLIC_SITE_URL_UK",
      );
    },
  },
  {
    name: "production reader cannot default to development requiredness",
    run: () => {
      withProcessEnvironment(
        {
          NEXT_PUBLIC_SITE_URL_UK: undefined,
          NEXT_PUBLIC_SITE_URL_UA: "https://ua.example.test",
        },
        () => {
          expectEnvironmentError(
            () => readClientEnvironment("production"),
            "NEXT_PUBLIC_SITE_URL_UK",
          );
        },
      );
    },
  },
  {
    name: "invalid URL is rejected without exposing its value",
    run: () => {
      const invalidValue = "invalid-url-private-fixture";

      expectEnvironmentError(
        () =>
          parseClientEnvironment(
            {
              ...safeProductionFixture,
              NEXT_PUBLIC_SITE_URL_UK: invalidValue,
            },
            "production",
          ),
        "NEXT_PUBLIC_SITE_URL_UK",
        invalidValue,
      );
    },
  },
  {
    name: "URL, approved local hosts and ports are normalized",
    run: () => {
      const environment = parseClientEnvironment(
        {
          ...safeProductionFixture,
          NEXT_PUBLIC_SITE_URL_UK:
            "  HTTP://UK.INFRAVOLT.LOCALHOST.:80/  ",
          NEXT_PUBLIC_SITE_URL_UA:
            "  HTTP://UA.INFRAVOLT.LOCALHOST.:3000/  ",
        },
        "production",
      );

      assert.equal(
        environment.NEXT_PUBLIC_SITE_URL_UK?.href,
        "http://uk.infravolt.localhost/",
      );
      assert.equal(
        environment.NEXT_PUBLIC_SITE_URL_UK?.host,
        "uk.infravolt.localhost",
      );
      assert.equal(
        environment.NEXT_PUBLIC_SITE_URL_UA?.href,
        "http://ua.infravolt.localhost:3000/",
      );
      assert.equal(
        environment.NEXT_PUBLIC_SITE_URL_UA?.host,
        "ua.infravolt.localhost:3000",
      );
    },
  },
  {
    name: "unsupported protocols and non-origin URL components are rejected",
    run: () => {
      const invalidValues = [
        "ftp://uk.example.test",
        "https://uk.example.test/private-path",
        "https://uk.example.test/?private-query",
        "https://uk.example.test/#private-fragment",
      ];

      for (const invalidValue of invalidValues) {
        expectEnvironmentError(
          () =>
            parseClientEnvironment(
              {
                ...safeProductionFixture,
                NEXT_PUBLIC_SITE_URL_UK: invalidValue,
              },
              "production",
            ),
          "NEXT_PUBLIC_SITE_URL_UK",
          invalidValue,
        );
      }
    },
  },
  {
    name: "client output contains only the explicit public allowlist",
    run: () => {
      const environment = parseClientEnvironment(
        {
          ...safeProductionFixture,
          NEXT_PUBLIC_UNAPPROVED_VALUE: "synthetic-public-fixture",
          SUPABASE_SECRET_KEY: "synthetic-server-only-fixture",
        },
        "production",
      );

      assert(
        Object.keys(environment).every((key) =>
          CLIENT_ENVIRONMENT_VARIABLES.includes(
            key as (typeof CLIENT_ENVIRONMENT_VARIABLES)[number],
          ),
        ),
      );
      assert(!("NEXT_PUBLIC_UNAPPROVED_VALUE" in environment));
      assert(!("SUPABASE_SECRET_KEY" in environment));
    },
  },
  {
    name: "empty optional values are omitted from client and server output",
    run: () => {
      const clientEnvironment = parseClientEnvironment(
        {
          NEXT_PUBLIC_PROTECTED_APP_URL: "",
          NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "   ",
        },
        "test",
      );
      const serverEnvironment = parseServerEnvironment({
        SUPABASE_SECRET_KEY: "",
        EMAIL_FROM_UK: "   ",
        LOG_LEVEL: "",
      });

      assert.deepEqual(clientEnvironment, {});
      assert.deepEqual(serverEnvironment, {});
    },
  },
  {
    name: "plain and display-name mailboxes validate safely",
    run: () => {
      const environment = parseServerEnvironment({
        EMAIL_FROM_UK: "InfraVolt <sales@example.test>",
        EMAIL_REPLY_TO_UK: "reply@example.test",
      });

      assert.equal(
        environment.EMAIL_FROM_UK,
        "InfraVolt <sales@example.test>",
      );
      assert.equal(environment.EMAIL_REPLY_TO_UK, "reply@example.test");

      const invalidEmails = [
        "InfraVolt <invalid-email-private-fixture>",
        "sales@example.test\r\nBcc: private-fixture@example.test",
      ];

      for (const invalidEmail of invalidEmails) {
        expectEnvironmentError(
          () => parseServerEnvironment({ EMAIL_FROM_UK: invalidEmail }),
          "EMAIL_FROM_UK",
          invalidEmail,
        );
      }
    },
  },
  {
    name: "future providers remain optional and server errors are redacted",
    run: () => {
      assert.deepEqual(parseServerEnvironment({}), {});

      const invalidLogLevel = "verbose-private-fixture";
      expectEnvironmentError(
        () => parseServerEnvironment({ LOG_LEVEL: invalidLogLevel }),
        "LOG_LEVEL",
        invalidLogLevel,
      );
    },
  },
];

for (const check of checks) {
  check.run();
  console.log(`PASS: ${check.name}`);
}

console.log(`Environment contract verification passed (${checks.length} checks).`);
