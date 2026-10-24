import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FireFilled,
  ThunderboltFilled,
  AppstoreOutlined,
  TagFilled,
  RightOutlined,
} from "@ant-design/icons";
import { getCategoriesApi } from "../../services/productService";

const quickCollections = [
  { label: "All Items", icon: <AppstoreOutlined />, query: "" },
  { label: "Trending", icon: <FireFilled className="text-amber-500!" />, query: "?filter=trending" },
  { label: "New Arrivals", icon: <ThunderboltFilled className="text-[#5433eb]!" />, query: "?filter=new" },
  { label: "Outerwear & Jackets", query: "?category=Jackets%20%26%20Outerwear" },
  { label: "Denim & Jeans", query: "?category=Denim%20%26%20Jeans" },
  { label: "T-Shirts & Tops", query: "?category=T-Shirts%20%26%20Tops" },
  { label: "Shoes & Footwear", query: "?category=Shoes%20%26%20Footwear" },
  { label: "Sale Under $50", icon: <TagFilled className="text-rose-500!" />, query: "?maxPrice=50" },
];

export default function CategoryBar() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Items");

  return (
    <div className="w-full! border-b! border-border! bg-surface! py-3.5! sticky! top-0! z-20! shadow-xs! backdrop-blur-md! bg-surface/90!">
      <div className="w-full! max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8! flex! items-center! justify-between! gap-4!">
        {/* Horizontal Category Scroller */}
        <div className="flex! items-center! gap-2! overflow-x-auto! no-scrollbar! py-0.5! scroll-smooth! w-full! sm:w-auto!">
          {quickCollections.map((col) => {
            const isActive = activeTab === col.label;
            return (
              <button
                key={col.label}
                type="button"
                onClick={() => {
                  setActiveTab(col.label);
                  navigate(`/products${col.query}`);
                }}
                className={`inline-flex! items-center! gap-1.5! px-4! py-2! rounded-full! text-xs! font-bold! tracking-tight! whitespace-nowrap! transition-all! duration-200! cursor-pointer! border! ${
                  isActive
                    ? "bg-[#1a1a1a]! text-white! border-[#1a1a1a]! shadow-xs!"
                    : "bg-canvas! hover:bg-white! text-text-secondary! hover:text-text-primary! border-border!"
                }`}
              >
                {col.icon && <span className="text-xs! shrink-0!">{col.icon}</span>}
                <span>{col.label}</span>
              </button>
            );
          })}
        </div>

        {/* Brand Assurance Accent */}
        <div className="hidden! xl:flex! items-center! gap-2! text-[11px]! font-semibold! text-text-secondary! shrink-0!">
          <span className="w-2! h-2! rounded-full! bg-emerald-500!" />
          <span>Curated Studio Stock Ready to Ship</span>
        </div>
      </div>
    </div>
  );
}
