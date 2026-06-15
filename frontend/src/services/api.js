import axios from "axios";

const api = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:8000"
      : "https://inventory-order-management-system1-41dk.onrender.com",
});

export default api;