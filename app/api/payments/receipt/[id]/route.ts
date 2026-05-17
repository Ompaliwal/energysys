import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Payment from "@/models/Payment";

import jsPDF from "jspdf";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {

  try {

    await connectDB();

    const payment =
      await Payment.findById(
        params.id
      )

        .populate("consumerId")

        .populate("billId");

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

    const doc =
      new jsPDF();

    doc.setFontSize(22);

    doc.text(
      "Payment Receipt",
      20,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Consumer: ${payment.consumerId?.fullName}`,
      20,
      40
    );

    doc.text(
      `Amount: ₹${payment.amount}`,
      20,
      50
    );

    doc.text(
      `Method: ${payment.paymentMethod}`,
      20,
      60
    );

    doc.text(
      `Status: ${payment.status}`,
      20,
      70
    );

    doc.text(
      `Date: ${new Date(
        payment.paymentDate
      ).toLocaleDateString()}`,
      20,
      80
    );

    const pdfBuffer =
      doc.output(
        "arraybuffer"
      );

    return new NextResponse(
      pdfBuffer,
      {
        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            `attachment; filename=receipt-${payment._id}.pdf`,
        },
      }
    );

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to download receipt",
      },
      {
        status: 500,
      }
    );
  }
}