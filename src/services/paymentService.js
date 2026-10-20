import api from "./axios";

export const getUserPaymentsApi = async () => {
  return await api.get("/revenue/my-payments");
};

export const getAllPaymentsApi = async () => {
  return await api.get("/revenue/all-payments");
};

export const getRevenueStatsApi = async () => {
  return await api.get("/revenue/stats");
};

export const changeCODPaymentStatusApi = async (id, status = "PAID") => {
  return await api.patch(`/order/change-cod-payment-status/${id}`, { status });
};
