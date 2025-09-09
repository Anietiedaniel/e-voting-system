import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function VoterLoginPage() {
  const { voterLogin } = useContext(AuthContext);
  const [code, setCode] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await voterLogin(code);
      navigate("/voter");
    } catch (error) {
      setErr(error?.response?.data?.message || "Invalid access code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md relative">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <i className="fas fa-vote-yea text-purple-600 text-5xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-purple-700">Voter Login</h1>
          <p className="text-gray-500 text-sm mt-1">
            Enter your unique <span className="font-semibold text-purple-600">Access Code</span>
          </p>
        </div>

        {/* Error Message */}
        {err && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4 text-sm flex items-center gap-2">
            <i className="fas fa-exclamation-circle"></i> {err}
          </div>
        )}

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Access Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your code"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-white transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Entering...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i> Enter
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?{" "}
          <span
            className="text-purple-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}
