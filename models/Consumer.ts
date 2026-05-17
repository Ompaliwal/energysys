import mongoose, {
  Schema,
  model,
  models,
  Document,
} from "mongoose";

export interface IConsumer
  extends Document {

  userId:
    mongoose.Types.ObjectId;

  consumerNumber: string;

  fullName: string;

  meterNumber: string;

  mobile?: string;

  email?: string;

  address?: string;

  tariffCategory?: string;

  sanctionedLoad?: number;

  status:
    | "Active"
    | "Inactive";

  createdBy?:
    mongoose.Types.ObjectId;
}

const ConsumerSchema =
  new Schema<IConsumer>(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        unique: true,
      },

      consumerNumber: {
        type: String,

        required: true,

        unique: true,
      },

      fullName: {
        type: String,

        required: true,
      },

      meterNumber: {
        type: String,

        required: true,

        unique: true,
      },

      mobile: String,

      email: String,

      address: String,

      tariffCategory:
        String,

      sanctionedLoad:
        Number,

      status: {
        type: String,

        enum: [
          "Active",
          "Inactive",
        ],

        default:
          "Active",
      },

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

export default models.Consumer ||
  model<IConsumer>(
    "Consumer",
    ConsumerSchema
  );