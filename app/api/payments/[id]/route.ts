import {
  NextRequest,
  NextResponse,
} from "next/server";

import { connectDB }
  from "@/lib/db";

import Payment
  from "@/models/Payment";

export async function GET(
  req: NextRequest,

  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  try {

    await connectDB();

    const { id } =
      await context.params;

    const payment =
      await Payment.findById(id)
        .populate(
          "consumerId"
        )
        .populate(
          "billId"
        );

    if (!payment) {

      return NextResponse.json(
        {
          error:
            "Payment not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      payment
    );

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to fetch receipt",
      },
      {
        status: 500,
      }
    );
  }
}