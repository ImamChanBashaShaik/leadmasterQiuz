// src/api/api.js
import axios from "axios";

const API_BASE = "http://localhost:5000/api"; // backend URL

const api = axios.create({
  baseURL: API_BASE,
});

// helper to set/remove token
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

export default api;
