import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getToken } from "next-auth/jwt";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Allow public routes
  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.next();
  }

  // ✅ Get BOTH tokens
  const customToken = req.cookies.get("token")?.value;
  const nextAuthToken = await getToken({ req });

  // ❌ If neither exists → block
  if (!customToken && !nextAuthToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ If custom JWT exists → verify + RBAC
  if (customToken) {
    try {
      const { payload }: any = await jwtVerify(customToken, secret);

      if (pathname.startsWith("/dashboard/admin") && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      if (pathname.startsWith("/dashboard/cashier") && payload.role !== "cashier") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      if (pathname.startsWith("/dashboard/reader") && payload.role !== "reader") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // ✅ If NextAuth session exists → allow
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};