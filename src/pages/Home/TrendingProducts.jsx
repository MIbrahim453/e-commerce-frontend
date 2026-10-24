import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  LeftOutlined,
  RightOutlined,
  ArrowRightOutlined,
  ReloadOutlined,
  FireFilled,
  StarFilled,
  ShoppingOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { message } from "antd";
import { getTrendingProductsApi, getProductsApi } from "../../services/productService";
import { CartContext } from "../../context/cartContext";

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState({});

  const { addToCart } = useContext(CartContext) || {};

  const fetchTrending = async () => {
    try {
      setLoading(true);
      let items = [];

      try {
        const res = await getTrendingProductsApi();
        if (res?.data?.data?.products?.length > 0) {
          items = res.data.data.products;
        }
      } catch (e) {
        console.warn("Trending API call fallback:", e);
      }

      // If no products marked trending specifically, fetch products from database
      if (items.length === 0) {
        try {
          const allRes = await getProductsApi();
          const allProducts = allRes?.data?.data?.products || [];
          const dbTrending = allProducts.filter((p) => p.isTrending);
          items = dbTrending.length > 0 ? dbTrending : allProducts;
        } catch (e) {
          console.warn("Database products API fallback:", e);
        }
      }

      // Strict enforcement: ONLY database products, NO curated mock fallbacks
      setProducts(items);
    } catch (err) {
      console.error("Error fetching trending products from database:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  const handleQuickAdd = (product, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (addToCart) {
      const pid = product._id || product.id;
      const originalPrice = Number(product.price) || 0;
      const discount = Number(product.discount) || 0;
      const finalPrice = discount > 0 ? originalPrice * (1 - discount / 100) : originalPrice;

      const success = addToCart(
        product,
        1,
        product.details?.color || "Default",
        product.details?.size || "M",
        discount,
        finalPrice
      );

      if (success) {
        setAddedAnimation((prev) => ({ ...prev, [pid]: true }));
        setTimeout(() => {
          setAddedAnimation((prev) => ({ ...prev, [pid]: false }));
        }, 1800);
      }
    }
  };

  const filteredProducts = products;
  const maxStartIndex = Math.max(0, filteredProducts.length - 4);
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

  const displayedProducts = filteredProducts.slice(currentIndex, currentIndex + 4);

  return (
    <section
      id="trending-deals"
      className="w-full! max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8! py-8! sm:py-12!"
    >
      {/* Section Header with Carousel Navigation (No category/filter tabs) */}
      <div className="flex! items-center! justify-between! gap-4! mb-6! sm:mb-8!">
        <div>
          <div className="inline-flex! items-center! gap-1.5! px-3! py-1! rounded-full! bg-amber-50! border! border-amber-200! text-amber-700! text-[11px]! font-bold! tracking-wider! uppercase! mb-2!">
            <FireFilled className="text-amber-500! text-xs!" />
            <span>Trending Products</span>
          </div>

          <h2 className="text-2xl! sm:text-3xl! lg:text-4xl! font-bold! text-text-primary! tracking-[-0.03em]! m-0!">
            Trending Now & Essential Drops
          </h2>
          <p className="text-text-secondary! text-xs! sm:text-sm! m-0! mt-1! font-normal!">
            The most sought-after apparel and footwear of the current collection.
          </p>
        </div>

        {/* Carousel Prev / Next Arrows */}
        {filteredProducts.length > 4 && (
          <div className="flex! items-center! gap-1.5! shrink-0!">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={handlePrev}
              disabled={!canSlidePrev}
              className={`w-9! h-9! rounded-full! border! border-border! flex! items-center! justify-center! transition-all! cursor-pointer! ${
                canSlidePrev
                  ? "bg-surface! text-text-primary! hover:bg-canvas! shadow-2xs!"
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
              className={`w-9! h-9! rounded-full! border! border-border! flex! items-center! justify-center! transition-all! cursor-pointer! ${
                canSlideNext
                  ? "bg-surface! text-text-primary! hover:bg-canvas! shadow-2xs!"
                  : "bg-canvas! text-gray-300! border-gray-200! cursor-not-allowed!"
              }`}
            >
              <RightOutlined className="text-xs!" />
            </button>
          </div>
        )}
      </div>

      {/* Grid of Elevated Database Product Cards */}
      {loading ? (
        <div className="py-20! text-center! space-y-3!">
          <ReloadOutlined className="animate-spin! text-3xl! text-primary!" />
          <p className="text-xs! font-semibold! text-text-secondary!">
            Loading products from database...
          </p>
        </div>
      ) : displayedProducts.length === 0 ? (
        <div className="py-16! text-center! bg-surface! rounded-2xl! border! border-border! p-8!">
          <p className="text-sm! font-semibold! text-text-secondary! m-0!">
            No products found in the database.
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
            const isAdded = addedAnimation[productId];
            const productImage = product.thumbnail || product.images?.[0] || "";
            const categoryLabel = product.category?.name || "Trending";

            return (
              <motion.div
                key={productId}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="bg-surface! rounded-card! p-3.5! sm:p-4! shadow-level-1! border! border-border! flex! flex-col! justify-between! transition-all! duration-300! hover:shadow-lg! hover:-translate-y-1.5! group! relative!"
              >
                {/* Product Media Container */}
                <div className="relative! w-full! aspect-[4/4.5]! rounded-media! overflow-hidden! bg-[#f7f8fa]! flex! items-center! justify-center!">
                  {/* ONLY Discount Badge allowed on product thumbnail image */}
                  {hasDiscount && (
                    <span className="absolute! top-3! left-3! z-10! px-2.5! py-1! rounded-full! bg-white/95! backdrop-blur-md! text-[#5433eb]! text-[10px]! font-extrabold! tracking-wider! uppercase! shadow-xs! border! border-black/5!">
                      -{product.discount}%
                    </span>
                  )}

                  {/* Product Image with Hover Zoom */}
                  <Link
                    to={`/product/${productSlug}`}
                    className="w-full! h-full! block! overflow-hidden!"
                  >
                    {productImage ? (
                      <img
                        src={productImage}
                        alt={product.name}
                        className="w-full! h-full! object-cover! object-center! transition-transform! duration-700! ease-out! group-hover:scale-108!"
                      />
                    ) : (
                      <div className="w-full! h-full! flex! items-center! justify-center! text-xs! text-gray-400!">
                        No Image
                      </div>
                    )}
                  </Link>

                  {/* Floating Quick Add to Bag on Hover (Desktop) */}
                  <div className="absolute! bottom-3! inset-x-3! z-10! opacity-0! group-hover:opacity-100! transition-all! duration-300! transform! translate-y-2! group-hover:translate-y-0!">
                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`w-full! py-2.5! rounded-full! text-xs! font-bold! flex! items-center! justify-center! gap-2! shadow-md! transition-all! cursor-pointer! border-0! ${
                        isAdded
                          ? "bg-emerald-600! text-white!"
                          : "bg-[#1a1a1a]! hover:bg-[#5433eb]! text-white!"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <CheckOutlined className="text-xs!" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingOutlined className="text-xs!" />
                          <span>Quick Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Details Block */}
                <div className="pt-3.5! px-1! pb-1! flex! flex-col! gap-1.5!">
                  {/* Category & Ratings Micro-strip */}
                  <div className="flex! items-center! justify-between! text-[11px]!">
                    <span className="text-text-secondary! font-medium! tracking-tight! uppercase! text-[10px]!">
                      {categoryLabel}
                    </span>

                    <div className="flex! items-center! gap-1! font-bold! text-[#1a1a1a]!">
                      <StarFilled className="text-amber-400! text-[10px]!" />
                      <span>{Number(product.averageRating || 5.0).toFixed(1)}</span>
                      {product.totalReviews > 0 && (
                        <span className="text-text-secondary! font-normal! text-[10px]!">
                          ({product.totalReviews})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <Link
                    to={`/product/${productSlug}`}
                    className="no-underline! group-hover:text-primary! transition-colors!"
                  >
                    <h3
                      title={product.name}
                      className="text-title-md! font-bold! text-text-primary! tracking-tight! m-0! truncate! leading-snug!"
                    >
                      {product.name}
                    </h3>
                  </Link>

                  {/* Color Swatch Dots */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="flex! items-center! gap-1! pt-0.5!">
                      {product.colors.map((hex, idx) => (
                        <span
                          key={idx}
                          className="w-2.5! h-2.5! rounded-full! border! border-white! shadow-2xs!"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Pricing & Direct Link Arrow */}
                  <div className="flex! items-center! justify-between! pt-2! mt-1! border-t! border-border/70!">
                    <div className="flex! items-baseline! gap-2!">
                      <span className="text-base! sm:text-lg! font-extrabold! text-text-primary! tracking-tight!">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      {hasDiscount && (
                        <span className="text-xs! text-text-secondary! line-through! font-medium!">
                          ${originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/product/${productSlug}`}
                      aria-label={`View ${product.name}`}
                      className="w-8! h-8! rounded-full! bg-canvas! hover:bg-[#5433eb]! text-text-primary! hover:text-white! flex! items-center! justify-center! transition-all! shadow-2xs! cursor-pointer!"
                    >
                      <ArrowRightOutlined className="text-[11px]!" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Bottom Collection Banner Link */}
      <div className="mt-8! text-center!">
        <Link
          to="/products"
          className="inline-flex! items-center! gap-2! px-6! py-2.5! rounded-full! bg-surface! hover:bg-white! text-text-primary! hover:text-primary! border! border-border! text-xs! sm:text-sm! font-bold! shadow-xs! transition-all! no-underline!"
        >
          <span>Explore Entire Catalog</span>
          <ArrowRightOutlined className="text-xs!" />
        </Link>
      </div>
    </section>
  );
}
