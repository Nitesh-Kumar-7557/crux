import axios from "axios";

console.log("BACKEND_URL:", process.env.BACKEND_URL);

const serverApi = axios.create({
  baseURL: process.env.BACKEND_URL || "http://backend:4001",
  withCredentials: true,
});

export default serverApi;