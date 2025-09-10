// src/api.js
import axios from "axios";

const baseURL = "e-voting-system-backend.vercel.app";

const api = axios.create({
  baseURL,
  withCredentials: true, // IMPORTANT: sends/receives httpOnly cookie tokens
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
