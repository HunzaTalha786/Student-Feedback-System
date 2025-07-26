import express from "express";
import {
  submitFeedback,
  getAllFeedbacks,
  deleteFeedback,
} from "../controllers/feedbackController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", submitFeedback);
router.get("/", verifyToken, getAllFeedbacks);
router.delete("/:id", verifyToken, deleteFeedback);

export default router;

