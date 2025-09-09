import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function MyVotes() {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchVotes = async () => {
    setLoading(true);
    try {
      const res = await api.get("/votes/my");
      setVotes(res.data);
      console.log(res.data);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to fetch your votes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">
        <i className="fas fa-check-circle mr-2"></i>My Votes
      </h2>

      {loading ? (
        <p className="text-purple-600 font-semibold">Loading your votes...</p>
      ) : votes.length === 0 ? (
        <p className="text-gray-500">You haven’t voted in any elections yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {votes.map((vote) => (
            <div
              key={vote._id}
              className="border p-4 rounded-xl shadow hover:shadow-lg transition bg-purple-50"
            >
              <h3 className="font-semibold text-purple-700 flex items-center gap-2">
                <i className="fas fa-landmark"></i>
                {vote.election.title}
              </h3>
              <p className="text-purple-600 text-sm flex items-center gap-2 mt-2">
                <i className="fas fa-user"></i>
                Voted for: {vote.candidate.name}
              </p>
              <p className="text-purple-400 text-sm mt-1 flex items-center gap-2">
                <i className="fas fa-calendar-alt"></i>
                Date: {new Date(vote.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {errorMsg && (
        <div className="mt-6 p-3 bg-red-100 text-red-700 rounded flex items-center gap-2">
          <i className="fas fa-exclamation-circle"></i>
          {errorMsg}
        </div>
      )}
    </div>
  );
}
