import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Tag, Progress } from "antd";
import {
  ExportOutlined,
  SearchOutlined,
  ArrowUpOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

export default function AdminPayments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const payments = [
    {
      id: "TXN-8921",
      orderNumber: "SH-8921",
      customer: "Alex Morgan",
      email: "alex.morgan@designstudio.com",
      avatar: "AM",
      avatarBg: "bg-[#e4dfff] text-[#3b00d1]",
      total: "$386.51",
      paymentMethod: "Apple Pay",
      channel: "Direct Online",
      paymentStatus: "PAID",
      dateTime: "Today, 14:24",
      gatewayId: "ch_3N82bXFk",
    },
    {
      id: "TXN-8920",
      orderNumber: "SH-8920",
      customer: "Elena Rostova",
      email: "elena.r@archdaily.com",
      avatar: "ER",
      avatarBg: "bg-[#f0eded] text-[#1a1a1a]",
      total: "$145.00",
      paymentMethod: "Credit Card (Visa)",
      channel: "Direct Online",
      paymentStatus: "PAID",
      dateTime: "Today, 13:08",
      gatewayId: "ch_3N81vLk9",
    },
    {
      id: "TXN-8919",
      orderNumber: "SH-8919",
      customer: "Marcus Vance",
      email: "m.vance@studio.co",
      avatar: "MV",
      avatarBg: "bg-[#ffdbce] text-[#9f3800]",
      total: "$520.00",
      paymentMethod: "Cash on Delivery",
      channel: "Wholesale",
      paymentStatus: "UNPAID",
      dateTime: "Today, 11:45",
      gatewayId: "cod_9921b",
    },
    {
      id: "TXN-8918",
      orderNumber: "SH-8918",
      customer: "Sophie Chen",
      email: "chen.sophie@minimal.io",
      avatar: "SC",
      avatarBg: "bg-[#e5e2e1] text-[#474556]",
      total: "$260.00",
      paymentMethod: "Credit Card (MC)",
      channel: "Mobile App",
      paymentStatus: "PAID",
      dateTime: "Today, 09:15",
      gatewayId: "ch_3N79qQa2",
    },
    {
      id: "TXN-8917",
      orderNumber: "SH-8917",
      customer: "Julian Thorne",
      email: "thorne@atelier.org",
      avatar: "JT",
      avatarBg: "bg-[#eae7e7] text-[#1a1a1a]",
      total: "$189.00",
      paymentMethod: "Apple Pay",
      channel: "Direct Online",
      paymentStatus: "REFUNDED",
      dateTime: "Yesterday, 18:30",
      gatewayId: "re_8917zA",
    },
    {
      id: "TXN-8916",
      orderNumber: "SH-8916",
      customer: "Clara Oswald",
      email: "clara.o@nordic.co",
      avatar: "CO",
      avatarBg: "bg-[#e4dfff] text-[#3b00d1]",
      total: "$412.80",
      paymentMethod: "Credit Card (Amex)",
      channel: "Direct Online",
      paymentStatus: "PAID",
      dateTime: "Yesterday, 16:20",
      gatewayId: "ch_3N64bLm1",
    },
  ];

  const filtered = payments.filter((p) => {
    if (statusFilter !== "All" && p.paymentStatus !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.orderNumber.toLowerCase().includes(q) ||
        p.customer.toLowerCase().includes(q) ||
        p.gatewayId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
              Revenue & Payments
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Settlement Active
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Reconciliation ledger, cash on delivery tracking, and gateway transactions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-surface rounded-full border border-border text-xs font-semibold text-text-primary shadow-2xs">
            <CalendarOutlined className="text-text-secondary" />
            <span>Fiscal Month: May 2025</span>
          </div>

          <Button
            icon={<ExportOutlined className="text-text-secondary" />}
            className="rounded-full! text-xs! font-semibold! text-text-primary! bg-surface! hover:bg-canvas! border-border! h-auto! py-2! px-4!"
          >
            Export Ledger
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-surface rounded-card p-6 border border-border shadow-level-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-text-secondary uppercase">
              Settled Revenue
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              <ArrowUpOutlined className="text-[10px]" />
              +12.4%
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mt-2">
            $128,430.00
          </h2>
          <p className="text-xs text-text-secondary mt-1 font-medium">
            Realized settled payments
          </p>
          <div className="mt-4">
            <Progress percent={72} showInfo={false} strokeColor="#5433eb" size={["100%", 4]} />
          </div>
        </div>

        <div className="bg-surface rounded-card p-6 border border-border shadow-level-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-text-secondary uppercase">
              Pending Settlements (COD / Hold)
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
              12 orders
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-2">
            $4,320.00
          </h2>
          <p className="text-xs text-text-secondary mt-1 font-medium">
            Awaiting carrier delivery proof
          </p>
          <div className="mt-4">
            <Progress percent={35} showInfo={false} strokeColor="#f59e0b" size={["100%", 4]} />
          </div>
        </div>

        <div className="bg-surface rounded-card p-6 border border-border shadow-level-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-text-secondary uppercase">
              Disputed / Refunded
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-canvas text-text-secondary">
              0.14% rate
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mt-2">
            $189.00
          </h2>
          <p className="text-xs text-text-secondary mt-1 font-medium">
            1 returned item in cycle
          </p>
          <div className="mt-4">
            <Progress percent={8} showInfo={false} strokeColor="#6b7280" size={["100%", 4]} />
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-surface rounded-card p-6 border border-border shadow-level-1 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Input
              placeholder="Search transaction, order, or customer..."
              prefix={<SearchOutlined className="text-text-secondary text-sm mr-1.5" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-full! py-2! px-4! bg-canvas! hover:bg-[#eae7e7]! focus:bg-surface! border-transparent! focus:border-primary! text-xs!"
            />
          </div>

          {/* Active cell tab filter - when clicked becomes active with a bg cell */}
          <div className="flex items-center gap-1 bg-canvas p-1 rounded-full text-xs font-semibold">
            {["All", "PAID", "UNPAID", "REFUNDED"].map((tab) => {
              const isActive = statusFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer border-0 ${
                    isActive
                      ? "bg-[#f0eded]! text-text-primary! font-bold! shadow-2xs!"
                      : "text-text-secondary hover:text-text-primary bg-transparent"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border text-text-secondary text-[10px] uppercase font-bold tracking-wider">
                <th className="py-3 px-3">TRANSACTION</th>
                <th className="py-3 px-3">ORDER</th>
                <th className="py-3 px-3">CUSTOMER</th>
                <th className="py-3 px-3">METHOD</th>
                <th className="py-3 px-3">DATE</th>
                <th className="py-3 px-3">AMOUNT</th>
                <th className="py-3 px-3 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-canvas/50 transition-colors">
                  <td className="py-3.5 px-3 font-mono text-[11px] text-text-secondary">
                    {item.gatewayId}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-primary">
                    <Link to="/admin/orders" className="hover:underline">
                      #{item.orderNumber}
                    </Link>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-6 h-6 rounded-full font-bold text-[10px] flex items-center justify-center shrink-0 border border-border ${item.avatarBg}`}
                      >
                        {item.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-text-primary truncate">{item.customer}</p>
                        <p className="text-[10px] text-text-secondary truncate">{item.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-text-secondary">
                    <Tag className="rounded-full! px-2.5! py-0.5! font-bold! text-[10px]! border-border! bg-canvas! text-text-primary! m-0!">
                      {item.paymentMethod}
                    </Tag>
                  </td>
                  <td className="py-3.5 px-3 text-text-secondary font-medium">
                    {item.dateTime}
                  </td>
                  <td className="py-3.5 px-3 font-extrabold text-text-primary text-sm">
                    {item.total}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <Tag
                      className="rounded-full! px-2.5! py-1! text-xs! font-bold! border-0! m-0! inline-flex! items-center! gap-1.5!"
                      style={{
                        backgroundColor:
                          item.paymentStatus === "PAID"
                            ? "rgba(84, 51, 235, 0.1)"
                            : item.paymentStatus === "UNPAID"
                            ? "#fffbeb"
                            : "#fef2f2",
                        color:
                          item.paymentStatus === "PAID"
                            ? "#5433eb"
                            : item.paymentStatus === "UNPAID"
                            ? "#b45309"
                            : "#b91c1c",
                      }}
                    >
                      {item.paymentStatus === "PAID" && <CheckCircleOutlined className="text-[11px]" />}
                      {item.paymentStatus === "UNPAID" && <ClockCircleOutlined className="text-[11px]" />}
                      {item.paymentStatus === "REFUNDED" && <CloseCircleOutlined className="text-[11px]" />}
                      <span>{item.paymentStatus}</span>
                    </Tag>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-text-secondary">
          <div>Showing {filtered.length} of {payments.length} transactions</div>
          <div className="flex items-center gap-2">
            <Button
              size="small"
              className="rounded-lg! border-border! bg-surface! text-text-primary! font-semibold! hover:bg-canvas!"
            >
              Previous
            </Button>
            <Button
              size="small"
              className="rounded-lg! border-border! bg-surface! text-text-primary! font-semibold! hover:bg-canvas!"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
