import api from "./axios";

export const getMeApi = async () => {
  const response = await api.get("/user/me");
  return response;
};

export const updateProfileApi = async (payload) => {
  const response = await api.put("/user/update-profile", payload);
  return response;
};
