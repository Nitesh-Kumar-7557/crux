import axios from "axios";

const serverApi = axios.create({
  // baseURL: "http://backend:4001",    // For production
  baseURL: "http://localhost:8000",     // For development
  withCredentials: true,
});

export default serverApi;