import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import VoterDashboard from "../pages/voters/VoterDashboard";
import VotingPage from "../pages/voters/ElectionPage";
import MyVotes from "../pages/voters/MyVotes";
import Results from "../pages/voters/Results";
import DashboardHome from "../pages/voters/DefaultTab"; // 👈 create this component

export const VoterRoutes = (
  <Route
    path="/voter"
    element={
      <ProtectedRoute roles={["voter"]}>
        <VoterDashboard />
      </ProtectedRoute>
    }
  >
    {/* ✅ Default tab (on /voter) */}
    <Route
      index
      element={
        <ProtectedRoute roles={["voter"]}>
          <DashboardHome />
        </ProtectedRoute>
      }
    />

    {/* Go Vote tab */}
    <Route
      path="go-vote/:electionId"
      element={
        <ProtectedRoute roles={["voter"]}>
          <VotingPage />
        </ProtectedRoute>
      }
    />

    {/* My Votes tab */}
    <Route
      path="my-votes"
      element={
        <ProtectedRoute roles={["voter"]}>
          <MyVotes />
        </ProtectedRoute>
      }
    />

    {/* Results tab */}
    <Route
      path="results"
      element={
        <ProtectedRoute roles={["voter"]}>
          <Results />
        </ProtectedRoute>
      }
    />
  </Route>
);
