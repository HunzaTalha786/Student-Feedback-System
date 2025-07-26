// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // Add token to headers
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// export default API;
import axios from "axios";

const API = axios.create({
  baseURL: "https://student-feedback-system-backend.vercel.app/", // ✅ Replace with your actual backend URL
  withCredentials: true, // ✅ Only needed if using cookies (safe to include)
});

// Add JWT token to headers if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
