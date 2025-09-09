// src/pages/admin/Results.js
import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Format date nicely
  const formatDate = (dateString, type) => {
    if (!dateString) return type === "start" ? "Not started" : "Not ended";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return type === "start" ? "Not started" : "Not ended";
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
      const elections = res.data.map((election) => {
        // Sort candidates by votes descending
        const sortedCandidates = [...(election.candidates || [])].sort((a, b) => (b.votes || 0) - (a.votes || 0));
        // Determine winner (candidate with highest votes)
        const winner = sortedCandidates.length ? sortedCandidates[0] : null;
        return { ...election, candidates: sortedCandidates, winner };
      });
      setResults(elections);
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
    <div className="md:p-4 pt-0">
      <h2 className="text-3xl font-bold text-purple-600 mb-6">Election Results</h2>

      {loading ? (
        <div className="text-gray-600">Loading results...</div>
      ) : (
        <div className="flex flex-col gap-6">
          {results.length === 0 && (
            <div className="text-gray-500">No elections found.</div>
          )}

          {results.map((election) => (
            <div
              key={election._id}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-purple-700 mb-3">
                {election.title}
              </h3>
              <p className="text-gray-500 mb-2">{election.description}</p>

              {/* Dates */}
              <p className="text-sm text-gray-400 mb-4">
                Start: {formatDate(election.startTime, "start")} | End:{" "}
                {formatDate(election.endTime, "end")}
              </p>

              {/* Winner (if election ended) */}
              {election.endTime && new Date() >= new Date(election.endTime) && election.winner && (
                <p className="text-green-600 font-bold mb-4 text-lg">
                  Winner: {election.winner.name || "N/A"} ({election.winner.party || "N/A"}) with {election.winner.votes || 0} votes
                </p>
              )}

              <div className="overflow-x-auto">
                <div className="min-w-[500px]">
                  <table className="w-full bg-gray-50 rounded-lg overflow-hidden text-sm sm:text-base">
                    <thead className="bg-purple-100 text-purple-700">
                      <tr>
                        <th className="py-2 px-4 text-left">Candidate</th>
                        <th className="py-2 px-4 text-left">Party</th>
                        <th className="py-2 px-4 text-left">Votes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {election.candidates.length === 0 ? (
                        <tr>
                          <td className="py-2 px-4 text-center" colSpan={3}>
                            No candidates found for this election
                          </td>
                        </tr>
                      ) : (
                        election.candidates.map((candidate) => (
                          <tr
                            key={candidate._id}
                            className={`border-b hover:bg-gray-100 transition ${
                              election.winner && election.winner._id === candidate._id
                                ? "bg-green-50 font-bold"
                                : ""
                            }`}
                          >
                            <td className="py-2 px-4">{candidate.name || "N/A"}</td>
                            <td className="py-2 px-4">{candidate.party || "N/A"}</td>
                            <td className="py-2 px-4">{candidate.votes != null ? candidate.votes : 0}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
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
