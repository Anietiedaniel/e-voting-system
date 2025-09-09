// src/pages/admin/AccessCodes.js
import React, { useState, useEffect } from "react";
import api from "../../api/api";

export default function AccessCodes() {
  const [voters, setVoters] = useState([]);
  const [selectedVoters, setSelectedVoters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, message: "" });

  const fetchVoters = async () => {
    try {
      const res = await api.get("/admin");
      const voterList = res.data.filter((user) => user.role === "voter");
      setVoters(voterList);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVoters();
  }, []);

  const handleSelect = (id) => {
    setSelectedVoters((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleGenerateCodes = async () => {
    if (selectedVoters.length === 0) return;

    setLoading(true);
    setModal({ open: true, message: "Generating access codes..." });

    try {
      const res = await api.post("/admin/generate-access-codes", {
        voterIds: selectedVoters,
      });
      setModal({ open: true, message: res.data.message });
      setSelectedVoters([]);
      fetchVoters();
    } catch (err) {
      setModal({
        open: true,
        message: err.response?.data?.message || "Failed to generate codes",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
        Voter Access Codes
      </h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl shadow-md">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-6 py-3">Select</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Access Code</th>
            </tr>
          </thead>
          <tbody>
            {voters.map((voter) => (
              <tr key={voter._id} className="border-b hover:bg-purple-50 transition">
                <td className="px-6 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedVoters.includes(voter._id)}
                    onChange={() => handleSelect(voter._id)}
                    className="w-5 h-5"
                  />
                </td>
                <td className="px-6 py-3">{voter.name}</td>
                <td className="px-6 py-3">{voter.email}</td>
                <td className="px-6 py-3">
                  {voter.accessCode ? (
                    <span className="font-mono text-purple-700">{voter.accessCode}</span>
                  ) : (
                    <span className="text-gray-400">Not generated</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {voters.map((voter) => (
          <div
            key={voter._id}
            className="bg-white shadow rounded-2xl p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-purple-700">{voter.name}</h3>
              <input
                type="checkbox"
                checked={selectedVoters.includes(voter._id)}
                onChange={() => handleSelect(voter._id)}
                className="w-5 h-5"
              />
            </div>
            <p className="text-gray-600 text-sm">Email: {voter.email}</p>
            <p className="text-gray-600 text-sm font-mono">
              Access Code: {voter.accessCode || "Not generated"}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleGenerateCodes}
          disabled={selectedVoters.length === 0 || loading}
          className={`px-6 py-3 font-semibold rounded-2xl transition ${
            selectedVoters.length === 0 || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <i className="fas fa-spinner fa-spin"></i> Generating...
            </div>
          ) : (
            "Generate Access Codes"
          )}
        </button>
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4">{modal.message}</p>
            {!loading && (
              <button
                onClick={() => setModal({ open: false, message: "" })}
                className="px-4 py-2 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
