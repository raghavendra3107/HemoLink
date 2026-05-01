"use client";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LoginBackground from "../../components/LoginBackground";
import { API } from "../../config.js";


export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (!res.ok) {
        // 🔒 Handle facility waiting approval or rejected cases
        if (data.message?.includes("awaiting admin approval")) {
          setError("Your account is awaiting admin approval. Please wait for confirmation.");
          return;
        }
        if (data.message?.includes("rejected")) {
          setError("Your registration has been rejected by admin.");
          return;
        }

        throw new Error(data.message || "Login failed");
      }

      // ✅ Save token and role from response
      const role = data.user?.role || "unknown";
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);

      // ✅ Redirect based on backend response or fallback
      const targetPath =
        data.redirect ||
        (role === "donor"
          ? "/donor"
          : role === "hospital"
          ? "/hospital"
          : role === "blood-lab"
          ? "/lab"
          : role === "admin"
          ? "/admin"
          : "/");

      // ✅ Navigate to the dashboard or home
      navigate(targetPath, { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden">
      <LoginBackground />
      <Header />
      <div className="bg-black/40 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20 relative z-10">
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Login to HemoLink
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Access your donor, hospital, or lab dashboard
        </p>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4 flex items-center">
            <span className="mr-2">⚠</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-red-600/30"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300 text-sm font-medium mb-3">Don't have an account? Sign Up Below</p>
          <div className="flex flex-col gap-3">
            <Link
              to="/register/donor"
              className="w-full py-2.5 bg-red-500/20 text-red-100 border border-red-500/30 rounded-lg font-semibold hover:bg-red-500/40 transition"
            >
              Sign up as Donor
            </Link>
            <Link
              to="/register/facility"
              className="w-full py-2.5 bg-blue-500/20 text-blue-100 border border-blue-500/30 rounded-lg font-semibold hover:bg-blue-500/40 transition"
            >
              Sign up as Facility
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
