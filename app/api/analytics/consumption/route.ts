import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import MeterReading from "@/models/MeterReading";

export async function GET() {

  try {

    await connectDB();

    const readings =
      await MeterReading.find();

    const monthlyConsumption:
      Record<
        string,
        number
      > = {};

    readings.forEach(
      (reading: any) => {

        const month =
          reading.month;

        if (
          !monthlyConsumption[
            month
          ]
        ) {
          monthlyConsumption[
            month
          ] = 0;
        }

        monthlyConsumption[
          month
        ] +=
          reading.unitsConsumed;
      }
    );

    const data =
      Object.entries(
        monthlyConsumption
      ).map(
        ([month, units]) => ({
          month,
          units,
        })
      );

    return NextResponse.json(
      data
    );

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to fetch consumption analytics",
      },
      {
        status: 500,
      }
    );
  }
}