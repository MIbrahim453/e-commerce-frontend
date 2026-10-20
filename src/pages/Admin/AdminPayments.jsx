import React, { useState, useEffect } from "react";
import { Button, Input, Tag, message } from "antd";
import {
  SearchOutlined,
  CheckCircleOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import {
  getAllPaymentsApi,
  getRevenueStatsApi,
  changeCODPaymentStatusApi,
} from "../../services/paymentService";
import Loader from "../../components/Loader";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchPaymentsData = async () => {
    try {
      setLoading(true);
      const [paymentsRes, statsRes] = await Promise.allSettled([
        getAllPaymentsApi(),
        getRevenueStatsApi(),
      ]);

      if (
        paymentsRes.status === "fulfilled" &&
        paymentsRes.value?.data?.success
      ) {
        setPayments(paymentsRes.value.data.data?.payments || []);
      }

      if (statsRes.status === "fulfilled" && statsRes.value?.data?.success) {
        setStats(statsRes.value.data.data || null);
      }
    } catch (err) {
      console.error("Failed to load admin payments:", err);
      message.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCODPayment = async (orderId, targetStatus) => {
    try {
      setUpdatingId(orderId);
      const res = await changeCODPaymentStatusApi(orderId, targetStatus);
      if (res?.data?.success) {
        message.success(
          res.data.message || `Payment marked as ${targetStatus}`,
        );
        setPayments((prev) =>
          prev.map((p) =>
            p._id === orderId ? { ...p, paymentStatus: targetStatus } : p,
          ),
        );
        fetchPaymentsData();
      } else {
        message.error(res?.data?.message || "Failed to update payment status");
      }
    } catch (err) {
      console.error("Failed to update payment status:", err);
      message.error(
        err?.response?.data?.message || "Failed to update payment status",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchPaymentsData();
  }, []);

  const totalCollected =
    stats?.totalRevenue ??
    payments
      .filter((p) => p.paymentStatus === "PAID")
      .reduce((sum, p) => sum + (Number(p.total) || 0), 0);

  const pendingSettlement = payments
    .filter((p) => p.paymentStatus !== "PAID")
    .reduce((sum, p) => sum + (Number(p.total) || 0), 0);

  const filtered = payments.filter((p) => {
    if (statusFilter !== "All" && p.paymentStatus !== statusFilter)
      return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const customerName =
        `${p.shippingAddress?.firstName || ""} ${p.shippingAddress?.lastName || ""} ${p.user?.firstName || ""}`.toLowerCase();
      const orderNum = (p.orderNumber || "").toLowerCase();
      return orderNum.includes(q) || customerName.includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
            Payments &amp; Settlements
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Real-time ledger of store revenue, payments received, and pending
            COD settlements.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-surface rounded-card p-5 sm:p-6 border border-border shadow-level-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-text-secondary uppercase">
              TOTAL COLLECTED
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
              <CheckCircleFilled className="text-[9px]" /> Verified
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              ${Number(totalCollected).toFixed(2)}
            </h2>
            <p className="text-xs text-text-secondary mt-1 font-medium">
              Gross fulfilled order settlements
            </p>
          </div>
        </div>

        <div className="bg-surface rounded-card p-5 sm:p-6 border border-border shadow-level-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-text-secondary uppercase">
              PENDING SETTLEMENT
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
              <ClockCircleOutlined className="text-[9px]" /> In Flow
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              ${Number(pendingSettlement).toFixed(2)}
            </h2>
            <p className="text-xs text-text-secondary mt-1 font-medium">
              Cash due upon courier arrival
            </p>
          </div>
        </div>

        <div className="bg-surface rounded-card p-5 sm:p-6 border border-border shadow-level-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-text-secondary uppercase">
              TOTAL TRANSACTIONS
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              Live
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              {payments.length}
            </h2>
            <p className="text-xs text-text-secondary mt-1 font-medium">
              Total customer orders processed
            </p>
          </div>
        </div>

        <div className="bg-surface rounded-card p-5 sm:p-6 border border-border shadow-level-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-text-secondary uppercase">
              PAID RATIO
            </span>
            <span className="text-xs font-bold text-text-secondary">
              {payments.length > 0
                ? `${Math.round(
                  (payments.filter((p) => p.paymentStatus === "PAID").length /
                    payments.length) *
                  100,
                )}%`
                : "100%"}
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              {payments.filter((p) => p.paymentStatus === "PAID").length} /{" "}
              {payments.length}
            </h2>
            <p className="text-xs text-text-secondary mt-1 font-medium">
              Orders fully settled
            </p>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-card p-5 sm:p-6 border border-border shadow-level-1 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Input
              placeholder="Search by order number or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              prefix={
                <SearchOutlined className="text-text-secondary text-sm mr-1.5" />
              }
              className="rounded-full! py-2! px-3.5! bg-canvas! hover:bg-[#eae7e7]! focus:bg-surface! border-transparent! focus:border-primary! text-xs!"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {["All", "PAID", "UNPAID"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all ${statusFilter === status
                    ? "bg-[#1a1a1a] text-white border-transparent"
                    : "bg-surface text-text-secondary border-border hover:bg-canvas"
                  }`}
              >
                {status === "All" ? "All Payments" : status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <Loader
              text="Loading ledger records..."
              subtext="Syncing settled transactions and pending payouts..."
              className="py-12"
            />
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-text-secondary">
              <DollarOutlined className="text-3xl text-text-secondary mb-2" />
              <p className="text-xs">No payment records found.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border text-text-secondary text-[10px] uppercase tracking-wider font-bold">
                  <th className="py-3 px-3">Order Number</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Method</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Amount</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((p) => {
                  const customerName =
                    `${p.shippingAddress?.firstName || ""} ${p.shippingAddress?.lastName || ""}`.trim() ||
                    p.user?.firstName ||
                    "Customer";
                  const isPaid = p.paymentStatus === "PAID";
                  const isCOD = p.paymentMethod === "COD";
                  const isCancelled = p.orderStatus === "CANCELLED";
                  const formattedDate = p.createdAt
                    ? new Date(p.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                    : "Recent";

                  return (
                    <tr
                      key={p._id}
                      className="hover:bg-canvas transition-colors"
                    >
                      <td className="py-3.5 px-3 font-bold text-primary">
                        #{p.orderNumber}
                      </td>
                      <td className="py-3.5 px-3 text-text-secondary whitespace-nowrap">
                        {formattedDate}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-bold text-text-primary block">
                          {customerName}
                        </span>
                        <span className="text-[10px] text-text-secondary">
                          {p.contactInfo?.email || p.user?.email || "No email"}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-text-secondary">
                        <span className="font-semibold text-text-primary">
                          {p.paymentMethod === "CARD"
                            ? "Card Online"
                            : "Cash on Delivery (COD)"}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <Tag
                          className={`rounded-full! px-2.5! py-0.5! text-[10px] font-bold! border-0! m-0! ${isPaid
                              ? "bg-emerald-50! text-emerald-700!"
                              : "bg-amber-50! text-amber-700!"
                            }`}
                        >
                          {isPaid ? "PAID" : "PENDING (COD)"}
                        </Tag>
                      </td>
                      <td className="py-3.5 px-3 text-right font-extrabold text-text-primary">
                        ${Number(p.total || 0).toFixed(2)}
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        {isCOD ? (
                          isCancelled ? (
                            <span className="text-[11px] text-text-secondary italic">
                              Cancelled
                            </span>
                          ) : !isPaid ? (
                            <Button
                              size="small"
                              type="primary"
                              loading={updatingId === p._id}
                              onClick={() =>
                                handleUpdateCODPayment(p._id, "PAID")
                              }
                              icon={<CheckCircleOutlined />}
                              className="rounded-full! text-[11px]! font-bold! h-auto! py-1! px-3! bg-emerald-600! hover:bg-emerald-700! text-white! border-0! shadow-xs!"
                            >
                              Mark Paid
                            </Button>
                          ) : (
                            <div className="flex items-center justify-end gap-1.5">
                              <span className="text-[11px] text-emerald-700 font-semibold inline-flex items-center gap-1">
                                <CheckCircleFilled className="text-emerald-500" />{" "}
                                Settled
                              </span>
                              <button
                                type="button"
                                disabled={updatingId === p._id}
                                onClick={() =>
                                  handleUpdateCODPayment(p._id, "UNPAID")
                                }
                                className="text-[10px] text-text-secondary hover:text-amber-600 underline ml-2 transition-colors cursor-pointer"
                                title="Revert back to Unpaid"
                              >
                                Revert
                              </button>
                            </div>
                          )
                        ) : (
                          <span className="text-[11px] text-text-secondary inline-flex items-center gap-1">
                            <CheckCircleFilled className="text-emerald-500" />{" "}
                            Auto-settled
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
