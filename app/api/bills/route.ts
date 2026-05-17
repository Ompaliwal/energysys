import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Bill from "@/models/Bill";

// IMPORTANT
import "@/models/Consumer";
import "@/models/Meter";

export async function GET() {

  try {

    await connectDB();

    const bills =
      await Bill.find({})

        .populate({
          path: "consumerId",
          model: "Consumer",
        })

        .populate({
          path: "meterId",
          model: "Meter",
        })

        .sort({
          createdAt: -1,
        });

    return NextResponse.json(
      bills
    );

  } catch (error) {

    console.log(
      "BILLS FETCH ERROR:",
      error
    );

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