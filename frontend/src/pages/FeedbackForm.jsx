import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const FeedbackForm = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    rating: "",
    comments: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/feedback", form);
      toast.success("Feedback submitted!");
      setForm({ name: "", email: "", course: "", rating: "", comments: "" });
      setShowForm(false);
      navigate("/thankyou");
    } catch (err) {
      console.error(err);
      toast.error("Submission failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
      {/* Landing Title with GIF */}
      <div className="text-center space-y-4 mb-10 max-w-xl px-4">
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXBlMWF3YWs3aDdxM3doNGtjb2NtdTRlZGVrMzhzYmdnYjQ1dzZlMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qgQUggAC3Pfv687qPC/giphy.gif"
          alt="feedback"
          className="w-40 h-40 mx-auto rounded-full shadow-lg object-cover"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 drop-shadow-md">
          Student Feedback Portal
        </h1>
        <p className="text-gray-600 text-lg">We value your feedback and want to hear from you.</p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg shadow transition"
        >
          Give Feedback
        </button>
      </div>

      {/* Modal / Popup Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-2">
          <div className="bg-white w-full max-w-xl p-6 md:p-8 rounded-xl shadow-lg relative animate-fade-in">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
              Submit Your Feedback
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Course"
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
              />
              <input
                type="number"
                min={1}
                max={5}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Rating (1-5)"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
              />
              <textarea
                className="w-full border border-gray-300 rounded px-4 py-2 h-28 focus:ring-2 focus:ring-blue-400"
                placeholder="Comments"
                value={form.comments}
                onChange={(e) => setForm({ ...form, comments: e.target.value })}
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg shadow"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;

