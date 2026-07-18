import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

beforeEach(() => {
  // Unit/component katmanında beklenmeyen dış ağ erişimini varsayılan olarak reddeder.
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.reject(new Error("Unexpected network access in Vitest")),
    ),
  );
  vi.stubGlobal(
    "XMLHttpRequest",
    class BlockedXMLHttpRequest {
      constructor() {
        throw new Error("Unexpected XMLHttpRequest access in Vitest");
      }
    },
  );
  vi.stubGlobal(
    "WebSocket",
    class BlockedWebSocket {
      constructor() {
        throw new Error("Unexpected WebSocket access in Vitest");
      }
    },
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
