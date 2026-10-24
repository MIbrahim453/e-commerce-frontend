import api from "./axios";

/**
 * 1. AI Product Generator (Multimodal: Image base64 and/or text prompt)
 */
export const generateProductAiApi = async ({ prompt, imageBase64, mimeType, categoryHints }) => {
  return await api.post("/ai/generate-product", {
    prompt,
    imageBase64,
    mimeType,
    categoryHints,
  });
};

/**
 * 2. Smart Inventory & Dynamic Pricing Assistant
 */
export const getInventoryAndPricingAiApi = async () => {
  return await api.get("/ai/inventory-pricing");
};

/**
 * 3. 1-Click Apply Suggested Discount
 */
export const applyDiscountAiApi = async (productId, discount) => {
  return await api.post("/ai/apply-discount", { productId, discount });
};

/**
 * 4. Admin Intelligence: "Ask Your Store" Natural Language Analytics
 */
export const askStoreAnalyticsAiApi = async (query) => {
  return await api.post("/ai/ask-store", { query });
};

/**
 * 5. Storefront Customer Experience (AI Personal Stylist & Assistant)
 */
export const chatWithStylistAiApi = async (message, history = []) => {
  return await api.post("/ai/stylist-chat", { message, history });
};
