import React, { useEffect, useState } from "react";
import api from "../../api/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

export default function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchResults = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await api.get("/admin/results");
      const sortedResults = res.data.map((election) => {
        if (election.candidates && election.candidates.length > 0) {
          // Sort candidates by votes descending
          const sortedCandidates = [...election.candidates].sort(
            (a, b) => b.votes - a.votes
          );
          return { ...election, candidates: sortedCandidates };
        }
        return election;
      });
      setResults(sortedResults);
    } catch (err) {
      console.error("Error fetching results:", err);
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
        <i className="fas fa-chart-bar mr-2"></i>Election Results
      </h2>

      {loading && (
        <p className="text-purple-600 font-semibold">Loading results...</p>
      )}

      {!loading && results.length === 0 && (
        <p className="text-gray-500">No results available yet.</p>
      )}

      {!loading && results.length > 0 && (
        <div className="space-y-10">
          {results.map((election) => {
            const hasEnded = !election.isActive;
            const winner =
              hasEnded && election.candidates && election.candidates.length > 0
                ? election.candidates[0]
                : null;

            return (
              <div
                key={election._id}
                className="border p-4 rounded-xl shadow hover:shadow-lg transition bg-purple-50"
              >
                <h3 className="font-semibold text-xl text-purple-700 flex items-center gap-2 mb-4">
                  <i className="fas fa-landmark"></i>
                  {election.title}
                  {hasEnded && winner && (
                    <span className="ml-4 text-green-600 font-bold text-base">
                      Winner: {winner.name} ({winner.votes} votes)
                    </span>
                  )}
                </h3>

                {election.candidates && election.candidates.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      layout="vertical"
                      data={election.candidates}
                      margin={{ top: 10, right: 30, left: 50, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} />
                      <Tooltip />

                      <Bar
                        dataKey="votes"
                        fill="#6b21a8"
                        radius={[0, 8, 8, 0]}
                        label={{ position: "right", fill: "#4b5563" }}
                      >
                        <LabelList
                          dataKey="votes"
                          position="right"
                          fill="#111827"
                          fontSize={12}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-gray-500 mt-2">
                    No votes cast for this election yet.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {errorMsg && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded flex items-center gap-2">
          <i className="fas fa-exclamation-circle"></i>
          {errorMsg}
        </div>
      )}
    </div>
  );
}
