import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username :admin */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Username</label>
            <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter username"
                className="w-full bg-transparent outline-none text-sm text-gray-700"
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password :admin123 */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Enter password"
                className="w-full bg-transparent outline-none text-sm text-gray-700"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

