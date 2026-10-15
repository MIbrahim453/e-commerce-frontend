import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Tag, Progress } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DownloadOutlined,
  PlusOutlined,
  RightOutlined,
  RiseOutlined,
} from "@ant-design/icons";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("All");

  const transactions = [
    {
      id: "#SHP-94821",
      customer: "Alex Morgan",
      email: "alex.morgan@designstudio.com",
      avatar: "AM",
      avatarBg: "bg-[#e4dfff] text-[#3b00d1]",
      productsImg: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&q=80",
      productExtra: "+1",
      dateTime: "Today, 14:24",
      total: "$386.51",
      status: "Paid",
      statusType: "paid",
    },
    {
      id: "#SHP-94820",
      customer: "Elena Rostova",
      email: "elena.r@archdaily.com",
      avatar: "ER",
      avatarBg: "bg-[#f0eded] text-[#1a1a1a]",
      productsImg: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=80&q=80",
      productExtra: null,
      dateTime: "Today, 13:08",
      total: "$145.00",
      status: "Paid",
      statusType: "paid",
    },
    {
      id: "#SHP-94819",
      customer: "Marcus Vance",
      email: "m.vance@studio.co",
      avatar: "MV",
      avatarBg: "bg-[#ffdbce] text-[#9f3800]",
      productsImg: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=80&q=80",
      productExtra: "+2",
      dateTime: "Today, 11:45",
      total: "$520.00",
      status: "Pending",
      statusType: "pending",
    },
    {
      id: "#SHP-94818",
      customer: "Sophie Chen",
      email: "chen.sophie@minimal.io",
      avatar: "SC",
      avatarBg: "bg-[#e5e2e1] text-[#474556]",
      productsImg: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80&q=80",
      productExtra: null,
      dateTime: "Today, 09:15",
      total: "$260.00",
      status: "Paid",
      statusType: "paid",
    },
    {
      id: "#SHP-94817",
      customer: "Julian Thorne",
      email: "thorne@atelier.org",
      avatar: "JT",
      avatarBg: "bg-[#eae7e7] text-[#1a1a1a]",
      productsImg: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=80&q=80",
      productExtra: null,
      dateTime: "Yesterday, 18:30",
      total: "$189.00",
      status: "Refunded",
      statusType: "refunded",
    },
  ];

  const filteredTransactions = transactions.filter((t) => {
    if (activeTab === "All") return true;
    return t.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
              Executive Overview
            </h1>
          <p className="text-sm text-text-secondary mt-1">
            Real-time commerce performance and operational indicators across all channels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            icon={<DownloadOutlined className="text-text-secondary text-sm" />}
            className="rounded-full! text-xs! font-semibold! text-text-primary! bg-surface! hover:bg-canvas! border-border! h-auto! py-2.5! px-4! flex! items-center! gap-2! shadow-xs!"
          >
            Export Report
          </Button>

          <Link to="/admin/products/new">
            <Button
              type="primary"
              icon={<PlusOutlined className="text-sm" />}
              className="rounded-full! text-xs! font-bold! text-on-primary! bg-primary! hover:bg-primary/90! shadow-violet-glow! border-0! h-auto! py-2.5! px-5! flex! items-center! gap-2!"
            >
              Create new Product
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

        <div className="bg-surface rounded-card p-6 border border-border shadow-level-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-text-secondary uppercase">
              TOTAL REVENUE
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              <ArrowUpOutlined className="text-[10px]" />
              +12.4%
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              $128,430.00
            </h2>
            <p className="text-xs text-text-secondary mt-1.5 font-medium">
              Gross sales across 4 marketplaces
            </p>
          </div>
          <div className="mt-4">
            <Progress percent={65} showInfo={false} strokeColor="#5433eb" size={["100%", 4]} />
          </div>
        </div>

        {/* ACTIVE ORDERS */}
        <div className="bg-surface rounded-card p-6 border border-border shadow-level-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-text-secondary uppercase">
              ACTIVE ORDERS
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              <ArrowUpOutlined className="text-[10px]" />
              +5.1%
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              1,420 orders
            </h2>
            <p className="text-xs text-text-secondary mt-1.5 font-medium">
              86 awaiting shipment fulfillment
            </p>
          </div>
          <div className="mt-4">
            <Progress percent={50} showInfo={false} strokeColor="#413787" size={["100%", 4]} />
          </div>
        </div>

        {/* AVERAGE ORDER VALUE */}
        <div className="bg-surface rounded-card p-6 border border-border shadow-level-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-text-secondary uppercase">
              AVERAGE ORDER VALUE
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-canvas text-text-secondary">
              <ArrowDownOutlined className="text-[10px]" />
              -1.2%
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              $90.44
            </h2>
            <p className="text-xs text-text-secondary mt-1.5 font-medium">
              +$4.20 with bundle promotions
            </p>
          </div>
          <div className="mt-4">
            <Progress percent={40} showInfo={false} strokeColor="#1a1a1a" size={["100%", 4]} />
          </div>
        </div>

        {/* CONVERSION RATE */}
        <div className="bg-surface rounded-card p-6 border border-border shadow-level-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-text-secondary uppercase">
              CONVERSION RATE
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              <ArrowUpOutlined className="text-[10px]" />
              +0.6%
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              3.82%
            </h2>
            <p className="text-xs text-text-secondary mt-1.5 font-medium">
              Checkout funnel completion: 68.4%
            </p>
          </div>
          <div className="mt-4">
            <Progress percent={70} showInfo={false} strokeColor="#5433eb" size={["100%", 4]} />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MIDDLE SECTION: Sales by Category & Channel Breakdown (NO CHART)          */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Category Card */}
        <div className="bg-surface rounded-card p-6 sm:p-7 border border-border shadow-level-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-text-primary">Sales by Category</h3>
                <p className="text-xs text-text-secondary mt-0.5">4 Active Collections</p>
              </div>
              <Link to="/admin/products" className="text-xs font-semibold text-primary hover:underline">
                Details
              </Link>
            </div>

            {/* Category breakdown items with Ant Design Progress */}
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1 font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span className="text-text-primary">Electronics & Audio</span>
                  </div>
                  <span className="text-text-secondary">42% ($53,940)</span>
                </div>
                <Progress percent={42} showInfo={false} strokeColor="#5433eb" size={["100%", 7]} />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1 font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-text-primary" />
                    <span className="text-text-primary">Modern Living</span>
                  </div>
                  <span className="text-text-secondary">28% ($35,960)</span>
                </div>
                <Progress percent={28} showInfo={false} strokeColor="#1a1a1a" size={["100%", 7]} />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1 font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9f3800]" />
                    <span className="text-text-primary">Ceramics & Decor</span>
                  </div>
                  <span className="text-text-secondary">18% ($23,117)</span>
                </div>
                <Progress percent={18} showInfo={false} strokeColor="#9f3800" size={["100%", 7]} />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1 font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#787588]" />
                    <span className="text-text-primary">Studio Apparel</span>
                  </div>
                  <span className="text-text-secondary">12% ($15,413)</span>
                </div>
                <Progress percent={12} showInfo={false} strokeColor="#787588" size={["100%", 7]} />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-text-secondary">
            <span>Highest Growth: <strong className="text-text-primary">Audio (+18%)</strong></span>
            <RiseOutlined className="text-primary text-sm" />
          </div>
        </div>

        {/* Operational Indicators Card */}
        <div className="bg-surface rounded-card p-6 sm:p-7 border border-border shadow-level-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-text-primary">Channel Breakdown</h3>
                <p className="text-xs text-text-secondary mt-0.5">Active Marketplace Performance</p>
              </div>
              <span className="text-xs font-semibold text-text-secondary">Real-Time</span>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1 font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span className="text-text-primary">Online Direct Store</span>
                  </div>
                  <span className="text-text-secondary">54% ($69,352)</span>
                </div>
                <Progress percent={54} showInfo={false} strokeColor="#5433eb" size={["100%", 7]} />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1 font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-text-primary" />
                    <span className="text-text-primary">Mobile iOS & Android</span>
                  </div>
                  <span className="text-text-secondary">26% ($33,391)</span>
                </div>
                <Progress percent={26} showInfo={false} strokeColor="#1a1a1a" size={["100%", 7]} />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1 font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#413787]" />
                    <span className="text-text-primary">Wholesale Partners</span>
                  </div>
                  <span className="text-text-secondary">14% ($17,980)</span>
                </div>
                <Progress percent={14} showInfo={false} strokeColor="#413787" size={["100%", 7]} />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1 font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9f3800]" />
                    <span className="text-text-primary">Social Marketplaces</span>
                  </div>
                  <span className="text-text-secondary">6% ($7,707)</span>
                </div>
                <Progress percent={6} showInfo={false} strokeColor="#9f3800" size={["100%", 7]} />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-text-secondary">
            <span>Projected Month-End: <strong className="text-text-primary">$142,500.00</strong></span>
            <span className="text-primary font-bold">Q2 Target: 92%</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RECENT TRANSACTIONS (Tabs become active with a bg cell)                    */}
      {/* ========================================================================= */}
      <div className="bg-surface rounded-card p-6 sm:p-7 border border-border shadow-level-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-text-primary">Recent Transactions</h3>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Live Feed
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Filter Tabs: When clicked, becomes active with a distinct bg cell */}
            <div className="flex items-center gap-1 bg-canvas p-1 rounded-full text-xs font-semibold">
              {["All", "Paid", "Pending"].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
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

            <Link
              to="/admin/orders"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 shrink-0"
            >
              <span>View All Orders</span>
              <RightOutlined className="text-[10px]" />
            </Link>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border text-text-secondary text-[11px] uppercase tracking-wider font-bold">
                <th className="py-3.5 px-4 font-bold">ORDER ID</th>
                <th className="py-3.5 px-4 font-bold">CUSTOMER</th>
                <th className="py-3.5 px-4 font-bold">PRODUCTS</th>
                <th className="py-3.5 px-4 font-bold">DATE & TIME</th>
                <th className="py-3.5 px-4 font-bold">TOTAL</th>
                <th className="py-3.5 px-4 font-bold text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-canvas/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-primary">
                    <Link to="/admin/orders" className="hover:underline">
                      {tx.id}
                    </Link>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full font-bold text-[11px] flex items-center justify-center shrink-0 border border-border ${tx.avatarBg}`}
                      >
                        {tx.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-text-primary truncate leading-tight">
                          {tx.customer}
                        </p>
                        <p className="text-[11px] text-text-secondary truncate leading-tight">
                          {tx.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      <img
                        src={tx.productsImg}
                        alt="Product preview"
                        className="w-8 h-8 rounded-lg object-cover border border-border"
                      />
                      {tx.productExtra && (
                        <span className="text-[11px] font-bold text-text-secondary bg-canvas px-1.5 py-0.5 rounded-md">
                          {tx.productExtra}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-text-secondary font-medium">
                    {tx.dateTime}
                  </td>

                  <td className="py-4 px-4 font-bold text-text-primary">
                    {tx.total}
                  </td>

                  <td className="py-4 px-4 text-right">
                    <Tag
                      className="rounded-full! px-3! py-0.5! text-xs! font-bold! border-0! m-0! inline-flex! items-center! gap-1.5!"
                      style={{
                        backgroundColor:
                          tx.statusType === "paid"
                            ? "rgba(84, 51, 235, 0.1)"
                            : tx.statusType === "pending"
                            ? "#fffbeb"
                            : "#f2f4f5",
                        color:
                          tx.statusType === "paid"
                            ? "#5433eb"
                            : tx.statusType === "pending"
                            ? "#b45309"
                            : "#6b7280",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor:
                            tx.statusType === "paid"
                              ? "#5433eb"
                              : tx.statusType === "pending"
                              ? "#f59e0b"
                              : "#9ca3af",
                        }}
                      />
                      {tx.status}
                    </Tag>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-text-secondary">
          <div>Showing 5 of 1,420 transactions</div>
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
