import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";

import feedbackRoutes from "../routes/feedbackRoutes.js";
import adminRoutes from "../routes/adminRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/feedback", feedbackRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Student Feedback API is running");
});

let isConnected = false;
async function connectDB() {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB Connected");
  }
}
await connectDB();

export default serverless(app);