// src/pages/chairman/ManageElections.js
import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function ManageElections() {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Fetch elections
  const fetchElections = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await api.get("/elections");
      setElections(res.data);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to fetch elections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  // Create election
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle) return setErrorMsg("Title is required");
    try {
      await api.post("/elections", { title: newTitle, description: newDescription });
      setSuccessMsg("Election created successfully!");
      setNewTitle("");
      setNewDescription("");
      fetchElections();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to create election");
    }
  };

  // Update election
  const handleUpdate = async (election) => {
    const updatedTitle = prompt("Enter new title:", election.title);
    if (!updatedTitle) return;
    const updatedDescription = prompt("Enter new description:", election.description);
    try {
      await api.put(`/elections/${election._id}`, {
        title: updatedTitle,
        description: updatedDescription,
      });
      setSuccessMsg("Election updated successfully!");
      fetchElections();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to update election");
    }
  };

  // Start election
  const handleStart = async (id) => {
    try {
      await api.put(`/elections/${id}/activate`, { startTime: new Date() });
      setSuccessMsg("Election started successfully!");
      fetchElections();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to start election");
    }
  };

  // End election
  const handleEnd = async (id) => {
    try {
      await api.put(`/elections/${id}/end`, { endTime: new Date() });
      setSuccessMsg("Election ended successfully!");
      fetchElections();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to end election");
    }
  };

  // Delete election
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this election?")) return;
    try {
      await api.delete(`/elections/${id}`);
      setSuccessMsg("Election deleted successfully!");
      fetchElections();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to delete election");
    }
  };

  // Helper: get status text
  const getStatus = (election) => {
    if (election.endTime) return "Ended";
    if (election.startTime) return "Active";
    return "Not Started";
  };

  return (
    <div className="md:p-4 pt-0 min-w-0">
      <h2 className="text-3xl font-bold text-purple-600 mb-6">Manage Elections</h2>

      {/* Create Election Form */}
      <form
        onSubmit={handleCreate}
        className="bg-white p-5 rounded-lg shadow-md mb-6 max-w-lg w-full mx-auto sm:mx-0"
      >
        <h3 className="text-xl font-bold mb-3 text-gray-700">Create New Election</h3>
        <input
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-purple-500 text-white p-2 rounded w-full sm:w-auto hover:bg-purple-600 transition"
        >
          Create Election
        </button>
      </form>

      {/* Elections Table */}
      {loading ? (
        <div className="text-gray-600 text-center">Loading elections...</div>
      ) : (
        <div className="overflow-x-auto w-full">
          <div className="min-w-[600px]">
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden text-sm sm:text-base">
              <thead className="bg-purple-100 text-purple-700">
                <tr>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {elections.map((election) => (
                  <tr key={election._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-2 px-4">{election.title}</td>
                    <td className="py-2 px-4">{election.description}</td>
                    <td className="py-2 px-4 font-semibold">{getStatus(election)}</td>
                    <td className="py-2 px-4 text-center flex justify-center gap-3 sm:gap-6 flex-wrap">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                        onClick={() => handleUpdate(election)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>

                      {!election.startTime && !election.endTime && (
                        <button
                          className="text-green-600 hover:text-green-800"
                          title="Start Election"
                          onClick={() => handleStart(election._id)}
                        >
                          <i className="fas fa-play"></i>
                        </button>
                      )}

                      {election.startTime && !election.endTime && (
                        <button
                          className="text-red-600 hover:text-red-800"
                          title="End Election"
                          onClick={() => handleEnd(election._id)}
                        >
                          <i className="fas fa-stop"></i>
                        </button>
                      )}

                      <button
                        className="text-gray-600 hover:text-black"
                        title="Delete"
                        onClick={() => handleDelete(election._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {elections.length === 0 && (
              <div className="text-gray-500 mt-4 text-center">No elections found.</div>
            )}
          </div>
        </div>
      )}

      {/* Messages */}
      {successMsg && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">{successMsg}</div>
      )}
      {errorMsg && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">{errorMsg}</div>
      )}
    </div>
  );
}
