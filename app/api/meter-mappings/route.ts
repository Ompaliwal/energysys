import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import MeterMapping from "@/models/MeterMapping";

export async function GET() {
  try {
    await connectDB();

    const mappings =
      await MeterMapping.find()

        .populate("consumerId")

        .populate("meterId")

        .sort({
          createdAt: -1,
        });

    return NextResponse.json(
      mappings
    );

  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to fetch mappings",
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

    // deactivate previous mappings
    await MeterMapping.updateMany(
      {
        meterId: body.meterId,
      },
      {
        isActive: false,
      }
    );

    const mapping =
      await MeterMapping.create(body);

    return NextResponse.json(
      mapping
    );

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