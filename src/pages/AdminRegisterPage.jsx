import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function AdminRegister() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "admin" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await api.post("/auth/register", formData);
      setSuccessMsg(res.data.message || "Registration successful!");
      setFormData({ name: "", email: "", password: "", role: "admin" });
      setTimeout(() => navigate("/admin/login"), 3000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <i className="fas fa-user-shield text-purple-600 text-5xl"></i>
        </div>

        <h1 className="text-3xl font-bold text-purple-700 text-center mb-6">
          Register Admin / Chairman
        </h1>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
            <i className="fas fa-exclamation-circle"></i>
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 bg-purple-100 text-purple-700 rounded-lg flex items-center gap-2">
            <i className="fas fa-check-circle"></i>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="admin">Admin</option>
            <option value="chairman">Chairman</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full px-4 py-2 rounded-xl font-semibold text-white transition flex items-center justify-center gap-2 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Registering...
              </>
            ) : (
              "Register"
            )}
          </button>

          <div className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <span
              className="text-purple-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/admin/login")}
            >
              Login here
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
