import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Consumer from "@/models/Consumer";

export async function GET() {
  try {
    await connectDB();

    const consumers = await Consumer.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(consumers);

  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch consumers",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const consumer = await Consumer.create(body);

    return NextResponse.json(consumer);

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