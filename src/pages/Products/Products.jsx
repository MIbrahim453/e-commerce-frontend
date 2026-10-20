import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  StarFilled,
  ArrowRightOutlined,
  LeftOutlined,
  RightOutlined,
  ReloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import {
  getAllProductsApi,
  getNewProductsApi,
  getProductsByCollectionApi,
} from "../../services/productService";

export default function Products({
  selectedCollection = "",
  selectedCategory = "All",
  priceRange = [0, 500],
  inStock = false,
  onSale = false,
  searchQuery = "",
  trendingOnly = false,
  newOnly = false,
  onFilteredCountChange,
  onResetFilters,
}) {
  const getProductsFromStorage = () => {
    try {
      const cached = localStorage.getItem("products");
      if (cached) {
        const parsed = JSON.parse(cached);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (e) {
      console.error("Error parsing products from localStorage:", e);
    }
    return [];
  };

  const [products, setProducts] = useState(() => {
    const cached = getProductsFromStorage();
    if (newOnly) {
      const newItems = cached.filter((p) => p.isNewArrival || p.isNew);
      return newItems.length > 0 ? newItems : cached;
    }
    if (selectedCollection && selectedCollection !== "all") {
      const colItems = cached.filter((p) => {
        const c = p.category?.categoryCollection || p.categoryCollection || "";
        return c.toLowerCase() === selectedCollection.toLowerCase();
      });
      if (colItems.length > 0) return colItems;
    }
    return cached.length > 0 ? cached : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      let res;
      if (newOnly) {
        res = await getNewProductsApi();
      } else if (selectedCollection && selectedCollection !== "all") {
        res = await getProductsByCollectionApi(selectedCollection);
      } else {
        res = await getAllProductsApi();
      }

      if (res?.data?.success) {
        const productList = res.data.data?.products || [];
        setProducts(productList);
        try {
          if (
            !newOnly &&
            (!selectedCollection || selectedCollection === "all")
          ) {
            localStorage.setItem("products", JSON.stringify(productList));
          }
        } catch (storageErr) {
          console.error("Error saving to localStorage:", storageErr);
        }
      } else {
        const cached = getProductsFromStorage();
        let matching = cached;
        if (newOnly) {
          matching = cached.filter((p) => p.isNewArrival || p.isNew);
        } else if (selectedCollection && selectedCollection !== "all") {
          matching = cached.filter((p) => {
            const col =
              p.category?.categoryCollection || p.categoryCollection || "";
            return col.toLowerCase() === selectedCollection.toLowerCase();
          });
        }
        if (matching.length > 0) {
          setProducts(matching);
        } else {
          setError(res?.data?.message || "Failed to fetch products");
        }
      }
    } catch (err) {
      console.error("Error loading products:", err);
      const cached = getProductsFromStorage();
      let matching = cached;
      if (newOnly) {
        matching = cached.filter((p) => p.isNewArrival || p.isNew);
      } else if (selectedCollection && selectedCollection !== "all") {
        matching = cached.filter((p) => {
          const col =
            p.category?.categoryCollection || p.categoryCollection || "";
          return col.toLowerCase() === selectedCollection.toLowerCase();
        });
      }
      if (matching.length > 0) {
        setProducts(matching);
      } else {
        setError(
          err?.response?.data?.message || "Unable to load products from server",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [newOnly, selectedCollection]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedCollection && selectedCollection !== "all") {
        const prodCol =
          product.category?.categoryCollection ||
          product.categoryCollection ||
          product.collection ||
          "";
        if (prodCol.toLowerCase() !== selectedCollection.toLowerCase()) {
          return false;
        }
      }

      if (newOnly) {
        const isNew = Boolean(
          product.isNewArrival === true ||
          product.isNew === true ||
          (product.badge &&
            String(product.badge).toLowerCase().includes("new")),
        );
        const hasExplicitNew = products.some((p) => p.isNewArrival || p.isNew);
        if (hasExplicitNew && !isNew) return false;
      }

      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name?.toLowerCase().includes(q);
        const matchesDesc = product.description?.toLowerCase().includes(q);
        const matchesCat = product.category?.name?.toLowerCase().includes(q);
        const matchesMat = product.details?.material?.toLowerCase().includes(q);
        const matchesCol = product.details?.color?.toLowerCase().includes(q);
        if (
          !matchesName &&
          !matchesDesc &&
          !matchesCat &&
          !matchesMat &&
          !matchesCol
        ) {
          return false;
        }
      }

      if (
        selectedCategory &&
        selectedCategory !== "All" &&
        selectedCategory !== "All Products"
      ) {
        const catName =
          product.category?.name ||
          (typeof product.category === "string" ? product.category : "");
        const catId = product.category?._id || product.category;
        const matchesCategory =
          catName.toLowerCase() === selectedCategory.toLowerCase() ||
          catId === selectedCategory;
        if (!matchesCategory) return false;
      }

      if (inStock) {
        const sizes = product.details?.sizes;
        const totalStock =
          sizes?.reduce((sum, s) => sum + (Number(s.stock) || 0), 0) ?? 0;
        if (totalStock <= 0) return false;
      }

      if (onSale) {
        if (!product.discount || Number(product.discount) <= 0) return false;
      }

      const hasDiscount = Number(product.discount) > 0;
      const basePrice = Number(product.price) || 0;
      const finalPrice = hasDiscount
        ? basePrice * (1 - Number(product.discount) / 100)
        : basePrice;

      if (priceRange && priceRange.length === 2) {
        if (finalPrice < priceRange[0] || finalPrice > priceRange[1]) {
          return false;
        }
      }

      if (trendingOnly && !product.isTrending) {
        return false;
      }

      return true;
    });
  }, [
    products,
    newOnly,
    searchQuery,
    selectedCategory,
    inStock,
    onSale,
    priceRange,
    trendingOnly,
  ]);

  useEffect(() => {
    onFilteredCountChange?.(filteredProducts.length);
  }, [filteredProducts.length, onFilteredCountChange]);

  if (loading && products.length === 0) {
    return (
      <div className="flex-1! flex! flex-col! justify-center! items-center! py-24!">
        <ReloadOutlined className="text-3xl! text-[#5433eb]! animate-spin! mb-3!" />
        <p className="text-sm! font-semibold! text-gray-600!">
          Loading catalog products...
        </p>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="flex-1! flex! flex-col! justify-center! items-center! py-20! text-center! px-4!">
        <div className="w-12! h-12! rounded-2xl! bg-red-50! text-red-500! flex! items-center! justify-center! text-xl! mb-3!">
          !
        </div>
        <h3 className="text-base! font-bold! text-gray-800! mb-1!">
          Failed to load products
        </h3>
        <p className="text-xs! text-gray-500! max-w-sm! mb-4!">{error}</p>
        <button
          type="button"
          onClick={fetchProducts}
          className="px-4! py-2! rounded-full! bg-[#5433eb]! text-white! text-xs! font-bold! cursor-pointer! hover:bg-[#4324d4]! transition-all!"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex-1! flex! flex-col! justify-center! items-center! py-20! text-center! px-4! bg-white! rounded-[24px]! border! border-border!">
        <div className="w-12! h-12! rounded-2xl! bg-[#f5f6f8]! text-gray-400! flex! items-center! justify-center! text-xl! mb-3!">
          <FilterOutlined />
        </div>
        <h3 className="text-base! font-bold! text-gray-800! mb-1!">
          {newOnly
            ? "No New Arrivals Found"
            : selectedCollection && selectedCollection !== "all"
              ? `No products found in ${selectedCollection}'s collection`
              : "No products found"}
        </h3>
        <p className="text-xs! text-gray-500! max-w-sm! mb-4!">
          {newOnly
            ? "There are currently no products marked as New Arrivals. Browse our complete catalog for more styles."
            : selectedCollection && selectedCollection !== "all"
              ? `There are currently no products available in ${selectedCollection}'s collection matching your filters.`
              : products.length === 0
                ? "There are currently no products in the catalog."
                : "No products match the selected filters. Try adjusting your category, price range, or search."}
        </p>
        {(products.length > 0 || newOnly || Boolean(selectedCollection)) &&
          onResetFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="px-4! py-2! rounded-full! bg-[#5433eb]! text-white! text-xs! font-bold! cursor-pointer! hover:bg-[#4324d4]! transition-all!"
            >
              {newOnly
                ? "View All Catalog Products"
                : selectedCollection
                  ? "Reset Filters / View All Catalog"
                  : "Reset Filters"}
            </button>
          )}
      </div>
    );
  }

  return (
    <div className="flex-1! flex! flex-col! justify-between!">
      <div className="grid! grid-cols-1! sm:grid-cols-2! lg:grid-cols-3! gap-5! sm:gap-6!">
        {filteredProducts.map((product) => {
          const productId = product._id || product.id;
          const productSlug = product.slug || productId;
          const categoryName =
            product.category?.name?.toUpperCase() ||
            (typeof product.category === "string"
              ? product.category
              : "Collection");
          const collectionName = product.category?.categoryCollection
            ? `${product.category.categoryCollection.toUpperCase()} COLLECTION`
            : "STUDIO COLLECTION";

          const hasDiscount = Number(product.discount) > 0;
          const originalPrice = Number(product.price) || 0;
          const discountedPrice = hasDiscount
            ? originalPrice * (1 - Number(product.discount) / 100)
            : originalPrice;

          const productImage = product.thumbnail || product.images?.[0];

          return (
            <div
              key={productId}
              className="bg-white! rounded-[24px]! border! border-[#ebebeb]! p-3! hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]! hover:border-gray-300! transition-all! duration-300! flex! flex-col! justify-between! group!"
            >
              <div className="relative! w-full! aspect-[4/3]! rounded-[18px]! overflow-hidden! bg-[#f5f6f8]! flex! items-center! justify-center!">
                {hasDiscount && (
                  <span className="absolute! top-2.5! left-2.5! z-10! px-2! py-0.5! rounded-full! bg-[#eee9ff]/95! backdrop-blur-sm! text-[#5433eb]! font-bold! text-[10px]! tracking-tight! shadow-xs!">
                    -{product.discount}%
                  </span>
                )}

                {productImage ? (
                  <img
                    src={productImage}
                    alt={product.name}
                    className="w-full! h-full! object-cover! group-hover:scale-105! transition-transform! duration-500!"
                  />
                ) : (
                  <div className="w-full! h-full! bg-gradient-to-br! from-[#f8f9fa]! to-[#edeef2]! flex! flex-col! items-center! justify-center! p-4! text-center! select-none! group-hover:scale-102! transition-transform! duration-500!">
                    <div className="w-12! h-12! rounded-2xl! bg-white! shadow-xs! border! border-gray-100! flex! items-center! justify-center! mb-2! text-[#5433eb]!">
                      <svg
                        className="w-6! h-6!"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                        />
                      </svg>
                    </div>
                    <span className="text-[11px]! font-semibold! text-gray-700! tracking-wide!">
                      {product.name}
                    </span>
                    <span className="text-[10px]! text-gray-400!">
                      Minimal Edition
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-3! px-1!">
                <div className="flex! items-center! justify-between! gap-2! mb-1.5!">
                  <div className="flex! items-center! gap-1! flex-wrap!">
                    {Boolean(product.isNewArrival || product.isNew) && (
                      <span className="px-1.5! py-0.5! rounded-md! bg-[#eee9ff]! text-[#5433eb]! font-bold! text-[9px]! uppercase! tracking-wide!">
                        New
                      </span>
                    )}
                    {product.isTrending && (
                      <span className="px-1.5! py-0.5! rounded-md! bg-amber-50! text-amber-700! border! border-amber-200! font-bold! text-[9px]! uppercase! tracking-wide!">
                        Trending
                      </span>
                    )}
                    <span className="font-bold! text-gray-400! tracking-wider! uppercase! text-[10px]!">
                      {categoryName}
                    </span>
                  </div>

                  <div className="flex! items-center! gap-1! font-semibold! text-gray-700! text-[11px]! shrink-0!">
                    <StarFilled className="text-[#f59e0b]! text-[10px]!" />
                    <span>
                      {product.totalReviews > 0
                        ? Number(product.averageRating).toFixed(1)
                        : "New"}
                    </span>
                    {product.totalReviews > 0 ? (
                      <span className="text-gray-400! font-normal!">
                        ({product.totalReviews})
                      </span>
                    ) : (
                      <span className="text-gray-400! font-normal! text-[10px]!">
                        (0)
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  to={`/product/${productSlug}`}
                  className="block! no-underline!"
                >
                  <h4 className="font-bold! text-[#1a1a1a]! text-[13.5px]! leading-snug! tracking-tight! truncate! hover:text-[#5433eb]! transition-colors! mb-1!">
                    {product.name}
                  </h4>
                </Link>

                <div className="flex! items-center! justify-between! pt-1! border-t! border-gray-100/80!">
                  <div className="flex! items-baseline! gap-1.5!">
                    <span className="font-bold! text-[#1a1a1a]! text-[15px]!">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    {hasDiscount && (
                      <span className="text-[12px]! text-gray-400! line-through!">
                        ${originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/product/${productSlug}`}
                    className="w-8! h-8! rounded-full! bg-[#5433eb]! hover:bg-[#4324d4]! text-white! flex! items-center! justify-center! shadow-[0_4px_14px_rgba(84,51,235,0.35)]! transition-all! active:scale-95! cursor-pointer! border-0!"
                    aria-label="View product"
                  >
                    <ArrowRightOutlined className="text-[12px]!" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex! flex-col! sm:flex-row! items-center! justify-between! gap-4! mt-8! sm:mt-12! pt-6! border-t! border-gray-200/60!">
        <p className="text-xs! text-gray-500! order-2! sm:order-1!">
          Showing{" "}
          <span className="font-semibold! text-gray-800!">
            1-{filteredProducts.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold! text-gray-800!">
            {filteredProducts.length}
          </span>{" "}
          items
        </p>

        <div className="flex! items-center! gap-1.5! order-1! sm:order-2! bg-white! px-3! py-1.5! rounded-full! border! border-gray-200/80! shadow-xs!">
          <button
            type="button"
            className="flex! items-center! gap-1! px-2.5! py-1! text-xs! text-gray-500! hover:text-gray-900! cursor-pointer! transition-colors! bg-transparent! border-0!"
          >
            <LeftOutlined className="text-[9px]!" />
            <span>Prev</span>
          </button>

          <button
            type="button"
            className="w-7! h-7! rounded-full! bg-[#5433eb]! text-white! text-xs! font-semibold! flex! items-center! justify-center! shadow-xs! cursor-pointer! border-0!"
          >
            1
          </button>

          <button
            type="button"
            className="flex! items-center! gap-1! px-2.5! py-1! text-xs! text-gray-600! hover:text-gray-900! cursor-pointer! transition-colors! bg-transparent! border-0!"
          >
            <span>Next</span>
            <RightOutlined className="text-[9px]!" />
          </button>
        </div>
      </div>
    </div>
  );
}
