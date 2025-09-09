// src/pages/admin/MonitorSystem.js
import React, { useEffect, useState, useContext } from "react";
import api from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";

export default function MonitorSystem() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVotes: 0,
    totalElections: 0,
    users: [],
    votesByElection: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/monitor");
        console.log("Fetched stats:", res.data);

        // ✅ Sort users so admin & chairman come first
        const sortedUsers = [...res.data.users].sort((a, b) => {
          const rolesPriority = { admin: 1, chairman: 2, voter: 3 };
          return (rolesPriority[a.role] || 99) - (rolesPriority[b.role] || 99);
        });

        setStats({ ...res.data, users: sortedUsers });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch system statistics.");
        if (err.response && err.response.status === 401) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [logout]);

  return (
    <div className="md:p-4 pt-0">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">
        System Monitoring
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading statistics...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-purple-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                Total Users
              </h3>
              <p className="text-4xl font-bold text-purple-800">
                {stats.totalUsers}
              </p>
            </div>

            <div className="bg-purple-100 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">
                Total Elections
              </h3>
              <p className="text-4xl font-bold text-purple-900">
                {stats.totalElections}
              </p>
            </div>

            <div className="bg-purple-200 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                Total Votes Cast
              </h3>
              <p className="text-4xl font-bold text-purple-950">
                {stats.totalVotes}
              </p>
            </div>
          </div>

          {/* Votes by Election */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 mt-6">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              Votes by Election
            </h3>
            {stats.votesByElection?.length === 0 ? (
              <p className="text-gray-500">No elections found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full bg-gray-50 rounded-lg overflow-hidden text-sm sm:text-base">
                  <thead className="bg-purple-100 text-purple-700">
                    <tr>
                      <th className="py-2 px-4 text-left">S/N</th>
                      <th className="py-2 px-4 text-left">Election</th>
                      <th className="py-2 px-4 text-left">Votes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.votesByElection.map((election, index) => (
                      <tr
                        key={election.electionId}
                        className="border-b hover:bg-gray-100 transition"
                      >
                        <td className="py-2 px-4 font-medium">{index + 1}</td>
                        <td className="py-2 px-4">{election.electionTitle}</td>
                        <td className="py-2 px-4 font-bold text-purple-800">
                          {election.votes}
                        </td>
                      </tr>
                    ))}
                    {/* ✅ Total Row */}
                    <tr className="bg-purple-50 font-bold">
                      <td className="py-2 px-4" colSpan={2}>
                        Total
                      </td>
                      <td className="py-2 px-4 text-purple-900">
                        {stats.totalVotes}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Users Table */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 mt-6">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">Users</h3>
            {stats.users.length === 0 ? (
              <p className="text-gray-500">No users found.</p>
            ) : (
              <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                  <table className="w-full bg-gray-50 rounded-lg overflow-hidden text-sm sm:text-base">
                    <thead className="bg-purple-100 text-purple-700">
                      <tr>
                        <th className="py-2 px-4 text-left">S/N</th>
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 text-left">Email</th>
                        <th className="py-2 px-4 text-left">Role</th>
                        <th className="py-2 px-4 text-left">Voted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.users.map((user, index) => {
                        const notAllowed =
                          user.role === "admin" || user.role === "chairman";
                        return (
                          <tr
                            key={user._id}
                            className="border-b hover:bg-gray-100 transition"
                          >
                            <td className="py-2 px-4 font-medium">
                              {index + 1}
                            </td>
                            <td className="py-2 px-4">{user.name || "N/A"}</td>
                            <td className="py-2 px-4">{user.email || "N/A"}</td>
                            <td className="py-2 px-4 capitalize">
                              {user.role || "N/A"}
                            </td>
                            <td
                              className={`py-2 px-4 font-bold ${
                                notAllowed
                                  ? "text-gray-400 italic"
                                  : user.hasVoted
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {notAllowed
                                ? "Not Allowed"
                                : user.hasVoted
                                ? "Yes"
                                : "No"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
