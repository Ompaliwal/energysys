import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Consumer from "@/models/Consumer";

import { parseExcel } from "@/lib/excel";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const data = await req.formData();

    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          error: "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const rows: any[] = parseExcel(buffer);

    const formattedRows = rows.map((row) => ({
      consumerNumber:
        row.consumerNumber ||
        row.ConsumerNumber,

      fullName:
        row.fullName ||
        row.FullName,

      meterNumber:
        row.meterNumber ||
        row.MeterNumber,

      mobile: row.mobile,

      email: row.email,

      address: row.address,

      tariffCategory:
        row.tariffCategory,

      sanctionedLoad:
        Number(row.sanctionedLoad) || 0,
    }));

    await Consumer.insertMany(formattedRows);

    return NextResponse.json({
      success: true,
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}