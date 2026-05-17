import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import MeterReading from "@/models/MeterReading";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    await connectDB();

    await MeterReading.findByIdAndDelete(
      params.id
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to delete reading",
      },
      {
        status: 500,
      }
    );
  }
}