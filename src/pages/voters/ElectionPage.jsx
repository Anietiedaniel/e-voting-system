// src/pages/voter/VotingPage.js
import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function VotingPage() {
  const [elections, setElections] = useState([]);
  const [candidatesMap, setCandidatesMap] = useState({});
  const [votedMap, setVotedMap] = useState({}); // Track votes per election
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch elections, candidates, and user votes
  const fetchElectionData = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      // Get all active elections
      const electionRes = await api.get(`/elections/active`);
      const activeElections = electionRes.data;

      if (!activeElections || activeElections.length === 0) {
        setErrorMsg("No active elections found.");
        setLoading(false);
        return;
      }

      setElections(activeElections);

      // Fetch candidates for each election
      const candidatesData = {};
      for (const election of activeElections) {
        const candidatesRes = await api.get(`/candidates/${election._id}`);
        candidatesData[election._id] = candidatesRes.data;
      }
      setCandidatesMap(candidatesData);

      // Fetch user’s votes
      const votesRes = await api.get("/votes/my");
      const votes = votesRes.data; // Array of { election, candidate }
      const voteMap = {};
      votes.forEach((v) => {
        voteMap[v.election._id] = v.candidate._id;
      });
      setVotedMap(voteMap);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to load elections");
    } finally {
      setLoading(false);
    }
  };

  // Cast vote
  const handleVote = async (candidateId, electionId) => {
    if (!window.confirm("Are you sure you want to vote for this candidate?")) return;
    try {
      await api.post("/votes", { candidateId, electionId });
      setVotedMap((prev) => ({ ...prev, [electionId]: candidateId }));
      setSuccessMsg("Vote cast successfully!");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to cast vote");
    }
  };

  useEffect(() => {
    fetchElectionData();
  }, []);

  if (loading)
    return <div className="p-6 text-purple-600 font-semibold">Loading elections...</div>;

  if (elections.length === 0)
    return <div className="p-6 text-red-600">{errorMsg || "No elections available."}</div>;

  return (
    <div className="p-6 space-y-10">
      {elections.map((election) => (
        <div key={election._id} className="mb-8">
          {/* Election Header */}
          <div className="mb-6 bg-purple-100 p-6 rounded-2xl shadow-md">
            <h2 className="text-3xl font-bold text-purple-700 mb-2">{election.title}</h2>
            <p className="text-gray-700 mb-3">{election.description}</p>
            <p className="text-sm">
              Status:{" "}
              <span
                className={
                  election.isActive
                    ? "text-purple-700 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {election.isActive ? "Active" : "Ended"}
              </span>
            </p>
          </div>

          {/* Candidates */}
          {(!candidatesMap[election._id] || candidatesMap[election._id].length === 0) ? (
            <p className="text-gray-500">No candidates available for this election.</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {candidatesMap[election._id].map((c) => (
                <div
                  key={c._id}
                  className="p-4 border rounded-xl shadow hover:shadow-lg flex flex-col items-center transition bg-white"
                >
                  <img
                    src={c.photo || "https://dummyimage.com/100x100/7e5bef/ffffff&text=Candidate"}
                    alt={c.name}
                    className="w-24 h-24 rounded-full mb-3 object-cover border-2 border-purple-200"
                  />
                  <h4 className="text-lg font-semibold text-purple-700">{c.name}</h4>
                  <p className="text-purple-500 text-sm mb-3">{c.party}</p>

                  {votedMap[election._id] === c._id ? (
                    <p className="text-purple-700 font-semibold">
                      ✅ You voted for {c.name}
                    </p>
                  ) : votedMap[election._id] ? (
                    <p className="text-gray-400 text-sm italic">
                      You have already voted in this election
                    </p>
                  ) : (
                    <button
                      onClick={() => handleVote(c._id, election._id)}
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                      disabled={!election.isActive}
                    >
                      Vote
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Messages */}
      {successMsg && (
        <div className="mt-6 p-3 bg-purple-100 text-purple-700 rounded text-center">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="mt-6 p-3 bg-red-100 text-red-700 rounded text-center">{errorMsg}</div>
      )}
    </div>
  );
}
