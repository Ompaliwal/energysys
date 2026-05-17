import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Meter from "@/models/Meter";

export async function GET() {
  try {
    await connectDB();

    const meters = await Meter.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(meters);

  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch meters",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  req: NextRequest
) {
  try {
    await connectDB();

    const body = await req.json();

    const meter = await Meter.create(body);

    return NextResponse.json(meter);

  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}