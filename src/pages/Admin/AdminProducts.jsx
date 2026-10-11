import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Select, Tag } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

export default function AdminProducts() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const products = [
    {
      id: "SHP-CHR-092",
      name: "Ergonomic Studio Lounge Chair",
      price: "$260.00",
      compareAt: "$320.00",
      discount: "18% off",
      thumbnail: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80",
      category: "Modern Living & Furniture",
      type: "Seating / Lounge",
      vendor: "Studio Atelier",
      stock: "45 units",
      isTrending: true,
      isNewArrival: true,
      sizes: ["Standard (18)", "High-Back (14)", "Ottoman (13)"],
    },
    {
      id: "SHP-AUD-101",
      name: "Acoustic Studio Headset 01",
      price: "$260.00",
      compareAt: "$260.00",
      discount: null,
      thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
      category: "Electronics & Audio",
      type: "Audio Hardware",
      vendor: "Acoustic Lab",
      stock: "24 units",
      isTrending: true,
      isNewArrival: false,
      sizes: ["Sand White (24)"],
    },
    {
      id: "SHP-LTH-214",
      name: 'Artisan Leather Sleeve 14"',
      price: "$126.51",
      compareAt: "$145.00",
      discount: "12% off",
      thumbnail: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80",
      category: "Studio Apparel & Accessories",
      type: "Leather Goods",
      vendor: "Atelier Guild",
      stock: "23 units",
      isTrending: false,
      isNewArrival: true,
      sizes: ['14" (15)', '16" (8)'],
    },
    {
      id: "SHP-CRM-405",
      name: "Minimalist Stoneware Carafe & Tumbler",
      price: "$94.00",
      compareAt: "$94.00",
      discount: null,
      thumbnail: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&q=80",
      category: "Ceramics & Decor",
      type: "Dining & Tableware",
      vendor: "Studio Atelier",
      stock: "32 units",
      isTrending: false,
      isNewArrival: false,
      sizes: ["750ml (32)"],
    },
    {
      id: "SHP-LMP-812",
      name: "Modular Cast Aluminum Desk Lamp",
      price: "$173.33",
      compareAt: "$195.00",
      discount: "10% off",
      thumbnail: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80",
      category: "Modern Living & Furniture",
      type: "Lighting",
      vendor: "Studio Atelier",
      stock: "16 units",
      isTrending: true,
      isNewArrival: false,
      sizes: ["Matte Black (16)"],
    },
    {
      id: "SHP-WOL-309",
      name: "Heavyweight Studio Overshirt",
      price: "$260.00",
      compareAt: "$260.00",
      discount: null,
      thumbnail: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
      category: "Studio Apparel & Accessories",
      type: "Apparel",
      vendor: "Atelier Guild",
      stock: "19 units",
      isTrending: false,
      isNewArrival: true,
      sizes: ["S (4)", "M (8)", "L (7)"],
    },
  ];

  const filtered = products.filter((p) => {
    if (selectedCategory !== "all" && !p.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header with prominent Add Product Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
            Products & Catalog
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Manage commercial values, warehouse stock, categories, and marketplace tags.
          </p>
        </div>

        {/* The Add Product Button: clicking navigates to the Add Product page */}
        <Button
          type="primary"
          icon={<PlusOutlined className="text-sm" />}
          onClick={() => navigate("/admin/products/new")}
          className="rounded-full! text-xs! font-bold! text-on-primary! bg-primary! hover:bg-primary/90! shadow-violet-glow! border-0! h-auto! py-2.5! px-6! flex! items-center! gap-2!"
        >
          Add New Product
        </Button>
      </div>

      {/* Summary KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-surface rounded-card p-4 border border-border shadow-xs">
          <p className="text-[11px] font-bold text-text-secondary uppercase">Total Catalog</p>
          <p className="text-xl font-extrabold text-text-primary mt-1">48 products</p>
        </div>
        <div className="bg-surface rounded-card p-4 border border-border shadow-xs">
          <p className="text-[11px] font-bold text-emerald-700 uppercase">In Stock</p>
          <p className="text-xl font-extrabold text-emerald-600 mt-1">45 available</p>
        </div>
        <div className="bg-surface rounded-card p-4 border border-border shadow-xs">
          <p className="text-[11px] font-bold text-amber-700 uppercase">Low Stock</p>
          <p className="text-xl font-extrabold text-amber-600 mt-1">3 items</p>
        </div>
        <div className="bg-surface rounded-card p-4 border border-border shadow-xs">
          <p className="text-[11px] font-bold text-text-secondary uppercase">Active Collections</p>
          <p className="text-xl font-extrabold text-text-primary mt-1">4 categories</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface rounded-card p-5 sm:p-6 border border-border shadow-level-1 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Input
              placeholder="Search product by title, SKU, or collection..."
              prefix={<SearchOutlined className="text-text-secondary text-sm mr-1.5" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-full! py-2! px-4! bg-canvas! hover:bg-[#eae7e7]! focus:bg-surface! border-transparent! focus:border-primary! text-xs!"
            />
          </div>

          <div className="flex items-center gap-2">
            <Select
              value={selectedCategory}
              onChange={(val) => setSelectedCategory(val)}
              className="w-48 text-xs font-semibold"
              options={[
                { value: "all", label: "All Categories" },
                { value: "Modern Living", label: "Modern Living & Furniture" },
                { value: "Electronics", label: "Electronics & Audio" },
                { value: "Ceramics", label: "Ceramics & Decor" },
                { value: "Apparel", label: "Studio Apparel" },
              ]}
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border text-text-secondary text-[10px] uppercase tracking-wider font-bold">
                <th className="py-3 px-3 font-bold">PRODUCT</th>
                <th className="py-3 px-3 font-bold">CATEGORY</th>
                <th className="py-3 px-3 font-bold">PRICE</th>
                <th className="py-3 px-3 font-bold">STOCK & VARIANTS</th>
                <th className="py-3 px-3 font-bold">STATUS</th>
                <th className="py-3 px-3 font-bold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-canvas/50 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.thumbnail}
                        alt={p.name}
                        className="w-11 h-11 rounded-xl object-cover border border-border shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-text-primary truncate max-w-[200px] sm:max-w-xs">
                          {p.name}
                        </p>
                        <p className="text-[11px] text-text-secondary truncate">
                          SKU: {p.id} • {p.vendor}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-text-primary block">{p.category}</span>
                    <span className="text-[10px] text-text-secondary">{p.type}</span>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-extrabold text-primary text-sm">{p.price}</div>
                    {p.discount && (
                      <span className="text-[10px] text-emerald-600 font-semibold">{p.discount}</span>
                    )}
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1 flex-wrap max-w-xs">
                      {p.sizes.map((s, idx) => (
                        <Tag
                          key={idx}
                          className="rounded! text-[10px] px-1.5 py-0.5 font-bold! border-0! m-0! bg-canvas! text-text-primary!"
                        >
                          {s}
                        </Tag>
                      ))}
                    </div>
                    <span className="text-[10px] text-text-secondary font-medium block mt-1">
                      Total: {p.stock}
                    </span>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1.5">
                      {p.isTrending && (
                        <Tag
                          color="purple"
                          className="rounded-full! px-2! py-0.5! text-[10px] font-bold! border-0! m-0! bg-primary! text-on-primary!"
                        >
                          Trending
                        </Tag>
                      )}
                      {p.isNewArrival && (
                        <Tag
                          color="success"
                          className="rounded-full! px-2! py-0.5! text-[10px] font-bold! border-0! m-0! bg-emerald-600! text-white!"
                        >
                          New
                        </Tag>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link to="/admin/products/new">
                        <Button
                          size="small"
                          icon={<EditOutlined className="text-xs" />}
                          className="rounded-lg! border-border! bg-surface! text-text-primary! hover:bg-canvas! font-semibold! text-[11px]!"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        type="text"
                        size="small"
                        danger
                        icon={<DeleteOutlined className="text-xs" />}
                        className="rounded-lg! hover:bg-red-50!"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-text-secondary">
          <div>Showing 1-6 of 48 products</div>
          <div className="flex items-center gap-2">
            <Button
              size="small"
              icon={<LeftOutlined className="text-xs" />}
              className="rounded-lg! border-border! bg-surface! text-text-primary! hover:bg-canvas!"
            />
            <span className="font-bold text-text-primary">1</span>
            <Button
              size="small"
              icon={<RightOutlined className="text-xs" />}
              className="rounded-lg! border-border! bg-surface! text-text-primary! hover:bg-canvas!"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
