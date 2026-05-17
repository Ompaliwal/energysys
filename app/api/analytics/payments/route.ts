import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Payment from "@/models/Payment";

export async function GET() {

  try {

    await connectDB();

    const payments =
      await Payment.find();

    const methods:
      Record<
        string,
        number
      > = {};

    payments.forEach(
      (payment: any) => {

        const method =
          payment.paymentMethod;

        if (
          !methods[
            method
          ]
        ) {
          methods[
            method
          ] = 0;
        }

        methods[
          method
        ] += 1;
      }
    );

    const data =
      Object.entries(
        methods
      ).map(
        ([name, value]) => ({
          name,
          value,
        })
      );

    return NextResponse.json(
      data
    );

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to fetch payment analytics",
      },
      {
        status: 500,
      }
    );
  }
}