import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";

dotenv.config(); 

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
await Admin.create({
  username: process.env.ADMIN_USERNAME,
  password: hashedPassword,
});

  console.log("Admin user created successfully");
  process.exit(); // stop the process
}).catch((err) => {
  console.error(" Failed to connect:", err);
});
