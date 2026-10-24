import React, { useState, useEffect } from "react";
import { Button, Input, Tag, message, Modal, Select } from "antd";
import {
  CalendarOutlined,
  SearchOutlined,
  BarsOutlined,
  CloseOutlined,
  EnvironmentOutlined,
  ShoppingOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  getAllOrdersApi,
  getOrderStatsApi,
  changeOrderStatusApi,
  cancelOrderApi,
  changeCODPaymentStatusApi,
  editOrderApi,
} from "../../services/adminService";
import Loader from "../../components/Loader";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All Orders");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    orderStatus: "PENDING",
    paymentStatus: "UNPAID",
    paymentMethod: "COD",
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const [ordersRes, statsRes] = await Promise.allSettled([
        getAllOrdersApi(),
        getOrderStatsApi(),
      ]);

      if (ordersRes.status === "fulfilled" && ordersRes.value?.data?.success) {
        const fetchedOrders = ordersRes.value.data.data?.orders || [];
        setOrders(fetchedOrders);
        if (fetchedOrders.length > 0 && !selectedOrderId) {
          setSelectedOrderId(fetchedOrders[0]._id);
        }
      }

      if (statsRes.status === "fulfilled" && statsRes.value?.data?.success) {
        setStats(statsRes.value.data.data || null);
      }
    } catch (err) {
      console.error("Failed to load admin orders:", err);
      message.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    if (newStatus === "CANCELLED") {
      handleCancelOrder(orderId);
      return;
    }
    try {
      setUpdatingStatus(true);
      const res = await changeOrderStatusApi(orderId, newStatus);
      if (res?.data?.success) {
        message.success(`Order marked as ${newStatus}`);
        await fetchOrders();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      message.error(
        err?.response?.data?.message || "Failed to update order status",
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleCancelOrder = (orderId) => {
    Modal.confirm({
      title: "Cancel Order",
      content:
        "Are you sure you want to cancel this order? Item quantities will be restocked.",
      okText: "Yes, Cancel Order",
      okType: "danger",
      cancelText: "Keep Order",
      onOk: async () => {
        try {
          setUpdatingStatus(true);
          const res = await cancelOrderApi(orderId);
          if (res?.data?.success) {
            message.success("Order cancelled and items restocked");
            await fetchOrders();
          }
        } catch (err) {
          message.error(
            err?.response?.data?.message || "Failed to cancel order",
          );
        } finally {
          setUpdatingStatus(false);
        }
      },
    });
  };

  const handleCODPaymentStatusChange = async (orderId, targetStatus) => {
    try {
      setUpdatingStatus(true);
      const res = await changeCODPaymentStatusApi(orderId, targetStatus);
      if (res?.data?.success) {
        message.success(
          res.data.message || `Payment marked as ${targetStatus}`,
        );
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, paymentStatus: targetStatus } : o,
          ),
        );
        fetchOrders();
      } else {
        message.error(res?.data?.message || "Failed to update payment status");
      }
    } catch (err) {
      console.error("Failed to update COD payment status:", err);
      message.error(
        err?.response?.data?.message || "Failed to update payment status",
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleOpenEditModal = (order) => {
    if (!order) return;
    setEditingOrder(order);
    setEditFormData({
      firstName: order.shippingAddress?.firstName || "",
      lastName: order.shippingAddress?.lastName || "",
      email: order.contactInfo?.email || "",
      phone: order.contactInfo?.phone || order.shippingAddress?.phone || "",
      streetAddress: order.shippingAddress?.streetAddress || "",
      apartment: order.shippingAddress?.apartment || "",
      city: order.shippingAddress?.city || "",
      state: order.shippingAddress?.state || "",
      zipCode: order.shippingAddress?.zipCode || "",
      country: order.shippingAddress?.country || "",
      orderStatus: order.orderStatus || "PENDING",
      paymentStatus: order.paymentStatus || "UNPAID",
      paymentMethod: order.paymentMethod || "COD",
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEditOrder = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!editingOrder) return;

    if (!editFormData.firstName?.trim() || !editFormData.lastName?.trim()) {
      message.error("First and last name are required");
      return;
    }
    if (
      !editFormData.streetAddress?.trim() ||
      !editFormData.city?.trim() ||
      !editFormData.country?.trim()
    ) {
      message.error("Street address, city, and country are required");
      return;
    }

    try {
      setSavingEdit(true);
      const payload = {
        contactInfo: {
          email: editFormData.email?.trim() || "",
          phone: editFormData.phone?.trim() || "",
        },
        shippingAddress: {
          firstName: editFormData.firstName?.trim(),
          lastName: editFormData.lastName?.trim(),
          streetAddress: editFormData.streetAddress?.trim(),
          apartment: editFormData.apartment?.trim() || "",
          city: editFormData.city?.trim(),
          state: editFormData.state?.trim() || "",
          zipCode: editFormData.zipCode?.trim() || "",
          country: editFormData.country?.trim(),
        },
        orderStatus: editFormData.orderStatus,
        paymentStatus: editFormData.paymentStatus,
        paymentMethod: editFormData.paymentMethod,
      };

      const res = await editOrderApi(editingOrder._id, payload);
      if (res?.data?.success) {
        message.success("Order details updated successfully");
        setIsEditModalOpen(false);
        const updated = res.data.data?.order;
        if (updated) {
          setOrders((prev) =>
            prev.map((o) => (o._id === updated._id ? { ...o, ...updated } : o)),
          );
        }
        await fetchOrders();
      } else {
        message.error(res?.data?.message || "Failed to update order");
      }
    } catch (err) {
      console.error("Failed to update order:", err);
      message.error(err?.response?.data?.message || "Failed to update order");
    } finally {
      setSavingEdit(false);
    }
  };

  const totalCount = orders.length;
  const unfulfilledCount = orders.filter((o) =>
    ["PENDING", "CONFIRMED"].includes(o.orderStatus),
  ).length;
  const inTransitCount = orders.filter(
    (o) => o.orderStatus === "SHIPPED",
  ).length;
  const fulfilledCount = orders.filter(
    (o) => o.orderStatus === "DELIVERED",
  ).length;
  const cancelledCount = orders.filter(
    (o) => o.orderStatus === "CANCELLED",
  ).length;

  const tabs = [
    { label: "All Orders", count: totalCount },
    { label: "Unfulfilled", count: unfulfilledCount },
    { label: "In Transit", count: inTransitCount },
    { label: "Fulfilled", count: fulfilledCount },
    { label: "Cancelled", count: cancelledCount },
  ];

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "Unfulfilled") {
      if (!["PENDING", "CONFIRMED"].includes(order.orderStatus)) return false;
    } else if (activeTab === "In Transit") {
      if (order.orderStatus !== "SHIPPED") return false;
    } else if (activeTab === "Fulfilled") {
      if (order.orderStatus !== "DELIVERED") return false;
    } else if (activeTab === "Cancelled") {
      if (order.orderStatus !== "CANCELLED") return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const customerName =
        `${order.shippingAddress?.firstName || ""} ${order.shippingAddress?.lastName || ""}`.toLowerCase();
      const orderNum = (order.orderNumber || "").toLowerCase();
      const city = (order.shippingAddress?.city || "").toLowerCase();
      return (
        orderNum.includes(q) || customerName.includes(q) || city.includes(q)
      );
    }
    return true;
  });

  const selectedOrder =
    orders.find((o) => o._id === selectedOrderId) || filteredOrders[0] || null;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {updatingStatus && (
        <Loader
          fullscreen
          text="Updating Order..."
          subtext="Synchronizing fulfillment status and customer ledger..."
        />
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary m-0">
              Orders &amp; Fulfillment
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live Sync Active
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface rounded-full border border-border text-xs font-semibold text-text-primary shadow-2xs">
            <CalendarOutlined className="text-text-secondary" />
            <span>
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <Button
            icon={<ReloadOutlined className={loading ? "animate-spin" : ""} />}
            onClick={fetchOrders}
            loading={loading}
            className="rounded-full! text-xs! font-bold! text-on-primary! bg-primary! hover:bg-primary/90! shadow-violet-glow! border-0! h-auto! py-2! px-4! flex! items-center! gap-2!"
          >
            Sync Orders
          </Button>
        </div>
      </div>

      {/* Modern Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.label;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer border-0 ${
                isActive
                  ? "bg-[#0e0e13]! text-white! font-bold! shadow-sm!"
                  : "bg-surface text-text-secondary hover:text-text-primary border border-border"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  isActive
                    ? "bg-[#5433eb] text-white"
                    : "bg-[#f2f1f5] text-text-secondary"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div
          className={`transition-all ${drawerOpen ? "lg:col-span-7" : "lg:col-span-12"} bg-surface rounded-2xl p-5 sm:p-6 border border-border shadow-xs`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="relative flex-1 max-w-sm">
              <Input
                placeholder="Search order #, customer, city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                prefix={
                  <SearchOutlined className="text-text-secondary text-sm mr-1.5" />
                }
                className="rounded-full! py-2! px-3.5! bg-canvas! hover:bg-[#eae7e7]! focus:bg-surface! border-transparent! focus:border-primary! text-xs!"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <span>Showing {filteredOrders.length} orders</span>
              <button
                type="button"
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="p-1.5 rounded-lg border border-border text-text-secondary hover:text-text-primary cursor-pointer bg-transparent"
                title="Toggle Drawer"
              >
                <BarsOutlined className="text-sm" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <Loader
                text="Loading orders..."
                subtext="Syncing fulfillment states and delivery records..."
                className="py-12"
              />
            ) : filteredOrders.length === 0 ? (
              <div className="py-16 text-center text-text-secondary">
                <ShoppingOutlined className="text-3xl mb-2 text-text-secondary" />
                <p className="text-xs">No orders match the selected view.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border text-text-secondary text-[10px] uppercase tracking-wider font-bold">
                    <th className="py-3 px-3">Order</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Destination</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredOrders.map((order) => {
                    const isSelected = selectedOrder?._id === order._id;
                    const customerName =
                      `${order.shippingAddress?.firstName || ""} ${order.shippingAddress?.lastName || ""}`.trim() ||
                      "Customer";
                    const formattedDate = order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                      : "Recent";

                    return (
                      <tr
                        key={order._id}
                        onClick={() => {
                          setSelectedOrderId(order._id);
                          setDrawerOpen(true);
                        }}
                        className={`transition-colors cursor-pointer ${isSelected
                            ? "bg-primary/5 font-semibold"
                            : "hover:bg-canvas"
                          }`}
                      >
                        <td className="py-3.5 px-3 font-bold text-primary">
                          #{order.orderNumber}
                        </td>
                        <td className="py-3.5 px-3 text-text-secondary whitespace-nowrap">
                          {formattedDate}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="font-bold text-text-primary block truncate max-w-[130px]">
                            {customerName}
                          </span>
                          <span className="text-[10px] text-text-secondary">
                            {order.items?.length || 0} item
                            {order.items?.length > 1 ? "s" : ""}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-text-secondary truncate max-w-[120px]">
                          {order.shippingAddress?.city},{" "}
                          {order.shippingAddress?.country}
                        </td>
                        <td className="py-3.5 px-3">
                          <Tag
                            className={`rounded-full! px-2! py-0.5! text-[10px] font-bold! border-0! m-0! ${order.orderStatus === "DELIVERED"
                                ? "bg-emerald-50! text-emerald-700!"
                                : order.orderStatus === "CANCELLED"
                                  ? "bg-red-50! text-red-600!"
                                  : order.orderStatus === "SHIPPED"
                                    ? "bg-blue-50! text-blue-700!"
                                    : "bg-purple-50! text-[#5433eb]!"
                              }`}
                          >
                            {order.orderStatus}
                          </Tag>
                        </td>
                        <td className="py-3.5 px-3 text-right font-extrabold text-text-primary">
                          ${Number(order.total || 0).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {drawerOpen && selectedOrder && (
          <div className="lg:col-span-5 bg-surface rounded-card p-5 sm:p-6 border border-border shadow-level-1 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h3 className="text-base font-extrabold text-text-primary tracking-tight m-0">
                  Order #{selectedOrder.orderNumber}
                </h3>
                <p className="text-[11px] text-text-secondary mt-0.5">
                  Placed on{" "}
                  {selectedOrder.createdAt
                    ? new Date(selectedOrder.createdAt).toLocaleString()
                    : "Recent"}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  size="small"
                  icon={<EditOutlined className="text-xs" />}
                  onClick={() => handleOpenEditModal(selectedOrder)}
                  className="rounded-full! text-xs! font-bold! text-text-primary! bg-surface! hover:bg-canvas! border-border! h-7! px-2.5! flex! items-center! gap-1!"
                >
                  Edit
                </Button>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="w-7 h-7 rounded-full hover:bg-canvas flex items-center justify-center text-text-secondary cursor-pointer border-0 bg-transparent"
                >
                  <CloseOutlined className="text-xs" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-text-secondary uppercase tracking-wider block">
                  Recipient Details
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenEditModal(selectedOrder)}
                  className="text-[11px] font-bold text-primary hover:underline cursor-pointer bg-transparent border-0 p-0 flex items-center gap-1"
                >
                  <EditOutlined className="text-[11px]" />
                  <span>Edit Address</span>
                </button>
              </div>
              <div className="bg-[#fcf9f8] p-4 rounded-2xl border border-border space-y-3 text-xs">
                <div>
                  <p className="font-bold text-text-primary text-sm">
                    {selectedOrder.shippingAddress?.firstName}{" "}
                    {selectedOrder.shippingAddress?.lastName}
                  </p>
                  <p className="text-text-secondary">
                    {selectedOrder.contactInfo?.email || "No email"}
                  </p>
                  <p className="text-text-secondary">
                    {selectedOrder.contactInfo?.phone ||
                      selectedOrder.shippingAddress?.phone ||
                      "No phone"}
                  </p>
                </div>

                <div className="pt-2 border-t border-border flex gap-2">
                  <EnvironmentOutlined className="text-text-secondary text-sm shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-semibold text-text-primary">
                      {selectedOrder.shippingAddress?.streetAddress ||
                        "No street address"}
                      {selectedOrder.shippingAddress?.apartment
                        ? `, ${selectedOrder.shippingAddress.apartment}`
                        : ""}
                    </p>
                    <p className="text-text-secondary">
                      {[
                        selectedOrder.shippingAddress?.city,
                        selectedOrder.shippingAddress?.state,
                        selectedOrder.shippingAddress?.zipCode,
                      ]
                        .filter(Boolean)
                        .join(", ") || "City / State / Zip"}
                    </p>
                    <p className="text-text-secondary font-medium">
                      {selectedOrder.shippingAddress?.country ||
                        "United States"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-wider block">
                Ordered Items ({selectedOrder.items?.length || 0})
              </span>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {selectedOrder.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#fcf9f8] rounded-xl border border-border flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <p className="font-bold text-text-primary m-0">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-text-secondary m-0">
                        Size: {item.size} • Color: {item.color} • Qty:{" "}
                        {item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-text-primary">
                      ${(Number(item.price) * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-border space-y-2 text-xs">
              <div className="flex justify-between text-text-secondary">
                <span>Items Subtotal</span>
                <span className="font-semibold text-text-primary">
                  ${Number(selectedOrder.subTotal || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Carbon-Neutral Delivery</span>
                <span className="font-bold text-emerald-600">FREE ($0.00)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border text-sm font-extrabold text-text-primary">
                <span>Total Amount</span>
                <span className="text-lg text-primary">
                  ${Number(selectedOrder.total || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-text-secondary pt-1">
                <span>
                  Payment:{" "}
                  <strong className="text-text-primary">
                    {selectedOrder.paymentMethod === "CARD"
                      ? "Card Online"
                      : "Cash on Delivery"}
                  </strong>
                </span>
                <div className="flex items-center gap-1.5">
                  <Tag
                    className={`rounded-full! px-2! py-0.5! text-[10px] font-bold! border-0! m-0! ${selectedOrder.paymentStatus === "PAID"
                        ? "bg-emerald-50! text-emerald-700!"
                        : "bg-amber-50! text-amber-700!"
                      }`}
                  >
                    {selectedOrder.paymentStatus}
                  </Tag>
                  {selectedOrder.paymentMethod === "COD" &&
                    selectedOrder.orderStatus !== "CANCELLED" &&
                    (selectedOrder.paymentStatus !== "PAID" ? (
                      <Button
                        size="small"
                        type="link"
                        loading={updatingStatus}
                        onClick={() =>
                          handleCODPaymentStatusChange(
                            selectedOrder._id,
                            "PAID",
                          )
                        }
                        className="p-0! h-auto! text-[11px]! font-bold! text-emerald-600! hover:text-emerald-700!"
                      >
                        Mark as Paid
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        type="link"
                        loading={updatingStatus}
                        onClick={() =>
                          handleCODPaymentStatusChange(
                            selectedOrder._id,
                            "UNPAID",
                          )
                        }
                        className="p-0! h-auto! text-[10px]! text-text-secondary! hover:text-amber-600!"
                      >
                        Revert
                      </Button>
                    ))}
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-2.5">
              {selectedOrder.orderStatus === "PENDING" && (
                <Button
                  type="primary"
                  loading={updatingStatus}
                  onClick={() =>
                    handleStatusChange(selectedOrder._id, "CONFIRMED")
                  }
                  className="w-full! py-3! h-auto! rounded-full! bg-primary! text-on-primary! text-xs! font-bold! border-0!"
                >
                  Confirm Order &amp; Prepare Package
                </Button>
              )}

              {selectedOrder.orderStatus === "CONFIRMED" && (
                <Button
                  type="primary"
                  loading={updatingStatus}
                  onClick={() =>
                    handleStatusChange(selectedOrder._id, "SHIPPED")
                  }
                  className="w-full! py-3! h-auto! rounded-full! bg-primary! text-on-primary! text-xs! font-bold! border-0!"
                >
                  Mark as Shipped &amp; Dispatched
                </Button>
              )}

              {selectedOrder.orderStatus === "SHIPPED" && (
                <Button
                  type="primary"
                  loading={updatingStatus}
                  onClick={() =>
                    handleStatusChange(selectedOrder._id, "DELIVERED")
                  }
                  className="w-full! py-3! h-auto! rounded-full! bg-emerald-600! hover:bg-emerald-700! text-white! text-xs! font-bold! border-0!"
                >
                  Mark as Delivered &amp; Settled
                </Button>
              )}

              {selectedOrder.orderStatus === "CANCELLED" ? (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-semibold text-center border border-red-200">
                  This order has been cancelled and items were restocked.
                </div>
              ) : (
                <Button
                  danger
                  type="text"
                  loading={updatingStatus}
                  onClick={() => handleCancelOrder(selectedOrder._id)}
                  className="w-full! text-xs! font-semibold!"
                >
                  Cancel Order &amp; Restock
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <Modal
        title={
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <EditOutlined className="text-primary text-base" />
            <span className="font-extrabold text-base text-text-primary">
              Edit Order #{editingOrder?.orderNumber}
            </span>
          </div>
        }
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
        width={620}
        destroyOnClose
        className="rounded-2xl overflow-hidden"
      >
        <form onSubmit={handleSaveEditOrder} className="space-y-4 pt-3">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary m-0">
              Customer &amp; Contact
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-text-primary block mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="First name"
                  value={editFormData.firstName}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                  className="rounded-xl! text-xs! py-2!"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-text-primary block mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Last name"
                  value={editFormData.lastName}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  className="rounded-xl! text-xs! py-2!"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-text-primary block mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Email"
                  value={editFormData.email}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="rounded-xl! text-xs! py-2!"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-text-primary block mb-1">
                  Phone Number
                </label>
                <Input
                  placeholder="Phone"
                  value={editFormData.phone}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="rounded-xl! text-xs! py-2!"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary m-0">
              Shipping Address
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-text-primary block mb-1">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="123 Main St"
                  value={editFormData.streetAddress}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      streetAddress: e.target.value,
                    }))
                  }
                  className="rounded-xl! text-xs! py-2!"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-text-primary block mb-1">
                  Apartment, Suite, Unit (Optional)
                </label>
                <Input
                  placeholder="Apt 4B"
                  value={editFormData.apartment}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      apartment: e.target.value,
                    }))
                  }
                  className="rounded-xl! text-xs! py-2!"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-text-primary block mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="City"
                    value={editFormData.city}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }))
                    }
                    className="rounded-xl! text-xs! py-2!"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-text-primary block mb-1">
                    State / Province
                  </label>
                  <Input
                    placeholder="State"
                    value={editFormData.state}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        state: e.target.value,
                      }))
                    }
                    className="rounded-xl! text-xs! py-2!"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-text-primary block mb-1">
                    Postal / Zip Code
                  </label>
                  <Input
                    placeholder="Postal Code"
                    value={editFormData.zipCode}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        zipCode: e.target.value,
                      }))
                    }
                    className="rounded-xl! text-xs! py-2!"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-text-primary block mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Country"
                    value={editFormData.country}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        country: e.target.value,
                      }))
                    }
                    className="rounded-xl! text-xs! py-2!"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary m-0">
              Order Status &amp; Payment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-text-primary block mb-1">
                  Order Status
                </label>
                <Select
                  value={editFormData.orderStatus}
                  onChange={(val) =>
                    setEditFormData((prev) => ({ ...prev, orderStatus: val }))
                  }
                  className="w-full! text-xs!"
                  options={[
                    { value: "PENDING", label: "Pending" },
                    { value: "CONFIRMED", label: "Confirmed" },
                    { value: "SHIPPED", label: "Shipped" },
                    { value: "DELIVERED", label: "Delivered" },
                    { value: "CANCELLED", label: "Cancelled" },
                  ]}
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-text-primary block mb-1">
                  Payment Status
                </label>
                <Select
                  value={editFormData.paymentStatus}
                  onChange={(val) =>
                    setEditFormData((prev) => ({ ...prev, paymentStatus: val }))
                  }
                  className="w-full! text-xs!"
                  options={[
                    { value: "UNPAID", label: "Unpaid" },
                    { value: "PAID", label: "Paid" },
                    { value: "FAILED", label: "Failed" },
                  ]}
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-text-primary block mb-1">
                  Payment Method
                </label>
                <Select
                  value={editFormData.paymentMethod}
                  onChange={(val) =>
                    setEditFormData((prev) => ({ ...prev, paymentMethod: val }))
                  }
                  className="w-full! text-xs!"
                  options={[
                    { value: "COD", label: "Cash on Delivery" },
                    { value: "CARD", label: "Card Payment" },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-end gap-2.5">
            <Button
              onClick={() => setIsEditModalOpen(false)}
              disabled={savingEdit}
              className="rounded-full! text-xs! font-bold! text-text-secondary! hover:text-text-primary! border-border!"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={savingEdit}
              className="rounded-full! bg-primary! text-on-primary! text-xs! font-bold! border-0! px-6!"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
