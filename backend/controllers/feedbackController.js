import Feedback from "../models/Feedback.js";

//  Submit feedback 
export const submitFeedback = async (req, res) => {
  try {
    const newFeedback = new Feedback({ ...req.body, createdAt: new Date() });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted" });
  } catch (error) {
    res.status(500).json({ message: "Submission failed", error });
  }
};

//   feedbacks  (admin only)
export const getAllFeedbacks = async (req, res) => {
  try {
    const { course = "", page = 1, limit = 5 } = req.query;

    const query = course ? { course: { $regex: course, $options: "i" } } : {};

    const total = await Feedback.countDocuments(query);

    const feedbacks = await Feedback.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      feedbacks,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feedbacks", error });
  }
};

//  Delete feedback by ID (admin only)
export const deleteFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const deleted = await Feedback.findByIdAndDelete(feedbackId);
    if (!deleted) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Deletion failed", error });
  }
};
