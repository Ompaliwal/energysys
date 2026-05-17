// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  await connectDB();

  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  console.log("LOGIN EMAIL:", email);
console.log("USER FOUND:", user?.email);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const match = await user.comparePassword(password);
  if (!match) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({
    userId: user._id,
    role: user.role,
  });

  const res = NextResponse.json({ message: "Login success" });

  res.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}