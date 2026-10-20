import React, { useState, useEffect } from "react";
import {
  useSearchParams,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Drawer } from "antd";
import {
  FilterOutlined,
  CloseOutlined,
  DownOutlined,
  UpOutlined,
  FireOutlined,
} from "@ant-design/icons";
import Filters from "./Filters";
import Products from "./Products";
import SearchBar from "../../components/SearchBar";
import {
  getCategoriesApi,
  getAllProductsApi,
} from "../../services/productService";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { collection: routeCollection } = useParams();

  const activeCollection = (
    routeCollection ||
    searchParams.get("collection") ||
    ""
  ).toLowerCase();
  const isTrendingParam = searchParams.get("filter") === "trending";
  const isNewParam =
    location.pathname === "/new" || searchParams.get("filter") === "new";
  const categoryParam = searchParams.get("category");

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [showInlineMobileFilters, setShowInlineMobileFilters] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(
    categoryParam || "All",
  );
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("q") || searchParams.get("search") || "",
  );
  const [trendingOnly, setTrendingOnly] = useState(isTrendingParam);
  const [newOnly, setNewOnly] = useState(isNewParam);
  const [filteredCount, setFilteredCount] = useState(0);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
    const qParam = searchParams.get("q") || searchParams.get("search");
    if (qParam !== null && qParam !== undefined) {
      setSearchQuery(qParam);
    } else if (!searchParams.has("q") && !searchParams.has("search")) {
      setSearchQuery("");
    }
    setTrendingOnly(searchParams.get("filter") === "trending");
    const isNew =
      location.pathname === "/new" || searchParams.get("filter") === "new";
    setNewOnly(isNew);
  }, [location.pathname, searchParams]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          getCategoriesApi(),
          getAllProductsApi(),
        ]);

        const catList = catRes?.data?.data?.categories || [];
        const prodList = prodRes?.data?.data?.products || [];

        const mapped = catList.map((cat) => {
          const count = prodList.filter((p) => {
            const pCatId = p.category?._id || p.category;
            const pCatName = p.category?.name || p.category;
            return (
              pCatId === cat._id ||
              pCatName?.toLowerCase() === cat.name?.toLowerCase()
            );
          }).length;

          return {
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            categoryCollection: (cat.categoryCollection || "").toLowerCase(),
            count,
          };
        });

        setCategories(mapped);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setTrendingOnly(searchParams.get("filter") === "trending");
  }, [searchParams]);

  const handleSelectCategory = (catName, catCollection) => {
    if (catName === "All Products" || catName === "All") {
      setSelectedCategory("All");
      if (showInlineMobileFilters) setShowInlineMobileFilters(false);
      if (mobileFilterOpen) setMobileFilterOpen(false);
      return;
    }
    setSelectedCategory(catName);
    if (
      catCollection &&
      activeCollection &&
      activeCollection !== catCollection.toLowerCase()
    ) {
      navigate(
        `/collections/${catCollection.toLowerCase()}?category=${encodeURIComponent(catName)}`,
      );
    }
    if (showInlineMobileFilters) setShowInlineMobileFilters(false);
    if (mobileFilterOpen) setMobileFilterOpen(false);
  };

  const handleSelectCollection = (colKey) => {
    if (!colKey || colKey === "all") {
      navigate("/catalog");
    } else {
      navigate(`/collections/${colKey.toLowerCase()}`);
    }
    setSelectedCategory("All");
    if (showInlineMobileFilters) setShowInlineMobileFilters(false);
    if (mobileFilterOpen) setMobileFilterOpen(false);
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setPriceRange([0, 500]);
    setInStock(false);
    setOnSale(false);
    setSearchQuery("");
    setTrendingOnly(false);
    setNewOnly(false);
    setSearchParams({});
    if (activeCollection) {
      navigate("/catalog");
    } else if (location.pathname === "/new") {
      navigate("/catalog");
    }
  };

  const relevantCategories = activeCollection
    ? categories.filter(
      (c) => (c.categoryCollection || "").toLowerCase() === activeCollection,
    )
    : categories;

  const mobileCategoryTabs = [
    {
      name: activeCollection
        ? `All ${activeCollection.charAt(0).toUpperCase() + activeCollection.slice(1)}`
        : "All Products",
    },
    ...relevantCategories.map((c) => ({ name: c.name, count: c.count })),
  ];

  const filterProps = {
    categories,
    selectedCategory,
    onSelectCategory: handleSelectCategory,
    selectedCollection: activeCollection,
    onSelectCollection: handleSelectCollection,
    priceRange,
    onPriceChange: setPriceRange,
    inStock,
    onInStockChange: setInStock,
    onSale,
    onSaleChange: setOnSale,
    onReset: handleResetFilters,
  };

  return (
    <div className="min-h-screen! bg-canvas! py-6! sm:py-8! md:py-10!">
      <div className="max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8!">
        <div className="w-full! mb-5! sm:mb-7!">
          <SearchBar
            value={searchQuery}
            onChange={(e) => {
              const val = e.target.value;
              setSearchQuery(val);
              const nextParams = new URLSearchParams(searchParams);
              if (val && val.trim()) {
                nextParams.set("q", val.trim());
              } else {
                nextParams.delete("q");
                nextParams.delete("search");
              }
              setSearchParams(nextParams, { replace: true });
            }}
            onSearch={(val) => {
              const trimmed = (val || "").trim();
              if (!trimmed) return;
              try {
                const raw = localStorage.getItem("recent_searches");
                const current = raw ? JSON.parse(raw) : [];
                const filtered = Array.isArray(current)
                  ? current.filter(
                    (item) => item.toLowerCase() !== trimmed.toLowerCase(),
                  )
                  : [];
                localStorage.setItem(
                  "recent_searches",
                  JSON.stringify([trimmed, ...filtered].slice(0, 6)),
                );
                window.dispatchEvent(new Event("recent_searches_updated"));
              } catch (e) { }
            }}
            allowClear
            placeholder="Search products by title, material, color, category..."
          />
        </div>

        <div className="lg:hidden! mb-4! flex! items-center! gap-2! overflow-x-auto! pb-2! no-scrollbar!">
          {mobileCategoryTabs.map((cat) => {
            const isActive =
              selectedCategory.toLowerCase() === cat.name.toLowerCase() ||
              (selectedCategory === "All" && cat.name === "All Products");

            return (
              <button
                key={cat.name}
                type="button"
                onClick={() =>
                  setSelectedCategory(
                    cat.name === "All Products" ? "All" : cat.name,
                  )
                }
                className={`rounded-full! px-4! py-2! text-xs! font-semibold! tracking-[-0.02em]! whitespace-nowrap! shrink-0! transition-all! cursor-pointer! border! flex! items-center! gap-2! ${isActive
                    ? "bg-[#1a1a1a]! text-white! border-transparent! shadow-xs!"
                    : "bg-white! text-text-primary! border-border! hover:bg-canvas!"
                  }`}
              >
                <span>{cat.name}</span>
                {cat.count !== undefined && (
                  <span
                    className={`text-[10px]! px-1.5! py-0.5! rounded-full! font-bold! ${isActive
                        ? "bg-white/20! text-white!"
                        : "bg-canvas! text-text-secondary!"
                      }`}
                  >
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="lg:hidden! mb-5! flex! items-center! justify-between! bg-white! px-4! py-3! rounded-[20px]! border! border-border! shadow-level-1!">
          <div className="flex! items-center! gap-2!">
            <span className="text-xs! text-text-secondary! font-medium!">
              {filteredCount} items found
            </span>
          </div>

          <div className="flex! items-center! gap-2!">
            <button
              type="button"
              onClick={() =>
                setShowInlineMobileFilters(!showInlineMobileFilters)
              }
              className={`flex! items-center! gap-1.5! px-3.5! py-1.5! text-xs! font-semibold! rounded-full! transition-all! cursor-pointer! border! ${showInlineMobileFilters
                  ? "bg-[#5433eb]! text-white! border-[#5433eb]! shadow-violet-glow!"
                  : "bg-[#eee9ff]! text-[#5433eb]! border-transparent! hover:bg-[#e4dfff]!"
                }`}
            >
              <FilterOutlined />
              <span>Filters</span>
              {showInlineMobileFilters ? (
                <UpOutlined className="text-[10px]!" />
              ) : (
                <DownOutlined className="text-[10px]!" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              title="Open full filter sheet"
              className="w-8! h-8! rounded-full! bg-canvas! hover:bg-gray-200! text-text-primary! flex! items-center! justify-center! border-0! cursor-pointer! transition-colors!"
            >
              <FilterOutlined className="text-xs!" />
            </button>
          </div>
        </div>

        {showInlineMobileFilters && (
          <div className="lg:hidden! mb-6! transition-all! duration-300!">
            <div className="bg-white! rounded-[24px]! p-4! border! border-border! shadow-level-1!">
              <div className="flex! items-center! justify-between! mb-3! pb-2! border-b! border-border!">
                <span className="text-sm! font-semibold! text-text-primary!">
                  Filter Options
                </span>
                <button
                  type="button"
                  onClick={() => setShowInlineMobileFilters(false)}
                  className="text-xs! text-text-secondary! hover:text-text-primary! bg-transparent! border-0! cursor-pointer!"
                >
                  Close
                </button>
              </div>
              <Filters
                isMobile={true}
                onClose={() => setShowInlineMobileFilters(false)}
                {...filterProps}
              />
            </div>
          </div>
        )}

        <div className="flex! flex-col! lg:flex-row! items-start! gap-6! lg:gap-8!">
          <div className="hidden! lg:block! w-[280px]! shrink-0!">
            <Filters {...filterProps} />
          </div>

          <main className="w-full! flex-1!">
            {activeCollection && (
              <div className="mb-5! flex! flex-col! sm:flex-row! sm:items-center! justify-between! gap-3! bg-white! rounded-[24px]! p-4! sm:p-5! border! border-border! shadow-level-1!">
                <div className="flex! items-center! gap-3!">
                  <span className="w-3! h-3! rounded-full! bg-[#5433eb]! shrink-0!" />
                  <div>
                    <h2 className="text-base! sm:text-lg! font-bold! text-text-primary! capitalize! m-0!">
                      {activeCollection}'s Collection
                    </h2>
                    <p className="text-xs! text-text-secondary! m-0!">
                      Showing all products in {activeCollection}'s collection (
                      {filteredCount} {filteredCount === 1 ? "item" : "items"})
                    </p>
                  </div>
                </div>
                <div className="flex! items-center! gap-2! flex-wrap!">
                  <button
                    type="button"
                    onClick={() => navigate("/catalog")}
                    className="text-xs! font-semibold! text-text-secondary! hover:text-text-primary! px-3.5! py-1.5! rounded-full! bg-canvas! hover:bg-gray-200! transition-colors! cursor-pointer! border-0!"
                  >
                    View All Catalog
                  </button>
                  {["men", "women", "kids"]
                    .filter((c) => c !== activeCollection)
                    .map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => navigate(`/collections/${c}`)}
                        className="text-xs! font-semibold! text-[#5433eb]! hover:bg-[#5433eb]/10! px-3! py-1.5! rounded-full! bg-[#eee9ff]! transition-colors! cursor-pointer! border-0! capitalize!"
                      >
                        {c}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {trendingOnly && (
              <div className="mb-4! flex! items-center! gap-2!">
                <span className="inline-flex! items-center! gap-1.5! px-3! py-1! rounded-full! text-xs! font-bold! bg-amber-50! text-amber-800! border! border-amber-200! shadow-xs!">
                  <FireOutlined className="text-amber-500!" />
                  <span>Trending Deals Active</span>
                  <button
                    type="button"
                    onClick={() => {
                      setTrendingOnly(false);
                      setSearchParams({});
                    }}
                    className="ml-1! text-amber-700! hover:text-amber-900! cursor-pointer! bg-transparent! border-0! font-bold! text-xs!"
                    title="Remove trending filter"
                  >
                    ✕
                  </button>
                </span>
              </div>
            )}
            <Products
              selectedCollection={activeCollection}
              selectedCategory={selectedCategory}
              priceRange={priceRange}
              inStock={inStock}
              onSale={onSale}
              searchQuery={searchQuery}
              trendingOnly={trendingOnly}
              newOnly={newOnly}
              onFilteredCountChange={setFilteredCount}
              onResetFilters={handleResetFilters}
            />
          </main>
        </div>

        <Drawer
          title={
            <div className="flex! items-center! justify-between! w-full!">
              <span className="font-semibold! text-base! text-text-primary!">
                Filter & Refine Products
              </span>
            </div>
          }
          placement="left"
          onClose={() => setMobileFilterOpen(false)}
          open={mobileFilterOpen}
          width={320}
          styles={{ body: { padding: "16px" } }}
          closeIcon={<CloseOutlined className="text-text-primary!" />}
        >
          <Filters
            isMobile={true}
            onClose={() => setMobileFilterOpen(false)}
            {...filterProps}
          />
        </Drawer>
      </div>
    </div>
  );
}
