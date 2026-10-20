import React, { useState, useContext, useEffect } from "react";
import {
  StarFilled,
  ShoppingOutlined,
  CheckCircleOutlined,
  CarOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import { CartContext } from "../../context/cartContext";

export default function ProductInfo({ product }) {
  const { addToCart } = useContext(CartContext) || {};
  const [quantity, setQuantity] = useState(1);

  const sizes = product?.details?.sizes || [];
  const [selectedSize, setSelectedSize] = useState(() => {
    const inStockSize = sizes.find((s) => Number(s.stock) > 0);
    return inStockSize ? inStockSize.size : sizes[0]?.size;
  });

  useEffect(() => {
    const prodSizes = product?.details?.sizes || [];
    if (prodSizes.length > 0) {
      const inStock = prodSizes.find((s) => Number(s.stock) > 0);
      setSelectedSize(inStock ? inStock.size : prodSizes[0]?.size);
    }
  }, [product]);

  const hasDiscount = Number(product?.discount) > 0;
  const originalPrice = Number(product?.price) || 0;
  const discountedPrice = hasDiscount
    ? originalPrice * (1 - Number(product.discount) / 100)
    : originalPrice;

  const currentSizeObj = sizes.find((s) => s.size === selectedSize);
  const currentStock = currentSizeObj ? Number(currentSizeObj.stock) : 0;
  const totalStock = sizes.reduce((sum, s) => sum + (Number(s.stock) || 0), 0);

  const handleAddToCart = () => {
    if (totalStock <= 0 || (sizes.length > 0 && currentStock <= 0)) {
      message.warning("Selected size is out of stock");
      return false;
    }

    if (addToCart) {
      addToCart(
        product,
        quantity,
        product?.details?.color,
        selectedSize,
        product?.discount,
        product?.price,
      );
      return true;
    } else {
      message.success(
        `Added ${quantity} ${product?.name} (${selectedSize}) to cart`,
      );
      return true;
    }
  };

  return (
    <div className="bg-white! rounded-[28px]! border! border-[#ebebeb]! p-6! sm:p-8! shadow-[0_4px_24px_rgba(0,0,0,0.03)]! flex! flex-col! gap-5!">
      <div className="flex! items-center! justify-between! gap-2!">
        <span className="text-[11px]! font-bold! text-[#5433eb]! uppercase! tracking-wider!">
          {product?.category?.name || "Exclusive Collection"}
        </span>
        {product?.isTrending && (
          <span className="px-2.5! py-0.5! rounded-full! bg-amber-500! text-white! text-[10px]! font-bold! uppercase! tracking-wide!">
            Trending Now
          </span>
        )}
      </div>

      <h1 className="text-2xl! sm:text-3xl! font-bold! text-[#1a1a1a]! leading-tight! tracking-tight! m-0!">
        {product?.name || "Product Details"}
      </h1>

      <p className="text-xs! sm:text-sm! text-gray-500! leading-relaxed! m-0!">
        {product?.description ||
          "Thoughtfully designed with high quality materials and crafted for longevity."}
      </p>

      <div className="flex! items-center! gap-2!">
        <div className="flex! items-center! text-sm! gap-0.5!">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarFilled
              key={star}
              className={
                star <= Math.round(Number(product?.averageRating) || 0)
                  ? "text-[#f59e0b]!"
                  : "text-gray-200!"
              }
            />
          ))}
        </div>
        {Number(product?.totalReviews) > 0 ? (
          <>
            <span className="text-xs! font-bold! text-[#1a1a1a]!">
              {Number(product?.averageRating || 0).toFixed(1)}
            </span>
            <span className="text-xs! text-gray-400! font-normal!">
              ({product.totalReviews} review
              {product.totalReviews === 1 ? "" : "s"})
            </span>
          </>
        ) : (
          <span className="text-xs! text-gray-400! font-normal!">
            No customer reviews yet
          </span>
        )}
      </div>

      <div className="flex! items-center! gap-3! pt-1!">
        <span className="text-2xl! sm:text-3xl! font-extrabold! text-[#1a1a1a]! tracking-tight!">
          ${discountedPrice.toFixed(2)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-base! sm:text-lg! text-gray-400! line-through! font-normal!">
              ${originalPrice.toFixed(2)}
            </span>
            <span className="px-2.5! py-1! rounded-full! bg-[#eee9ff]! text-[#5433eb]! text-xs! font-bold! tracking-tight!">
              -{product.discount}% OFF
            </span>
          </>
        )}
      </div>

      {sizes.length > 0 && (
        <div className="pt-1!">
          <div className="flex! items-center! justify-between! mb-2!">
            <span className="text-xs! font-bold! text-gray-700! uppercase! tracking-wider!">
              Select Size
            </span>
            {currentSizeObj && (
              <span className="text-[11px]! text-gray-400!">
                {currentStock > 0 ? `${currentStock} in stock` : "Out of stock"}
              </span>
            )}
          </div>
          <div className="flex! items-center! gap-2! flex-wrap!">
            {sizes.map((s) => {
              const isSelected = selectedSize === s.size;
              const hasStock = Number(s.stock) > 0;
              return (
                <button
                  key={s.size}
                  type="button"
                  onClick={() => setSelectedSize(s.size)}
                  disabled={!hasStock}
                  className={`px-3.5! py-1.5! rounded-xl! text-xs! font-bold! border! transition-all! cursor-pointer! ${
                    isSelected
                      ? "bg-[#1a1a1a]! text-white! border-transparent! shadow-xs!"
                      : hasStock
                        ? "bg-white! text-gray-700! border-[#ebebeb]! hover:border-gray-400!"
                        : "bg-gray-100! text-gray-300! border-gray-200! cursor-not-allowed! line-through!"
                  }`}
                >
                  {s.size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="h-[1px]! bg-[#f0f0f0]! my-1!" />

      <div className="flex! items-center! justify-between! gap-4!">
        <div className="inline-flex! items-center! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! p-1!">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-8! h-8! rounded-full! bg-white! text-gray-700! hover:bg-gray-100! flex! items-center! justify-center! text-sm! font-semibold! transition-colors! cursor-pointer! border! border-gray-200/60! shadow-xs!"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="w-10! text-center! font-bold! text-[#1a1a1a]! text-sm!">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-8! h-8! rounded-full! bg-white! text-gray-700! hover:bg-gray-100! flex! items-center! justify-center! text-sm! font-semibold! transition-colors! cursor-pointer! border! border-gray-200/60! shadow-xs!"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className="flex! items-center! gap-1.5! text-xs! font-medium!">
          {totalStock > 0 ? (
            <span className="text-emerald-600! flex! items-center! gap-1!">
              <CheckCircleOutlined /> In Stock & Ready to Ship
            </span>
          ) : (
            <span className="text-red-500! flex! items-center! gap-1!">
              Out of stock
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={totalStock <= 0}
        className={`w-full! h-12! sm:h-14! rounded-full! text-white! font-semibold! text-sm! sm:text-base! flex! items-center! justify-center! gap-2! transition-all! border-0! cursor-pointer! ${
          totalStock > 0
            ? "bg-[#5433eb]! hover:bg-[#4324d4]! shadow-[0_6px_24px_rgba(84,51,235,0.35)]! active:scale-98!"
            : "bg-gray-300! cursor-not-allowed!"
        }`}
      >
        <ShoppingOutlined className="text-base! sm:text-lg!" />
        <span>Add to Cart — ${(discountedPrice * quantity).toFixed(2)}</span>
      </button>

      <div className="grid! grid-cols-1! sm:grid-cols-2! gap-2.5! pt-3! border-t! border-[#f0f0f0]!">
        <div className="flex! items-center! gap-2! text-[11px]! text-gray-500! font-medium!">
          <CarOutlined className="text-[#5433eb]! text-xs!" />
          <span>Complementary 2-day delivery</span>
        </div>
        <div className="flex! items-center! gap-2! text-[11px]! text-gray-500! font-medium!">
          <SafetyCertificateOutlined className="text-[#5433eb]! text-xs!" />
          <span>30-day money-back guarantee</span>
        </div>
      </div>
    </div>
  );
}
