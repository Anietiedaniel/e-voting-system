import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/register", { 
        name, 
        email, 
        role: "voter" 
      });

      setModalMessage(res.data.message);
      setModalVisible(true);

      setName("");
      setEmail("");

      setTimeout(() => {
        setModalVisible(false);
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl relative">
        <div className="flex justify-center mb-4">
          <i className="fas fa-user-plus text-purple-600 text-5xl"></i>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
          Voter Registration
        </h2>

        {error && (
          <div className="mb-4 text-center text-red-600 font-semibold flex items-center justify-center gap-2">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition flex items-center justify-center gap-2`}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already registered?{" "}
          <span
            className="text-purple-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>{" "}
          with your Access Code. Contact Admin if you don’t have one.
        </p>

        {/* Modal */}
        {modalVisible && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center relative">
              <div className="flex flex-col items-center">
                <div className="loader border-4 border-purple-300 border-t-4 border-t-purple-600 rounded-full w-12 h-12 mb-4 animate-spin"></div>
                <h3 className="text-purple-700 font-bold text-lg mb-2">Success!</h3>
                <p className="text-gray-700">{modalMessage}</p>
                <p className="mt-2 text-gray-500 text-sm">Redirecting to login...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Spinner CSS */}
      <style>{`
        .loader {
          border-top-color: #7c3aed;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
