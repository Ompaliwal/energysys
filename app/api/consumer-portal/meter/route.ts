import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { connectDB } from "@/lib/db";

import Consumer from "@/models/Consumer";

import Meter from "@/models/Meter";

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
        null
      );
    }

    const meter =
      await Meter.findOne({
        meterNumber:
          consumer.meterNumber,
      });

    return NextResponse.json(
      meter
    );

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to fetch meter",
      },
      {
        status: 500,
      }
    );
  }
}