import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import tshirtsImg from "../../assets/images/category_tshirts.jpg";
import jeansImg from "../../assets/images/category_jeans.jpg";
import jacketsImg from "../../assets/images/category_jackets.jpg";
import shoesImg from "../../assets/images/category_shoes.jpg";
import { getCategoriesApi } from "../../services/productService";

const fallbackCategories = [
  {
    id: "1",
    name: "T-Shirts & Tops",
    count: "Casual Essentials",
    image: tshirtsImg,
  },
  {
    id: "2",
    name: "Denim & Jeans",
    count: "Classic Fits",
    image: jeansImg,
  },
  {
    id: "3",
    name: "Jackets & Outerwear",
    count: "Layering Staples",
    image: jacketsImg,
  },
  {
    id: "4",
    name: "Shoes & Footwear",
    count: "Everyday Comfort",
    image: shoesImg,
  },
];

const sampleImages = [tshirtsImg, jeansImg, jacketsImg, shoesImg];

const toTitleCase = (str) =>
  str
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const getCategoryImage = (categoryName, index) => {
  if (!categoryName) return sampleImages[index % sampleImages.length];
  const lower = categoryName.toLowerCase();
  if (
    lower.includes("t-shirt") ||
    lower.includes("shirt") ||
    lower.includes("top") ||
    lower.includes("tee")
  ) {
    return tshirtsImg;
  }
  if (
    lower.includes("jean") ||
    lower.includes("denim") ||
    lower.includes("pant") ||
    lower.includes("trouser") ||
    lower.includes("bottom")
  ) {
    return jeansImg;
  }
  if (
    lower.includes("jacket") ||
    lower.includes("coat") ||
    lower.includes("outerwear") ||
    lower.includes("hoodie") ||
    lower.includes("winter")
  ) {
    return jacketsImg;
  }
  if (
    lower.includes("shoe") ||
    lower.includes("footwear") ||
    lower.includes("sneaker") ||
    lower.includes("boot") ||
    lower.includes("sandal")
  ) {
    return shoesImg;
  }
  return sampleImages[index % sampleImages.length];
};

function ShopByCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesApi();
        if (res?.data?.success && res.data.data?.categories?.length > 0) {
          const fetched = res.data.data.categories.map((cat, idx) => {
            const name = toTitleCase(cat.name);
            return {
              id: cat._id,
              name,
              image: getCategoryImage(name, idx),
              slug: cat.slug || cat.name,
            };
          });
          setCategories(fetched);
        } else {
          setCategories(fallbackCategories);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
        setCategories(fallbackCategories);
      }
    };

    fetchCategories();
  }, []);

  const displayList = categories.length > 0 ? categories : fallbackCategories;

  return (
    <section className="w-full! max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8! py-8! sm:py-12!">
      <div className="flex! flex-col! sm:flex-row! sm:items-baseline! justify-between! gap-2! mb-6! sm:mb-8!">
        <div className="flex! items-baseline! gap-3! sm:gap-4!">
          <h2 className="text-2xl! sm:text-3xl! font-semibold! text-text-primary! tracking-[-0.031em]! m-0!">
            Shop by Category
          </h2>
          <Link
            to="/products"
            className="text-primary! hover:text-primary/80! text-xs! sm:text-sm! font-medium! tracking-[-0.02em]! inline-flex! items-center! gap-1! transition-colors!"
          >
            <span>Explore all</span>
            <span>›</span>
          </Link>
        </div>
        <p className="text-text-secondary! text-xs! sm:text-sm! font-normal! m-0! tracking-[-0.01em]!">
          Curated essentials designed for everyday style and comfort
        </p>
      </div>

      <div className="grid! grid-cols-1! sm:grid-cols-2! lg:grid-cols-4! gap-5! sm:gap-6!">
        {displayList.map((cat) => (
          <Link
            key={cat.id || cat.name}
            to={`/products?category=${encodeURIComponent(cat.name)}`}
            className="no-underline! group!"
          >
            <div className="bg-surface! rounded-card! p-3.5! sm:p-4! shadow-level-1! border! border-border! flex! flex-col! justify-between! transition-all! duration-300! hover:-translate-y-1! cursor-pointer! h-full!">
              <div className="w-full! aspect-4/3! sm:aspect-square! rounded-media! overflow-hidden! bg-canvas!">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full! h-full! object-cover! object-center! transition-transform! duration-500! group-hover:scale-105!"
                />
              </div>
              <div className="flex! items-center! justify-between! pt-3.5! px-1! pb-1!">
                <div className="flex! flex-col! gap-0.5!">
                  <h3 className="text-title-md! font-semibold! text-text-primary! tracking-[-0.031em]! m-0! group-hover:text-primary! transition-colors!">
                    {cat.name}
                  </h3>
                </div>

                <div className="w-8! h-8! rounded-full! bg-canvas! group-hover:bg-primary! group-hover:text-on-primary! text-text-primary! flex! items-center! justify-center! transition-all! shadow-xs!">
                  <ArrowRightOutlined className="text-xs! transition-transform! group-hover:translate-x-0.5!" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ShopByCategory;
