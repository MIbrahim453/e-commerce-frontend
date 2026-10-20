import React, { useState } from "react";
import ProductReviews from "./ProductReviews";

export default function ProductSpecs({ product }) {
  const [activeTab, setActiveTab] = useState(0);
  const [reviewCount, setReviewCount] = useState(null);

  const tabs = [
    "Specifications",
    "Care & Instructions",
    "Shipping & Returns",
    reviewCount !== null
      ? `Verified Reviews (${reviewCount})`
      : "Verified Reviews",
  ];

  const availableSizes =
    product?.details?.sizes
      ?.filter((s) => Number(s.stock) > 0)
      ?.map((s) => s.size) || [];

  const sizesSummary =
    availableSizes.length > 0 ? availableSizes.join(", ") : "Out of Stock";

  const specsGrid = [
    {
      title: "Material & Fabric",
      value: product?.details?.material || "Premium Quality Composition",
      detail: "Selected for durability, texture, and everyday performance",
    },
    {
      title: "Color & Finish",
      value: product?.details?.color || "Curated Shade",
      detail: "Precision-dyed for rich tone and fade resistance",
    },
    {
      title: "Category",
      value: product?.category?.name || "Exclusive Catalog Item",
      detail: `Department: ${product?.category?.categoryCollection ? product.category.categoryCollection.toUpperCase() : "General"}`,
    },
    {
      title: "Size Availability",
      value: sizesSummary,
      detail: "True to size with comfort tailored fit",
    },
    {
      title: "Care Instructions",
      value: product?.details?.instructions || "Standard Wash & Care",
      detail: "Follow manufacturer label guidance for optimal longevity",
    },
    {
      title: "Shipping Standards",
      value: "Tracked Carbon-Neutral Courier",
      detail: "Dispatched within 24-48 business hours with signature option",
    },
  ];

  return (
    <div className="flex! flex-col! gap-5!">
      <div className="flex! items-center! gap-2! overflow-x-auto! pb-1! no-scrollbar!">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`px-4! sm:px-5! py-2! sm:py-2.5! rounded-full! text-xs! sm:text-sm! font-semibold! transition-all! cursor-pointer! shrink-0! border-0! ${activeTab === idx
                ? "bg-[#1a1a1a]! text-white! shadow-xs!"
                : "bg-white! text-gray-600! hover:text-gray-900! border! border-[#ebebeb]!"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white! rounded-[28px]! border! border-[#ebebeb]! p-6! sm:p-8! shadow-level-1!">
        {activeTab === 0 && (
          <div className="grid! grid-cols-1! md:grid-cols-2! lg:grid-cols-3! gap-6!">
            {specsGrid.map((spec, i) => (
              <div
                key={i}
                className="flex! flex-col! gap-1.5! p-4! rounded-[20px]! bg-[#f8f9fa]! border! border-[#ebebeb]/60!"
              >
                <span className="text-[11px]! font-bold! text-gray-400! uppercase! tracking-wider!">
                  {spec.title}
                </span>
                <span className="text-sm! font-bold! text-[#1a1a1a]! leading-snug!">
                  {spec.value}
                </span>
                <span className="text-xs! text-gray-500! leading-relaxed!">
                  {spec.detail}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 1 && (
          <div className="max-w-2xl! space-y-4! text-sm! text-gray-600!">
            <h3 className="text-base! font-bold! text-[#1a1a1a]! m-0!">
              Care & Maintenance Guidelines
            </h3>
            <p className="leading-relaxed!">
              {product?.details?.instructions ||
                "Machine wash cold with like colors on a delicate cycle. Do not bleach. Tumble dry on low or lay flat to dry to preserve the natural weave and finish."}
            </p>
          </div>
        )}

        {activeTab === 2 && (
          <div className="max-w-2xl! space-y-3! text-sm! text-gray-600!">
            <h3 className="text-base! font-bold! text-[#1a1a1a]! m-0!">
              Shipping & 30-Day Returns
            </h3>
            <p className="leading-relaxed!">
              Orders placed before 2:00 PM EST ship same-day. Complimentary
              2-day delivery on all domestic orders. If you are not completely
              satisfied, return within 30 days for an exchange or full refund.
            </p>
          </div>
        )}

        <div style={{ display: activeTab === 3 ? "block" : "none" }}>
          <ProductReviews
            productId={product?._id}
            isEmbedded={true}
            onStatsUpdate={({ totalReviews }) => setReviewCount(totalReviews)}
          />
        </div>
      </div>
    </div>
  );
}
