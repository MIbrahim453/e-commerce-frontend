import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LeftOutlined,
  RightOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { getAllProductsApi } from "../../services/productService";

export default function SimilarProducts({
  category,
  collection,
  categoryId,
  currentId,
}) {
  const [similarItems, setSimilarItems] = useState([]);

  useEffect(() => {
    const loadSimilar = async () => {
      let allProducts = [];
      try {
        const raw = localStorage.getItem("products");
        allProducts = raw ? JSON.parse(raw) : [];
      } catch (e) {
        console.error(e);
      }

      if (allProducts.length === 0) {
        try {
          const res = await getAllProductsApi();
          allProducts = res?.data?.data?.products || [];
          localStorage.setItem("products", JSON.stringify(allProducts));
        } catch (e) {
          console.error(e);
        }
      }

      const otherProducts = allProducts.filter((p) => p._id !== currentId);

      const targetCatId = category?._id;
      const targetCatName = category?.name.toLowerCase();
      const targetCollection = category?.categoryCollection.toLowerCase();

      let matching = otherProducts.filter((p) => {
        const pCatId = p.category?._id;
        const pCatName = p.category?.name.toLowerCase();
        const pCollection = p.category?.categoryCollection.toLowerCase();

        const matchCat =
          (targetCatId && pCatId === targetCatId) ||
          (targetCatName && pCatName === targetCatName);
        const matchCol = targetCollection && pCollection === targetCollection;

        return matchCat && matchCol;
      });

      if (matching.length < 4) {
        const partial = otherProducts.filter((p) => {
          if (matching.some((m) => m._id === p._id)) return false;
          const pCatId = p.category?._id;
          const pCatName = p.category?.name.toLowerCase();
          const pCollection = p.category?.categoryCollection.toLowerCase();

          const matchCat =
            (targetCatId && pCatId === targetCatId) ||
            (targetCatName && pCatName === targetCatName);
          const matchCol = targetCollection && pCollection === targetCollection;

          return matchCat || matchCol;
        });
        matching = [...matching, ...partial];
      }

      if (matching.length < 4) {
        const remaining = otherProducts.filter(
          (p) => !matching.some((m) => m._id === p._id),
        );
        matching = [...matching, ...remaining];
      }

      setSimilarItems(matching.slice(0, 4));
    };

    loadSimilar();
  }, [category, collection, categoryId, currentId]);

  if (similarItems.length === 0) {
    return null;
  }

  return (
    <div className="flex! flex-col! gap-5!">
      <div className="flex! items-end! justify-between!">
        <div>
          <span className="text-[11px]! font-bold! tracking-wider! uppercase! text-gray-400! block! mb-1!">
            Curated Selections
          </span>
          <h2 className="text-xl! sm:text-2xl! font-bold! text-[#1a1a1a]! tracking-tight! m-0!">
            Similar Products
          </h2>
        </div>
      </div>

      <div className="grid! grid-cols-1! sm:grid-cols-2! lg:grid-cols-4! gap-4! sm:gap-5!">
        {similarItems.map((item) => {
          const itemId = item._id || item.id;
          const itemSlug = item.slug || itemId;
          const hasDiscount = Number(item.discount) > 0;
          const originalPrice = Number(item.price) || 0;
          const discountedPrice = hasDiscount
            ? originalPrice * (1 - Number(item.discount) / 100)
            : originalPrice;
          const img = item.thumbnail || item.images?.[0];

          return (
            <div
              key={itemId}
              className="bg-white! rounded-[24px]! border! border-[#ebebeb]! p-3! hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]! hover:border-gray-300! transition-all! flex! flex-col! justify-between! group!"
            >
              <div className="relative! w-full! aspect-[4/3]! rounded-[18px]! overflow-hidden! bg-[#f6f6f7]! flex! items-center! justify-center!">
                {img ? (
                  <img
                    src={img}
                    alt={item.name}
                    className="w-full! h-full! object-cover! group-hover:scale-105! transition-transform! duration-300!"
                  />
                ) : (
                  <div className="text-gray-400! text-xs!">No image</div>
                )}
                <span className="absolute! bottom-2! left-2! bg-white/90! backdrop-blur-xs! text-[10px]! font-bold! px-2! py-0.5! rounded-full! text-gray-700!">
                  {item.category?.name || "Collection"}
                </span>
              </div>

              <div className="pt-3! px-1!">
                <Link
                  to={`/product/${itemSlug}`}
                  className="block! no-underline!"
                >
                  <h4 className="text-[13px]! font-bold! text-[#1a1a1a]! truncate! hover:text-[#5433eb]! transition-colors! m-0! mb-1!">
                    {item.name}
                  </h4>
                </Link>

                <div className="flex! items-center! justify-between! pt-1!">
                  <div className="flex! items-baseline! gap-1.5!">
                    <span className="text-sm! font-bold! text-[#1a1a1a]!">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    {hasDiscount && (
                      <span className="text-[11px]! text-gray-400! line-through!">
                        ${originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/product/${itemSlug}`}
                    className="w-7! h-7! rounded-full! bg-[#5433eb]! text-white! flex! items-center! justify-center! hover:bg-[#4324d4]! shadow-xs! transition-transform! active:scale-95!"
                    aria-label="View product"
                  >
                    <ArrowRightOutlined className="text-[10px]!" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
