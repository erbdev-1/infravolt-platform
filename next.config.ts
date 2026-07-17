import type { NextConfig } from "next";
import {
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} from "next/constants";

import { readClientEnvironment } from "./src/config/env/client";
import { readServerEnvironment } from "./src/config/env/server";

const nextConfig = (phase: string): NextConfig => {
  if (phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER) {
    readClientEnvironment("production");
    readServerEnvironment();
  }

  return {};
};

export default nextConfig;
