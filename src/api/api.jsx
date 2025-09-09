// src/api.js
import axios from "axios";

const baseURL = "http://localhost:3000/api";

const api = axios.create({
  baseURL,
  withCredentials: true, // IMPORTANT: sends/receives httpOnly cookie tokens
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
