// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  await connectDB();

  const { name, email, password, role } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User exists" }, { status: 400 });
  }

  const user = await User.create({ name, email, password, role });

  return NextResponse.json({ message: "User created", user });
}