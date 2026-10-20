import api from "./axios";

export const createOrderApi = async (orderData) => {
  return await api.post("/order/create-order", orderData);
};

export const getUserOrdersApi = async () => {
  return await api.get("/order/user-orders");
};

export const getSingleOrderApi = async (orderId) => {
  return await api.get(`/order/single-order/${orderId}`);
};

export const cancelOrderApi = async (orderId) => {
  return await api.delete(`/order/cancel-order/${orderId}`);
};

export const changeCODPaymentStatusApi = async (orderId, status = "PAID") => {
  return await api.patch(`/order/change-cod-payment-status/${orderId}`, {
    status,
  });
};

export const editOrderApi = async (orderId, orderData) => {
  return await api.put(`/order/edit-order/${orderId}`, orderData);
};
