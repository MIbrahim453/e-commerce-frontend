import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Switch, Select, Tag } from "antd";
import {
  PictureOutlined,
  PlusOutlined,
  DeleteOutlined,
  ArrowRightOutlined,
  CloseOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

export default function AdminAddProduct() {
  const [trackInventory, setTrackInventory] = useState(true);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* ========================================================================= */}
      {/* BREADCRUMB & TOP ACTIONS (Matching Image 4)                               */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
            <Link to="/admin/products" className="hover:text-primary transition-colors">
              Products
            </Link>
            <span>&gt;</span>
            <span className="text-text-primary">Add New Product</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary mt-1">
            Add New Product
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/products">
            <Button className="rounded-full! text-xs! font-semibold! text-text-primary! bg-surface! hover:bg-canvas! border-border! h-auto! py-2! px-4!">
              Save as Draft
            </Button>
          </Link>

          <Link to="/admin/products">
            <Button
              type="primary"
              icon={<ArrowRightOutlined className="text-xs" />}
              className="rounded-full! text-xs! font-bold! text-on-primary! bg-primary! hover:bg-primary/90! shadow-violet-glow! border-0! h-auto! py-2.5! px-6! flex! items-center! gap-2!"
            >
              Publish Product
            </Button>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2-COLUMN LAYOUT (Image 4)                                                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================================= */}
        {/* LEFT COLUMN (8 cols)                                                    */}
        {/* ======================================================================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. General Information */}
          <div className="bg-surface rounded-card p-6 sm:p-7 border border-border shadow-level-1 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-text-primary">General Information</h2>
              <span className="text-[11px] font-semibold text-text-secondary bg-canvas px-2.5 py-0.5 rounded-full">
                Core Attributes
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                TITLE
              </label>
              <Input
                defaultValue="Ergonomic Studio Chair"
                className="py-2.5! px-4! bg-canvas! focus:bg-surface! text-sm! font-semibold! text-text-primary! rounded-2xl! border-transparent! focus:border-primary!"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                DESCRIPTION
              </label>
              <div className="border border-border rounded-2xl overflow-hidden focus-within:border-primary transition-colors bg-surface">
                {/* Text Formatting Toolbar */}
                <div className="bg-[#fcf9f8] px-4 py-2 border-b border-border flex items-center gap-4 text-text-secondary text-xs">
                  <span className="font-bold cursor-pointer hover:text-text-primary">B</span>
                  <span className="italic cursor-pointer hover:text-text-primary">I</span>
                  <span className="cursor-pointer hover:text-text-primary">🔗</span>
                  <span className="cursor-pointer hover:text-text-primary">☰</span>
                  <span className="cursor-pointer hover:text-text-primary">:::</span>
                  <span className="cursor-pointer hover:text-text-primary">❝</span>
                  <span className="cursor-pointer hover:text-text-primary">&lt;/&gt;</span>
                </div>
                <Input.TextArea
                  rows={4}
                  defaultValue="Sculpted with cold-cure memory foam and encased in hand-loomed oatmeal virgin wool. The cast aluminum base is bead-blasted to an ultra-soft matte texture, ensuring seamless kinetic mobility across natural hardwood and micro-cement atelier floors."
                  className="p-4! border-0! shadow-none! text-xs! text-text-primary! leading-relaxed! outline-none! resize-none! font-normal!"
                />
              </div>
            </div>
          </div>

          {/* 2. Product Photography */}
          <div className="bg-surface rounded-card p-6 sm:p-7 border border-border shadow-level-1 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-text-primary">Product Photography</h2>
                <p className="text-xs text-text-secondary">
                  Upload high-resolution editorial imagery (PNG, JPG, or WEBP up to 25MB)
                </p>
              </div>
              <PictureOutlined className="text-lg text-text-secondary" />
            </div>

            {/* Drag & Drop Area */}
            <div className="p-8 rounded-2xl border-2 border-dashed border-border hover:border-primary bg-canvas/40 hover:bg-canvas transition-colors text-center cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center mx-auto text-primary text-xl mb-3 shadow-2xs">
                <PictureOutlined />
              </div>
              <p className="text-xs text-text-secondary">
                Drag high-resolution product photos here or{" "}
                <span className="text-primary font-bold hover:underline">browse files</span>
              </p>
              <p className="text-[11px] text-text-secondary/70 mt-1">
                Editorial studio shots with neutral backgrounds recommended
              </p>
            </div>

            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {/* Primary Slot */}
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-canvas">
                <img
                  src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&q=80"
                  alt="Chair main"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-text-primary/80 text-white text-[10px] font-bold">
                  Primary
                </span>
              </div>

              {/* Slot 2 */}
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-canvas">
                <img
                  src="https://images.unsplash.com/photo-1580481077195-c328a37db71a?w=300&q=80"
                  alt="Chair detail"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Add Slot */}
              <button
                type="button"
                className="aspect-square rounded-2xl border-2 border-dashed border-border hover:border-primary bg-canvas/30 hover:bg-primary/5 transition-colors flex flex-col items-center justify-center gap-1 text-text-secondary hover:text-primary cursor-pointer"
              >
                <PlusOutlined className="text-base" />
                <span className="text-[11px] font-semibold">Add Slot</span>
              </button>

              {/* Empty Frame */}
              <div className="aspect-square rounded-2xl border border-dashed border-border bg-canvas/20 flex items-center justify-center text-text-secondary/40">
                <PictureOutlined className="text-xl" />
              </div>
            </div>

            {/* Unsaved changes footer pill */}
            <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-text-secondary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Unsaved changes detected
              </span>
              <div className="flex items-center gap-2">
                <Button size="small" className="rounded-full! border-border! bg-surface! text-xs! font-semibold!">
                  Discard
                </Button>
                <Button
                  type="primary"
                  size="small"
                  className="rounded-full! bg-primary! text-on-primary! text-xs! font-bold! border-0!"
                >
                  Publish Product
                </Button>
              </div>
            </div>
          </div>

          {/* 3. Pricing & Stock */}
          <div className="bg-surface rounded-card p-6 sm:p-7 border border-border shadow-level-1 space-y-5">
            <div>
              <h2 className="text-base font-bold text-text-primary">Pricing & Stock</h2>
              <p className="text-xs text-text-secondary">
                Manage commercial values, profit margins, and warehouse availability
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                  PRICE ($)
                </label>
                <Input
                  prefix={<span className="font-bold text-text-secondary mr-1">$</span>}
                  defaultValue="260.00"
                  className="py-2.5! px-3.5! bg-canvas! focus:bg-surface! text-sm! font-bold! text-text-primary! rounded-2xl! border-transparent! focus:border-primary!"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                  COMPARE-AT PRICE ($)
                </label>
                <Input
                  prefix={<span className="font-bold text-text-secondary mr-1">$</span>}
                  defaultValue="320.00"
                  className="py-2.5! px-3.5! bg-canvas! focus:bg-surface! text-sm! font-bold! text-text-primary! rounded-2xl! border-transparent! focus:border-primary!"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                    COST PER ITEM ($)
                  </span>
                  <span className="text-[11px] font-bold text-primary">55.8% Margin</span>
                </div>
                <Input
                  prefix={<span className="font-bold text-text-secondary mr-1">$</span>}
                  defaultValue="115.00"
                  className="py-2.5! px-3.5! bg-canvas! focus:bg-surface! text-sm! font-bold! text-text-primary! rounded-2xl! border-transparent! focus:border-primary!"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                  SKU / BARCODE
                </label>
                <Input
                  defaultValue="SHP-CHR-092"
                  className="py-2.5! px-3.5! bg-canvas! focus:bg-surface! text-sm! font-bold! text-text-primary! rounded-2xl! border-transparent! focus:border-primary!"
                />
              </div>
            </div>

            {/* Track Inventory Switch using Ant Design Switch */}
            <div className="p-4 rounded-2xl bg-canvas border border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Switch
                  checked={trackInventory}
                  onChange={(checked) => setTrackInventory(checked)}
                  style={{ backgroundColor: trackInventory ? "#5433eb" : undefined }}
                />
                <div>
                  <p className="text-xs font-bold text-text-primary">Track inventory quantity</p>
                  <p className="text-[11px] text-text-secondary">
                    Maintain physical warehouse stock alerts automatically
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-text-primary bg-surface px-3 py-1.5 rounded-full border border-border">
                45 units in warehouse
              </span>
            </div>
          </div>

          {/* 4. Product Variants */}
          <div className="bg-surface rounded-card p-6 sm:p-7 border border-border shadow-level-1 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-text-primary">Product Variants</h2>
                <p className="text-xs text-text-secondary">
                  Configure sizes, colors, finishes, and specific inventory units
                </p>
              </div>

              <Button
                size="small"
                icon={<PlusOutlined className="text-xs" />}
                className="rounded-full! bg-canvas! hover:bg-[#eae7e7]! text-xs! font-bold! text-text-primary! border-0!"
              >
                Add Option
              </Button>
            </div>

            {/* Variant Option Chips */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-text-secondary w-16">COLOR:</span>
                <Tag className="rounded-full! px-3! py-1! bg-canvas! text-text-primary! font-semibold! border-0! m-0! inline-flex! items-center! gap-1.5!">
                  <span className="w-2 h-2 rounded-full bg-[#e4dfff]" />
                  Oatmeal Cream
                  <CloseOutlined className="text-[10px] text-text-secondary cursor-pointer" />
                </Tag>
                <Tag className="rounded-full! px-3! py-1! bg-canvas! text-text-primary! font-semibold! border-0! m-0! inline-flex! items-center! gap-1.5!">
                  <span className="w-2 h-2 rounded-full bg-[#787588]" />
                  Basalt Gray
                  <CloseOutlined className="text-[10px] text-text-secondary cursor-pointer" />
                </Tag>
                <Tag className="rounded-full! px-3! py-1! bg-canvas! text-text-primary! font-semibold! border-0! m-0! inline-flex! items-center! gap-1.5!">
                  <span className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
                  Obsidian Black
                  <CloseOutlined className="text-[10px] text-text-secondary cursor-pointer" />
                </Tag>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-text-secondary w-16">FINISH:</span>
                <Tag className="rounded-full! px-3! py-1! bg-canvas! text-text-primary! font-semibold! border-0! m-0! inline-flex! items-center! gap-1.5!">
                  Brushed Aluminum
                  <CloseOutlined className="text-[10px] text-text-secondary cursor-pointer" />
                </Tag>
                <Tag className="rounded-full! px-3! py-1! bg-canvas! text-text-primary! font-semibold! border-0! m-0! inline-flex! items-center! gap-1.5!">
                  Matte Walnut
                  <CloseOutlined className="text-[10px] text-text-secondary cursor-pointer" />
                </Tag>
              </div>
            </div>

            {/* Variants Table Items */}
            <div className="space-y-2.5 pt-2">
              {/* Item 1 */}
              <div className="p-3.5 bg-canvas rounded-2xl border border-border flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface border border-border text-text-primary font-bold text-[10px] flex items-center justify-center">
                    OC
                  </div>
                  <div>
                    <p className="font-bold text-text-primary">
                      Oatmeal Cream / Brushed Aluminum
                    </p>
                    <p className="text-[11px] text-text-secondary">Default Presentation</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-text-primary">$260.00</span>
                  <span className="text-text-secondary font-mono text-[11px]">SHP-CHR-092-OC</span>
                  <span className="bg-surface px-2.5 py-1 rounded-lg border border-border font-bold text-text-primary text-[11px]">
                    18 units
                  </span>
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    className="p-0!"
                  />
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-3.5 bg-canvas rounded-2xl border border-border flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface border border-border text-text-primary font-bold text-[10px] flex items-center justify-center">
                    BG
                  </div>
                  <div>
                    <p className="font-bold text-text-primary">
                      Basalt Gray / Brushed Aluminum
                    </p>
                    <p className="text-[11px] text-text-secondary">Secondary</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-text-primary">$260.00</span>
                  <span className="text-text-secondary font-mono text-[11px]">SHP-CHR-092-BX</span>
                  <span className="bg-surface px-2.5 py-1 rounded-lg border border-border font-bold text-text-primary text-[11px]">
                    14 units
                  </span>
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    className="p-0!"
                  />
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-3.5 bg-canvas rounded-2xl border border-border flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface border border-border text-text-primary font-bold text-[10px] flex items-center justify-center">
                    OB
                  </div>
                  <div>
                    <p className="font-bold text-text-primary">
                      Obsidian Black / Matte Walnut
                    </p>
                    <p className="text-[11px] text-text-secondary">Premium Edition</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-text-primary">$295.00</span>
                  <span className="text-text-secondary font-mono text-[11px]">SHP-CHR-092-OE</span>
                  <span className="bg-surface px-2.5 py-1 rounded-lg border border-border font-bold text-text-primary text-[11px]">
                    13 units
                  </span>
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    className="p-0!"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN (4 cols)                                                   */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. Publishing Status */}
          <div className="bg-surface rounded-card p-6 border border-border shadow-level-1 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-text-primary">Publishing Status</h3>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
            </div>

            <div>
              <Select
                defaultValue="active"
                className="w-full text-xs font-bold"
                options={[
                  { value: "active", label: "Active • Available online" },
                  { value: "draft", label: "Draft • Offline" },
                ]}
              />
            </div>

            {/* Sales Channels Checkboxes */}
            <div className="space-y-3 pt-2 border-t border-border">
              <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block">
                SALES CHANNELS
              </span>

              <label className="flex items-start gap-3 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-border text-primary focus:ring-primary mt-0.5"
                />
                <div>
                  <p className="font-bold text-text-primary">Online Store</p>
                  <p className="text-[11px] text-text-secondary">shop.studio/collections</p>
                </div>
              </label>

              <label className="flex items-start gap-3 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-border text-primary focus:ring-primary mt-0.5"
                />
                <div>
                  <p className="font-bold text-text-primary">Mobile App</p>
                  <p className="text-[11px] text-text-secondary">iOS and Android app feeds</p>
                </div>
              </label>

              <label className="flex items-start gap-3 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-border text-primary focus:ring-primary mt-0.5"
                />
                <div>
                  <p className="font-bold text-text-primary">Social Marketplace</p>
                  <p className="text-[11px] text-text-secondary">TikTok & Instagram sync</p>
                </div>
              </label>
            </div>
          </div>

          {/* 2. Organization */}
          <div className="bg-surface rounded-card p-6 border border-border shadow-level-1 space-y-4">
            <h3 className="text-sm font-bold text-text-primary">Organization</h3>

            <div>
              <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                CATEGORY
              </label>
              <Select
                defaultValue="modern"
                className="w-full text-xs font-semibold"
                options={[
                  { value: "modern", label: "Modern Living & Furniture" },
                  { value: "audio", label: "Electronics & Audio" },
                  { value: "decor", label: "Ceramics & Decor" },
                ]}
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                PRODUCT TYPE
              </label>
              <Input
                defaultValue="Seating / Lounge"
                className="py-2! px-3! bg-canvas! text-xs! font-semibold! text-text-primary! rounded-2xl! border-transparent! focus:border-primary!"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                BRAND / VENDOR
              </label>
              <Input
                defaultValue="Studio Atelier"
                className="py-2! px-3! bg-canvas! text-xs! font-semibold! text-text-primary! rounded-2xl! border-transparent! focus:border-primary!"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                TAGS
              </label>
              <div className="flex items-center gap-1.5 flex-wrap text-xs">
                {["Ergonomic", "Minimalist", "Lounge", "Made in Italy"].map((tag) => (
                  <Tag
                    key={tag}
                    className="inline-flex! items-center! gap-1! px-2.5! py-1! rounded-full! bg-canvas! text-text-primary! font-semibold! text-[11px]! border-0! m-0!"
                  >
                    {tag}
                    <CloseOutlined className="text-[9px] text-text-secondary cursor-pointer" />
                  </Tag>
                ))}
                <Button
                  size="small"
                  className="rounded-full! border-border! text-[11px]! font-bold! text-text-secondary! hover:text-text-primary! bg-surface!"
                >
                  + Add Tag
                </Button>
              </div>
            </div>
          </div>

          {/* 3. Search Engine Listing */}
          <div className="bg-surface rounded-card p-6 border border-border shadow-level-1 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-text-primary">Search Engine Listing</h3>
              <GlobalOutlined className="text-text-secondary text-sm" />
            </div>

            <div className="bg-canvas p-4 rounded-2xl space-y-1.5 text-xs">
              <p className="text-[10px] text-text-secondary font-mono truncate">
                https://shop.studio/products/ergonomic-studio-...
              </p>
              <h4 className="font-bold text-primary hover:underline cursor-pointer leading-tight">
                Ergonomic Studio Chair | Shop Official Atelier
              </h4>
              <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-3">
                Crafted with brushed aluminum and premium textured fabric, the Ergonomic Studio Chair brings timeless minimalist poise to modern spaces...
              </p>
            </div>

            <Button
              type="link"
              className="text-xs! font-bold! text-primary! hover:underline! flex! items-center! gap-1! p-0!"
            >
              <span>Edit website SEO metadata</span>
              <ArrowRightOutlined className="text-[10px]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
