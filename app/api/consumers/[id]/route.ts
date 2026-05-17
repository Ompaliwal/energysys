import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Consumer from "@/models/Consumer";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const body = await req.json();

    const updatedConsumer =
      await Consumer.findByIdAndUpdate(
        params.id,
        body,
        {
          new: true,
        }
      );

    return NextResponse.json(updatedConsumer);

  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to update consumer",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    await Consumer.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to delete consumer",
      },
      {
        status: 500,
      }
    );
  }
}