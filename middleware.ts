import { BASE_PATH, auth } from "@/app/auth";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default auth((req) => {
  const reqUrl = new URL(req.url);
  if (!req.auth && reqUrl.pathname !== "/") {
    return NextResponse.redirect(
      new URL(
        `/login?callbackUrl=${encodeURIComponent(reqUrl.pathname)}`,
        req.url
      )
    );
  }

  // if (req.auth && !reqUrl.pathname.startsWith("/dashboard")) {
  //   return NextResponse.redirect(new URL(`/dashboard`, req.url));
  // }
});
