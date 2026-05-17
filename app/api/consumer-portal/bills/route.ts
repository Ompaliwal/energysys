import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { connectDB } from "@/lib/db";

import Consumer from "@/models/Consumer";

import Bill from "@/models/Bill";

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

    const bills =
      await Bill.find({
        consumerId:
          consumer._id,
      })

        .populate("meterId")

        .sort({
          createdAt: -1,
        });

    return NextResponse.json(
      bills
    );

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to fetch bills",
      },
      {
        status: 500,
      }
    );
  }
}