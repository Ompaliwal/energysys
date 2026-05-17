import mongoose, { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;

  password?: string;

  image?: string;
  provider?: "credentials" | "google";

  role?: "admin" | "manager" | "cashier" | "reader";

  createdBy?: mongoose.Types.ObjectId;

  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
    },

    image: String,

    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },

    // IMPORTANT
    // no default role
    role: {
      type: String,
      enum: ["admin", "manager", "cashier", "reader"],
      default: null,
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

UserSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;

  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (
  password: string
) {
  if (!this.password) return false;

  return bcrypt.compare(password, this.password);
};

export default models.User || model<IUser>("User", UserSchema);