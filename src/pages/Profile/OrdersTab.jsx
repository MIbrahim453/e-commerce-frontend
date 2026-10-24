import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, message, Tag } from "antd";
import {
  CheckCircleOutlined,
  CarOutlined,
  EyeOutlined,
  CalendarOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  ShoppingOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { getUserOrdersApi, cancelOrderApi } from "../../services/orderService";

export default function OrdersTab({ onOrdersLoaded }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getUserOrdersApi();
      if (res?.data?.success) {
        const data = res.data.data || {};
        const list = data.allOrders || [];
        setOrders(list);

        if (onOrdersLoaded) {
          const inTransit = list.filter((o) =>
            ["PENDING", "CONFIRMED", "SHIPPED"].includes(o.orderStatus),
          ).length;
          const delivered = list.filter(
            (o) => o.orderStatus === "DELIVERED",
          ).length;
          const totalSpent = list.reduce(
            (sum, o) =>
              sum + (o.orderStatus !== "CANCELLED" ? Number(o.total || 0) : 0),
            0,
          );
          onOrdersLoaded({
            totalOrders: list.length,
            inTransitCount: inTransit,
            deliveredCount: delivered,
            totalSpent,
          });
        }
      }
    } catch (err) {
      console.error("Failed to load user orders:", err);
      message.error(
        err?.response?.data?.message || "Failed to load your orders",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = (orderId) => {
    Modal.confirm({
      title: "Cancel Order",
      content:
        "Are you sure you want to cancel this order? Item stock will be restocked.",
      okText: "Yes, Cancel Order",
      okType: "danger",
      cancelText: "Keep Order",
      onOk: async () => {
        try {
          setCancellingId(orderId);
          const res = await cancelOrderApi(orderId);
          if (res?.data?.success) {
            message.success("Order cancelled successfully");
            await fetchOrders();
            if (selectedOrder?._id === orderId) {
              setSelectedOrder(null);
            }
          } else {
            message.error(res?.data?.message || "Failed to cancel order");
          }
        } catch (err) {
          message.error(
            err?.response?.data?.message || "Failed to cancel order",
          );
        } finally {
          setCancellingId(null);
        }
      },
    });
  };

  const allCount = orders.length;
  const pendingCount = orders.filter((o) =>
    ["PENDING", "CONFIRMED", "SHIPPED"].includes(o.orderStatus),
  ).length;
  const deliveredCount = orders.filter(
    (o) => o.orderStatus === "DELIVERED",
  ).length;
  const cancelledCount = orders.filter(
    (o) => o.orderStatus === "CANCELLED",
  ).length;

  const filterTabs = [
    { key: "all", label: "All Orders", count: allCount },
    { key: "transit", label: "Active & In Transit", count: pendingCount },
    { key: "delivered", label: "Delivered", count: deliveredCount },
    { key: "cancelled", label: "Cancelled", count: cancelledCount },
  ];

  const filteredOrders = orders.filter((order) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "transit") {
      return ["PENDING", "CONFIRMED", "SHIPPED"].includes(order.orderStatus);
    }
    if (activeFilter === "delivered") return order.orderStatus === "DELIVERED";
    if (activeFilter === "cancelled") return order.orderStatus === "CANCELLED";
    return true;
  });

  return (
    <div className="flex! flex-col! gap-6!">
      <div className="flex! flex-wrap! items-center! justify-between! gap-4! pb-2!">
        <div className="flex! flex-wrap! items-center! gap-2!">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`rounded-full! px-4! py-2! text-xs! sm:text-sm! font-semibold! tracking-[-0.02em]! transition-all! cursor-pointer! border! flex! items-center! gap-2! ${
                activeFilter === tab.key
                  ? "bg-[#1a1a1a]! text-white! border-transparent! shadow-sm!"
                  : "bg-white! text-text-primary! border-border! hover:bg-canvas!"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[11px]! px-2! py-0.5! rounded-full! font-bold! ${
                  activeFilter === tab.key
                    ? "bg-white/20! text-white!"
                    : "bg-canvas! text-text-secondary!"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <span className="text-xs! text-text-secondary! font-medium!">
          Showing {filteredOrders.length} of {orders.length} orders
        </span>
      </div>

      <div className="flex! flex-col! gap-5!">
        {loading ? (
          <div className="py-16! text-center! text-gray-400! flex! flex-col! items-center! justify-center! gap-2!">
            <LoadingOutlined className="text-2xl! text-[#5433eb]! animate-spin!" />
            <span className="text-xs!">Loading your orders...</span>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white! rounded-[28px]! border! border-border! p-10! sm:p-14! text-center! flex! flex-col! items-center! gap-3.5! shadow-level-1!">
            <div className="w-14! h-14! rounded-full! bg-[#eee9ff]! text-[#5433eb]! flex! items-center! justify-center! text-2xl!">
              <ShoppingOutlined />
            </div>
            <h3 className="text-lg! font-bold! text-[#1a1a1a]! m-0!">
              No orders found
            </h3>
            <p className="text-xs! text-gray-500! max-w-sm! m-0!">
              {activeFilter === "all"
                ? "You haven't placed any orders yet. Discover our latest collections to get started."
                : `There are currently no orders under the ${activeFilter} filter.`}
            </p>
            <Link
              to="/products"
              className="mt-2! px-6! py-2.5! rounded-full! bg-[#5433eb]! text-white! text-xs! font-bold! shadow-violet-glow! hover:bg-[#4324d4]! transition-all! no-underline!"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const formattedDate = order.createdAt
              ? new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "Recent";

            const isPending = order.orderStatus === "PENDING";
            const isDelivered = order.orderStatus === "DELIVERED";
            const isCancelled = order.orderStatus === "CANCELLED";

            return (
              <div
                key={order._id}
                className="bg-white! rounded-[24px]! sm:rounded-[28px]! border! border-border! p-5! sm:p-7! shadow-level-1! transition-all! hover:border-[#dcd9d9]!"
              >
                <div className="flex! flex-col! sm:flex-row! sm:items-center! justify-between! gap-4! pb-4! border-b! border-border!">
                  <div className="flex! flex-wrap! items-center! gap-3!">
                    <span className="text-base! sm:text-lg! font-semibold! text-text-primary! tracking-[-0.03em]!">
                      Order #{order.orderNumber}
                    </span>
                    <span className="text-xs! text-text-secondary! font-medium!">
                      Placed on {formattedDate}
                    </span>
                  </div>

                  <div className="flex! items-center! gap-3!">
                    {isDelivered ? (
                      <span className="inline-flex! items-center! gap-1.5! bg-[#e6f4ea]! text-[#137333]! px-3! py-1! rounded-full! text-xs! font-semibold! tracking-[-0.02em]!">
                        <CheckCircleOutlined className="text-xs!" />
                        Delivered
                      </span>
                    ) : isCancelled ? (
                      <span className="inline-flex! items-center! gap-1.5! bg-red-50! text-red-600! px-3! py-1! rounded-full! text-xs! font-semibold! tracking-[-0.02em]!">
                        <CloseCircleOutlined className="text-xs!" />
                        Cancelled
                      </span>
                    ) : (
                      <span className="inline-flex! items-center! gap-1.5! bg-[#e4dfff]! text-[#5433eb]! px-3! py-1! rounded-full! text-xs! font-semibold! tracking-[-0.02em]!">
                        <CarOutlined className="text-xs!" />
                        {order.orderStatus}
                      </span>
                    )}

                    <span className="text-base! sm:text-lg! font-semibold! text-text-primary! tracking-[-0.03em]!">
                      ${Number(order.total || 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-4! p-3.5! sm:p-4! bg-[#fcf9f8]! rounded-[16px]! border! border-[#ebebeb]! flex! flex-col! sm:flex-row! sm:items-center! justify-between! gap-2!">
                  <div className="flex! items-center! gap-2.5! text-xs! sm:text-sm! text-text-primary! font-medium!">
                    <CalendarOutlined className="text-[#5433eb]! text-sm!" />
                    <span className="text-text-secondary!">
                      {isDelivered ? "Delivery Status:" : "Estimated Arrival:"}
                    </span>
                    <span className="font-semibold! text-text-primary!">
                      {isDelivered
                        ? "Delivered via Ground"
                        : "3–5 Business Days (Ground)"}
                    </span>
                  </div>

                  <div className="text-xs! text-gray-500! flex! items-center! gap-1.5!">
                    <EnvironmentOutlined className="text-gray-400!" />
                    <span>
                      {order.shippingAddress?.city},{" "}
                      {order.shippingAddress?.country}
                    </span>
                  </div>
                </div>

                <div className="flex! flex-col! gap-3! my-5!">
                  {order.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex! items-center! justify-between! gap-4! p-2.5! rounded-xl! bg-[#fafafa]! border! border-[#f2f2f2]!"
                    >
                      <div className="flex! items-center! gap-3.5!">
                        <div className="w-12! h-12! rounded-xl! bg-white! border! border-border! flex! items-center! justify-center! text-xs! font-bold! text-[#5433eb]!">
                          {item.quantity}×
                        </div>
                        <div>
                          <h4 className="text-xs! sm:text-sm! font-bold! text-text-primary! m-0!">
                            {item.title}
                          </h4>
                          <div className="flex! items-center! gap-2! text-[11px]! text-text-secondary! mt-0.5!">
                            <span>Size: {item.size}</span>
                            <span>•</span>
                            <span>{item.category}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs! sm:text-sm! font-semibold! text-text-primary! shrink-0!">
                        $
                        {(Number(item.price) * (item.quantity || 1)).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex! flex-wrap! items-center! justify-between! gap-3! pt-4! border-t! border-border!">
                  <div className="text-xs! text-text-secondary!">
                    Payment:{" "}
                    <span className="font-semibold! text-text-primary!">
                      {order.paymentMethod === "CARD"
                        ? "Card"
                        : "Cash on Delivery (COD)"}
                    </span>{" "}
                    ({order.paymentStatus || "UNPAID"})
                  </div>

                  <div className="flex! items-center! gap-2!">
                    {isPending && (
                      <Button
                        type="text"
                        danger
                        loading={cancellingId === order._id}
                        onClick={() => handleCancelOrder(order._id)}
                        className="rounded-full! hover:bg-red-50! text-xs! font-semibold! px-4! h-9!"
                      >
                        Cancel Order
                      </Button>
                    )}
                    <Button
                      type="text"
                      onClick={() => setSelectedOrder(order)}
                      className="rounded-full! bg-white! border! border-border! hover:bg-canvas! text-text-primary! text-xs! font-semibold! px-4! h-9! flex! items-center! gap-1.5!"
                    >
                      <EyeOutlined /> Details
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <Modal
        title={
          <span className="font-semibold! text-base! text-text-primary!">
            Order Details{" "}
            {selectedOrder ? `(#${selectedOrder.orderNumber})` : ""}
          </span>
        }
        open={!!selectedOrder}
        onCancel={() => setSelectedOrder(null)}
        footer={[
          <Button
            key="close"
            type="primary"
            onClick={() => setSelectedOrder(null)}
            className="rounded-full! bg-[#1a1a1a]! text-white! border-0! px-6!"
          >
            Close
          </Button>,
        ]}
        styles={{ body: { padding: "20px 0" } }}
      >
        {selectedOrder && (
          <div className="flex! flex-col! gap-4!">
            <div className="bg-[#fcf9f8]! p-4! rounded-[16px]! border! border-border! flex! flex-col! gap-2!">
              <div className="flex! items-center! justify-between!">
                <span className="text-xs! text-text-secondary!">Status</span>
                <span className="text-xs! font-bold! text-[#5433eb]!">
                  {selectedOrder.orderStatus}
                </span>
              </div>
              <div className="flex! items-center! justify-between!">
                <span className="text-xs! text-text-secondary!">
                  Payment Method
                </span>
                <span className="text-xs! font-semibold! text-text-primary!">
                  {selectedOrder.paymentMethod === "CARD"
                    ? "Card Payment"
                    : "Cash on Delivery (COD)"}{" "}
                  ({selectedOrder.paymentStatus})
                </span>
              </div>
              <div className="flex! items-center! justify-between!">
                <span className="text-xs! text-text-secondary!">
                  Contact Email
                </span>
                <span className="text-xs! font-semibold! text-text-primary!">
                  {selectedOrder.contactInfo?.email || "N/A"}
                </span>
              </div>
            </div>

            <div className="p-4! rounded-[16px]! border! border-border! flex! flex-col! gap-1! text-xs!">
              <span className="font-bold! text-text-primary! mb-1!">
                Shipping Destination
              </span>
              <span className="text-gray-700!">
                {selectedOrder.shippingAddress?.firstName}{" "}
                {selectedOrder.shippingAddress?.lastName}
              </span>
              <span className="text-gray-500!">
                {selectedOrder.shippingAddress?.streetAddress}{" "}
                {selectedOrder.shippingAddress?.apartment}
              </span>
              <span className="text-gray-500!">
                {selectedOrder.shippingAddress?.city},{" "}
                {selectedOrder.shippingAddress?.state}{" "}
                {selectedOrder.shippingAddress?.zipCode}
              </span>
              <span className="text-gray-500!">
                {selectedOrder.shippingAddress?.country}
              </span>
            </div>

            <div className="flex! flex-col! gap-2.5!">
              <span className="text-xs! font-semibold! text-text-secondary! uppercase! tracking-wider!">
                Purchased Items ({selectedOrder.items?.length || 0})
              </span>
              {selectedOrder.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex! items-center! justify-between! gap-3! text-xs!"
                >
                  <div>
                    <span className="font-bold! text-text-primary!">
                      {item.title}
                    </span>{" "}
                    <span className="text-gray-400!">
                      ({item.size}) × {item.quantity}
                    </span>
                  </div>
                  <span className="font-semibold! text-text-primary!">
                    ${(Number(item.price) * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3! border-t! border-border! flex! items-center! justify-between!">
              <span className="text-sm! font-semibold! text-text-primary!">
                Total Amount
              </span>
              <span className="text-base! font-bold! text-[#1a1a1a]!">
                ${Number(selectedOrder.total || 0).toFixed(2)} USD
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
