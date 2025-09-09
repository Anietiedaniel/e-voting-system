// src/pages/VoteConfirmation.js
import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function VoteConfirmation(){
  const [vote, setVote] = useState(null);

  useEffect(()=>{
    const load = async ()=>{
      try {
        const res = await api.get("/votes/confirmation");
        setVote(res.data.vote);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  if (!vote) return <div className="p-6">Loading confirmation...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-xl font-semibold">Vote Confirmed</h1>
        <p className="mt-2">You voted for <strong>{vote.candidate.name}</strong> ({vote.candidate.party})</p>
        <p className="text-sm text-gray-500 mt-2">Election: {vote.election.title}</p>
      </div>
    </div>
  );
}
