import axios from "axios";

const api = axios.create({
  baseURL: "https://leadcraft-ai.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;