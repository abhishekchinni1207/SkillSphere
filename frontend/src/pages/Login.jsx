import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, form);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("session", JSON.stringify(res.data.session));
        alert("🎉 Login successful!");
        navigate("/courses");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-50">
      <div className="bg-white border border-pink-100 p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700 drop-shadow-sm">
          Welcome Back 👋
        </h2>

        {/* Error Message */}
        {error && (
          <p className="bg-pink-100 text-pink-700 border border-pink-200 p-2 rounded-lg mb-4 text-center text-sm shadow-sm">
            {error}
          </p>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-yellow-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-yellow-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-pink-500 text-white py-2 rounded-lg shadow-md hover:shadow-lg hover:from-pink-500 hover:to-blue-600 transition-all disabled:opacity-60 font-semibold"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-center mt-6 text-gray-700">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-pink-600 font-medium hover:underline cursor-pointer transition-colors"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
