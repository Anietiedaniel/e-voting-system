// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import RegistrationPage from "./pages/VotersRegistration";
import VoterLoginPage from "./pages/VoterLoginPage";
import AdminRegister from "./pages/AdminRegisterPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFound from "./pages/Notfound";

import { adminRoutes } from "./routes/AdminRoutes";
import { chairmanRoutes } from "./routes/chairmanRoutes";
import { VoterRoutes } from "./routes/VoterRoutes";

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<VoterLoginPage />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected routes */}
      {adminRoutes}
      {chairmanRoutes}
      {VoterRoutes}

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
