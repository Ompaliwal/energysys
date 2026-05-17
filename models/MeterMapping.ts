import mongoose, {
    Schema,
    model,
    models,
    Document,
  } from "mongoose";
  
  export interface IMeterMapping
    extends Document {
  
    consumerId: mongoose.Types.ObjectId;
  
    meterId: mongoose.Types.ObjectId;
  
    startDate?: Date;
  
    endDate?: Date;
  
    isActive: boolean;
  
    remarks?: string;
  
    mappedBy?: mongoose.Types.ObjectId;
  }
  
  const MeterMappingSchema =
    new Schema<IMeterMapping>(
      {
        consumerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Consumer",
          required: true,
        },
  
        meterId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Meter",
          required: true,
        },
  
        startDate: {
          type: Date,
          default: Date.now,
        },
  
        endDate: Date,
  
        isActive: {
          type: Boolean,
          default: true,
        },
  
        remarks: String,
  
        mappedBy: {
          type:
            mongoose.Schema.Types.ObjectId,
  
          ref: "User",
        },
      },
      {
        timestamps: true,
      }
    );
  
  export default models.MeterMapping ||
    model<IMeterMapping>(
      "MeterMapping",
      MeterMappingSchema
    );