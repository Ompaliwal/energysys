import mongoose, {
    Schema,
    model,
    models,
    Document,
  } from "mongoose";
  
  export interface IMeterReading
    extends Document {
  
    meterId: mongoose.Types.ObjectId;
  
    consumerId: mongoose.Types.ObjectId;
  
    oldReading: number;
  
    newReading: number;
  
    unitsConsumed: number;
  
    readingDate: Date;
  
    month: string;
  
    remarks?: string;
  
    status:
      | "Pending"
      | "Verified";
  
    takenBy?: mongoose.Types.ObjectId;
  }
  
  const MeterReadingSchema =
    new Schema<IMeterReading>(
      {
        meterId: {
          type:
            mongoose.Schema.Types.ObjectId,
  
          ref: "Meter",
  
          required: true,
        },
  
        consumerId: {
          type:
            mongoose.Schema.Types.ObjectId,
  
          ref: "Consumer",
  
          required: true,
        },
  
        oldReading: {
          type: Number,
          required: true,
        },
  
        newReading: {
          type: Number,
          required: true,
        },
  
        unitsConsumed: {
          type: Number,
          required: true,
        },
  
        readingDate: {
          type: Date,
          default: Date.now,
        },
  
        month: {
          type: String,
          required: true,
        },
  
        remarks: String,
  
        status: {
          type: String,
          enum: [
            "Pending",
            "Verified",
          ],
          default: "Pending",
        },
  
        takenBy: {
          type:
            mongoose.Schema.Types.ObjectId,
  
          ref: "User",
        },
      },
      {
        timestamps: true,
      }
    );
  
  export default models.MeterReading ||
    model<IMeterReading>(
      "MeterReading",
      MeterReadingSchema
    );