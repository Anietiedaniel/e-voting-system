// src/pages/VotingPage.js
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../contexts/AuthContext";

export default function VotingPage() {
  const { id } = useParams();
  const [election, setElection] = useState(null);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/elections/${id}`);
        setElection(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  const cast = async () => {
    if (!selected) return setError("Please select a candidate");
    try {
      await api.post("/votes", { electionId: id, candidateId: selected });
      navigate("/votes/confirmation");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to cast vote");
    }
  };

  if (!election) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600 animate-pulse">Loading election...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <i className="fas fa-vote-yea text-blue-600 text-4xl mb-3"></i>
          <h1 className="text-2xl font-bold text-gray-800">{election.title}</h1>
          <p className="text-gray-500 text-sm">{election.description}</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Candidate List */}
        <div>
          <h2 className="font-semibold text-lg text-gray-700 mb-3 flex items-center gap-2">
            <i className="fas fa-users"></i> Candidates
          </h2>
          <ul className="space-y-3">
            {election.candidates?.map((c) => (
              <li
                key={c._id}
                className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition ${
                  selected === c._id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => setSelected(c._id)}
              >
                <div>
                  <div className="font-medium text-gray-800">{c.name}</div>
                  <div className="text-sm text-gray-500">{c.party}</div>
                </div>
                <input
                  type="radio"
                  name="candidate"
                  checked={selected === c._id}
                  onChange={() => setSelected(c._id)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            onClick={cast}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <i className="fas fa-paper-plane"></i>
            Submit Vote
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          Secure & confidential voting powered by{" "}
          <span className="font-semibold text-blue-600">eVoting</span>
        </p>
      </div>
    </div>
  );
}
