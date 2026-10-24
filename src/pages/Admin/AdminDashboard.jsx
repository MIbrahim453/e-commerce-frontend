import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Tag, Progress } from "antd";
import {
  ArrowUpOutlined,
  PlusOutlined,
  RightOutlined,
  ShoppingOutlined,
  LoadingOutlined,
  ClockCircleOutlined,
  AppstoreOutlined,
  ShopOutlined,
  DollarCircleOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import {
  getAllOrdersApi,
  getProductStatsApi,
  getRevenueStatsApi,
} from "../../services/adminService";
import AiStoreAnalyticsCard from "../../components/Admin/AiStoreAnalyticsCard";
import AiInventoryPricingSection from "../../components/Admin/AiInventoryPricingSection";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("All");
  const [orders, setOrders] = useState([]);
  const [revenueStats, setRevenueStats] = useState(null);
  const [productStats, setProductStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [ordersRes, revRes, prodRes] = await Promise.allSettled([
          getAllOrdersApi(),
          getRevenueStatsApi(),
          getProductStatsApi(),
        ]);

        if (
          ordersRes.status === "fulfilled" &&
          ordersRes.value?.data?.success
        ) {
          setOrders(ordersRes.value.data.data?.orders || []);
        }
        if (revRes.status === "fulfilled" && revRes.value?.data?.success) {
          setRevenueStats(revRes.value.data.data || null);
        }
        if (prodRes.status === "fulfilled" && prodRes.value?.data?.success) {
          setProductStats(prodRes.value.data.data || null);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalRev = Number(
    revenueStats?.totalRevenue ??
    orders
      .filter((o) => o.paymentStatus === "PAID")
      .reduce((sum, o) => sum + (Number(o.total) || 0), 0),
  );

  const activeOrdersCount = orders.filter((o) =>
    ["PENDING", "CONFIRMED", "SHIPPED"].includes(o.orderStatus),
  ).length;

  const totalOrdersCount = orders.length;

  const avgOrderValue =
    totalOrdersCount > 0 ? (totalRev / totalOrdersCount).toFixed(2) : "0.00";

  const filteredOrders = orders.filter((o) => {
    if (activeTab === "All") return true;
    if (activeTab === "Paid") return o.paymentStatus === "PAID";
    if (activeTab === "Pending") return o.paymentStatus !== "PAID";
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary m-0">
            Store Overview &amp; Intelligence
          </h1>
          <p className="text-xs text-text-secondary mt-1 m-0">
            Real-time financial performance, product analytics, and customer activity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/products/new">
            <Button
              type="primary"
              icon={<PlusOutlined className="text-sm" />}
              className="rounded-full! text-xs! font-bold! text-on-primary! bg-primary! hover:bg-primary/90! shadow-violet-glow! border-0! h-auto! py-2! px-4! flex! items-center! gap-2!"
            >
              Create new Product
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Bento Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-surface rounded-2xl p-5 border border-border shadow-xs hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider text-text-secondary uppercase">
              TOTAL REVENUE
            </span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5433eb] flex items-center justify-center text-xs font-bold">
              <DollarCircleOutlined />
            </div>
          </div>
          <div className="mt-2.5">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight m-0">
              ${totalRev.toFixed(2)}
            </h2>
            <p className="text-xs text-text-secondary mt-1 font-medium m-0">
              Gross fulfilled order settlements
            </p>
          </div>
          <div className="mt-3.5">
            <Progress
              percent={Math.min(100, Math.round(totalRev / 10))}
              showInfo={false}
              strokeColor="#5433eb"
              size={["100%", 4]}
            />
          </div>
        </div>

        <div className="bg-surface rounded-2xl p-5 border border-border shadow-xs hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider text-text-secondary uppercase">
              ACTIVE ORDERS
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-bold">
              <ClockCircleOutlined />
            </div>
          </div>
          <div className="mt-2.5">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight m-0">
              {activeOrdersCount} {activeOrdersCount === 1 ? "order" : "orders"}
            </h2>
            <p className="text-xs text-text-secondary mt-1 font-medium m-0">
              Awaiting shipment fulfillment
            </p>
          </div>
          <div className="mt-3.5">
            <Progress
              percent={
                totalOrdersCount > 0
                  ? Math.round((activeOrdersCount / totalOrdersCount) * 100)
                  : 0
              }
              showInfo={false}
              strokeColor="#f59e0b"
              size={["100%", 4]}
            />
          </div>
        </div>

        <div className="bg-surface rounded-2xl p-5 border border-border shadow-xs hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider text-text-secondary uppercase">
              AVERAGE ORDER VALUE
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold">
              <RiseOutlined />
            </div>
          </div>
          <div className="mt-2.5">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight m-0">
              ${avgOrderValue}
            </h2>
            <p className="text-xs text-text-secondary mt-1 font-medium m-0">
              Across {totalOrdersCount} store orders
            </p>
          </div>
          <div className="mt-3.5">
            <Progress
              percent={55}
              showInfo={false}
              strokeColor="#10b981"
              size={["100%", 4]}
            />
          </div>
        </div>

        <div className="bg-surface rounded-2xl p-5 border border-border shadow-xs hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider text-text-secondary uppercase">
              CATALOG INVENTORY
            </span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5433eb] flex items-center justify-center text-xs font-bold">
              <AppstoreOutlined />
            </div>
          </div>
          <div className="mt-2.5">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight m-0">
              {productStats?.totalProducts ?? 0} Products
            </h2>
            <p className="text-xs text-text-secondary mt-1 font-medium m-0">
              Across {productStats?.totalCategories ?? 0} active categories
            </p>
          </div>
          <div className="mt-3.5">
            <Progress
              percent={
                productStats?.totalProducts > 0
                  ? Math.round(
                    ((productStats.inStockCount || 0) /
                      productStats.totalProducts) *
                    100,
                  )
                  : 100
              }
              showInfo={false}
              strokeColor="#5433eb"
              size={["100%", 4]}
            />
          </div>
        </div>
      </div>

      {/* Admin Intelligence: "Ask Your Store" Natural Language Analytics */}
      <AiStoreAnalyticsCard />

      {/* Smart Inventory & Dynamic Pricing Assistant */}
      <AiInventoryPricingSection />

      {/* Activity Table Container */}
      <div className="bg-surface rounded-2xl border border-border shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-text-primary m-0">
              Recent Store Activity &amp; Orders
            </h3>
            <p className="text-xs text-text-secondary m-0 mt-0.5">
              Live incoming customer orders and settlements
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#f4f3f6] p-1 rounded-full border border-black/5">
            {["All", "Paid", "Pending"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer border-0 transition-all ${
                  activeTab === tab
                    ? "bg-[#0e0e13] text-white shadow-sm font-bold"
                    : "bg-transparent text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-16 text-center text-text-secondary flex flex-col items-center justify-center gap-2">
              <LoadingOutlined className="text-2xl text-primary animate-spin" />
              <span className="text-xs">Loading store activity...</span>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-12 text-center text-text-secondary">
              <ShoppingOutlined className="text-3xl text-text-secondary mb-2" />
              <p className="text-xs">No orders found.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border text-text-secondary text-[10px] uppercase tracking-wider font-bold bg-[#fafafa]">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Items Summary</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.slice(0, 10).map((o) => {
                  const customerName =
                    `${o.shippingAddress?.firstName || ""} ${o.shippingAddress?.lastName || ""}`.trim() ||
                    o.user?.firstName ||
                    "Customer";
                  const isPaid = o.paymentStatus === "PAID";
                  const initial = customerName.charAt(0).toUpperCase() || "C";

                  return (
                    <tr
                      key={o._id}
                      className="hover:bg-canvas transition-colors"
                    >
                      <td className="py-3.5 px-4 font-bold text-primary">
                        #{o.orderNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#eee9ff] text-[#5433eb] font-bold text-[11px] flex items-center justify-center">
                            {initial}
                          </div>
                          <div>
                            <span className="font-bold text-text-primary block">
                              {customerName}
                            </span>
                            <span className="text-[10px] text-text-secondary">
                              {o.contactInfo?.email || o.user?.email || ""}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-text-secondary">
                        {o.items?.length > 1
                          ? `${o.items[0]?.title} (+${o.items.length - 1} more)`
                          : o.items?.[0]?.title || "Item"}
                      </td>
                      <td className="py-3.5 px-4">
                        <Tag
                          className={`rounded-full! px-2! py-0.5! text-[10px] font-bold! border-0! m-0! ${isPaid
                              ? "bg-emerald-50! text-emerald-700!"
                              : "bg-amber-50! text-amber-700!"
                            }`}
                        >
                          {isPaid ? "PAID" : "COD PENDING"}
                        </Tag>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-text-secondary">
                        {o.orderStatus}
                      </td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-text-primary">
                        ${Number(o.total || 0).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-4 bg-[#fafafa] border-t border-border flex items-center justify-between text-xs text-text-secondary">
          <span>
            Showing {Math.min(10, filteredOrders.length)} of {orders.length}{" "}
            total orders
          </span>
          <Link
            to="/admin/orders"
            className="text-primary hover:underline font-bold inline-flex items-center gap-1"
          >
            <span>Manage All Orders</span>
            <RightOutlined className="text-[10px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
