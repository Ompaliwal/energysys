import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Bill from "@/models/Bill";

import MeterReading from "@/models/MeterReading";

export async function POST() {
  try {
    await connectDB();

    const readings =
      await MeterReading.find();

    const createdBills = [];

    for (const reading of readings) {

      const existingBill =
        await Bill.findOne({
          readingId: reading._id,
        });

      if (existingBill) {
        continue;
      }

      const ratePerUnit = 8;

      const totalAmount =
        reading.unitsConsumed *
        ratePerUnit;

      const bill =
        await Bill.create({
          consumerId:
            reading.consumerId,

          meterId:
            reading.meterId,

          readingId:
            reading._id,

          month: reading.month,

          oldReading:
            reading.oldReading,

          newReading:
            reading.newReading,

          unitsConsumed:
            reading.unitsConsumed,

          ratePerUnit,

          totalAmount,
        });

      createdBills.push(bill);
    }

    return NextResponse.json({
      success: true,
      count:
        createdBills.length,
    });

  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to generate bills",
      },
      {
        status: 500,
      }
    );
  }
}