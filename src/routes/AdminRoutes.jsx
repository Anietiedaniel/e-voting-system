// src/routes/adminRoutes.js
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AccessCodes from "../pages/admin/AccessCode";
import ManageVoters from "../pages/admin/VoterManagement";
import MonitorSystem from "../pages/admin/MonitorSystem"

import ResultsPage from "../pages/admin/ResultsPage";

export const adminRoutes = (

  <Route
    path="/admin"
    element={
      <ProtectedRoute roles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    }
  >

    <Route
      index
      element={
        <ProtectedRoute roles={["admin"]}>
          <ManageVoters />
        </ProtectedRoute>
      }
    />
    <Route
      path="access-codes"
      element={
        <ProtectedRoute roles={["admin"]}>
          <AccessCodes />
        </ProtectedRoute>
      }
    />

    <Route
    path="monitor-system"
    element={
      <ProtectedRoute roles={["admin"]}>
        <MonitorSystem />
      </ProtectedRoute>
    }
    />

    <Route
      path="results"
      element={
        <ProtectedRoute roles={["admin", "chairman"]}>
          <ResultsPage />
        </ProtectedRoute>
      }
    />
  </Route>
);
