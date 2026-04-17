import axios from "axios";

const serverApi = axios.create({
  baseURL: process.env.SERVER_API_URL ?? "http://backend:4001",
  withCredentials: true,
});

export default serverApi;