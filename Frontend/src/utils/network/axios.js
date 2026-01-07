import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

// Attach token automatically
Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Axios;
