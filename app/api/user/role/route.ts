import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, role } = await req.json();

    if (!email || !role) {
      return NextResponse.json(
        {
          error: "Email and role are required",
        },
        {
          status: 400,
        }
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      {
        email,
      },

      {
        role,
      },

      {
        new: true,
      }
    );

    if (!updatedUser) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}