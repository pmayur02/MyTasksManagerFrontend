import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL;

const API = axios.create({
  baseURL: baseURL,
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
