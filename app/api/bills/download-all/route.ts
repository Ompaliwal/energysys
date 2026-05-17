import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Bill from "@/models/Bill";

import jsPDF from "jspdf";

export async function GET() {

  try {

    await connectDB();

    const bills =
      await Bill.find()

        .populate("consumerId")

        .populate("meterId");

    const doc =
      new jsPDF();

    bills.forEach(
      (
        bill: any,
        index: number
      ) => {

        if (index > 0) {
          doc.addPage();
        }

        // TITLE
        doc.setFontSize(22);

        doc.text(
          "Electricity Bill",
          20,
          20
        );

        // CONSUMER INFO
        doc.setFontSize(12);

        doc.text(
          `Consumer: ${bill.consumerId?.fullName}`,
          20,
          40
        );

        doc.text(
          `Meter Number: ${bill.meterId?.meterNumber}`,
          20,
          50
        );

        doc.text(
          `Billing Month: ${bill.month}`,
          20,
          60
        );

        // READING INFO
        doc.text(
          `Old Reading: ${bill.oldReading}`,
          20,
          80
        );

        doc.text(
          `New Reading: ${bill.newReading}`,
          20,
          90
        );

        doc.text(
          `Units Consumed: ${bill.unitsConsumed}`,
          20,
          100
        );

        // BILL INFO
        doc.text(
          `Rate Per Unit: ₹${bill.ratePerUnit}`,
          20,
          120
        );

        doc.text(
          `Total Amount: ₹${bill.totalAmount}`,
          20,
          130
        );

        doc.text(
          `Status: ${bill.status}`,
          20,
          140
        );

        doc.text(
          `Generated At: ${new Date(
            bill.generatedAt
          ).toLocaleDateString()}`,
          20,
          150
        );
      }
    );

    // FINAL PDF BUFFER
    const pdfBuffer =
      doc.output("arraybuffer");

    return new NextResponse(
      pdfBuffer,
      {
        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            `attachment; filename=all-bills.pdf`,
        },
      }
    );

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to download all bills",
      },
      {
        status: 500,
      }
    );
  }
}