import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response!.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const { data } = (await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/refresh`,
          {},
          {
            withCredentials: true,
          },
        )) as any;

        localStorage.setItem("access_token", data.access_token);

        original.headers.Authorization = `Bearer ${data.access_token}`;

        return axios(original);
      } catch (err) {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
