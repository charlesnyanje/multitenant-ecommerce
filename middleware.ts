import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  
  const localhostDomains = ["localhost:3000", "127.0.0.1:3000"];
  const isLocalhost = localhostDomains.includes(hostname);

  let subdomain = null;

  if (isLocalhost) {
    subdomain = "demo";
  } else {
    const parts = hostname.split(".");
    if (parts.length >= 3) {
      subdomain = parts[0];
    }
  }

  if (subdomain) {
    const response = NextResponse.next();
    response.headers.set("x-tenant-subdomain", subdomain);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
