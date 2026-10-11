import React, { useState } from "react";
import { Button, Input, Tag } from "antd";
import {
  CalendarOutlined,
  ExportOutlined,
  CheckOutlined,
  SearchOutlined,
  BarsOutlined,
  CloseOutlined,
  PrinterOutlined,
  FileTextOutlined,
  SendOutlined,
  EnvironmentOutlined,
  FilterOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

export default function AdminOrders() {
  const [activeTab, setActiveTab] = useState("Unfulfilled");
  const [selectedOrderId, setSelectedOrderId] = useState("#SH-8921");
  const [drawerOpen, setDrawerOpen] = useState(true);

  const tabs = [
    { label: "All Orders", count: 420 },
    { label: "Unfulfilled", count: 34 },
    { label: "Awaiting Shipment", count: 18 },
    { label: "Fulfilled", count: 362 },
    { label: "Returned / Cancelled", count: 6 },
  ];

  const orders = [
    {
      id: "#SH-8921",
      dateTime: "Today, 14:24",
      customer: "Alex Morgan",
      avatar: "AM",
      items: "2 items",
      destination: "New York, USA",
      total: "$386.51",
      checked: true,
    },
    {
      id: "#SH-8920",
      dateTime: "Today, 13:48",
      customer: "Elena Rostova",
      avatar: "ER",
      items: "1 item",
      destination: "London, UK",
      total: "$145.00",
      checked: false,
    },
    {
      id: "#SH-8919",
      dateTime: "Today, 12:15",
      customer: "Marcus Vance",
      avatar: "MV",
      items: "3 items",
      destination: "Berlin, Germany",
      total: "$520.00",
      checked: false,
    },
    {
      id: "#SH-8918",
      dateTime: "Today, 10:30",
      customer: "Sophie Chen",
      avatar: "SC",
      items: "1 item",
      destination: "San Francisco, USA",
      total: "$260.00",
      checked: false,
    },
    {
      id: "#SH-8917",
      dateTime: "Yesterday, 18:05",
      customer: "Julian Thorne",
      avatar: "JT",
      items: "2 items",
      destination: "Paris, France",
      total: "$189.00",
      checked: false,
    },
    {
      id: "#SH-8916",
      dateTime: "Yesterday, 16:20",
      customer: "Clara Oswald",
      avatar: "CO",
      items: "4 items",
      destination: "Toronto, Canada",
      total: "$412.80",
      checked: false,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ========================================================================= */}
      {/* HEADER SECTION                                                            */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
              Orders & Fulfillment
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live Sync Active
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Average processing time: <strong>3.8h</strong></span>
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-surface rounded-full border border-border text-xs font-semibold text-text-primary shadow-2xs">
            <CalendarOutlined className="text-text-secondary" />
            <span>Today, May 18</span>
          </div>

          <Button
            icon={<FilterOutlined className="text-text-secondary" />}
            className="rounded-full! text-xs! font-semibold! text-text-primary! bg-surface! hover:bg-canvas! border-border! h-auto! py-2! px-3.5!"
          >
            Filters
          </Button>

          <Button
            icon={<ExportOutlined className="text-text-secondary" />}
            className="rounded-full! text-xs! font-semibold! text-text-primary! bg-surface! hover:bg-canvas! border-border! h-auto! py-2! px-3.5!"
          >
            Export
          </Button>

          <Button
            type="primary"
            icon={<CheckOutlined />}
            className="rounded-full! text-xs! font-bold! text-on-primary! bg-primary! hover:bg-primary/90! shadow-violet-glow! border-0! h-auto! py-2! px-5!"
          >
            Bulk Fulfill
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STATUS TABS - When clicked, becomes active with a distinct bg cell        */}
      {/* ========================================================================= */}
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
                  ? "bg-[#f0eded]! text-text-primary! font-bold! shadow-2xs!"
                  : "bg-surface text-text-secondary hover:text-text-primary border border-border"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  isActive ? "bg-white text-text-primary shadow-2xs" : "bg-canvas text-text-primary"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* MAIN LAYOUT: Orders Table on left, Order Details Drawer on right          */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Orders Table */}
        <div className={`transition-all ${drawerOpen ? "lg:col-span-7" : "lg:col-span-12"} bg-surface rounded-card p-5 sm:p-6 border border-border shadow-level-1`}>
          {/* Table Search & Batch Select Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="relative flex-1 max-w-sm">
              <Input
                placeholder="Search order ID, recipient, SKU..."
                prefix={<SearchOutlined className="text-text-secondary text-sm mr-1.5" />}
                className="rounded-full! py-2! px-3.5! bg-canvas! hover:bg-[#eae7e7]! focus:bg-surface! border-transparent! focus:border-primary! text-xs!"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-text-secondary">Batch:</span>
              <Button
                size="small"
                className="rounded-full! border-border! text-xs! font-semibold! text-text-primary! bg-surface! hover:bg-canvas!"
              >
                Select All (34)
              </Button>
              <div className="p-1.5 rounded-lg border border-border text-text-secondary flex items-center justify-center">
                <BarsOutlined className="text-sm" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border text-text-secondary text-[10px] uppercase tracking-wider font-bold">
                  <th className="py-3 px-3 w-8">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                  </th>
                  <th className="py-3 px-3 font-bold">ORDER ID</th>
                  <th className="py-3 px-3 font-bold">DATE & TIME</th>
                  <th className="py-3 px-3 font-bold">CUSTOMER</th>
                  <th className="py-3 px-3 font-bold">ITEMS</th>
                  <th className="py-3 px-3 font-bold">DESTINATION</th>
                  <th className="py-3 px-3 font-bold text-right">TOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70">
                {orders.map((ord) => {
                  const isSelected = selectedOrderId === ord.id;
                  return (
                    <tr
                      key={ord.id}
                      onClick={() => {
                        setSelectedOrderId(ord.id);
                        setDrawerOpen(true);
                      }}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-primary/5 border-l-4 border-primary"
                          : "hover:bg-canvas/60"
                      }`}
                    >
                      <td className="py-3.5 px-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          defaultChecked={ord.checked}
                          className="rounded border-border text-primary focus:ring-primary cursor-pointer"
                        />
                      </td>

                      <td className="py-3.5 px-3 font-bold text-primary">
                        {ord.id}
                      </td>

                      <td className="py-3.5 px-3 text-text-secondary font-medium whitespace-nowrap">
                        {ord.dateTime}
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-canvas text-text-primary font-bold text-[10px] flex items-center justify-center shrink-0 border border-border">
                            {ord.avatar}
                          </div>
                          <span className="font-bold text-text-primary truncate max-w-[120px]">
                            {ord.customer}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-text-secondary">
                        <span className="bg-canvas px-2 py-0.5 rounded-full font-bold text-[10px] text-text-primary">
                          {ord.items}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-text-secondary truncate max-w-[120px]">
                        {ord.destination}
                      </td>

                      <td className="py-3.5 px-3 text-right font-extrabold text-text-primary">
                        {ord.total}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs text-text-secondary">
            <div>Showing 1-6 of 34 unfulfilled orders</div>

            <div className="flex items-center gap-1.5">
              <Button
                size="small"
                className="rounded-lg! border-border! bg-surface! text-text-secondary! font-semibold! hover:bg-canvas!"
              >
                Prev
              </Button>
              <button
                type="button"
                className="w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer border-0 bg-[#5433eb] text-white"
              >
                1
              </button>
              <button
                type="button"
                className="w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer border border-border bg-surface text-text-primary hover:bg-canvas"
              >
                2
              </button>
              <Button
                size="small"
                className="rounded-lg! border-border! bg-surface! text-text-primary! font-semibold! hover:bg-canvas!"
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: ORDER DETAILS SPLIT DRAWER (Exact match to Image 3) */}
        {drawerOpen && (
          <div className="lg:col-span-5 bg-surface rounded-card p-6 border border-border shadow-level-1 sticky top-24 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-border">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-extrabold text-text-primary">
                    Order #SH-8921
                  </h2>
                  <Tag
                    color="purple"
                    className="rounded-full! px-2.5! py-0.5! text-xs! font-bold! border-0! m-0! bg-[#e4dfff]! text-[#3b00d1]!"
                  >
                    Awaiting
                  </Tag>
                </div>
                <p className="text-[11px] text-text-secondary mt-0.5">
                  Placed May 18, 2025 • 14:24 EDT
                </p>
              </div>

              <Button
                type="text"
                shape="circle"
                icon={<CloseOutlined className="text-text-secondary" />}
                onClick={() => setDrawerOpen(false)}
                className="hover:bg-canvas!"
              />
            </div>

            {/* FULFILLMENT PROGRESS TRACKER (Stage 3 of 4) */}
            <div className="bg-[#fcf9f8] p-4 rounded-2xl border border-border">
              <div className="flex items-center justify-between text-xs mb-4 font-bold text-text-primary">
                <span className="uppercase tracking-wider text-[11px] text-text-secondary">
                  FULFILLMENT PROGRESS
                </span>
                <span className="text-primary font-bold">Stage 3 of 4</span>
              </div>

              {/* Steps */}
              <div className="relative flex items-center justify-between px-2">
                <div className="absolute top-3.5 left-4 right-4 h-0.5 bg-border -z-0" />
                <div
                  className="absolute top-3.5 left-4 h-0.5 bg-primary -z-0"
                  style={{ width: "66%" }}
                />

                {/* Step 1: Paid */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-primary text-on-primary shadow-xs">
                    <CheckOutlined className="text-[10px]" />
                  </div>
                  <span className="text-[10px] font-bold text-text-primary">Paid</span>
                </div>

                {/* Step 2: Packed */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-primary text-on-primary shadow-xs">
                    <CheckOutlined className="text-[10px]" />
                  </div>
                  <span className="text-[10px] font-bold text-text-primary">Packed</span>
                </div>

                {/* Step 3: Ship */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-primary text-on-primary ring-4 ring-primary/20 shadow-xs">
                    <SendOutlined className="text-[10px]" />
                  </div>
                  <span className="text-[10px] font-bold text-primary">Ship</span>
                </div>

                {/* Step 4: Delivery */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-surface border-2 border-border text-text-secondary">
                    <CheckOutlined className="text-[10px]" />
                  </div>
                  <span className="text-[10px] font-bold text-text-secondary">Delivery</span>
                </div>
              </div>
            </div>

            {/* RECIPIENT & COURIER */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-text-secondary uppercase tracking-wider">
                <span>RECIPIENT & COURIER</span>
                <span className="text-primary cursor-pointer hover:underline">Edit Info</span>
              </div>

              <div className="bg-[#fcf9f8] p-4 rounded-2xl border border-border space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                    AM
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-text-primary">Alex Morgan</p>
                    <p className="text-text-secondary">alex.morgan@designstudio.com</p>
                    <p className="text-text-secondary">+1 (555) 234-8901</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border text-xs text-text-primary flex gap-2">
                  <EnvironmentOutlined className="text-text-secondary text-sm shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-text-secondary text-[11px]">Shipping Address</p>
                    <p className="font-semibold">42 Mercer Street, Apt 4B, SoHo</p>
                    <p className="text-text-secondary">New York, NY 10013, United States</p>
                  </div>
                </div>

                {/* Courier Card */}
                <div className="p-2.5 bg-surface rounded-xl border border-border flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <SendOutlined className="text-primary text-sm" />
                    <div>
                      <p className="font-bold text-text-primary">Apex Express Priority Air</p>
                      <p className="text-[10px] text-text-secondary">TRACK: #APX-88219-NY</p>
                    </div>
                  </div>
                  <Tag className="rounded-full! px-2! py-0.5! text-[10px] font-bold! border-0! m-0! bg-canvas! text-text-primary!">
                    Next-Day
                  </Tag>
                </div>
              </div>
            </div>

            {/* ORDERED ITEMS (2), Weight: 1.2 kg */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-text-secondary uppercase tracking-wider">
                <span>ORDERED ITEMS (2)</span>
                <span>Weight: 1.2 kg</span>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 bg-[#fcf9f8] rounded-2xl border border-border flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80"
                      alt="Headset"
                      className="w-12 h-12 rounded-xl object-cover border border-border shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-text-primary truncate">Acoustic Studio Headset 01</p>
                      <p className="text-[11px] text-text-secondary">
                        Color: Sand White • Qty: 1
                      </p>
                    </div>
                  </div>
                  <span className="font-extrabold text-text-primary shrink-0">$260.00</span>
                </div>

                <div className="p-3 bg-[#fcf9f8] rounded-2xl border border-border flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=100&q=80"
                      alt="Sleeve"
                      className="w-12 h-12 rounded-xl object-cover border border-border shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-text-primary truncate">Artisan Leather Sleeve 14"</p>
                      <p className="text-[11px] text-text-secondary">
                        Color: Chestnut • Qty: 1
                      </p>
                    </div>
                  </div>
                  <span className="font-extrabold text-text-primary shrink-0">$126.51</span>
                </div>
              </div>
            </div>

            {/* FINANCIAL BREAKDOWN */}
            <div className="pt-3 border-t border-border space-y-2 text-xs">
              <div className="flex justify-between text-text-secondary">
                <span>Subtotal</span>
                <span className="font-semibold text-text-primary">$386.51</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Next-Day Air Shipping</span>
                <span className="font-bold text-emerald-600">FREE ($0.00)</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Estimated Sales Tax (8.875%)</span>
                <span className="font-medium text-text-primary">Included</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border text-sm font-extrabold text-text-primary">
                <span>Total Amount</span>
                <span className="text-lg text-primary">$386.51</span>
              </div>
              <p className="text-[10px] text-text-secondary">
                Paid via Apple Pay (Studio Verified)
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="pt-2 space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  icon={<FileTextOutlined className="text-sm" />}
                  className="py-2.5! h-auto! rounded-full! border-border! text-xs! font-semibold! text-text-primary! bg-surface! hover:bg-canvas! flex! items-center! justify-center! gap-1.5!"
                >
                  Packing Slip
                </Button>
                <Button
                  icon={<PrinterOutlined className="text-sm" />}
                  className="py-2.5! h-auto! rounded-full! border-border! text-xs! font-semibold! text-text-primary! bg-surface! hover:bg-canvas! flex! items-center! justify-center! gap-1.5!"
                >
                  Print Label
                </Button>
              </div>

              <Button
                type="primary"
                icon={<ArrowRightOutlined className="text-xs" />}
                className="w-full! py-3.5! h-auto! rounded-full! bg-primary! hover:bg-primary/90! text-on-primary! text-xs! font-bold! shadow-violet-glow! flex! items-center! justify-center! gap-2! border-0!"
              >
                Mark as Shipped & Notify
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
