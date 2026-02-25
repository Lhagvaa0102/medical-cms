import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
});

const User = mongoose.model("User", UserSchema);

const hash = await bcrypt.hash("123456", 10);

await User.create({
  email: "admin@test.com",
  password: hash,
  role: "admin",
});

console.log("Admin created");
process.exit();
