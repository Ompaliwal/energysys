import {
  NextRequest,
  NextResponse,
} from "next/server";

import { connectDB }
  from "@/lib/db";

import Meter
  from "@/models/Meter";

// UPDATE METER
export async function PUT(
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

    const body =
      await req.json();

    const updatedMeter =
      await Meter.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
        }
      );

    return NextResponse.json(
      updatedMeter
    );

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to update meter",
      },
      {
        status: 500,
      }
    );
  }
}

// DELETE METER
export async function DELETE(
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

    await Meter.findByIdAndDelete(
      id
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to delete meter",
      },
      {
        status: 500,
      }
    );
  }
}