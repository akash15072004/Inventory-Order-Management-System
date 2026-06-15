import axios from "axios";

const api = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:8000"
      : "https://inventory-order-management-system-production123.up.railway.app",
});

export default api;