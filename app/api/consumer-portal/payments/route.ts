import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { connectDB } from "@/lib/db";

import Consumer from "@/models/Consumer";

import Payment from "@/models/Payment";

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

    const payments =
      await Payment.find({
        consumerId:
          consumer._id,
      })

        .populate("billId")

        .sort({
          createdAt: -1,
        });

    return NextResponse.json(
      payments
    );

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to fetch payments",
      },
      {
        status: 500,
      }
    );
  }
}