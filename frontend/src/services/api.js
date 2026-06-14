import axios from "axios";

const api = axios.create({
  baseURL:
    "https://inventory-order-management-system-production-458d.up.railway.app",
});

export default api;