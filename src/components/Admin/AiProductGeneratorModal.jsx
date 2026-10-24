import React, { useState } from "react";
import { Modal, Input, Button, Upload, message, Tag, Spin } from "antd";
import {
  ThunderboltOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { generateProductAiApi } from "../../services/aiService";

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

export default function AiProductGeneratorModal({
  isOpen,
  onClose,
  categories = [],
  existingImages = [],
  onApply,
}) {
  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setFilePreview(e.target.result);
    reader.readAsDataURL(file);
    return false; // prevent default upload
  };

  const useExistingImage = () => {
    if (existingImages.length > 0) {
      const file = existingImages[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target.result);
      reader.readAsDataURL(file);
      message.info("Loaded first uploaded image for AI vision analysis.");
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && !filePreview) {
      message.warning("Please provide a product title/keyword or upload an image.");
      return;
    }

    try {
      setLoading(true);
      const categoryHints = categories.map((c) => ({
        id: c._id || c.id || c.name,
        name: c.name,
        collection: c.categoryCollection,
      }));

      const payload = {
        prompt: prompt.trim(),
        imageBase64: filePreview || null,
        mimeType: selectedFile?.type || "image/jpeg",
        categoryHints,
      };

      const res = await generateProductAiApi(payload);
      if (res.data?.success) {
        setGeneratedResult(res.data.data);
        if (res.data.isMock) {
          message.info(res.data.warning || "Generated preview data.");
        } else {
          message.success("Product generated successfully!");
        }
      } else {
        message.error(res.data?.message || "Failed to generate product.");
      }
    } catch (err) {
      console.error("AI Generation Error:", err);
      message.error(err.response?.data?.message || "Error communicating with AI service.");
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptAndApply = () => {
    if (!generatedResult) return;

    // Match category ID
    let matchedCatId = "";
    if (generatedResult.suggestedCategoryId) {
      const match = categories.find(
        (c) => (c._id || c.id || c.name) === generatedResult.suggestedCategoryId
      );
      if (match) matchedCatId = match._id || match.id || match.name;
    }
    if (!matchedCatId && generatedResult.suggestedCategoryName) {
      const match = categories.find(
        (c) => c.name.toLowerCase() === generatedResult.suggestedCategoryName.toLowerCase()
      );
      if (match) matchedCatId = match._id || match.id || match.name;
    }
    if (!matchedCatId && categories.length > 0) {
      matchedCatId = categories[0]._id || categories[0].id || categories[0].name;
    }

    onApply({
      name: cleanAsterisks(generatedResult.name) || "",
      description: cleanAsterisks(generatedResult.description) || "",
      price: generatedResult.price ? String(generatedResult.price) : "",
      discount: generatedResult.discount !== undefined ? String(generatedResult.discount) : "0",
      category: matchedCatId,
      isTrending: Boolean(generatedResult.isTrending),
      isNewArrival: Boolean(generatedResult.isNewArrival),
      newImageFile: selectedFile,
      details: {
        material: cleanAsterisks(generatedResult.details?.material) || "",
        color: cleanAsterisks(generatedResult.details?.color) || "",
        instructions: cleanAsterisks(generatedResult.details?.instructions) || "",
        sizes: generatedResult.details?.sizes || [
          { size: "S", stock: 15 },
          { size: "M", stock: 25 },
          { size: "L", stock: 20 },
          { size: "XL", stock: 10 },
        ],
      },
    });

    message.success("Form populated with AI generated details!");
    handleClose();
  };

  const handleClose = () => {
    setGeneratedResult(null);
    setPrompt("");
    setSelectedFile(null);
    setFilePreview(null);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={720}
      centered
      className="ai-generator-modal"
      title={
        <div className="flex items-center gap-2.5 pb-2 border-b border-border">
          <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-[#5433eb] to-[#8c52ff] text-white flex items-center justify-center text-base shadow-xs">
            <ThunderboltOutlined />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-primary m-0 flex items-center gap-2">
              1-Click "Magic" Product Generator
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#5433eb] uppercase tracking-wider">
                Multimodal AI
              </span>
            </h3>
            <p className="text-xs text-text-secondary m-0">
              Provide an image, rough keywords, or both. Gemini AI will auto-craft titles, specs, care rules & pricing.
            </p>
          </div>
        </div>
      }
    >
      <div className="py-4 space-y-5">
        {!generatedResult ? (
          <>
            {/* Input Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Image Input */}
              <div className="p-4 rounded-2xl bg-canvas border border-border flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-2">
                    1. Upload Product Photo (Optional)
                  </span>
                  <p className="text-xs text-text-secondary mb-3">
                    Gemini Vision will analyze fabric, silhouette, cut, and color directly from the image.
                  </p>
                </div>

                {filePreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-border group bg-black/5 aspect-4/3 flex items-center justify-center">
                    <img
                      src={filePreview}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setFilePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white text-xs px-2 py-1 rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload
                      beforeUpload={handleFileSelect}
                      showUploadList={false}
                      accept="image/*"
                    >
                      <Button
                        icon={<UploadOutlined />}
                        className="w-full! rounded-xl! border-dashed! py-3! text-xs! font-semibold! text-text-primary! flex! items-center! justify-center! gap-2!"
                      >
                        Choose Photo
                      </Button>
                    </Upload>

                    {existingImages.length > 0 && (
                      <Button
                        type="dashed"
                        onClick={useExistingImage}
                        className="w-full! rounded-xl! text-[11px]! font-medium! text-[#5433eb]! border-purple-200! bg-purple-50/50!"
                      >
                        Use 1st photo already added to form ({existingImages.length} available)
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Text Prompt */}
              <div className="p-4 rounded-2xl bg-canvas border border-border flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-2">
                    2. Keywords / Product Concept
                  </span>
                  <p className="text-xs text-text-secondary mb-3">
                    Type a quick draft or bullet points (e.g. "Italian linen casual shirt, navy, summer collection").
                  </p>
                  <Input.TextArea
                    rows={4}
                    placeholder="e.g. Men's relaxed fit camp collar shirt in organic olive green linen, resort collection"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="rounded-xl! text-xs! text-text-primary! bg-surface!"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {[
                    "Linen Resort Shirt",
                    "Minimalist Denim Jacket",
                    "Cashmere Blend Knit",
                    "Pleated Chino Trousers",
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setPrompt(chip)}
                      className="text-[10px] font-medium px-2 py-1 rounded-lg bg-surface border border-border text-text-secondary hover:text-[#5433eb] hover:border-purple-300 transition-colors"
                    >
                      + {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-xs text-text-secondary flex items-center gap-1.5">
                <BulbOutlined className="text-amber-500" />
                Multimodal AI combines image vision + keywords.
              </span>

              <div className="flex items-center gap-2">
                <Button onClick={handleClose} className="rounded-xl! text-xs!">
                  Cancel
                </Button>
                <Button
                  type="primary"
                  onClick={handleGenerate}
                  loading={loading}
                  icon={<ThunderboltOutlined />}
                  className="rounded-xl! bg-linear-to-r! from-[#5433eb]! to-[#7c3aed]! text-white! font-bold! text-xs! px-5! py-2! h-auto! shadow-violet-glow!"
                >
                  {loading ? "Generating Listing..." : "Generate Listing"}
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* Preview & Accept Generated Result */
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-between text-[#5433eb]">
              <span className="text-xs font-bold flex items-center gap-2">
                <CheckCircleOutlined className="text-sm" />
                AI Generated Catalog Proposal
              </span>
              <button
                type="button"
                onClick={() => setGeneratedResult(null)}
                className="text-xs font-semibold text-[#5433eb] underline hover:opacity-80"
              >
                Regenerate / Edit prompt
              </button>
            </div>

            <div className="bg-canvas rounded-2xl p-5 border border-border space-y-4 max-h-[50vh] overflow-y-auto">
              <div>
                <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block">
                  Product Title
                </span>
                <h4 className="text-base font-bold text-text-primary mt-1 m-0">
                  {cleanAsterisks(generatedResult.name)}
                </h4>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-surface p-3 rounded-xl border border-border">
                  <span className="text-[10px] uppercase font-bold text-text-secondary block">
                    Suggested Price
                  </span>
                  <span className="text-sm font-bold text-text-primary">
                    ${generatedResult.price}
                  </span>
                </div>
                <div className="bg-surface p-3 rounded-xl border border-border">
                  <span className="text-[10px] uppercase font-bold text-text-secondary block">
                    Launch Discount
                  </span>
                  <span className="text-sm font-bold text-emerald-600">
                    {generatedResult.discount || 0}% OFF
                  </span>
                </div>
                <div className="bg-surface p-3 rounded-xl border border-border">
                  <span className="text-[10px] uppercase font-bold text-text-secondary block">
                    Material
                  </span>
                  <span className="text-xs font-semibold text-text-primary truncate block">
                    {cleanAsterisks(generatedResult.details?.material)}
                  </span>
                </div>
                <div className="bg-surface p-3 rounded-xl border border-border">
                  <span className="text-[10px] uppercase font-bold text-text-secondary block">
                    Color
                  </span>
                  <span className="text-xs font-semibold text-text-primary truncate block">
                    {cleanAsterisks(generatedResult.details?.color)}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1">
                  Product Story & Description
                </span>
                <p className="text-xs text-text-primary leading-relaxed bg-surface p-3 rounded-xl border border-border m-0 whitespace-pre-line">
                  {cleanAsterisks(generatedResult.description)}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1">
                  Care Instructions
                </span>
                <p className="text-xs text-text-secondary bg-surface p-3 rounded-xl border border-border m-0">
                  {cleanAsterisks(generatedResult.details?.instructions)}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">
                  Proposed Sizes & Initial Inventory
                </span>
                <div className="flex flex-wrap gap-2">
                  {(generatedResult.details?.sizes || []).map((s, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-surface border border-border text-text-primary"
                    >
                      Size {s.size}: <strong className="text-[#5433eb]">{s.stock} units</strong>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
              <Button onClick={() => setGeneratedResult(null)} className="rounded-xl! text-xs!">
                Back
              </Button>
              <Button
                type="primary"
                onClick={handleAcceptAndApply}
                icon={<CheckCircleOutlined />}
                className="rounded-xl! bg-emerald-600! hover:bg-emerald-700! text-white! font-bold! text-xs! px-6! py-2! h-auto! shadow-xs!"
              >
                Apply to Product Form
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
