import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Payment from "@/models/Payment";

export async function GET() {

  try {

    await connectDB();

    const payments =
      await Payment.find({
        status: "Success",
      });

    const monthlyRevenue:
      Record<
        string,
        number
      > = {};

    payments.forEach(
      (payment: any) => {

        const month =
          new Date(
            payment.paymentDate
          ).toLocaleString(
            "default",
            {
              month: "short",
            }
          );

        if (
          !monthlyRevenue[
            month
          ]
        ) {
          monthlyRevenue[
            month
          ] = 0;
        }

        monthlyRevenue[
          month
        ] += payment.amount;
      }
    );

    const data =
      Object.entries(
        monthlyRevenue
      ).map(
        ([month, revenue]) => ({
          month,
          revenue,
        })
      );

    return NextResponse.json(
      data
    );

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to fetch revenue analytics",
      },
      {
        status: 500,
      }
    );
  }
}