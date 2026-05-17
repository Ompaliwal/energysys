import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import MeterReading from "@/models/MeterReading";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      meterId: string;
    }>;
  }
) {
  try {

    await connectDB();

    // ✅ NEXT 15 FIX
    const { meterId } =
      await params;

    const latestReading =
      await MeterReading.findOne({
        meterId,
      }).sort({
        createdAt: -1,
      });

    return NextResponse.json(
      latestReading
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch latest reading",
      },
      {
        status: 500,
      }
    );
  }
}