import axios from "axios";
import { getToken } from "./auth.service";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const api = axios.create({ baseURL: BASE_URL, timeout: 10000 });

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
