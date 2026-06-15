import axios from "axios";

const api = axios.create({
  baseURL:
    "https://inventory-order-management-system-production-0b40.up.railway.app",
});

export default api;