import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    discount: { type: Number, default: 0 },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    phone: { type: Number, required: true },
    adress: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
