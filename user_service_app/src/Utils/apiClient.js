import axios from "axios";

const isLocalhost =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

const baseURL =
  process.env.REACT_APP_API_URL ||
  (isLocalhost ? "https://localhost:7200/api" : "/api");

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const requestUrl = error.config?.url;
    if (!error.response && !axios.isCancel(error)) {
      window.dispatchEvent(new Event("api-server-down"));
    }

    if (
      error.response?.status === 401 &&
      !requestUrl?.includes("/Auth/login")
    ) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export const get = async (url, config = {}) => {
  const response = await api.get(url, config);
  return response.data;
};
export const post = async (url, data = {}, config = {}) => {
  const response = await api.post(url, data, config);
  return response.data;
};
export const put = async (url, data = {}, config = {}) => {
  const response = await api.put(url, data, config);
  return response.data;
};
export const del = async (url, config = {}) => {
  const response = await api.delete(url, config);
  return response.data;
};
export default api;
