// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // On mount, fetch current user (backend reads cookie)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoadingAuth(true);
        const res = await api.get("/auth/getme");
        // backend may return { user: {...} } or just {...}
        setUser(res.data.user || res.data || null);
      } catch (err) {
        setUser(null);
      } finally {
        setLoadingAuth(false);
      }
    };
    fetchUser();
  }, []);

  // Admin login (email + password)
  const adminLogin = async (email, password) => {
    try {
      await api.post("/auth/login", { email, password });
      const me = await api.get("/auth/getme");
      setUser(me.data.user || me.data);
      return me.data.user || me.data;
    } catch (err) {
      throw err.response?.data?.message || "Admin login failed";
    }
  };

  // Voter login (access code)
  const voterLogin = async (accessCode) => {
    try {
      await api.post("/auth/voter-login", { accessCode });
      const me = await api.get("/auth/getme");
      setUser(me.data.user || me.data);
      return me.data.user || me.data;
    } catch (err) {
      throw err.response?.data?.message || "Voter login failed";
    }
  };

  // Logout (backend clears cookie)
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      // ignore backend errors for logout
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loadingAuth, adminLogin, voterLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
