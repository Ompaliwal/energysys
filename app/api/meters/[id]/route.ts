import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Meter from "@/models/Meter";

export async function PUT(
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

    const body = await req.json();

    const updatedMeter =
      await Meter.findByIdAndUpdate(
        params.id,
        body,
        {
          new: true,
        }
      );

    return NextResponse.json(
      updatedMeter
    );

  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to update meter",
      },
      {
        status: 500,
      }
    );
  }
}

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

    await Meter.findByIdAndDelete(
      params.id
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to delete meter",
      },
      {
        status: 500,
      }
    );
  }
}