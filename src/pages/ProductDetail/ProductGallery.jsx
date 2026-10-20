import React, { useState } from "react";
import {
  AppstoreOutlined,
  TagOutlined,
  BgColorsOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

export default function ProductGallery({ product }) {
  const [activeThumb, setActiveThumb] = useState(0);

  const galleryImages = [];
  if (product?.thumbnail) {
    galleryImages.push(product.thumbnail);
  }
  if (Array.isArray(product?.images)) {
    product.images.forEach((img) => {
      if (img && !galleryImages.includes(img)) {
        galleryImages.push(img);
      }
    });
  }

  const imagesToShow = galleryImages.length > 0 ? galleryImages : [null];
  const currentImage = imagesToShow[activeThumb] || imagesToShow[0];

  const featurePills = [
    {
      id: 1,
      title: product?.details?.material
        ? product.details.material.charAt(0).toUpperCase() +
        product.details.material.slice(1)
        : "Premium Fabric",
      subtitle: "Material & Build",
      icon: <TagOutlined className="text-[#5433eb]! text-sm!" />,
    },
    {
      id: 2,
      title: product?.details?.color
        ? product.details.color.charAt(0).toUpperCase() +
        product.details.color.slice(1)
        : "Selected Color",
      subtitle: "Colorway",
      icon: <BgColorsOutlined className="text-[#5433eb]! text-sm!" />,
    },
    {
      id: 3,
      title: product?.category?.name
        ? product.category.name.toUpperCase()
        : "Exclusive Edition",
      subtitle: "Classification",
      icon: <AppstoreOutlined className="text-[#5433eb]! text-sm!" />,
    },
    {
      id: 4,
      title: product?.isTrending ? "Trending Pick" : "In Stock",
      subtitle: "Storefront Status",
      icon: <CheckCircleOutlined className="text-[#5433eb]! text-sm!" />,
    },
  ];

  return (
    <div className="flex! flex-col! gap-4! sm:gap-5!">
      <div className="relative! w-full! aspect-[4/3]! sm:aspect-[16/11]! min-h-[320px]! sm:min-h-[420px]! max-h-[500px]! rounded-[24px]! overflow-hidden! bg-gradient-to-b! from-[#fcfcfd]! to-[#f4f5f8]! border! border-[#ebebeb]! shadow-[0_4px_24px_rgba(0,0,0,0.04)]! flex! items-center! justify-center! p-6! sm:p-10! group!">
        {currentImage ? (
          <img
            src={currentImage}
            alt={product?.name || "Product Image"}
            className="w-full! h-full! max-h-[92%]! max-w-[92%]! object-contain! object-center! drop-shadow-sm! transition-transform! duration-500! group-hover:scale-103!"
          />
        ) : (
          <div className="text-gray-400! text-sm! font-medium! select-none!">
            No product image available
          </div>
        )}
      </div>

      {imagesToShow.length > 1 && (
        <div className="flex! items-center! gap-3! overflow-x-auto! p-2! -m-2! no-scrollbar!">
          {imagesToShow.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveThumb(index)}
              className={`w-16! h-16! sm:w-20! sm:h-20! shrink-0! rounded-[16px]! overflow-hidden! bg-[#f7f8fa]! border-2! transition-all! duration-200! flex! items-center! justify-center! cursor-pointer! ${activeThumb === index
                  ? "border-[#5433eb]! ring-2! ring-[#5433eb]/25! shadow-xs!"
                  : "border-[#ebebeb]! hover:border-gray-300! opacity-80! hover:opacity-100!"
                }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full! h-full! object-cover! object-center!"
              />
            </button>
          ))}
        </div>
      )}

      <div className="grid! grid-cols-2! gap-3! sm:gap-3.5! pt-1!">
        {featurePills.map((item) => (
          <div
            key={item.id}
            className="bg-white! rounded-[18px]! border! border-[#ebebeb]! p-3! sm:p-3.5! flex! items-center! gap-3! shadow-xs! hover:border-gray-300! transition-all!"
          >
            <div className="w-9! h-9! rounded-xl! bg-[#eee9ff]! text-[#5433eb]! flex! items-center! justify-center! shrink-0!">
              {item.icon}
            </div>
            <div className="flex! flex-col! min-w-0! flex-1!">
              <span className="text-[12px]! sm:text-[13px]! font-bold! text-[#1a1a1a]! leading-snug! break-words!">
                {item.title}
              </span>
              <span className="text-[10.5px]! sm:text-[11px]! text-gray-400! font-medium! leading-tight!">
                {item.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
