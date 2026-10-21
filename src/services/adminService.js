import api from "./axios";

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

export const editCategoryApi = async (id, categoryData) => {
  return await api.put(`/product/edit-category/${id}`, categoryData);
};

export const deleteCategoryApi = async (id) => {
  return await api.delete(`/product/delete-category/${id}`);
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

export const markTrendingApi = async (id, status) => {
  return await api.put(`/product/mark-trending/${id}`, { status });
};

export const markNewArrivalApi = async (id, status) => {
  return await api.put(`/product/mark-new/${id}`, { status });
};

export const updateProductDiscountApi = async (id, discount) => {
  return await api.put(`/product/update-discount/${id}`, { discount });
};

export const getSingleProductBySlugApi = async (slug) => {
  return await api.get(`/product/get-single-product/${slug}`);
};

export const getSingleProductApi = async (idOrSlug) => {
  return await api.get(`/product/get-single-product/${idOrSlug}`);
};

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

export const changeCODPaymentStatusApi = async (id, status = "PAID") => {
  return await api.patch(`/order/change-cod-payment-status/${id}`, { status });
};

export const cancelOrderApi = async (id) => {
  return await api.delete(`/order/cancel-order/${id}`);
};

export const editOrderApi = async (id, payload) => {
  return await api.put(`/order/edit-order/${id}`, payload);
};

export const getRevenueStatsApi = async () => {
  return await api.get("/revenue/stats");
};

export const getAllPaymentsApi = async () => {
  return await api.get("/revenue/all-payments");
};

// ── User Management (Admin) ──

export const getAllUsersApi = async () => {
  return await api.get("/user/all-users");
};

export const getUserStatsApi = async () => {
  return await api.get("/user/stats");
};

export const createUserApi = async (userData) => {
  return await api.post("/user/create", userData);
};

export const updateUserApi = async (id, userData) => {
  return await api.put(`/user/update/${id}`, userData);
};

export const deleteUserApi = async (id) => {
  return await api.delete(`/user/delete/${id}`);
};

export const changeUserRoleApi = async (id, role) => {
  return await api.patch(`/user/change-role/${id}`, { role });
};
