import React from "react";

export default function DashboardHome() {
  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-white min-h-[80vh] rounded-2xl shadow-md">
      <h2 className="text-4xl font-extrabold text-purple-700 mb-4">
        Welcome to Your Dashboard 🎉
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Use the sidebar to navigate between <span className="font-medium text-purple-600">Voting</span>, 
        checking <span className="font-medium text-purple-600">Election Info</span>, viewing your <span className="font-medium text-purple-600">Votes</span>, 
        and seeing the <span className="font-medium text-purple-600">Results</span>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="p-6 bg-purple-100 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">Go Vote</h3>
          <p className="text-gray-700 text-sm">Cast your vote in active elections.</p>
        </div>
        <div className="p-6 bg-purple-100 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">Election Info</h3>
          <p className="text-gray-700 text-sm">Stay updated on election details.</p>
        </div>
        <div className="p-6 bg-purple-100 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">My Votes</h3>
          <p className="text-gray-700 text-sm">Review the votes you’ve already cast.</p>
        </div>
        <div className="p-6 bg-purple-100 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">Results</h3>
          <p className="text-gray-700 text-sm">Check live election results.</p>
        </div>
      </div>
    </div>
  );
}
