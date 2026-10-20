import api from "./axios";

export const getProductsApi = async () => {
  return await api.get("/product/get-products");
};

export const getAllProductsApi = async () => {
  return await api.get("/product/get-products");
};

export const getSingleProductApi = async (slug) => {
  return await api.get(`/product/get-single-product/${slug}`);
};

export const getProductsByCategoryApi = async (categoryId) => {
  return await api.get(`/product/get-products-by-category/${categoryId}`);
};

export const getProductsByCollectionApi = async (collection) => {
  return await api.get(`/product/get-products-by-collection/${collection}`);
};

export const getTrendingProductsApi = async () => {
  return await api.get("/product/get-trending-products");
};

export const getNewProductsApi = async () => {
  return await api.get("/product/get-new-products");
};

export const getCategoriesApi = async () => {
  return await api.get("/product/get-category");
};
