import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // cv.<domain> serves the printable CV (app/cv) at its root.
  const host = request.headers.get("host") ?? "";
  if (host.startsWith("cv.")) {
    const url = request.nextUrl.clone();
    url.pathname = url.pathname === "/" ? "/cv" : `/cv${url.pathname}`;
    return NextResponse.rewrite(url);
  }
  return intl(request);
}

export const config = {
  // Everything except API routes, Next internals, the CV and files with an extension.
  matcher: "/((?!api|_next|_vercel|cv|icon|apple-icon|.*opengraph-image|.*\\..*).*)",
};
