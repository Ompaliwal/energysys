import {
    NextRequest,
    NextResponse,
  } from "next/server";
  
  import { connectDB } from "@/lib/db";
  
  import Payment from "@/models/Payment";
  
  import Bill from "@/models/Bill";
  
  export async function GET() {
  
    try {
  
      await connectDB();
  
      const payments =
        await Payment.find()
  
          .populate("consumerId")
  
          .populate("billId")
  
          .sort({
            createdAt: -1,
          });
  
      return NextResponse.json(
        payments
      );
  
    } catch (error) {
  
      return NextResponse.json(
        {
          error:
            "Failed to fetch payments",
        },
        {
          status: 500,
        }
      );
    }
  }
  
  export async function POST(
    req: NextRequest
  ) {
  
    try {
  
      await connectDB();
  
      const body =
        await req.json();
  
      // CREATE PAYMENT
      const payment =
        await Payment.create(
          body
        );
  
      // UPDATE BILL STATUS
      await Bill.findByIdAndUpdate(
        body.billId,
        {
          status: "Paid",
        }
      );
  
      return NextResponse.json(
        payment
      );
  
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