import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LeftOutlined,
  RightOutlined,
  ArrowRightOutlined,
  ReloadOutlined,
  FireOutlined,
  StarFilled,
} from "@ant-design/icons";
import { getTrendingProductsApi } from "../../services/productService";

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchTrending = async () => {
    try {
      setLoading(true);
      const res = await getTrendingProductsApi();
      let items = res?.data?.data?.products || [];

      if (items.length === 0) {
        try {
          const raw = localStorage.getItem("products");
          const all = raw ? JSON.parse(raw) : [];
          const trendingFromCache = all.filter((p) => p.isTrending);
          items =
            trendingFromCache.length > 0 ? trendingFromCache : all.slice(0, 8);
        } catch (e) {
          console.error(e);
        }
      }

      setProducts(items);
    } catch (err) {
      console.error("Error fetching trending products:", err);
      try {
        const raw = localStorage.getItem("products");
        const all = raw ? JSON.parse(raw) : [];
        setProducts(all.slice(0, 8));
      } catch (e) {
        console.error(e);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  const maxStartIndex = Math.max(0, products.length - 4);
  const canSlidePrev = currentIndex > 0;
  const canSlideNext = currentIndex < maxStartIndex;

  const handlePrev = () => {
    if (canSlidePrev) {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (canSlideNext) {
      setCurrentIndex((prev) => Math.min(maxStartIndex, prev + 1));
    }
  };

  const displayedProducts = products.slice(currentIndex, currentIndex + 4);

  return (
    <section
      id="trending-deals"
      className="w-full! max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8! py-8! sm:py-12!"
    >
      <div className="flex! items-center! justify-between! mb-6! sm:mb-8!">
        <div className="flex! items-baseline! gap-3! sm:gap-4!">
          <div className="flex! items-center! gap-2!">
            <FireOutlined className="text-xl! sm:text-2xl! text-amber-500!" />
            <h2 className="text-2xl! sm:text-3xl! font-semibold! text-text-primary! tracking-[-0.031em]! m-0!">
              Trending Deals
            </h2>
          </div>

          <Link
            to="/products?filter=trending"
            className="text-primary! hover:text-primary/80! text-xs! sm:text-sm! font-medium! tracking-[-0.02em]! inline-flex! items-center! gap-1! transition-colors! no-underline!"
          >
            <span>
              View all {products.length > 0 ? `(${products.length})` : ""}
            </span>
            <span>›</span>
          </Link>
        </div>

        {products.length > 4 && (
          <div className="flex! items-center! gap-2!">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={handlePrev}
              disabled={!canSlidePrev}
              className={`w-8! h-8! sm:w-9! sm:h-9! rounded-full! border! border-border! flex! items-center! justify-center! transition-colors! cursor-pointer! ${canSlidePrev
                  ? "bg-surface! text-text-primary! hover:bg-canvas!"
                  : "bg-canvas! text-gray-300! border-gray-200! cursor-not-allowed!"
                }`}
            >
              <LeftOutlined className="text-xs!" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={handleNext}
              disabled={!canSlideNext}
              className={`w-8! h-8! sm:w-9! sm:h-9! rounded-full! border! border-border! flex! items-center! justify-center! transition-colors! cursor-pointer! ${canSlideNext
                  ? "bg-surface! text-text-primary! hover:bg-canvas!"
                  : "bg-canvas! text-gray-300! border-gray-200! cursor-not-allowed!"
                }`}
            >
              <RightOutlined className="text-xs!" />
            </button>
          </div>
        )}
      </div>

      {loading && products.length === 0 ? (
        <div className="py-16! text-center! space-y-3!">
          <ReloadOutlined className="animate-spin! text-3xl! text-primary!" />
          <p className="text-xs! font-semibold! text-text-secondary!">
            Loading trending products...
          </p>
        </div>
      ) : displayedProducts.length === 0 ? (
        <div className="py-12! text-center! bg-surface! rounded-card! border! border-dashed! border-border!">
          <p className="text-sm! font-medium! text-text-secondary!">
            No trending products available right now.
          </p>
        </div>
      ) : (
        <div className="grid! grid-cols-1! sm:grid-cols-2! lg:grid-cols-4! gap-5! sm:gap-6!">
          {displayedProducts.map((product) => {
            const productId = product._id || product.id;
            const productSlug = product.slug || productId;
            const hasDiscount = Number(product.discount) > 0;
            const originalPrice = Number(product.price) || 0;
            const discountedPrice = hasDiscount
              ? originalPrice * (1 - Number(product.discount) / 100)
              : originalPrice;
            const tag = hasDiscount ? `-${product.discount}% OFF` : "TRENDING";
            const subtitle =
              product.category?.name ||
              product.details?.color ||
              "Studio Collection";
            const productImage = product.thumbnail || product.images?.[0];

            return (
              <div
                key={productId}
                className="bg-surface! rounded-card! p-3.5! sm:p-4! shadow-level-1! border! border-border! flex! flex-col! justify-between! transition-all! duration-300! hover:-translate-y-1! group!"
              >
                <div className="relative! w-full! aspect-4/3! sm:aspect-square! rounded-media! overflow-hidden! bg-canvas! flex! items-center! justify-center!">
                  {hasDiscount && (
                    <span className="absolute! top-2.5! left-2.5! z-10! bg-white/95! backdrop-blur-xs! text-primary! text-[10px]! font-bold! px-2! py-0.5! rounded-full! shadow-xs! tracking-tight!">
                      -{product.discount}%
                    </span>
                  )}

                  {productImage ? (
                    <img
                      src={productImage}
                      alt={product.name}
                      className="w-full! h-full! object-cover! object-center! transition-transform! duration-500! group-hover:scale-105!"
                    />
                  ) : (
                    <div className="w-full! h-full! flex! flex-col! items-center! justify-center! text-gray-400! text-xs! font-medium!">
                      <span>No image</span>
                    </div>
                  )}
                </div>

                <div className="pt-3.5! px-1! pb-1! flex! flex-col! gap-1!">
                  <div className="flex! items-center! justify-between! gap-2! text-[11px]!">
                    <div className="flex! items-center! gap-1.5! flex-wrap!">
                      <span className="px-1.5! py-0.5! rounded-md! bg-amber-50! text-amber-700! border! border-amber-200! font-bold! text-[9px]! uppercase! tracking-wide!">
                        Trending
                      </span>
                      <span className="text-label-sm! text-text-secondary! font-normal! tracking-[-0.01em]! truncate!">
                        {subtitle}
                      </span>
                    </div>

                    <div className="flex! items-center! gap-1! font-semibold! text-gray-700! shrink-0!">
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
                    className="no-underline!"
                  >
                    <h3
                      title={product.name}
                      className="text-title-md! font-semibold! text-text-primary! tracking-[-0.031em]! m-0! truncate! hover:text-primary! transition-colors!"
                    >
                      {product.name}
                    </h3>
                  </Link>
                </div>

                <div className="flex! items-center! justify-between! pt-2! px-1!">
                  <div className="flex! items-baseline! gap-1.5!">
                    <span className="text-title-md! sm:text-lg! font-semibold! text-text-primary! tracking-[-0.02em]!">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    {hasDiscount && (
                      <span className="text-xs! sm:text-sm! text-text-secondary! line-through! font-normal!">
                        ${originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/product/${productSlug}`}
                    aria-label={`View ${product.name}`}
                    className="w-8! h-8! rounded-full! bg-primary! hover:bg-primary/90! text-white! flex! items-center! justify-center! shadow-violet-glow! transition-transform! active:scale-95!"
                  >
                    <ArrowRightOutlined className="text-xs!" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
