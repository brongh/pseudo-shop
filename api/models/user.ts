import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String, required: true },
  token: { type: String },
  products: [{ type: mongoose.Types.ObjectId, ref: "products" }],
  name: { type: String },
});

const Users = mongoose.model("users", userSchema);

export default Users;
