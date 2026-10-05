import api from "./axios";

export const registerApi = async (payload) => {
  const response = await api.post("/auth/register", payload);
  return response;
};

export const loginApi = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response;
};

export const logoutApi = async () => {
  const response = await api.post("/auth/logout");
  return response;
};

export const refreshTokenApi = async (refreshToken) => {
  const response = await api.post("/auth/refresh-token", { refreshToken });
  return response;
};

export const forgotPasswordApi = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response;
};

export const resetPasswordApi = async (token, password) => {
  const response = await api.post(`/auth/reset-password/${token}`, { password });
  return response;
};
