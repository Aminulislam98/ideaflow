import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {
  const { pathname } = new URL(request.url);

  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session) {
    const loginUrl = new URL("/signin", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(new URL(loginUrl));
  }
}

export const config = {
  matcher: [
    "/profile",
    "/my-ideas",
    "/add-idea",
    "/my-interactions",
    "/ideas/:path",
  ],
};
