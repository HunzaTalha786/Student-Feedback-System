import React, { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [course, setCourse] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/feedback?course=${course}&page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(res.data.feedbacks);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch feedbacks");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [course, page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Feedback deleted");
      fetchFeedbacks();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-700 mb-10 tracking-wide">
          Admin Dashboard
        </h1>

        {/* Search Input */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="🔍 Search by course..."
            value={course}
            onChange={(e) => {
              setCourse(e.target.value);
              setPage(1);
            }}
            className="px-4 py-3 w-full max-w-md border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {[
            { title: "Total Feedbacks", value: total },
            { title: "Filtered Course", value: course || "All" },
            { title: "Current Page", value: page },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all text-center transform hover:scale-105 duration-200"
            >
              <p className="text-gray-500 text-base font-medium mb-1">{card.title}</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">{card.value}</h2>
            </div>
          ))}
        </div>

       {/* Desktop Table View (shown on sm and above) */}
<div className="hidden sm:block w-full">
  <div className="overflow-x-auto rounded-2xl shadow-md bg-white">
    <table className="min-w-[700px] w-full text-sm text-left text-gray-700">
      <thead className="bg-blue-600 text-white text-sm sm:text-base">
        <tr>
          <th className="p-4">Name</th>
          <th className="p-4">Email</th>
          <th className="p-4">Course</th>
          <th className="p-4">Rating</th>
          <th className="p-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {feedbacks.map((f, idx) => (
          <tr
            key={f._id}
            className={`${
              idx % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-gray-100 transition-colors`}
          >
            <td className="p-4">{f.name}</td>
            <td className="p-4">{f.email}</td>
            <td className="p-4">{f.course}</td>
            <td className="p-4">{f.rating}</td>
            <td className="p-4">
              <button
                onClick={() => handleDelete(f._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        {feedbacks.length === 0 && (
          <tr>
            <td colSpan="5" className="p-6 text-center text-gray-500 italic">
              No feedback found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
{/* Mobile Card View (below sm) */}
<div className="block sm:hidden space-y-4">
  {feedbacks.length === 0 ? (
    <div className="bg-white rounded-xl p-4 shadow text-center text-gray-500 italic">
      No feedback found.
    </div>
  ) : (
    feedbacks.map((f) => (
      <div
        key={f._id}
        className="bg-white rounded-xl p-4 shadow-md space-y-3 border border-gray-100"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-blue-600">Feedback</h3>
          <span className="text-sm text-gray-500">{f.rating}⭐</span>
        </div>

        <div className="text-sm space-y-2">
          <div>
            <p className="text-gray-400 font-medium">Name</p>
            <p className="text-gray-800 font-semibold">{f.name}</p>
          </div>
          <div>
            <p className="text-gray-400 font-medium">Email</p>
            <p className="text-gray-800">{f.email}</p>
          </div>
          <div>
            <p className="text-gray-400 font-medium">Course</p>
            <p className="text-gray-800">{f.course}</p>
          </div>
        </div>

        <div className="pt-3">
          <button
            onClick={() => handleDelete(f._id)}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm transition"
          >
            Delete
          </button>
        </div>
      </div>
    ))
  )}
</div>



        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 text-sm text-gray-600 font-medium gap-3 sm:gap-0">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50 transition"
          >
            ⬅ Prev
          </button>
          <span>
            Page {page} of {Math.ceil(total / limit)}
          </span>
          <button
            disabled={page >= total / limit}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50 transition"
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
