import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Bill from "@/models/Bill";

export async function DELETE(
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

    await Bill.findByIdAndDelete(
      params.id
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to delete bill",
      },
      {
        status: 500,
      }
    );
  }
}