import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input, Button, Spin, message } from "antd";
import {
  ArrowRightOutlined,
  CloseOutlined,
  ReloadOutlined,
  ShoppingOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { chatWithStylistAiApi } from "../services/aiService";

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

export default function AIStylistWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello. I am AURA, your personal stylist and wardrobe advisor.\n\nTell me what aesthetic, occasion, or palette you are curating, or share your order number for real-time status.",
      recommendedProducts: [],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const curatedPrompts = [
    "Curate an evening formal look",
    "Casual weekend staples under $100",
    "What pairs with a classic blazer?",
    "Check status of my order",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || loading) return;

    setInputValue("");
    const newHistory = [...messages, { role: "user", content: text }];
    setMessages(newHistory);

    try {
      setLoading(true);
      const res = await chatWithStylistAiApi(
        text,
        newHistory.map((m) => ({ role: m.role, content: m.content }))
      );

      if (res.data?.success) {
        const aiData = res.data.data;
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: cleanAsterisks(
              aiData.reply || "Here are selected pieces from our catalog matching your inquiry:"
            ),
            recommendedProducts: aiData.recommendedProducts || [],
            orderInfo: aiData.orderInfo || null,
          },
        ]);
      } else {
        message.error(res.data?.message || "Styling consultation temporarily unavailable.");
      }
    } catch (err) {
      console.error("AURA Stylist Error:", err);
      message.error("Could not reach AURA stylist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Conversation reset. What can I curate for you today?",
        recommendedProducts: [],
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* ── Concierge Chat Panel (Luxe Floating Card) ── */}
      {isOpen && (
        <div
          className="mb-3 w-[92vw] sm:w-[410px] h-[580px] max-h-[82vh] bg-surface rounded-[28px] border border-[#ebebeb] shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {/* Header */}
          <div className="px-5 py-4 bg-surface border-b border-[#ebebeb] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-[11px] font-bold tracking-widest">
                A
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold tracking-[0.18em] uppercase text-[#1a1a1a] m-0">
                    AURA
                  </h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-[11px] text-[#6b7280] m-0 tracking-[-0.01em]">
                  Private Client Styling &amp; Concierge
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearChat}
                title="Reset conversation"
                className="w-7 h-7 rounded-full text-[#6b7280] hover:text-[#1a1a1a] hover:bg-[#f2f4f5] flex items-center justify-center transition-colors border-0 bg-transparent cursor-pointer"
              >
                <ReloadOutlined className="text-xs" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close"
                className="w-7 h-7 rounded-full text-[#6b7280] hover:text-[#1a1a1a] hover:bg-[#f2f4f5] flex items-center justify-center transition-colors border-0 bg-transparent cursor-pointer"
              >
                <CloseOutlined className="text-xs" />
              </button>
            </div>
          </div>

          {/* Curated Prompt Chips */}
          <div className="px-4 py-2.5 bg-[#fbfbfb] border-b border-[#ebebeb] overflow-x-auto flex items-center gap-1.5 no-scrollbar">
            {curatedPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                disabled={loading}
                onClick={() => handleSendMessage(prompt)}
                className="text-[11px] font-medium px-3 py-1 rounded-full bg-surface hover:bg-[#f2f4f5] border border-[#ebebeb] hover:border-[#1a1a1a] text-[#474556] hover:text-[#1a1a1a] whitespace-nowrap transition-all cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#fbfbfb]">
            {messages.map((msg, index) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={index}
                  className={`flex flex-col ${isAssistant ? "items-start" : "items-end"}`}
                >
                  {isAssistant && (
                    <span className="text-[10px] font-semibold text-[#8c8899] uppercase tracking-wider mb-1 ml-1">
                      AURA
                    </span>
                  )}

                  <div
                    className={`max-w-[88%] p-3.5 rounded-[20px] text-[13px] leading-[1.6] ${
                      isAssistant
                        ? "bg-surface text-[#1a1a1a] border border-[#ebebeb] rounded-tl-xs shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                        : "bg-[#1a1a1a] text-white rounded-tr-xs"
                    }`}
                  >
                    <div className="whitespace-pre-line font-normal tracking-[-0.015em]">
                      {cleanAsterisks(msg.content)}
                    </div>

                    {/* Order Status Card */}
                    {msg.orderInfo && (
                      <div className="mt-3 p-3 rounded-[16px] bg-[#fbfbfb] border border-[#ebebeb] text-[#1a1a1a] text-xs space-y-1">
                        <div className="flex items-center justify-between font-semibold">
                          <span className="tracking-wide">Order #{msg.orderInfo.orderNumber}</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#1a1a1a] text-white text-[10px] font-bold tracking-wider uppercase">
                            {msg.orderInfo.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#6b7280]">
                          Settlement: <span className="font-semibold text-[#1a1a1a]">${msg.orderInfo.total}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Editorial Product Recommendations */}
                  {isAssistant && msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                    <div className="mt-3 space-y-2 w-full max-w-[92%]">
                      <span className="text-[10px] font-bold text-[#8c8899] uppercase tracking-[0.12em] block ml-1">
                        Curated Recommendations
                      </span>
                      <div className="grid grid-cols-1 gap-2">
                        {msg.recommendedProducts.map((prod) => (
                          <Link
                            key={prod.id}
                            to={`/product/${prod.slug || prod.id}`}
                            onClick={() => setIsOpen(false)}
                            className="p-2.5 bg-surface hover:bg-[#f8f8f8] rounded-[18px] border border-[#ebebeb] hover:border-[#1a1a1a] flex items-center justify-between gap-3 text-[#1a1a1a] transition-all group no-underline shadow-xs"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {prod.thumbnail ? (
                                <img
                                  src={prod.thumbnail}
                                  alt={prod.name}
                                  className="w-12 h-12 rounded-[14px] object-cover border border-[#ebebeb] shrink-0 bg-[#fbfbfb]"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-[14px] bg-[#fbfbfb] border border-[#ebebeb] flex items-center justify-center text-[#6b7280] shrink-0">
                                  <ShoppingOutlined />
                                </div>
                              )}
                              <div className="min-w-0">
                                <h5 className="text-xs font-semibold text-[#1a1a1a] truncate m-0 group-hover:text-black">
                                  {cleanAsterisks(prod.name)}
                                </h5>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-xs font-bold text-[#1a1a1a]">
                                    ${prod.price}
                                  </span>
                                  {prod.discount > 0 && (
                                    <span className="text-[10px] font-semibold text-[#1a1a1a] bg-[#f2f4f5] px-1.5 py-0.2 rounded-md">
                                      {prod.discount}% off
                                    </span>
                                  )}
                                  <span className="text-[10px] text-[#6b7280] capitalize truncate">
                                    • {prod.category}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <span className="text-[11px] font-semibold text-[#1a1a1a] shrink-0 group-hover:translate-x-0.5 transition-transform">
                              Discover →
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2.5 text-xs text-[#6b7280] bg-surface p-3 rounded-[20px] border border-[#ebebeb] max-w-[75%] shadow-xs">
                <Spin size="small" />
                <span className="font-medium tracking-tight">AURA is curating your selection...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-surface border-t border-[#ebebeb]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-[#fbfbfb] border border-[#ebebeb] focus-within:border-[#1a1a1a] rounded-full p-1 pl-4 transition-all"
            >
              <input
                type="text"
                placeholder="Ask AURA on styling, sizes, or order status..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={loading}
                className="flex-1 bg-transparent text-xs text-[#1a1a1a] placeholder:text-[#8c8899] outline-none border-0 py-1.5"
              />
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="w-8 h-8 rounded-full bg-[#1a1a1a] hover:bg-black text-white disabled:bg-gray-200 disabled:text-gray-400 flex items-center justify-center transition-all cursor-pointer border-0 shrink-0"
              >
                <ArrowRightOutlined className="text-xs" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Discreet Luxury Concierge Trigger Button ── */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#1a1a1a] hover:bg-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.24)] active:scale-95 transition-all duration-200 border border-black/10 cursor-pointer"
          title="Consult AURA Personal Stylist"
        >
          <div className="w-5 h-5 rounded-full bg-white/15 text-white flex items-center justify-center text-[10px] font-bold tracking-widest">
            A
          </div>
          <span className="text-[11px] font-semibold tracking-[0.16em] uppercase">
            AURA
          </span>
          <span className="text-[10px] text-white/50 tracking-wider">
            | STYLIST
          </span>
        </button>
      </div>
    </div>
  );
}
