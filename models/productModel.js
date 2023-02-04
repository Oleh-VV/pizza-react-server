import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    productName: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    consist: { type: String, default: "" },
    image: { type: String, required: true },
    adds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Adds",
        default: "",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
