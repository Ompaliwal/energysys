import mongoose, {
    Schema,
    model,
    models,
    Document,
  } from "mongoose";
  
  export interface IPayment
    extends Document {
  
    consumerId:
      mongoose.Types.ObjectId;
  
    billId:
      mongoose.Types.ObjectId;
  
    amount: number;
  
    paymentMethod:
      | "Cash"
      | "UPI"
      | "Card"
      | "Bank Transfer";
  
    transactionId?: string;
  
    status:
      | "Success"
      | "Pending"
      | "Failed";
  
    paymentDate: Date;
  
    receivedBy?:
      mongoose.Types.ObjectId;
  }
  
  const PaymentSchema =
    new Schema<IPayment>(
      {
        consumerId: {
          type:
            mongoose.Schema.Types.ObjectId,
  
          ref: "Consumer",
  
          required: true,
        },
  
        billId: {
          type:
            mongoose.Schema.Types.ObjectId,
  
          ref: "Bill",
  
          required: true,
        },
  
        amount: {
          type: Number,
          required: true,
        },
  
        paymentMethod: {
          type: String,
  
          enum: [
            "Cash",
            "UPI",
            "Card",
            "Bank Transfer",
          ],
  
          required: true,
        },
  
        transactionId: String,
  
        status: {
          type: String,
  
          enum: [
            "Success",
            "Pending",
            "Failed",
          ],
  
          default: "Success",
        },
  
        paymentDate: {
          type: Date,
          default: Date.now,
        },
  
        receivedBy: {
          type:
            mongoose.Schema.Types.ObjectId,
  
          ref: "User",
        },
      },
      {
        timestamps: true,
      }
    );
  
  export default models.Payment ||
    model<IPayment>(
      "Payment",
      PaymentSchema
    );