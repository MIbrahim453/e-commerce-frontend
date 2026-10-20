import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Select,
  Tag,
  Tooltip,
  Popconfirm,
  message,
  Progress,
  Modal,
  InputNumber,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  FireOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  TagsOutlined,
  ShoppingOutlined,
  LeftOutlined,
  RightOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
import {
  getProductStatsApi,
  getAllProductsApi,
  getCategoriesApi,
  deleteProductApi,
  markTrendingApi,
  markNewArrivalApi,
  updateProductDiscountApi,
} from "../../services/adminService";
import SearchBar from "../../components/SearchBar";
import Loader from "../../components/Loader";

export default function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    outOfStockCount: 0,
    inStockCount: 0,
    lowStockCount: 0,
  });

  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [selectedProductForDiscount, setSelectedProductForDiscount] =
    useState(null);
  const [discountValue, setDiscountValue] = useState(0);
  const [discountSubmitting, setDiscountSubmitting] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const fetchProductStats = async () => {
    setStatsLoading(true);
    try {
      const res = await getProductStatsApi();
      if (res?.data?.success && res.data.data) {
        const data = res.data.data;
        setStats({
          totalProducts: data.totalProducts ?? 0,
          totalCategories: data.totalCategories ?? 0,
          outOfStockCount: data.outOfStockCount ?? data.outOfStock?.length ?? 0,
          inStockCount: data.inStockCount ?? data.inStock?.length ?? 0,
          lowStockCount: data.lowStockCount ?? data.lowStock?.length ?? 0,
        });
      }
    } catch (error) {
      console.error("Failed to fetch product stats:", error);
      message.error(
        error.response?.data?.message || "Failed to load product analytics.",
      );
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchProductsAndCategories = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.allSettled([
        getAllProductsApi(),
        getCategoriesApi(),
      ]);

      if (prodRes.status === "fulfilled" && prodRes.value?.data?.success) {
        setProducts(prodRes.value.data.data?.products || []);
      }

      if (catRes.status === "fulfilled" && catRes.value?.data?.success) {
        setCategories(catRes.value.data.data?.categories || []);
      }
    } catch (error) {
      console.error("Failed to load catalog data:", error);
      message.error("Failed to load product catalog.");
    } finally {
      setLoading(false);
    }
  };

  const loadAllData = async () => {
    await Promise.all([fetchProductStats(), fetchProductsAndCategories()]);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      setDeletingProductId(id);
      const res = await deleteProductApi(id);
      if (res?.data?.success) {
        message.success(res.data.message || "Product deleted successfully");
        setProducts((prev) => prev.filter((p) => (p._id || p.id) !== id));
        fetchProductStats();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error(
        error.response?.data?.message || "Failed to delete product.",
      );
    } finally {
      setDeletingProductId(null);
    }
  };

  const handleOpenDiscountModal = (product) => {
    setSelectedProductForDiscount(product);
    setDiscountValue(Number(product.discount) || 0);
    setIsDiscountModalOpen(true);
  };

  const handleApplyDiscount = async () => {
    if (!selectedProductForDiscount) return;
    const num = Number(discountValue);
    if (isNaN(num) || num < 0 || num > 100) {
      message.error("Discount percentage must be between 0 and 100");
      return;
    }
    try {
      setDiscountSubmitting(true);
      const pid =
        selectedProductForDiscount._id || selectedProductForDiscount.id;
      const res = await updateProductDiscountApi(pid, num);
      if (res?.data?.success) {
        message.success(res.data.message || "Discount updated successfully");
        setProducts((prev) =>
          prev.map((p) =>
            (p._id || p.id) === pid ? { ...p, discount: num } : p,
          ),
        );
        setIsDiscountModalOpen(false);
      } else {
        message.error(res?.data?.message || "Failed to update discount");
      }
    } catch (err) {
      console.error(err);
      message.error(
        err?.response?.data?.message || "Failed to update discount",
      );
    } finally {
      setDiscountSubmitting(false);
    }
  };

  const handleToggleTrending = async (id, currentStatus) => {
    const nextStatus = !currentStatus;
    try {
      const res = await markTrendingApi(id, nextStatus);
      if (res?.data?.success) {
        message.success(
          nextStatus
            ? "Product marked as trending"
            : "Product removed from trending",
        );
        setProducts((prev) =>
          prev.map((p) =>
            (p._id || p.id) === id ? { ...p, isTrending: nextStatus } : p,
          ),
        );
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to update trending status.");
    }
  };

  const handleToggleNewArrival = async (id, currentStatus) => {
    const nextStatus = !currentStatus;
    try {
      const res = await markNewArrivalApi(id, nextStatus);
      if (res?.data?.success) {
        message.success(
          nextStatus
            ? "Product marked as new arrival"
            : "Product removed from new arrival",
        );
        setProducts((prev) => {
          const updated = prev.map((p) =>
            (p._id || p.id) === id ? { ...p, isNewArrival: nextStatus } : p,
          );
          try {
            localStorage.setItem("products", JSON.stringify(updated));
          } catch (storageErr) {
            console.error(
              "Failed to sync products to localStorage:",
              storageErr,
            );
          }
          return updated;
        });
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to update new arrival status.");
    }
  };

  const calculateTotalStock = (product) => {
    if (!product?.details?.sizes || !Array.isArray(product.details.sizes)) {
      return 0;
    }
    return product.details.sizes.reduce(
      (sum, item) => sum + (Number(item.stock) || 0),
      0,
    );
  };

  const getStockStatus = (product) => {
    const total = calculateTotalStock(product);
    if (total <= 0) {
      return { status: "outOfStock", label: "Out of Stock", color: "red" };
    }
    const hasLowSize = product.details?.sizes?.some(
      (s) => Number(s.stock) > 0 && Number(s.stock) <= 5,
    );
    if (hasLowSize || total <= 5) {
      return { status: "lowStock", label: "Low Stock", color: "amber" };
    }
    return { status: "inStock", label: "In Stock", color: "emerald" };
  };

  const filteredProducts = products.filter((p) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = p.name?.toLowerCase().includes(q);
      const skuMatch = (p._id || p.id || "")?.toLowerCase().includes(q);
      const catMatch =
        typeof p.category === "object"
          ? p.category?.name?.toLowerCase().includes(q)
          : String(p.category || "")
            .toLowerCase()
            .includes(q);
      const collectionMatch =
        typeof p.category === "object"
          ? p.category?.categoryCollection?.toLowerCase().includes(q)
          : false;

      if (!nameMatch && !skuMatch && !catMatch && !collectionMatch)
        return false;
    }

    if (selectedCategory !== "all") {
      const catId =
        typeof p.category === "object" ? p.category?._id : p.category;
      const catName =
        typeof p.category === "object" ? p.category?.name : p.category;
      if (catId !== selectedCategory && catName !== selectedCategory) {
        return false;
      }
    }

    if (stockFilter !== "all") {
      const { status } = getStockStatus(p);
      if (status !== stockFilter) return false;
    }

    return true;
  });

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200 min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
            <Link to="/admin" className="hover:text-primary transition-colors">
              Admin
            </Link>
            <span>&gt;</span>
            <span className="text-text-primary">Products Catalog</span>
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
              Products
            </h1>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
              Live Catalog
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1 max-w-2xl">
            Manage commercial values, warehouse stock, categories, and
            marketplace tags with real-time stock sync.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            icon={
              <ReloadOutlined
                className={loading || statsLoading ? "animate-spin" : ""}
              />
            }
            onClick={loadAllData}
            loading={loading || statsLoading}
            className="rounded-full! text-xs! font-semibold! text-text-primary! bg-surface! hover:bg-canvas! border-border! h-auto! py-2! px-4!"
          >
            Refresh
          </Button>

          <Button
            type="primary"
            icon={<PlusOutlined className="text-sm" />}
            onClick={() => navigate("/admin/products/new")}
            className="rounded-full! text-xs! font-bold! text-on-primary! bg-primary! hover:bg-primary/90! shadow-violet-glow! border-0! h-auto! py-2.5! px-6! flex! items-center! gap-2!"
          >
            Add New Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        <div
          onClick={() => setStockFilter("all")}
          className={`bg-surface rounded-card p-4 sm:p-5 border transition-all cursor-pointer shadow-level-1 ${stockFilter === "all"
              ? "border-primary ring-2 ring-primary/20 bg-primary/5"
              : "border-border hover:border-primary/40"
            }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              Total Catalog
            </p>
            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs">
              <ShoppingOutlined />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-text-primary mt-2">
            {statsLoading ? "..." : `${stats.totalProducts} items`}
          </p>
          <p className="text-[11px] text-text-secondary mt-0.5 font-medium">
            Active products in database
          </p>
          <div className="mt-3">
            <Progress
              percent={100}
              showInfo={false}
              strokeColor="#5433eb"
              size={["100%", 3]}
            />
          </div>
        </div>

        <div
          onClick={() =>
            setStockFilter(stockFilter === "inStock" ? "all" : "inStock")
          }
          className={`bg-surface rounded-card p-4 sm:p-5 border transition-all cursor-pointer shadow-level-1 ${stockFilter === "inStock"
              ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/40"
              : "border-border hover:border-emerald-300"
            }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              In Stock
            </p>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <CheckCircleOutlined />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-emerald-600 mt-2">
            {statsLoading ? "..." : `${stats.inStockCount} available`}
          </p>
          <p className="text-[11px] text-text-secondary mt-0.5 font-medium">
            Ready for instant fulfillment
          </p>
          <div className="mt-3">
            <Progress
              percent={
                stats.totalProducts
                  ? Math.round((stats.inStockCount / stats.totalProducts) * 100)
                  : 0
              }
              showInfo={false}
              strokeColor="#10b981"
              size={["100%", 3]}
            />
          </div>
        </div>

        <div
          onClick={() =>
            setStockFilter(stockFilter === "lowStock" ? "all" : "lowStock")
          }
          className={`bg-surface rounded-card p-4 sm:p-5 border transition-all cursor-pointer shadow-level-1 ${stockFilter === "lowStock"
              ? "border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/40"
              : "border-border hover:border-amber-300"
            }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
              Low Stock
            </p>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
              <WarningOutlined />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-amber-600 mt-2">
            {statsLoading ? "..." : `${stats.lowStockCount} items`}
          </p>
          <p className="text-[11px] text-text-secondary mt-0.5 font-medium">
            Remaining stock ≤ 5 units
          </p>
          <div className="mt-3">
            <Progress
              percent={
                stats.totalProducts
                  ? Math.round(
                    (stats.lowStockCount / stats.totalProducts) * 100,
                  )
                  : 0
              }
              showInfo={false}
              strokeColor="#f59e0b"
              size={["100%", 3]}
            />
          </div>
        </div>

        <div
          onClick={() =>
            setStockFilter(stockFilter === "outOfStock" ? "all" : "outOfStock")
          }
          className={`bg-surface rounded-card p-4 sm:p-5 border transition-all cursor-pointer shadow-level-1 ${stockFilter === "outOfStock"
              ? "border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/40"
              : "border-border hover:border-rose-300"
            }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">
              Out of Stock
            </p>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs">
              <CloseCircleOutlined />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-rose-600 mt-2">
            {statsLoading ? "..." : `${stats.outOfStockCount} items`}
          </p>
          <p className="text-[11px] text-text-secondary mt-0.5 font-medium">
            Depleted inventory items
          </p>
          <div className="mt-3">
            <Progress
              percent={
                stats.totalProducts
                  ? Math.round(
                    (stats.outOfStockCount / stats.totalProducts) * 100,
                  )
                  : 0
              }
              showInfo={false}
              strokeColor="#ef4444"
              size={["100%", 3]}
            />
          </div>
        </div>

        <Link
          to="/admin/categories"
          className="col-span-2 sm:col-span-1 bg-surface rounded-card p-4 sm:p-5 border border-border hover:border-indigo-400 transition-all shadow-level-1 block group"
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
              Categories
            </p>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs group-hover:scale-105 transition-transform">
              <TagsOutlined />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-indigo-600 mt-2">
            {statsLoading ? "..." : `${stats.totalCategories} active`}
          </p>
          <p className="text-[11px] text-text-secondary mt-0.5 font-medium flex items-center justify-between">
            <span>Taxonomies linked</span>
            <span className="text-primary font-bold text-[10px] group-hover:underline">
              Manage &rarr;
            </span>
          </p>
          <div className="mt-3">
            <Progress
              percent={100}
              showInfo={false}
              strokeColor="#4f46e5"
              size={["100%", 3]}
            />
          </div>
        </Link>
      </div>

      <div className="bg-surface rounded-card p-5 sm:p-6 border border-border shadow-level-1 space-y-4 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <SearchBar
              placeholder="Search product title, SKU, or department..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              allowClear
              className="bg-canvas! h-10! sm:h-11! border-transparent! focus-within:border-primary!"
            />
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <Select
              value={selectedCategory}
              onChange={(val) => {
                setSelectedCategory(val);
                setCurrentPage(1);
              }}
              className="w-48 text-xs font-semibold"
              options={[
                { value: "all", label: "All Categories" },
                ...categories.map((c) => ({
                  value: c._id || c.id || c.name,
                  label: `${c.name} (${c.categoryCollection || "all"})`,
                })),
              ]}
            />

            <div className="flex items-center gap-1 bg-canvas p-1 rounded-full text-xs font-semibold">
              {[
                { id: "all", label: "All" },
                { id: "inStock", label: "In Stock" },
                { id: "lowStock", label: "Low Stock" },
                { id: "outOfStock", label: "Out of Stock" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => {
                    setStockFilter(pill.id);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${stockFilter === pill.id
                      ? "bg-surface text-primary shadow-2xs"
                      : "text-text-secondary hover:text-text-primary"
                    }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border text-text-secondary text-[10px] uppercase tracking-wider font-bold whitespace-nowrap">
                <th className="py-3 px-3 font-bold">PRODUCT</th>
                <th className="py-3 px-3 font-bold">CATEGORY</th>
                <th className="py-3 px-3 font-bold">PRICE</th>
                <th className="py-3 px-3 font-bold text-center">
                  STOCK & VARIANTS
                </th>
                <th className="py-3 px-3 font-bold text-center">
                  STATUS & BADGES
                </th>
                <th className="py-3 px-3 font-bold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <Loader
                      text="Loading product catalog..."
                      subtext="Syncing inventory levels, commercial values, and taxonomy..."
                    />
                  </td>
                </tr>
              ) : paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-14 text-center">
                    <div className="w-12 h-12 rounded-full bg-canvas mx-auto flex items-center justify-center text-xl text-text-secondary mb-3">
                      <ShoppingOutlined />
                    </div>
                    <p className="text-sm font-bold text-text-primary">
                      No products found
                    </p>
                    <p className="text-xs text-text-secondary mt-1 max-w-sm mx-auto">
                      {searchQuery ||
                        selectedCategory !== "all" ||
                        stockFilter !== "all"
                        ? "Try adjusting your search query or inventory filter settings."
                        : "You haven't added any products yet. Click 'Add New Product' above to create one."}
                    </p>
                    {(searchQuery ||
                      selectedCategory !== "all" ||
                      stockFilter !== "all") && (
                        <Button
                          size="small"
                          onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory("all");
                            setStockFilter("all");
                          }}
                          className="mt-3 rounded-full! text-xs! font-semibold!"
                        >
                          Reset Filters
                        </Button>
                      )}
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((p) => {
                  const pid = p._id || p.id;
                  const totalStock = calculateTotalStock(p);
                  const stockInfo = getStockStatus(p);
                  const categoryName =
                    typeof p.category === "object"
                      ? p.category?.name
                      : p.category || "General";
                  const collectionName =
                    typeof p.category === "object"
                      ? p.category?.categoryCollection
                      : "";

                  const priceNum = Number(p.price) || 0;
                  const discountNum = Number(p.discount) || 0;
                  const finalPrice = discountNum
                    ? (priceNum - priceNum * (discountNum / 100)).toFixed(2)
                    : priceNum.toFixed(2);

                  return (
                    <tr
                      key={pid}
                      className="hover:bg-canvas/50 transition-colors"
                    >
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              p.thumbnail ||
                              "https://placehold.co/100x100?text=No+Image"
                            }
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover border border-border shrink-0 bg-canvas"
                          />
                          <div className="min-w-0">
                            <p className="font-bold text-text-primary truncate max-w-[200px] sm:max-w-xs text-xs">
                              {p.name}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="font-semibold text-text-primary capitalize block">
                          {categoryName}
                        </span>
                        {collectionName && (
                          <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">
                            {collectionName}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="font-extrabold text-primary text-sm">
                          ${finalPrice}
                        </div>
                        {discountNum > 0 && (
                          <div className="flex items-center gap-1.5 mt-0.5 whitespace-nowrap">
                            <span className="text-[10px] text-text-secondary line-through">
                              ${priceNum.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-emerald-600 font-bold">
                              {discountNum}% off
                            </span>
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1 flex-nowrap">
                          {p.details?.sizes && p.details.sizes.length > 0 ? (
                            p.details.sizes.map((s, idx) => (
                              <Tag
                                key={idx}
                                className="rounded! text-[10px] px-1.5 py-0.5 font-bold! border-0! m-0! bg-canvas! text-text-primary! shrink-0! whitespace-nowrap!"
                              >
                                {s.size} ({s.stock})
                              </Tag>
                            ))
                          ) : (
                            <span className="text-text-secondary text-[11px]">
                              No sizes
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-[11px] font-bold block mt-1 whitespace-nowrap text-center ${totalStock <= 0
                              ? "text-rose-600"
                              : totalStock <= 5
                                ? "text-amber-600"
                                : "text-emerald-600"
                            }`}
                        >
                          Total: {totalStock} units
                        </span>
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1.5 flex-nowrap">
                          <Tag
                            color={stockInfo.color}
                            className="rounded-full! px-2! py-0.5! text-[10px] font-bold! m-0! shrink-0! whitespace-nowrap!"
                          >
                            {stockInfo.label}
                          </Tag>

                          <Tooltip title="Click to toggle Trending status">
                            <Tag
                              onClick={() =>
                                handleToggleTrending(pid, p.isTrending)
                              }
                              className={`rounded-full! px-2! py-0.5! text-[10px] font-bold! cursor-pointer transition-all m-0! inline-flex! items-center! gap-1! shrink-0! whitespace-nowrap! ${p.isTrending
                                  ? "bg-amber-100! text-amber-700! border-amber-300!"
                                  : "bg-canvas! text-text-secondary! border-border! opacity-70!"
                                }`}
                            >
                              <FireOutlined /> Trending
                            </Tag>
                          </Tooltip>

                          <Tooltip title="Click to toggle New Arrival status">
                            <Tag
                              onClick={() =>
                                handleToggleNewArrival(pid, p.isNewArrival)
                              }
                              className={`rounded-full! px-2! py-0.5! text-[10px] font-bold! cursor-pointer transition-all m-0! inline-flex! items-center! gap-1! shrink-0! whitespace-nowrap! ${p.isNewArrival
                                  ? "bg-indigo-100! text-indigo-700! border-indigo-300!"
                                  : "bg-canvas! text-text-secondary! border-border! opacity-70!"
                                }`}
                            >
                              <ThunderboltOutlined /> New
                            </Tag>
                          </Tooltip>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5 flex-nowrap">
                          <Button
                            size="small"
                            icon={<PercentageOutlined className="text-xs" />}
                            onClick={() => handleOpenDiscountModal(p)}
                            className="rounded-lg! border-amber-300! bg-amber-50! text-amber-800! hover:bg-amber-100! font-bold! text-[11px]! flex! items-center! gap-1! shadow-xs!"
                            title="Apply or Edit Discount"
                          >
                            {discountNum > 0
                              ? `${discountNum}% Off`
                              : "Discount"}
                          </Button>

                          <Link to={`/admin/products/edit/${p.slug}/${pid}`}>
                            <Button
                              size="small"
                              icon={<EditOutlined className="text-xs" />}
                              className="rounded-lg! border-border! bg-surface! text-text-primary! hover:bg-canvas! font-semibold! text-[11px]!"
                            >
                              Edit
                            </Button>
                          </Link>

                          <Popconfirm
                            title="Delete Product"
                            description="Are you sure you want to permanently delete this product?"
                            onConfirm={() => handleDeleteProduct(pid)}
                            okText="Delete"
                            cancelText="Cancel"
                            okButtonProps={{ danger: true }}
                          >
                            <Button
                              type="text"
                              size="small"
                              danger
                              icon={<DeleteOutlined className="text-xs" />}
                              className="rounded-lg! hover:bg-red-50!"
                            />
                          </Popconfirm>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-text-secondary">
          <div>
            Showing{" "}
            {totalItems === 0
              ? 0
              : `${(currentPage - 1) * pageSize + 1}-${Math.min(
                currentPage * pageSize,
                totalItems,
              )}`}{" "}
            of {totalItems} filtered products ({stats.totalProducts} total in
            database)
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="small"
              icon={<LeftOutlined className="text-xs" />}
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="rounded-lg! border-border! bg-surface! text-text-primary! hover:bg-canvas!"
            />
            <span className="font-bold text-text-primary px-2">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              size="small"
              icon={<RightOutlined className="text-xs" />}
              disabled={currentPage >= totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              className="rounded-lg! border-border! bg-surface! text-text-primary! hover:bg-canvas!"
            />
          </div>
        </div>
      </div>

      {deletingProductId && (
        <Loader
          fullscreen
          text="Deleting Product..."
          subtext="Removing item and synchronizing warehouse catalog..."
        />
      )}

      {discountSubmitting && (
        <Loader
          fullscreen
          text="Applying Discount..."
          subtext="Updating live prices across the customer storefront..."
        />
      )}

      <Modal
        title={
          <div className="flex items-center gap-2.5 pb-2 border-b border-border">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold">
              <PercentageOutlined />
            </div>
            <div>
              <h3 className="text-sm font-bold text-text-primary m-0">
                Set Product Discount
              </h3>
              <p className="text-[11px] text-text-secondary m-0">
                Apply a markdown percentage without editing full product details
              </p>
            </div>
          </div>
        }
        open={isDiscountModalOpen}
        onCancel={() => !discountSubmitting && setIsDiscountModalOpen(false)}
        footer={null}
        centered
        width={480}
        destroyOnClose
      >
        {selectedProductForDiscount && (
          <div className="pt-4 space-y-4 text-xs">
            <div className="p-3 bg-canvas rounded-2xl border border-border flex items-center gap-3">
              <img
                src={
                  selectedProductForDiscount.thumbnail ||
                  "https://placehold.co/100x100?text=No+Image"
                }
                alt={selectedProductForDiscount.name}
                className="w-12 h-12 rounded-xl object-cover border border-border bg-surface shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-text-primary text-sm truncate m-0">
                  {selectedProductForDiscount.name}
                </p>
                <p className="text-[11px] text-text-secondary m-0 mt-0.5">
                  Base Price:{" "}
                  <strong className="text-text-primary">
                    ${Number(selectedProductForDiscount.price || 0).toFixed(2)}
                  </strong>
                </p>
              </div>
            </div>

            {(() => {
              const basePrice = Number(selectedProductForDiscount.price || 0);
              const disc = Math.min(
                100,
                Math.max(0, Number(discountValue) || 0),
              );
              const savings = basePrice * (disc / 100);
              const discountedPrice = Math.max(0, basePrice - savings);

              return (
                <div className="p-3.5 bg-surface rounded-2xl border border-amber-200/80 bg-amber-50/20 space-y-2">
                  <div className="flex justify-between text-text-secondary">
                    <span>Original Price:</span>
                    <span className="font-semibold text-text-primary">
                      ${basePrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-amber-700 font-semibold">
                    <span>Discount Applied:</span>
                    <span>
                      {disc}% (-${savings.toFixed(2)})
                    </span>
                  </div>
                  <div className="pt-2 border-t border-amber-200/60 flex justify-between items-baseline">
                    <span className="font-bold text-text-primary">
                      Customer Price:
                    </span>
                    <div className="text-right">
                      <span className="text-lg font-extrabold text-primary">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      {disc > 0 && (
                        <span className="text-[11px] text-text-secondary line-through ml-2">
                          ${basePrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}

            <div>
              <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-2">
                Quick Discount Presets
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[0, 10, 15, 20, 25, 30, 40, 50].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDiscountValue(pct)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${Number(discountValue) === pct
                        ? "bg-primary text-white border-primary shadow-xs"
                        : "bg-canvas text-text-primary border-border hover:bg-surface hover:border-primary/40"
                      }`}
                  >
                    {pct === 0 ? "0% (Clear)" : `${pct}% Off`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">
                Custom Discount Percentage (0% to 100%)
              </label>
              <InputNumber
                min={0}
                max={100}
                value={discountValue}
                onChange={(val) => setDiscountValue(val ?? 0)}
                addonAfter="%"
                size="large"
                className="w-full! text-sm! font-bold! rounded-2xl!"
              />
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-end gap-2.5">
              <Button
                onClick={() => setIsDiscountModalOpen(false)}
                disabled={discountSubmitting}
                className="rounded-full! text-xs! font-bold! text-text-secondary! hover:text-text-primary! border-border!"
              >
                Cancel
              </Button>

              <Button
                type="primary"
                onClick={handleApplyDiscount}
                loading={discountSubmitting}
                className="rounded-full! bg-primary! text-on-primary! text-xs! font-bold! border-0! px-6! shadow-violet-glow!"
              >
                Apply Discount
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
