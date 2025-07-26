// // import express from "express";
// // import mongoose from "mongoose";
// // import cors from "cors";
// // import dotenv from "dotenv";

// // import feedbackRoutes from "./routes/feedbackRoutes.js";
// // import adminRoutes from "./routes/adminRoutes.js";

// // dotenv.config();

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // app.use("/api/feedback", feedbackRoutes);
// // app.use("/api/admin", adminRoutes);

// // app.get("/", (req, res) => {
// //   res.send("✅ Student Feedback API is running");
// // });


// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => {
// //     console.log("MongoDB Connected");
// //     app.listen(process.env.PORT, () =>
// //       console.log(`Server running on http://localhost:${process.env.PORT}`)
// //     );
// //   })
// //   .catch((err) => console.log(err));

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// import feedbackRoutes from "./routes/feedbackRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";

// dotenv.config();

// const app = express();

// // ✅ CORS Configuration
// const allowedOrigins = [
//   "http://localhost:5173", // Vite Dev Server (local)
//   "https://student-feedback-system-frontend.vercel.app/", // ✅ Replace with your actual Vercel link
// ];

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true, // only needed if you're using cookies/session
// }));

// app.use(express.json());

// // ✅ Routes
// app.use("/api/feedback", feedbackRoutes);
// app.use("/api/admin", adminRoutes);

// // ✅ Default Route
// app.get("/", (req, res) => {
//   res.send("✅ Student Feedback API is running");
// });

// // ✅ MongoDB Connect & Server Start
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//     app.listen(process.env.PORT, () =>
//       console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
//     );
//   })
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import feedbackRoutes from "./routes/feedbackRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://student-feedback-system-frontend.vercel.app"
];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("✅ Student Feedback API is running");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Export the app instead of listening
export default app;
