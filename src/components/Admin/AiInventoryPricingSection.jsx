import React, { useState, useEffect } from "react";
import { Button, Tag, message, Spin, Tooltip, Progress } from "antd";
import {
  RiseOutlined,
  TagOutlined,
  CheckOutlined,
  AlertOutlined,
  ReloadOutlined,
  DollarCircleOutlined,
  ThunderboltOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  getInventoryAndPricingAiApi,
  applyDiscountAiApi,
} from "../../services/aiService";

const cleanAsterisks = (text) => {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^\s*\*\s+/gm, "• ")
    .replace(/\s+\*\s+/g, " • ")
    .replace(/\*/g, "")
    .trim();
};

export default function AiInventoryPricingSection() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [applyingId, setApplyingId] = useState(null);
  const [appliedMap, setAppliedMap] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getInventoryAndPricingAiApi();
      if (res.data?.success) {
        setData(res.data.data);
      } else {
        message.error(res.data?.message || "Failed to load pricing advice.");
      }
    } catch (err) {
      console.error("Pricing advice load error:", err);
      message.error("Failed to load inventory pricing assistant.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApplyDiscount = async (productId, discount, productName) => {
    try {
      setApplyingId(productId);
      const res = await applyDiscountAiApi(productId, discount);
      if (res.data?.success) {
        message.success(`✨ Applied ${discount}% discount to "${productName}"!`);
        setAppliedMap((prev) => ({ ...prev, [productId]: discount }));
      } else {
        message.error(res.data?.message || "Failed to update discount.");
      }
    } catch (err) {
      console.error("Apply discount error:", err);
      message.error("Failed to update product discount.");
    } finally {
      setApplyingId(null);
    }
  };

  return (
    <div className="bg-surface rounded-2xl border border-border shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center text-lg shrink-0">
            <DollarCircleOutlined />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-primary m-0 flex items-center gap-2">
              Smart Inventory &amp; Dynamic Pricing Assistant
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase tracking-wider">
                Automated Markdown
              </span>
            </h3>
            <p className="text-xs text-text-secondary m-0 mt-0.5">
              Identifies slow-moving inventory and computes profit-maximizing promotional discounts.
            </p>
          </div>
        </div>

        <Button
          onClick={fetchData}
          loading={loading}
          icon={<ReloadOutlined />}
          className="rounded-full! text-xs! font-bold! text-text-primary! bg-canvas! hover:bg-surface! border-border! h-auto! py-2! px-4! self-start sm:self-auto!"
        >
          Recalculate
        </Button>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {loading && !data && (
          <div className="py-12 text-center space-y-3">
            <Spin size="large" />
            <p className="text-xs text-text-secondary font-medium">
              Analyzing inventory turnover, stock distribution, and sales velocity...
            </p>
          </div>
        )}

        {data && (
          <>
            {/* Health Stats Bar */}
            {data.stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-canvas rounded-xl border border-border">
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
                    Catalog Items
                  </span>
                  <span className="text-lg font-bold text-text-primary mt-0.5 block">
                    {data.stats.totalProducts}
                  </span>
                </div>
                <div className="p-3.5 bg-canvas rounded-xl border border-border">
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">
                    Slow Movers (Overstock)
                  </span>
                  <span className="text-lg font-bold text-amber-700 mt-0.5 block">
                    {data.stats.slowMovingCount}
                  </span>
                </div>
                <div className="p-3.5 bg-canvas rounded-xl border border-border">
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block">
                    High Demand / Low Stock
                  </span>
                  <span className="text-lg font-bold text-red-600 mt-0.5 block">
                    {data.stats.highDemandLowStockCount}
                  </span>
                </div>
                <div className="p-3.5 bg-canvas rounded-xl border border-border">
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
                    Out of Stock Items
                  </span>
                  <span className="text-lg font-bold text-text-primary mt-0.5 block">
                    {data.stats.outOfStockCount}
                  </span>
                </div>
              </div>
            )}

            {/* AI Summary Banner */}
            {data.summary && (
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200/80 text-[#5433eb] text-xs font-medium leading-relaxed flex items-start gap-3">
                <ThunderboltOutlined className="text-base text-[#5433eb] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block text-[#5433eb] mb-0.5">
                    AI Merchandise Assessment
                  </strong>
                  <span>{cleanAsterisks(data.summary)}</span>
                </div>
              </div>
            )}

            {/* Recommendations List */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-text-primary uppercase tracking-wider block">
                Recommended Markdown Adjustments
              </span>

              {(!data.recommendations || data.recommendations.length === 0) ? (
                <div className="p-6 text-center rounded-xl bg-canvas border border-border text-xs text-text-secondary">
                  No critical overstock items detected. All products are currently selling within healthy velocity thresholds.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.recommendations.map((item, idx) => {
                    const isApplied = appliedMap[item.productId] !== undefined;
                    const isApplying = applyingId === item.productId;
                    const finalDiscount = isApplied ? appliedMap[item.productId] : item.suggestedDiscount;

                    return (
                      <div
                        key={idx}
                        className="bg-canvas rounded-2xl p-4 sm:p-5 border border-border flex flex-col justify-between space-y-3.5 hover:border-purple-200 transition-colors shadow-xs"
                      >
                        <div className="flex items-start gap-3.5">
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              alt={item.productName}
                              className="w-14 h-14 rounded-xl object-cover border border-border shrink-0 bg-surface"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-surface border border-border flex items-center justify-center text-text-secondary shrink-0">
                              <TagOutlined className="text-lg" />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="text-xs sm:text-sm font-bold text-text-primary truncate m-0">
                                {cleanAsterisks(item.productName)}
                              </h4>
                              <Tag
                                color={
                                  item.urgency === "HIGH"
                                    ? "red"
                                    : item.urgency === "MEDIUM"
                                      ? "orange"
                                      : "blue"
                                }
                                className="m-0! text-[10px]! font-bold! uppercase! rounded-md!"
                              >
                                {item.urgency || "RECOMMENDED"}
                              </Tag>
                            </div>

                            <div className="flex items-center gap-3 mt-1.5 text-xs">
                              <span className="text-text-secondary">
                                Stock: <strong className="text-text-primary">{item.totalStock} units</strong>
                              </span>
                              <span>•</span>
                              <span className="text-text-secondary">
                                Recent Sold: <strong className="text-text-primary">{item.unitsSold || 0}</strong>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Pricing Comparison */}
                        <div className="p-3 bg-surface rounded-xl border border-border flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
                              Current Discount
                            </span>
                            <span className="text-xs font-semibold text-text-secondary line-through">
                              {item.currentDiscount || 0}% OFF
                            </span>
                          </div>

                          <div className="text-center font-bold text-xs text-[#5433eb]">
                            ➔
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                              AI Suggested Discount
                            </span>
                            <span className="text-sm font-bold text-emerald-600">
                              {finalDiscount}% OFF
                            </span>
                          </div>
                        </div>

                        {/* Reason & Impact */}
                        <div className="text-xs text-text-secondary space-y-1">
                          <p className="m-0 text-text-primary font-medium leading-relaxed">
                            💡 {cleanAsterisks(item.reason)}
                          </p>
                          {item.projectedImpact && (
                            <p className="m-0 text-[11px] text-[#5433eb] font-semibold">
                              📈 {cleanAsterisks(item.projectedImpact)}
                            </p>
                          )}
                        </div>

                        {/* 1-Click Action */}
                        <div className="pt-2 border-t border-border flex items-center justify-between">
                          <span className="text-[11px] text-text-secondary">
                            Updates live store pricing
                          </span>

                          <Button
                            type="primary"
                            disabled={isApplied}
                            loading={isApplying}
                            onClick={() =>
                              handleApplyDiscount(
                                item.productId,
                                item.suggestedDiscount,
                                item.productName
                              )
                            }
                            icon={isApplied ? <CheckOutlined /> : <TagOutlined />}
                            className={`rounded-xl! text-xs! font-bold! h-auto! py-2! px-4! shadow-xs! ${
                              isApplied
                                ? "bg-emerald-600! text-white! border-emerald-600!"
                                : "bg-primary! hover:bg-primary/90! text-on-primary!"
                            }`}
                          >
                            {isApplied ? "Discount Applied" : `Apply ${item.suggestedDiscount}% OFF`}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Strategic Advice Points */}
            {data.strategicAdvice && data.strategicAdvice.length > 0 && (
              <div className="p-4 rounded-xl bg-canvas border border-border space-y-2">
                <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block">
                  Commercial Merchandise Strategy
                </span>
                <ul className="m-0 pl-4 space-y-1.5 text-xs text-text-primary">
                  {data.strategicAdvice.map((advice, i) => (
                    <li key={i} className="leading-relaxed font-medium">
                      {cleanAsterisks(advice)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
