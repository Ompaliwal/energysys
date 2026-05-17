import {
  NextRequest,
  NextResponse,
} from "next/server";

import { connectDB }
  from "@/lib/db";

import Consumer
  from "@/models/Consumer";

// UPDATE CONSUMER
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

    const updatedConsumer =
      await Consumer.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
        }
      );

    return NextResponse.json(
      updatedConsumer
    );

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to update consumer",
      },
      {
        status: 500,
      }
    );
  }
}

// DELETE CONSUMER
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

    await Consumer.findByIdAndDelete(
      id
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to delete consumer",
      },
      {
        status: 500,
      }
    );
  }
}