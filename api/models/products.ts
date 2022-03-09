import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  SKU: { type: String },
  image: { type: String },
});

const Products = mongoose.model("products", productSchema);

export default Products;
