// src/pages/chairman/ManageCandidates.js
import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function ManageCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Form state
  const [newName, setNewName] = useState("");
  const [newParty, setNewParty] = useState("");
  const [selectedElection, setSelectedElection] = useState("");

  // Fetch candidates and elections
  const fetchData = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const [candidatesRes, electionsRes] = await Promise.all([
        api.get("/candidates"),
        api.get("/elections"),
      ]);
      setCandidates(candidatesRes.data);
      setElections(electionsRes.data);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create candidate
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newName || !selectedElection)
      return setErrorMsg("Name and Election are required");

    try {
      await api.post("/candidates", {
        name: newName,
        party: newParty,
        electionId: selectedElection,
      });
      setSuccessMsg("Candidate created successfully!");
      setNewName("");
      setNewParty("");
      setSelectedElection("");
      fetchData();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to create candidate");
    }
  };

  // Update candidate
  const handleUpdate = async (candidate) => {
    const updatedName = prompt("Enter new name:", candidate.name);
    if (!updatedName) return;
    const updatedParty = prompt("Enter new party:", candidate.party);
    try {
      await api.put(`/candidates/${candidate._id}`, {
        name: updatedName,
        party: updatedParty,
      });
      setSuccessMsg("Candidate updated successfully!");
      fetchData();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to update candidate");
    }
  };

  // Delete candidate
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this candidate?"))
      return;
    try {
      await api.delete(`/candidates/${id}`);
      setSuccessMsg("Candidate deleted successfully!");
      fetchData();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to delete candidate");
    }
  };

  return (
    <div className="md:p-4 pt-0 min-w-0">
      <h2 className="text-3xl font-bold text-purple-600 mb-6">
        Manage Candidates
      </h2>

      {/* Create Candidate Form */}
      <form
        onSubmit={handleCreate}
        className="bg-white p-5 rounded-lg shadow-md mb-6 max-w-lg w-full mx-auto sm:mx-0"
      >
        <h3 className="text-xl font-bold mb-3 text-gray-700">
          Add New Candidate
        </h3>
        <input
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Candidate Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Party"
          value={newParty}
          onChange={(e) => setNewParty(e.target.value)}
        />
        <select
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={selectedElection}
          onChange={(e) => setSelectedElection(e.target.value)}
        >
          <option value="">Select Election</option>
          {elections.map((el) => (
            <option key={el._id} value={el._id}>
              {el.title}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-purple-500 text-white p-2 rounded w-full sm:w-auto hover:bg-purple-600 transition"
        >
          Add Candidate
        </button>
      </form>

      {/* Candidates Table */}
      {loading ? (
        <div className="text-gray-600 text-center">Loading candidates...</div>
      ) : (
        <div className="overflow-x-auto w-full">
          <div className="min-w-[600px]">
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden text-sm sm:text-base">
              <thead className="bg-purple-100 text-purple-700">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Party</th>
                  <th className="py-3 px-4 text-left">Election</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr
                    key={candidate._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-2 px-4">{candidate.name}</td>
                    <td className="py-2 px-4">{candidate.party}</td>
                    <td className="py-2 px-4">
                      {candidate.election?.title || "-"}
                    </td>
                    <td className="py-2 px-4 text-center flex justify-center gap-3 sm:gap-6 flex-wrap">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                        onClick={() => handleUpdate(candidate)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                        onClick={() => handleDelete(candidate._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {candidates.length === 0 && (
              <div className="text-gray-500 mt-4 text-center">
                No candidates found.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Messages */}
      {successMsg && (
        <div className="mt-4 p-3 bg-purple-100 text-purple-700 rounded-lg text-center">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
          {errorMsg}
        </div>
      )}
    </div>
  );
}
