// src/routes/chairmanRoutes.js
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import ChairmanDashboard from "../pages/chairman/ChairmanDashboard";
import ManageCandidates from "../pages/chairman/Candidates";
import ManageElections from "../pages/chairman/ElectionManagement";
import ResultsPage from "../pages/chairman/ResultPage";
export const chairmanRoutes = (

  <Route
    path="/chairman"
    element={
      <ProtectedRoute roles={["chairman"]}>
        <ChairmanDashboard />
      </ProtectedRoute>
    }
  >

    <Route
      index
      element={
        <ProtectedRoute roles={["chairman"]}>
          <ManageElections />
        </ProtectedRoute>
      }
    />
    <Route
      path="candidates"
      element={
        <ProtectedRoute roles={["chairman"]}>
          <ManageCandidates />
        </ProtectedRoute>
      }
    />

    <Route
      path="results"
      element={
        <ProtectedRoute roles={["chairman", "chairman"]}>
          <ResultsPage />
        </ProtectedRoute>
      }
    />
  </Route>
);
