// src/pages/admin/Voters.js
import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function ManageVoters() {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch all voters
  const fetchVoters = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await api.get("/admin");
      const voterList = res.data.filter((user) => user.role === "voter");
      setVoters(voterList);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to fetch voters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoters();
  }, []);

  // Delete a voter
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this voter?")) return;
    try {
      await api.delete(`/admin/voter/${id}`);
      setSuccessMsg("Voter deleted successfully!");
      fetchVoters();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to delete voter");
    }
  };

  // Update a voter
  const handleUpdate = async (voter) => {
    const newName = prompt("Enter new name:", voter.name);
    if (!newName) return;
    try {
      await api.put(`/admin/voter/${voter._id}`, { name: newName });
      setSuccessMsg("Voter updated successfully!");
      fetchVoters();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to update voter");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">Manage Voters</h2>

      {loading ? (
        <div className="text-gray-600">Loading voters...</div>
      ) : voters.length === 0 ? (
        <div className="text-gray-500">No voters found.</div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-purple-100 text-purple-700">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Access Code</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {voters.map((voter) => (
                  <tr key={voter._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-6">{voter.name}</td>
                    <td className="py-3 px-6">{voter.email}</td>
                    <td className="py-3 px-6 font-mono">{voter.accessCode || "-"}</td>
                    <td className="py-3 px-6 text-center flex justify-center gap-3">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                        onClick={() => handleUpdate(voter)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                        onClick={() => handleDelete(voter._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
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
                className="bg-white shadow rounded-lg p-4 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-purple-700">{voter.name}</h3>
                  <div className="flex gap-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleUpdate(voter)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(voter._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Email: {voter.email}</p>
                <p className="text-gray-600 text-sm font-mono">
                  Access Code: {voter.accessCode || "-"}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Success / Error Messages */}
      {successMsg && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">{successMsg}</div>
      )}
      {errorMsg && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">{errorMsg}</div>
      )}
    </div>
  );
}
