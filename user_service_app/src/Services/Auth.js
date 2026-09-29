import { post } from "../Utils/apiClient";

const AUTH_LOGIN_URL = "/Auth/login";
export const login = async (email, password) => {
  const response = await post(AUTH_LOGIN_URL, {
    email,
    password,
  });
  if (response.token) {
    sessionStorage.setItem("token", response.token);
  }
  if (response.user) {
    sessionStorage.setItem("user", JSON.stringify(response.user));
  }
  return response;
};

export const logout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  window.location.href = "/";
};

export const getToken = () => {
  return sessionStorage.getItem("token");
};

export const getCurrentUser = () => {
  const user = sessionStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!sessionStorage.getItem("token");
};
