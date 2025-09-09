// src/pages/admin/Results.js
import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Fetch election results
  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/results");
      setResults(res.data);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">
        Election Results
      </h2>

      {loading ? (
        <div className="text-gray-600">Loading results...</div>
      ) : results.length === 0 ? (
        <div className="text-gray-500">No elections found.</div>
      ) : (
        <div className="flex flex-col gap-6">
          {results.map((election) => {
            // sort candidates by votes (descending)
            const sortedCandidates = [...election.candidates].sort(
              (a, b) => b.votes - a.votes
            );

            // check if election ended
            const electionEnded =
              election.endTime && new Date(election.endTime) < new Date();

            // winner is first in sorted list
            const winner = sortedCandidates.length > 0 ? sortedCandidates[0] : null;

            return (
              <div
                key={election._id}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-purple-700 mb-2">
                  {election.title}
                </h3>
                {election.description && (
                  <p className="text-gray-600 mb-3">{election.description}</p>
                )}

                <p className="text-sm text-gray-400 mb-4">
                  Start: {formatDate(election.startTime)} | End:{" "}
                  {formatDate(election.endTime)}
                </p>

                {/* Winner Message */}
                {electionEnded && winner && (
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg font-semibold flex items-center gap-2">
                    🏆 Winner: {winner.name} ({winner.party || "Independent"}) with{" "}
                    {winner.votes} votes
                  </div>
                )}

                {/* Responsive Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-gray-50 rounded-lg overflow-hidden">
                    <thead className="bg-purple-100 text-purple-700">
                      <tr>
                        <th className="py-2 px-4 text-left">Candidate</th>
                        <th className="py-2 px-4 text-left">Party</th>
                        <th className="py-2 px-4 text-left">Votes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedCandidates.map((candidate, index) => (
                        <tr
                          key={candidate._id}
                          className={`border-b transition ${
                            index === 0
                              ? "bg-purple-50 font-bold text-purple-700"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <td className="py-2 px-4 flex items-center gap-2">
                            {index === 0 && <span>🏆</span>}
                            {candidate.name}
                          </td>
                          <td className="py-2 px-4">{candidate.party || "-"}</td>
                          <td className="py-2 px-4">{candidate.votes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {errorMsg && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {errorMsg}
        </div>
      )}
    </div>
  );
}
