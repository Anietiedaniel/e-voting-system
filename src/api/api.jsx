// src/api.js
import axios from "axios";

const baseURL = "https://e-voting-system-backend-2.onrender.com/api";


const api = axios.create({
  baseURL,
  withCredentials: true, // IMPORTANT: sends/receives httpOnly cookie tokens
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
