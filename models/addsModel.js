import mongoose from "mongoose";

const AddsSchema = new mongoose.Schema(
  {
    addsName: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Adds = mongoose.model("Adds", AddsSchema);
export default Adds;
