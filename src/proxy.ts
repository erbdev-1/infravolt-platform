import { NextResponse, type NextRequest } from "next/server.js";

import {
  createRuntimeMarketResolver,
  createTrustedMarketHeaders,
  UntrustedHostError,
} from "./modules/markets/server.ts";

function unknownHostResponse(): NextResponse {
  return new NextResponse("Not Found", {
    status: 404,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export function proxy(request: NextRequest): NextResponse {
  let resolution;

  try {
    resolution = createRuntimeMarketResolver().resolve(
      request.headers.get("host") ?? "",
    );
  } catch (error) {
    if (error instanceof UntrustedHostError) {
      return unknownHostResponse();
    }

    throw error;
  }

  if (resolution.redirectToCanonical) {
    const destination = request.nextUrl.clone();

    destination.protocol = resolution.context.publicSiteUrl.protocol;
    destination.host = resolution.context.publicSiteUrl.host;

    return NextResponse.redirect(destination, 308);
  }

  return NextResponse.next({
    request: {
      headers: createTrustedMarketHeaders(
        request.headers,
        resolution.context,
      ),
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
