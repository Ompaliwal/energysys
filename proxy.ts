import {
  NextRequest,
  NextResponse,
} from "next/server";

import { jwtVerify } from "jose";

import { getToken } from "next-auth/jwt";

import { hasAccess } from "@/lib/auth";

const secret =
  new TextEncoder().encode(
    process.env.JWT_SECRET!
  );

export async function proxy(
  req: NextRequest
) {

  const { pathname } =
    req.nextUrl;

  // PUBLIC ROUTES
  const publicRoutes = [
    "/login",
    "/register",
    "/unauthorized",
  ];

  if (
    publicRoutes.includes(
      pathname
    )
  ) {
    return NextResponse.next();
  }

  // TOKENS
  const customToken =
    req.cookies.get("token")
      ?.value;

  const nextAuthToken =
    await getToken({
      req,
    });

  // BLOCK IF NO TOKEN
  if (
    !customToken &&
    !nextAuthToken
  ) {

    return NextResponse.redirect(
      new URL(
        "/login",
        req.url
      )
    );
  }

  // CUSTOM JWT FLOW
  if (customToken) {

    try {

      const { payload }: any =
        await jwtVerify(
          customToken,
          secret
        );

      const allowed =
        hasAccess(
          payload.role,
          pathname
        );

      if (!allowed) {

        return NextResponse.redirect(
          new URL(
            "/unauthorized",
            req.url
          )
        );
      }

      return NextResponse.next();

    } catch {

      return NextResponse.redirect(
        new URL(
          "/login",
          req.url
        )
      );
    }
  }

  // NEXTAUTH FLOW
  if (nextAuthToken) {

    const role =
      nextAuthToken.role as string;

    const allowed =
      hasAccess(
        role,
        pathname
      );

    if (!allowed) {

      return NextResponse.redirect(
        new URL(
          "/unauthorized",
          req.url
        )
      );
    }

    return NextResponse.next();
  }

  return NextResponse.redirect(
    new URL(
      "/login",
      req.url
    )
  );
}

export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
};