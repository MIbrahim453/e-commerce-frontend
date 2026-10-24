import React, { useState } from "react";
import { Input, Button, message, Spin } from "antd";
import {
  RobotOutlined,
  ArrowRightOutlined,
  LineChartOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { askStoreAnalyticsAiApi } from "../../services/aiService";

/**
 * Strips all markdown asterisks (* and **) and converts markdown bullets to clean dots.
 */
const cleanAsterisks = (text) => {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1") // Remove bold **text**
    .replace(/\*([^*]+)\*/g, "$1")     // Remove italic *text*
    .replace(/^\s*\*\s+/gm, "• ")       // Convert starting asterisk bullets to •
    .replace(/\s+\*\s+/g, " • ")       // Convert mid-sentence asterisks to •
    .replace(/\*/g, "")                // Remove any stray asterisks
    .trim();
};

export default function AiStoreAnalyticsCard() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const sampleQuestions = [
    "What are our top 3 revenue-generating products?",
    "Which products are out of stock or critically low?",
    "Break down orders by status and fulfillment backlog",
    "Give me 3 strategic growth recommendations for next week",
  ];

  const handleAsk = async (questionToAsk) => {
    const q = (questionToAsk || query).trim();
    if (!q) {
      message.warning("Please type a question about your store.");
      return;
    }
    setQuery(q);

    try {
      setLoading(true);
      const res = await askStoreAnalyticsAiApi(q);
      if (res.data?.success) {
        setResult(res.data.data);
      } else {
        message.error(res.data?.message || "Failed to fetch analytics.");
      }
    } catch (err) {
      console.error("AI Analytics Query Error:", err);
      message.error(err.response?.data?.message || "Error analyzing store data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface rounded-2xl border border-border shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#1a1a1a] text-white flex items-center justify-center text-sm font-bold shrink-0">
            BI
          </div>
          <div>
            <h3 className="text-base font-bold text-text-primary m-0 flex items-center gap-2">
              Store Intelligence &amp; Analytics
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f2f4f5] text-[#1a1a1a] uppercase tracking-wider">
                Natural Language
              </span>
            </h3>
            <p className="text-xs text-text-secondary m-0 mt-0.5">
              Query your live sales, orders, and inventory data in plain English.
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-text-secondary bg-canvas px-3 py-1.5 rounded-full border border-border self-start sm:self-auto flex items-center gap-1.5">
          <ThunderboltOutlined className="text-amber-500" />
          Real-Time Aggregation
        </span>
      </div>

      <div className="p-5 sm:p-6 space-y-4">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Input
            size="large"
            placeholder="Ask anything about sales, revenue, low stock, or orders..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onPressEnter={() => handleAsk()}
            className="rounded-xl! text-xs! sm:text-sm! bg-canvas! text-text-primary! border-border!"
            prefix={<RobotOutlined className="text-[#1a1a1a] mr-1.5" />}
          />
          <Button
            type="primary"
            onClick={() => handleAsk()}
            loading={loading}
            icon={<ArrowRightOutlined />}
            className="rounded-xl! bg-[#1a1a1a]! hover:bg-black! text-white! font-bold! text-xs! h-auto! py-2.5! px-6! border-0! shadow-xs! shrink-0!"
          >
            {loading ? "Analyzing Data..." : "Query Store"}
          </Button>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
            Quick queries:
          </span>
          {sampleQuestions.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              disabled={loading}
              onClick={() => handleAsk(chip)}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-canvas hover:bg-surface border border-border hover:border-[#1a1a1a] text-text-primary transition-all cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="py-8 text-center space-y-3 bg-canvas/50 rounded-2xl border border-border">
            <Spin size="large" />
            <p className="text-xs text-text-secondary font-medium">
              Aggregating live store metrics and generating intelligence report...
            </p>
          </div>
        )}

        {/* AI Answer Display */}
        {result && !loading && (
          <div className="mt-4 p-5 rounded-2xl bg-canvas border border-border space-y-4 animate-in fade-in duration-200">
            {/* Key Metrics Pills */}
            {result.keyMetrics && result.keyMetrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {result.keyMetrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-3 bg-surface rounded-xl border border-border shadow-xs"
                  >
                    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
                      {cleanAsterisks(metric.label)}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-text-primary mt-0.5 block">
                      {cleanAsterisks(metric.value)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Answer Text */}
            <div className="bg-surface p-4 rounded-xl border border-border">
              <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <LineChartOutlined className="text-[#1a1a1a]" />
                Analysis &amp; Insights
              </span>
              <div className="text-xs sm:text-sm text-text-primary leading-relaxed whitespace-pre-line font-medium space-y-2">
                {cleanAsterisks(result.answer)}
              </div>
            </div>

            {/* Proactive Recommendation */}
            {result.recommendation && (
              <div className="p-3.5 rounded-xl bg-surface border border-border flex items-start gap-3 text-text-primary">
                <div className="w-6 h-6 rounded-lg bg-[#f2f4f5] text-[#1a1a1a] flex items-center justify-center text-xs shrink-0 mt-0.5">
                  <CheckCircleOutlined />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary block">
                    Strategic Merchant Recommendation
                  </span>
                  <p className="text-xs text-text-primary font-medium m-0 mt-0.5 leading-relaxed">
                    {cleanAsterisks(result.recommendation)}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
