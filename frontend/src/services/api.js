import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  baeURL : "http://localhost:5176/signup",
});

export default api;