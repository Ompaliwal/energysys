import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import MeterReading from "@/models/MeterReading";

export async function GET() {
  try {
    await connectDB();

    const readings =
      await MeterReading.find()

        .populate("consumerId")

        .populate("meterId")

        .sort({
          createdAt: -1,
        });

    return NextResponse.json(
      readings
    );

  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to fetch readings",
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

    // validation
    if (
      body.newReading <
      body.oldReading
    ) {
      return NextResponse.json(
        {
          error:
            "New reading cannot be less than old reading",
        },
        {
          status: 400,
        }
      );
    }

    const unitsConsumed =
      body.newReading -
      body.oldReading;

    const reading =
      await MeterReading.create({
        ...body,
        unitsConsumed,
      });

    return NextResponse.json(
      reading
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