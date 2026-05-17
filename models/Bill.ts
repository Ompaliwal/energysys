import mongoose, {
  Schema,
  model,
  models,
  Document,
} from "mongoose";

export interface IBill
  extends Document {

  consumerId:
    mongoose.Types.ObjectId;

  meterId:
    mongoose.Types.ObjectId;

  readingId:
    mongoose.Types.ObjectId;

  month: string;

  oldReading: number;

  newReading: number;

  unitsConsumed: number;

  ratePerUnit: number;

  totalAmount: number;

  status:
    | "Pending"
    | "Paid";

  generatedAt: Date;
}

const BillSchema =
  new Schema<IBill>(
    {
      consumerId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "Consumer",

        required: true,
      },

      meterId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "Meter",

        required: true,
      },

      readingId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "MeterReading",

        required: true,
      },

      month: {
        type: String,
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

      ratePerUnit: {
        type: Number,
        default: 8,
      },

      totalAmount: {
        type: Number,
        required: true,
      },

      status: {
        type: String,

        enum: [
          "Pending",
          "Paid",
        ],

        default: "Pending",
      },

      generatedAt: {
        type: Date,

        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

const Bill =
  models.Bill ||
  model<IBill>(
    "Bill",
    BillSchema
  );

export default Bill;