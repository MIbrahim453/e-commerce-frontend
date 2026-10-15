import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  Select,
  Tag,
  Modal,
  Popconfirm,
  message,
  Tooltip,
  Badge,
  Progress,
  Divider,
} from "antd";
import {
  TagsOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ReloadOutlined,
  FolderAddOutlined,
  CheckCircleOutlined,
  AppstoreOutlined,
  ArrowRightOutlined,
  ThunderboltOutlined,
  LinkOutlined,
  ShoppingOutlined,
  ManOutlined,
  WomanOutlined,
  SmileOutlined,
  CopyOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  getCategoriesApi,
  createCategoryApi,
  editCategoryApi,
  deleteCategoryApi,
} from "../../services/adminService";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [collectionFilter, setCollectionFilter] = useState("all");

  // Form State for Creating Category
  const [name, setName] = useState("");
  const [categoryCollection, setCategoryCollection] = useState("men");

  // State for Editing Category
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCollection, setEditCollection] = useState("men");
  const [editSubmitting, setEditSubmitting] = useState(false);

  // Popular category suggestion presets for quick creation
  const presets = [
    { name: "Graphic T-Shirts", collection: "men" },
    { name: "Oversized Hoodies", collection: "men" },
    { name: "Floral Summer Dresses", collection: "women" },
    { name: "Tailored Trousers", collection: "women" },
    { name: "Denim & Jackets", collection: "men" },
    { name: "Activewear & Sets", collection: "women" },
    { name: "Kids Casual Sets", collection: "kids" },
    { name: "Winter Coats & Outerwear", collection: "kids" },
    { name: "Footwear & Sneakers", collection: "men" },
    { name: "Leather Accessories", collection: "women" },
  ];

  // Fetch Categories on mount
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategoriesApi();
      if (res?.data?.success) {
        setCategories(res.data.data?.categories || []);
      } else {
        message.error(res?.data?.message || "Failed to load categories");
      }
    } catch (error) {
      console.error(error);
      message.error(
        error.response?.data?.message || "Unable to retrieve categories from server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Compute live slug preview from name
  const computeSlug = (input) => {
    if (!input) return "";
    return input
      .toLowerCase()
      .replace(/[^a-z0-9]/g, " ")
      .trim()
      .split(/\s+/)
      .join("-");
  };

  const previewSlug = computeSlug(name);
  const editPreviewSlug = computeSlug(editName);

  // Handle Create Category Submission
  const handleCreateCategory = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      message.warning("Please provide a category name.");
      return;
    }

    if (!categoryCollection) {
      message.warning("Please choose a collection (Men, Women, or Kids).");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: trimmedName,
        categoryCollection: categoryCollection,
      };

      const res = await createCategoryApi(payload);
      if (res?.data?.success) {
        message.success(res.data.message || "Category created successfully!");
        setName("");
        // Re-fetch to get complete persisted record
        await fetchCategories();
      }
    } catch (error) {
      console.error("Error creating category:", error);
      const errMsg =
        error.response?.data?.message ||
        "Failed to create category. Please ensure the name is unique.";
      message.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  // Open Edit Modal
  const openEditModal = (category) => {
    setEditingCategory(category);
    setEditName(category.name || "");
    setEditCollection(category.categoryCollection || "men");
    setEditModalOpen(true);
  };

  // Submit Category Update
  const handleUpdateCategory = async () => {
    if (!editingCategory) return;
    const trimmed = editName.trim();
    if (!trimmed) {
      message.warning("Category name cannot be empty.");
      return;
    }

    setEditSubmitting(true);
    try {
      const res = await editCategoryApi(editingCategory._id, {
        name: trimmed,
        categoryCollection: editCollection,
      });

      if (res?.data?.success) {
        message.success(res.data.message || "Category updated successfully!");
        setEditModalOpen(false);
        setEditingCategory(null);
        await fetchCategories();
      }
    } catch (error) {
      console.error("Error updating category:", error);
      message.error(
        error.response?.data?.message || "Failed to update category."
      );
    } finally {
      setEditSubmitting(false);
    }
  };

  // Handle Category Deletion
  const handleDeleteCategory = async (id) => {
    try {
      const res = await deleteCategoryApi(id);
      if (res?.data?.success) {
        message.success(res.data.message || "Category removed successfully.");
        setCategories((prev) => prev.filter((cat) => cat._id !== id));
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      message.error(
        error.response?.data?.message ||
          "Cannot delete category. Ensure no products are currently assigned to it."
      );
    }
  };

  // Copy slug to clipboard helper
  const copySlug = (slugText) => {
    navigator.clipboard.writeText(slugText);
    message.info(`Slug "${slugText}" copied to clipboard`);
  };

  // Quick preset apply
  const handleApplyPreset = (preset) => {
    setName(preset.name);
    setCategoryCollection(preset.collection);
  };

  // Filter Categories by search and collection
  const filteredCategories = categories.filter((cat) => {
    const matchesCollection =
      collectionFilter === "all" || cat.categoryCollection === collectionFilter;
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      cat.name?.toLowerCase().includes(query) ||
      cat.slug?.toLowerCase().includes(query) ||
      cat.categoryCollection?.toLowerCase().includes(query);
    return matchesCollection && matchesQuery;
  });

  // Calculate Metrics
  const totalCount = categories.length;
  const menCount = categories.filter((c) => c.categoryCollection === "men").length;
  const womenCount = categories.filter((c) => c.categoryCollection === "women").length;
  const kidsCount = categories.filter((c) => c.categoryCollection === "kids").length;

  const getCollectionBadge = (col) => {
    switch (col) {
      case "men":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <ManOutlined className="text-indigo-600" />
            Men's Collection
          </span>
        );
      case "women":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-pink-700 border border-pink-200">
            <WomanOutlined className="text-pink-600" />
            Women's Collection
          </span>
        );
      case "kids":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <SmileOutlined className="text-amber-600" />
            Kids' Collection
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
            {col}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER BANNER & BREADCRUMBS                                        */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
            <Link to="/admin" className="hover:text-primary transition-colors">
              Admin
            </Link>
            <span>&gt;</span>
            <Link to="/admin/products" className="hover:text-primary transition-colors">
              Catalog
            </Link>
            <span>&gt;</span>
            <span className="text-text-primary">Categories</span>
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
              Category Management
            </h1>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
              Taxonomy & Tags
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1 max-w-2xl">
            Create, structure, and curate product classifications across Men's, Women's, and Kids' departments with automatic URL slugs and storefront synchronization.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            icon={<ReloadOutlined className={loading ? "animate-spin" : ""} />}
            onClick={fetchCategories}
            loading={loading}
            className="rounded-full! text-xs! font-semibold! text-text-primary! bg-surface! hover:bg-canvas! border-border! h-auto! py-2! px-4!"
          >
            Refresh
          </Button>

          <Link to="/admin/products/new">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="rounded-full! text-xs! font-bold! text-on-primary! bg-primary! hover:bg-primary/90! shadow-violet-glow! border-0! h-auto! py-2.5! px-5! flex! items-center! gap-2!"
            >
              Add New Product
            </Button>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. STAT / METRIC CARDS                                                    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Categories */}
        <div className="bg-surface rounded-card p-5 border border-border shadow-level-1 hover:border-primary/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              Total Categories
            </span>
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm">
              <TagsOutlined />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mt-2">
            {totalCount}
          </h2>
          <p className="text-xs text-text-secondary mt-1 font-medium">
            Active catalog classifications
          </p>
          <div className="mt-3">
            <Progress percent={100} showInfo={false} strokeColor="#5433eb" size={["100%", 4]} />
          </div>
        </div>

        {/* Men's Collection */}
        <div className="bg-surface rounded-card p-5 border border-border shadow-level-1 hover:border-indigo-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              Men's Department
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">
              <ManOutlined />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-2">
            {menCount}
          </h2>
          <p className="text-xs text-text-secondary mt-1 font-medium">
            {totalCount ? Math.round((menCount / totalCount) * 100) : 0}% of all categories
          </p>
          <div className="mt-3">
            <Progress
              percent={totalCount ? Math.round((menCount / totalCount) * 100) : 0}
              showInfo={false}
              strokeColor="#4f46e5"
              size={["100%", 4]}
            />
          </div>
        </div>

        {/* Women's Collection */}
        <div className="bg-surface rounded-card p-5 border border-border shadow-level-1 hover:border-pink-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              Women's Department
            </span>
            <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center text-sm">
              <WomanOutlined />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-pink-600 mt-2">
            {womenCount}
          </h2>
          <p className="text-xs text-text-secondary mt-1 font-medium">
            {totalCount ? Math.round((womenCount / totalCount) * 100) : 0}% of all categories
          </p>
          <div className="mt-3">
            <Progress
              percent={totalCount ? Math.round((womenCount / totalCount) * 100) : 0}
              showInfo={false}
              strokeColor="#ec4899"
              size={["100%", 4]}
            />
          </div>
        </div>

        {/* Kids' Collection */}
        <div className="bg-surface rounded-card p-5 border border-border shadow-level-1 hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              Kids' Department
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-sm">
              <SmileOutlined />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-2">
            {kidsCount}
          </h2>
          <p className="text-xs text-text-secondary mt-1 font-medium">
            {totalCount ? Math.round((kidsCount / totalCount) * 100) : 0}% of all categories
          </p>
          <div className="mt-3">
            <Progress
              percent={totalCount ? Math.round((kidsCount / totalCount) * 100) : 0}
              showInfo={false}
              strokeColor="#f59e0b"
              size={["100%", 4]}
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN WORKSPACE: CREATE CATEGORY FORM + EXISTING CATEGORIES LIST         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* ===================================================================== */}
        {/* LEFT COLUMN: CREATE CATEGORY FORM & PREVIEW (5 cols)                  */}
        {/* ===================================================================== */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface rounded-card p-6 sm:p-7 border border-border shadow-level-1 space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-base">
                  <FolderAddOutlined />
                </div>
                <div>
                  <h2 className="text-base font-bold text-text-primary leading-tight">
                    Create New Category
                  </h2>
                  <p className="text-[11px] text-text-secondary">
                    Add new taxonomy label to your catalog
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                Live Sync
              </span>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-5">
              {/* Category Name Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-text-secondary font-medium">
                    Unique identifier
                  </span>
                </div>
                <Input
                  size="large"
                  placeholder="e.g. Graphic T-Shirts, Linen Shirts..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="py-2.5! px-4! bg-canvas! focus:bg-surface! text-sm! font-semibold! text-text-primary! rounded-2xl! border-border! focus:border-primary!"
                  prefix={<TagsOutlined className="text-text-secondary mr-1 text-sm" />}
                  maxLength={60}
                />
              </div>

              {/* Real-time Slug Preview */}
              <div className="p-3.5 rounded-2xl bg-canvas border border-border space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary flex items-center gap-1">
                    <LinkOutlined className="text-primary" /> Auto-Generated Slug
                  </span>
                  {previewSlug && (
                    <button
                      type="button"
                      onClick={() => copySlug(previewSlug)}
                      className="text-[11px] text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <CopyOutlined /> Copy
                    </button>
                  )}
                </div>
                <div className="font-mono text-xs text-text-primary break-all bg-surface px-3 py-1.5 rounded-xl border border-border flex items-center justify-between">
                  <span className={previewSlug ? "text-primary font-bold" : "text-text-secondary"}>
                    {previewSlug ? `/catalog/${previewSlug}` : "slug will appear here..."}
                  </span>
                  {previewSlug && (
                    <CheckCircleOutlined className="text-emerald-500 text-xs ml-2" />
                  )}
                </div>
              </div>

              {/* Collection Selection (Men, Women, Kids) */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                    Target Department <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-text-secondary">Select primary collection</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {/* Men */}
                  <button
                    type="button"
                    onClick={() => setCategoryCollection("men")}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-center cursor-pointer ${
                      categoryCollection === "men"
                        ? "bg-indigo-50/80 border-indigo-400 ring-2 ring-indigo-400/20 text-indigo-900"
                        : "bg-canvas border-border text-text-secondary hover:bg-surface hover:text-text-primary"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm mb-1.5 ${
                        categoryCollection === "men"
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "bg-surface text-text-secondary border border-border"
                      }`}
                    >
                      <ManOutlined />
                    </div>
                    <span className="text-xs font-bold leading-tight">Men</span>
                    <span className="text-[10px] opacity-75 mt-0.5">Apparel</span>
                  </button>

                  {/* Women */}
                  <button
                    type="button"
                    onClick={() => setCategoryCollection("women")}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-center cursor-pointer ${
                      categoryCollection === "women"
                        ? "bg-pink-50/80 border-pink-400 ring-2 ring-pink-400/20 text-pink-900"
                        : "bg-canvas border-border text-text-secondary hover:bg-surface hover:text-text-primary"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm mb-1.5 ${
                        categoryCollection === "women"
                          ? "bg-pink-600 text-white shadow-xs"
                          : "bg-surface text-text-secondary border border-border"
                      }`}
                    >
                      <WomanOutlined />
                    </div>
                    <span className="text-xs font-bold leading-tight">Women</span>
                    <span className="text-[10px] opacity-75 mt-0.5">Fashion</span>
                  </button>

                  {/* Kids */}
                  <button
                    type="button"
                    onClick={() => setCategoryCollection("kids")}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-center cursor-pointer ${
                      categoryCollection === "kids"
                        ? "bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/20 text-amber-900"
                        : "bg-canvas border-border text-text-secondary hover:bg-surface hover:text-text-primary"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm mb-1.5 ${
                        categoryCollection === "kids"
                          ? "bg-amber-600 text-white shadow-xs"
                          : "bg-surface text-text-secondary border border-border"
                      }`}
                    >
                      <SmileOutlined />
                    </div>
                    <span className="text-xs font-bold leading-tight">Kids</span>
                    <span className="text-[10px] opacity-75 mt-0.5">Junior</span>
                  </button>
                </div>
              </div>

              {/* Quick Presets Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary flex items-center gap-1">
                    <ThunderboltOutlined className="text-amber-500" /> Quick Presets
                  </span>
                  <span className="text-[10px] text-text-secondary">Click to auto-populate</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {presets.slice(0, 6).map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className="px-2.5 py-1 rounded-xl bg-canvas hover:bg-[#eae7e7] text-text-primary border border-border text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      + {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Storefront Card Preview */}
              <div className="p-4 rounded-2xl bg-canvas border border-border space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-text-secondary">
                  <span>Storefront Tag Preview</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircleOutlined /> Live Output
                  </span>
                </div>
                <div className="p-3 bg-surface rounded-xl border border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                      {name ? name[0].toUpperCase() : "C"}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-text-primary">
                        {name.trim() || "Sample Category Name"}
                      </p>
                      <p className="text-[10px] text-text-secondary">
                        slug: /{previewSlug || "sample-category-slug"}
                      </p>
                    </div>
                  </div>
                  <div>{getCollectionBadge(categoryCollection)}</div>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <Button
                  type="button"
                  onClick={() => {
                    setName("");
                    setCategoryCollection("men");
                  }}
                  className="w-1/3 rounded-full! text-xs! font-semibold! text-text-primary! bg-surface! hover:bg-canvas! border-border! h-auto! py-2.5!"
                >
                  Clear Form
                </Button>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  icon={<PlusOutlined />}
                  className="w-2/3 rounded-full! text-xs! font-bold! text-on-primary! bg-primary! hover:bg-primary/90! shadow-violet-glow! border-0! h-auto! py-2.5! flex! items-center! justify-center! gap-2!"
                >
                  Create Category
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* RIGHT COLUMN: EXISTING CATEGORIES CATALOG (7 cols)                    */}
        {/* ===================================================================== */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-surface rounded-card p-6 border border-border shadow-level-1 space-y-5">
            {/* Catalog Top Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-text-primary">Existing Categories</h2>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {filteredCategories.length} / {categories.length}
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-0.5">
                  Browse, search, edit, or delete existing categories
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Input
                  placeholder="Search name, slug..."
                  prefix={<SearchOutlined className="text-text-secondary text-sm mr-1.5" />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  allowClear
                  className="rounded-full! py-2! px-4! bg-canvas! hover:bg-[#eae7e7]! focus:bg-surface! border-transparent! focus:border-primary! text-xs!"
                />
              </div>
            </div>

            {/* Department Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-canvas p-1 rounded-full text-xs font-semibold overflow-x-auto">
              {[
                { id: "all", label: `All (${categories.length})` },
                { id: "men", label: `Men (${menCount})` },
                { id: "women", label: `Women (${womenCount})` },
                { id: "kids", label: `Kids (${kidsCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCollectionFilter(tab.id)}
                  className={`px-4 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer text-xs font-bold ${
                    collectionFilter === tab.id
                      ? "bg-surface text-primary shadow-xs"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Categories Table / Card Grid */}
            {loading ? (
              <div className="py-16 text-center space-y-3">
                <ReloadOutlined className="animate-spin text-3xl text-primary" />
                <p className="text-xs font-semibold text-text-secondary">Loading categories...</p>
              </div>
            ) : filteredCategories.length === 0 ? (
              <div className="py-14 text-center space-y-3 bg-canvas/60 rounded-2xl border border-dashed border-border p-6">
                <div className="w-12 h-12 rounded-full bg-surface mx-auto flex items-center justify-center text-xl text-text-secondary shadow-xs">
                  <TagsOutlined />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-text-primary">No categories found</h4>
                  <p className="text-xs text-text-secondary max-w-sm mx-auto">
                    {searchQuery
                      ? `No category matched "${searchQuery}". Try a different keyword.`
                      : "No categories currently exist for this department filter. Use the form on the left to create your first category!"}
                  </p>
                </div>
                {searchQuery && (
                  <Button
                    size="small"
                    onClick={() => setSearchQuery("")}
                    className="rounded-full! text-xs! font-semibold!"
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCategories.map((cat) => {
                  const createdDate = cat.createdAt
                    ? new Date(cat.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Active";

                  return (
                    <div
                      key={cat._id || cat.id}
                      className="p-4 rounded-2xl bg-canvas hover:bg-canvas/80 border border-border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      {/* Left: Icon, Name & Slug */}
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-2xl bg-surface border border-border flex items-center justify-center text-sm font-bold text-primary shadow-2xs group-hover:scale-105 transition-transform flex-shrink-0">
                          {cat.name ? cat.name[0].toUpperCase() : "C"}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-extrabold text-text-primary capitalize truncate">
                              {cat.name}
                            </h3>
                            {getCollectionBadge(cat.categoryCollection)}
                          </div>

                          <div className="flex items-center gap-3 mt-1 text-[11px] text-text-secondary flex-wrap">
                            <span className="font-mono bg-surface px-2 py-0.5 rounded-md border border-border text-text-primary flex items-center gap-1">
                              <LinkOutlined className="text-primary text-[10px]" />
                              {cat.slug || computeSlug(cat.name)}
                            </span>
                            <span className="text-[10px] text-text-secondary">
                              Added {createdDate}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <Tooltip title="Copy slug">
                          <Button
                            type="text"
                            shape="circle"
                            size="small"
                            icon={<CopyOutlined />}
                            onClick={() => copySlug(cat.slug || computeSlug(cat.name))}
                            className="text-text-secondary! hover:text-primary! hover:bg-surface!"
                          />
                        </Tooltip>

                        <Tooltip title="Edit category">
                          <Button
                            type="text"
                            shape="circle"
                            size="small"
                            icon={<EditOutlined />}
                            onClick={() => openEditModal(cat)}
                            className="text-text-secondary! hover:text-primary! hover:bg-surface!"
                          />
                        </Tooltip>

                        <Popconfirm
                          title="Delete Category"
                          description="Are you sure you want to delete this category? Make sure no products are attached to it."
                          onConfirm={() => handleDeleteCategory(cat._id || cat.id)}
                          okText="Delete"
                          cancelText="Cancel"
                          okButtonProps={{ danger: true }}
                        >
                          <Tooltip title="Delete category">
                            <Button
                              type="text"
                              shape="circle"
                              size="small"
                              danger
                              icon={<DeleteOutlined />}
                              className="hover:bg-red-50!"
                            />
                          </Tooltip>
                        </Popconfirm>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Catalog Info Footer */}
            <div className="p-3.5 bg-canvas rounded-2xl border border-border flex items-center justify-between text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <InfoCircleOutlined className="text-primary" />
                <span>Categories are directly linked to products in the Add / Edit Product flow.</span>
              </div>
              <Link
                to="/admin/products"
                className="text-primary font-bold hover:underline flex items-center gap-1 whitespace-nowrap"
              >
                Go to Products <ArrowRightOutlined className="text-[10px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. EDIT CATEGORY MODAL                                                    */}
      {/* ========================================================================= */}
      <Modal
        open={editModalOpen}
        onCancel={() => {
          setEditModalOpen(false);
          setEditingCategory(null);
        }}
        onOk={handleUpdateCategory}
        confirmLoading={editSubmitting}
        okText="Save Changes"
        title={
          <div className="flex items-center gap-2 text-base font-bold text-text-primary">
            <EditOutlined className="text-primary" />
            <span>Edit Category</span>
          </div>
        }
        okButtonProps={{
          className: "bg-primary! rounded-full! font-bold! text-xs!",
        }}
        cancelButtonProps={{
          className: "rounded-full! font-semibold! text-xs!",
        }}
        className="rounded-2xl"
      >
        <div className="py-4 space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1.5">
              Category Name
            </label>
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Category name"
              className="py-2.5! px-3! bg-canvas! text-sm! font-semibold! rounded-xl!"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1.5">
              Updated Slug Preview
            </label>
            <div className="font-mono text-xs text-primary bg-canvas px-3 py-2 rounded-xl border border-border">
              /{editPreviewSlug || "category-slug"}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1.5">
              Department Collection
            </label>
            <Select
              value={editCollection}
              onChange={(val) => setEditCollection(val)}
              className="w-full text-xs font-semibold"
              options={[
                { value: "men", label: "Men's Department" },
                { value: "women", label: "Women's Department" },
                { value: "kids", label: "Kids' Department" },
              ]}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
