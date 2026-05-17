import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import MeterMapping from "@/models/MeterMapping";

export async function DELETE(
  req: NextRequest,
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

    await MeterMapping.findByIdAndDelete(
      params.id
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to delete mapping",
      },
      {
        status: 500,
      }
    );
  }
}