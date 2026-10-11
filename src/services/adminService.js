import api from "./axios";

// Product & Category APIs
export const getAllProductsApi = async () => {
  return await api.get("/product/get-products");
};

export const getProductStatsApi = async () => {
  return await api.get("/product/product-stats");
};

export const getCategoriesApi = async () => {
  return await api.get("/product/get-category");
};

export const createCategoryApi = async (categoryData) => {
  return await api.post("/product/create-category", categoryData);
};

export const createProductApi = async (productData) => {
  return await api.post("/product/create-product", productData);
};

export const editProductApi = async (id, productData) => {
  return await api.put(`/product/edit-product/${id}`, productData);
};

export const deleteProductApi = async (id) => {
  return await api.delete(`/product/delete-product/${id}`);
};

export const markTrendingApi = async (id) => {
  return await api.put(`/product/mark-trending/${id}`);
};

export const markNewArrivalApi = async (id) => {
  return await api.put(`/product/mark-new/${id}`);
};

export const getSingleProductBySlugApi = async (slug) => {
  return await api.get(`/product/get-single-product/${slug}`);
};

// Order APIs
export const getAllOrdersApi = async () => {
  return await api.get("/order/all-orders");
};

export const getOrderStatsApi = async () => {
  return await api.get("/order/order-stats");
};

export const getSingleOrderApi = async (id) => {
  return await api.get(`/order/single-order/${id}`);
};

export const changeOrderStatusApi = async (id, status) => {
  return await api.patch(`/order/change-order-status/${id}`, { status });
};

export const cancelOrderApi = async (id) => {
  return await api.delete(`/order/cancel-order/${id}`);
};

export const editOrderApi = async (id, payload) => {
  return await api.put(`/order/edit-order/${id}`, payload);
};

// Revenue APIs
export const getRevenueStatsApi = async () => {
  return await api.get("/revenue/stats");
};

export const getAllPaymentsApi = async () => {
  return await api.get("/revenue/all-payments");
};
