import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Consumer from "@/models/Consumer";

import Meter from "@/models/Meter";

import Bill from "@/models/Bill";

import Payment from "@/models/Payment";

export async function GET() {

  try {

    await connectDB();

    const totalConsumers =
      await Consumer.countDocuments();

    const totalMeters =
      await Meter.countDocuments();

    const totalBills =
      await Bill.countDocuments();

    const pendingBills =
      await Bill.countDocuments({
        status: "Pending",
      });

    const paidBills =
      await Bill.countDocuments({
        status: "Paid",
      });

    const payments =
      await Payment.find({
        status: "Success",
      });

    const totalRevenue =
      payments.reduce(
        (
          acc: number,
          payment: any
        ) =>
          acc + payment.amount,
        0
      );

    return NextResponse.json({
      totalConsumers,
      totalMeters,
      totalBills,
      totalRevenue,
      pendingBills,
      paidBills,
    });

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to fetch dashboard analytics",
      },
      {
        status: 500,
      }
    );
  }
}