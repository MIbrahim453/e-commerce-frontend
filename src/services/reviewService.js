import api from "./axios";

export const getProductReviewsApi = async (productId) => {
  return await api.get(`/review/product/${productId}`);
};

export const createReviewApi = async (productId, reviewData) => {
  return await api.post(`/review/add/${productId}`, reviewData);
};

export const updateReviewApi = async (reviewId, reviewData) => {
  return await api.put(`/review/edit/${reviewId}`, reviewData);
};

export const deleteReviewApi = async (reviewId) => {
  return await api.delete(`/review/delete/${reviewId}`);
};

export const getUserReviewsApi = async () => {
  return await api.get("/review/my-reviews");
};
