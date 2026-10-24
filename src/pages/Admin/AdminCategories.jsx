import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Input, message, Progress, Popconfirm } from "antd";
import {
  TagsOutlined,
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
  FolderAddOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  ThunderboltOutlined,
  ManOutlined,
  WomanOutlined,
  SmileOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  getCategoriesApi,
  createCategoryApi,
  deleteCategoryApi,
} from "../../services/adminService";
import Loader from "../../components/Loader";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [collectionFilter, setCollectionFilter] = useState("all");
  const [name, setName] = useState("");
  const [categoryCollection, setCategoryCollection] = useState("men");

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
        error.response?.data?.message ||
        "Unable to retrieve categories from server.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleApplyPreset = (preset) => {
    setName(preset.name);
    setCategoryCollection(preset.collection);
  };

  const handleDeleteCategory = async (id) => {
    try {
      const res = await deleteCategoryApi(id);
      if (res?.data?.success) {
        message.success(
          res.data.message || "Category deleted successfully!",
        );
        await fetchCategories();
      } else {
        message.error(res?.data?.message || "Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      message.error(
        error.response?.data?.message ||
          "Failed to delete category. Please try again.",
      );
    }
  };

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

  const totalCount = categories.length;
  const menCount = categories.filter(
    (c) => c.categoryCollection === "men",
  ).length;
  const womenCount = categories.filter(
    (c) => c.categoryCollection === "women",
  ).length;
  const kidsCount = categories.filter(
    (c) => c.categoryCollection === "kids",
  ).length;

  const getCollectionBadge = (col) => {
    switch (col) {
      case "men":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0 whitespace-nowrap">
            <ManOutlined className="text-indigo-600" />
            Men's Collection
          </span>
        );
      case "women":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-pink-700 border border-pink-200 shrink-0 whitespace-nowrap">
            <WomanOutlined className="text-pink-600" />
            Women's Collection
          </span>
        );
      case "kids":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 shrink-0 whitespace-nowrap">
            <SmileOutlined className="text-amber-600" />
            Kids' Collection
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 shrink-0 whitespace-nowrap">
            {col}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {submitting && (
        <Loader
          fullscreen
          text="Creating Category..."
          subtext="Syncing taxonomy and storefront tags in real-time..."
        />
      )}
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary flex-wrap">
            <Link to="/admin" className="hover:text-primary transition-colors">
              Admin
            </Link>
            <span>&gt;</span>
            <Link
              to="/admin/products"
              className="hover:text-primary transition-colors"
            >
              Catalog
            </Link>
            <span>&gt;</span>
            <span className="text-text-primary">Categories</span>
          </div>
          <div className="flex items-center gap-2.5 mt-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary m-0">
              Category Management
            </h1>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary border border-primary/20 shrink-0 whitespace-nowrap">
              Taxonomy &amp; Tags
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1 max-w-2xl m-0">
            Create, structure, and curate product classifications across Men, Women, and Kids collections with automatic URL slugs.
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
              className="rounded-full! text-xs! font-bold! text-on-primary! bg-primary! hover:bg-primary/90! shadow-violet-glow! border-0! h-auto! py-2! px-4! flex! items-center! gap-2!"
            >
              Add New Product
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-surface rounded-card p-5 border border-border shadow-level-1 hover:border-primary/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              Total Categories
            </span>
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm">
              <TagsOutlined />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary mt-2 m-0">
            {totalCount}
          </h2>
          <p className="text-xs text-text-secondary mt-1 font-medium">
            Active catalog classifications
          </p>
          <div className="mt-3">
            <Progress
              percent={100}
              showInfo={false}
              strokeColor="#5433eb"
              size={["100%", 4]}
            />
          </div>
        </div>

        <div className="bg-surface rounded-card p-5 border border-border shadow-level-1 hover:border-indigo-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              Men's Department
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">
              <ManOutlined />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mt-2 m-0">
            {menCount}
          </h2>
          <p className="text-xs text-text-secondary mt-1 font-medium">
            {totalCount ? Math.round((menCount / totalCount) * 100) : 0}% of all
            categories
          </p>
          <div className="mt-3">
            <Progress
              percent={
                totalCount ? Math.round((menCount / totalCount) * 100) : 0
              }
              showInfo={false}
              strokeColor="#4f46e5"
              size={["100%", 4]}
            />
          </div>
        </div>

        <div className="bg-surface rounded-card p-5 border border-border shadow-level-1 hover:border-pink-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              Women's Department
            </span>
            <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center text-sm">
              <WomanOutlined />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-pink-600 mt-2 m-0">
            {womenCount}
          </h2>
          <p className="text-xs text-text-secondary mt-1 font-medium">
            {totalCount ? Math.round((womenCount / totalCount) * 100) : 0}% of
            all categories
          </p>
          <div className="mt-3">
            <Progress
              percent={
                totalCount ? Math.round((womenCount / totalCount) * 100) : 0
              }
              showInfo={false}
              strokeColor="#ec4899"
              size={["100%", 4]}
            />
          </div>
        </div>

        <div className="bg-surface rounded-card p-5 border border-border shadow-level-1 hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              Kids' Department
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-sm">
              <SmileOutlined />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-amber-600 mt-2 m-0">
            {kidsCount}
          </h2>
          <p className="text-xs text-text-secondary mt-1 font-medium">
            {totalCount ? Math.round((kidsCount / totalCount) * 100) : 0}% of
            all categories
          </p>
          <div className="mt-3">
            <Progress
              percent={
                totalCount ? Math.round((kidsCount / totalCount) * 100) : 0
              }
              showInfo={false}
              strokeColor="#f59e0b"
              size={["100%", 4]}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface rounded-card p-6 sm:p-7 border border-border shadow-level-1 space-y-6 sticky top-24">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-border">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-base shrink-0">
                  <FolderAddOutlined />
                </div>
                <div className="min-w-0">
                  <h2 className="text-base font-bold text-text-primary leading-tight truncate">
                    Create New Category
                  </h2>
                  <p className="text-[11px] text-text-secondary truncate">
                    Add new taxonomy label to your catalog
                  </p>
                </div>
              </div>
              <span className="shrink-0 whitespace-nowrap text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                Live Sync
              </span>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-5">
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
                  prefix={
                    <TagsOutlined className="text-text-secondary mr-1 text-sm" />
                  }
                  maxLength={60}
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-canvas border border-border space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary flex items-center gap-1 shrink-0 whitespace-nowrap">
                    Auto-Generated Slug
                  </span>
                </div>
                <div className="font-mono text-xs text-text-primary break-all bg-surface px-3 py-1.5 rounded-xl border border-border flex items-center justify-between gap-2">
                  <span
                    className={`truncate ${previewSlug ? "text-primary font-bold" : "text-text-secondary"}`}
                  >
                    {previewSlug
                      ? `/products/${previewSlug}`
                      : "slug will appear here..."}
                  </span>
                  {previewSlug && (
                    <CheckCircleOutlined className="text-emerald-500 text-xs shrink-0" />
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                    Target Department <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-text-secondary">
                    Select primary collection
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setCategoryCollection("men")}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-center cursor-pointer ${categoryCollection === "men"
                        ? "bg-indigo-50/80 border-indigo-400 ring-2 ring-indigo-400/20 text-indigo-900"
                        : "bg-canvas border-border text-text-secondary hover:bg-surface hover:text-text-primary"
                      }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm mb-1.5 ${categoryCollection === "men"
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "bg-surface text-text-secondary border border-border"
                        }`}
                    >
                      <ManOutlined />
                    </div>
                    <span className="text-xs font-bold leading-tight">Men</span>
                    <span className="text-[10px] opacity-75 mt-0.5">
                      Apparel
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategoryCollection("women")}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-center cursor-pointer ${categoryCollection === "women"
                        ? "bg-pink-50/80 border-pink-400 ring-2 ring-pink-400/20 text-pink-900"
                        : "bg-canvas border-border text-text-secondary hover:bg-surface hover:text-text-primary"
                      }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm mb-1.5 ${categoryCollection === "women"
                          ? "bg-pink-600 text-white shadow-xs"
                          : "bg-surface text-text-secondary border border-border"
                        }`}
                    >
                      <WomanOutlined />
                    </div>
                    <span className="text-xs font-bold leading-tight">
                      Women
                    </span>
                    <span className="text-[10px] opacity-75 mt-0.5">
                      Fashion
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategoryCollection("kids")}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-center cursor-pointer ${categoryCollection === "kids"
                        ? "bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/20 text-amber-900"
                        : "bg-canvas border-border text-text-secondary hover:bg-surface hover:text-text-primary"
                      }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm mb-1.5 ${categoryCollection === "kids"
                          ? "bg-amber-600 text-white shadow-xs"
                          : "bg-surface text-text-secondary border border-border"
                        }`}
                    >
                      <SmileOutlined />
                    </div>
                    <span className="text-xs font-bold leading-tight">
                      Kids
                    </span>
                    <span className="text-[10px] opacity-75 mt-0.5">
                      Junior
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary flex items-center gap-1">
                    <ThunderboltOutlined className="text-amber-500" /> Quick
                    Presets
                  </span>
                  <span className="text-[10px] text-text-secondary">
                    Click to auto-populate
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {presets.slice(0, 6).map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className="px-2.5 py-1 rounded-xl bg-canvas hover:bg-[#eae7e7] text-text-primary border border-border text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap"
                    >
                      + {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-canvas border border-border space-y-2.5">
                <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-text-secondary">
                  <span className="whitespace-nowrap">
                    Storefront Tag Preview
                  </span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1 shrink-0 whitespace-nowrap">
                    <CheckCircleOutlined /> Live Output
                  </span>
                </div>
                <div className="p-3 bg-surface rounded-xl border border-border flex items-center justify-between gap-3 min-w-0">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                      {name ? name[0].toUpperCase() : "C"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-text-primary truncate">
                        {name.trim() || "Sample Category Name"}
                      </p>
                      <p className="text-[10px] text-text-secondary truncate font-mono">
                        slug: /products/{previewSlug || "sample-category-slug"}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    {getCollectionBadge(categoryCollection)}
                  </div>
                </div>
              </div>

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

        <div className="lg:col-span-7 space-y-5">
          <div className="bg-surface rounded-card p-6 border border-border shadow-level-1 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-text-primary whitespace-nowrap">
                    Existing Categories
                  </h2>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                    {filteredCategories.length} / {categories.length}
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-0.5">
                  Browse or search
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Input
                  placeholder="Search name, slug..."
                  prefix={
                    <SearchOutlined className="text-text-secondary text-sm mr-1.5" />
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  allowClear
                  className="rounded-full! py-2! px-4! bg-canvas! hover:bg-[#eae7e7]! focus:bg-surface! border-transparent! focus:border-primary! text-xs!"
                />
              </div>
            </div>

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
                  className={`px-4 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer text-xs font-bold ${collectionFilter === tab.id
                      ? "bg-surface text-primary shadow-xs"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface/50"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {loading ? (
              <Loader
                text="Loading categories..."
                subtext="Syncing classifications and collection tags"
                className="py-12"
              />
            ) : filteredCategories.length === 0 ? (
              <div className="py-14 text-center space-y-3 bg-canvas/60 rounded-2xl border border-dashed border-border p-6">
                <div className="w-12 h-12 rounded-full bg-surface mx-auto flex items-center justify-center text-xl text-text-secondary shadow-xs">
                  <TagsOutlined />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-text-primary">
                    No categories found
                  </h4>
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
                            <span className="font-mono bg-surface px-2.5 py-0.5 rounded-md border border-border text-text-primary text-[11px]">
                              /products/{cat.slug || computeSlug(cat.name)}
                            </span>
                            <span className="text-[10px] text-text-secondary">
                              Added {createdDate}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <Popconfirm
                          title="Delete Category"
                          description="Are you sure? This will delete all products in this category and mark related orders as cancelled."
                          onConfirm={() =>
                            handleDeleteCategory(cat._id || cat.id)
                          }
                          okText="Delete"
                          cancelText="Cancel"
                          okButtonProps={{ danger: true }}
                        >
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined className="text-sm" />}
                            className="rounded-xl! hover:bg-red-50! text-red-500! flex! items-center! justify-center! p-2!"
                            title="Delete Category"
                          />
                        </Popconfirm>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="p-3.5 bg-canvas rounded-2xl border border-border flex items-center justify-between text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <InfoCircleOutlined className="text-primary" />
                <span>
                  Categories are directly linked to products in the Add / Edit
                  Product flow.
                </span>
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
    </div>
  );
}
