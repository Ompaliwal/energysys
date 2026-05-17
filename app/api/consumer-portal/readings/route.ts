import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { connectDB } from "@/lib/db";

import Consumer from "@/models/Consumer";

import MeterReading from "@/models/MeterReading";

export async function GET() {

  try {

    await connectDB();

    const session =
      await getServerSession();

    const consumer =
      await Consumer.findOne({
        userId:
          session?.user?.id,
      });

    if (!consumer) {
      return NextResponse.json(
        []
      );
    }

    const readings =
      await MeterReading.find({
        consumerId:
          consumer._id,
      })

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