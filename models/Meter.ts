import mongoose, {
    Schema,
    model,
    models,
    Document,
  } from "mongoose";
  
  export interface IMeter extends Document {
    meterNumber: string;
  
    serialNumber: string;
  
    meterType:
      | "Electric"
      | "DG"
      | "Solar";
  
    phaseType:
      | "Single"
      | "Three";
  
    manufacturer?: string;
  
    installationDate?: Date;
  
    initialReading?: number;
  
    currentReading?: number;
  
    location?: string;
  
    notes?: string;
  
    status:
      | "Active"
      | "Inactive"
      | "Faulty"
      | "Disconnected";
  
    createdBy?: mongoose.Types.ObjectId;
  }
  
  const MeterSchema = new Schema<IMeter>(
    {
      meterNumber: {
        type: String,
        required: true,
        unique: true,
      },
  
      serialNumber: {
        type: String,
        required: true,
        unique: true,
      },
  
      meterType: {
        type: String,
        enum: [
          "Electric",
          "DG",
          "Solar",
        ],
        default: "Electric",
      },
  
      phaseType: {
        type: String,
        enum: [
          "Single",
          "Three",
        ],
        default: "Single",
      },
  
      manufacturer: String,
  
      installationDate: Date,
  
      initialReading: {
        type: Number,
        default: 0,
      },
  
      currentReading: {
        type: Number,
        default: 0,
      },
  
      location: String,
  
      notes: String,
  
      status: {
        type: String,
        enum: [
          "Active",
          "Inactive",
          "Faulty",
          "Disconnected",
        ],
        default: "Active",
      },
  
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );
  
  export default models.Meter ||
    model<IMeter>("Meter", MeterSchema);