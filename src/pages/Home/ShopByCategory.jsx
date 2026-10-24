import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRightOutlined, CompassFilled } from "@ant-design/icons";
import tshirtsImg from "../../assets/images/category_tshirts.jpg";
import jeansImg from "../../assets/images/category_jeans.jpg";
import jacketsImg from "../../assets/images/category_jackets.jpg";
import shoesImg from "../../assets/images/category_shoes.jpg";
import { getCategoriesApi } from "../../services/productService";

const fallbackCategories = [
  {
    id: "cat-jackets",
    name: "Jackets & Outerwear",
    subtitle: "Architectural layering and climate-engineered wools.",
    count: "38 Styles",
    image: jacketsImg,
    featured: true,
  },
  {
    id: "cat-denim",
    name: "Denim & Raw Selvedge",
    subtitle: "Custom 14oz Japanese milled denim.",
    count: "24 Styles",
    image: jeansImg,
    featured: false,
  },
  {
    id: "cat-tshirts",
    name: "Heavyweight T-Shirts & Tops",
    subtitle: "280 GSM combed organic cotton silhouettes.",
    count: "42 Styles",
    image: tshirtsImg,
    featured: false,
  },
  {
    id: "cat-shoes",
    name: "Footwear & Leather Goods",
    subtitle: "Artisan Tuscan suede and ergonomic soles.",
    count: "19 Styles",
    image: shoesImg,
    featured: false,
  },
];

const sampleImages = [jacketsImg, jeansImg, tshirtsImg, shoesImg];

const toTitleCase = (str) =>
  str
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const getCategoryImage = (categoryName, index) => {
  if (!categoryName) return sampleImages[index % sampleImages.length];
  const lower = categoryName.toLowerCase();
  if (lower.includes("jacket") || lower.includes("coat") || lower.includes("outerwear")) {
    return jacketsImg;
  }
  if (lower.includes("jean") || lower.includes("denim") || lower.includes("pant")) {
    return jeansImg;
  }
  if (lower.includes("t-shirt") || lower.includes("shirt") || lower.includes("top")) {
    return tshirtsImg;
  }
  if (lower.includes("shoe") || lower.includes("footwear") || lower.includes("sneaker")) {
    return shoesImg;
  }
  return sampleImages[index % sampleImages.length];
};

function ShopByCategory() {
  const [categories, setCategories] = useState(fallbackCategories);

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
              subtitle:
                idx === 0
                  ? "Architectural layering and climate-engineered wools."
                  : "Everyday artisan craftsmanship.",
              count: `${Math.floor(20 + idx * 8)} Styles`,
              image: getCategoryImage(name, idx),
              featured: idx === 0,
            };
          });
          setCategories(fetched);
        }
      } catch (err) {
        console.warn("Failed to load categories, using curated lookbook:", err);
      }
    };

    fetchCategories();
  }, []);

  const featuredCategory = categories[0] || fallbackCategories[0];
  const secondaryCategories = categories.slice(1, 4);
  if (secondaryCategories.length < 3) {
    secondaryCategories.push(...fallbackCategories.slice(1, 4 - secondaryCategories.length));
  }

  return (
    <section className="w-full! max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8! py-10! sm:py-14!">
      {/* Editorial Header */}
      <div className="flex! flex-col! md:flex-row! md:items-end! justify-between! gap-4! mb-8!">
        <div>
          <div className="inline-flex! items-center! gap-1.5! px-3! py-1! rounded-full! bg-white! border! border-border! text-[#5433eb]! text-[11px]! font-bold! tracking-wider! uppercase! mb-2.5! shadow-2xs!">
            <CompassFilled className="text-xs!" />
            <span>Seasonal Architecture</span>
          </div>
          <h2 className="text-2xl! sm:text-3xl! lg:text-4xl! font-bold! text-text-primary! tracking-[-0.03em]! m-0!">
            Curated Category Lookbooks
          </h2>
          <p className="text-text-secondary! text-xs! sm:text-sm! m-0! mt-1.5! font-normal!">
            Explore core capsules organized by silhouette, material origin, and daily function.
          </p>
        </div>

        <Link
          to="/products"
          className="text-[#5433eb]! hover:text-[#4324d4]! text-xs! sm:text-sm! font-bold! inline-flex! items-center! gap-1.5! transition-all! no-underline!"
        >
          <span>View All Categories</span>
          <ArrowRightOutlined className="text-[11px]!" />
        </Link>
      </div>

      {/* Asymmetric Editorial Bento Grid */}
      <div className="grid! grid-cols-1! lg:grid-cols-12! gap-5! sm:gap-6!">
        {/* Large Featured Category Bento Card (Spans 6 cols on lg) */}
        <div className="lg:col-span-6!">
          <Link
            to={`/products?category=${encodeURIComponent(featuredCategory.name)}`}
            className="no-underline! group! block! h-full!"
          >
            <div className="relative! h-full! min-h-[380px]! sm:min-h-[460px]! rounded-card! overflow-hidden! shadow-level-1! border! border-border! flex! flex-col! justify-end! p-6! sm:p-8!">
              {/* Background Image with Zoom */}
              <img
                src={featuredCategory.image}
                alt={featuredCategory.name}
                className="absolute! inset-0! w-full! h-full! object-cover! object-center! transition-transform! duration-700! ease-out! group-hover:scale-106!"
              />

              {/* Gradient Scrim */}
              <div className="absolute! inset-0! bg-gradient-to-t! from-black/90! via-black/40! to-black/10! transition-opacity! group-hover:opacity-90!" />

              {/* Bottom Content */}
              <div className="relative! z-10! flex! flex-col! gap-2!">
                <h3 className="text-2xl! sm:text-3xl! font-extrabold! text-white! m-0! tracking-tight! leading-tight!">
                  {featuredCategory.name}
                </h3>
                <p className="text-white/80! text-xs! sm:text-sm! m-0! max-w-md! line-clamp-2!">
                  {featuredCategory.subtitle}
                </p>
                <div className="pt-2! inline-flex! items-center! gap-2! text-white! font-bold! text-xs! sm:text-sm! group-hover:text-[#a594fd]! transition-colors!">
                  <span>Explore Collection</span>
                  <ArrowRightOutlined className="text-xs! transition-transform! group-hover:translate-x-1!" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Right 3 Stacked / Split Categories (Spans 6 cols on lg) */}
        <div className="lg:col-span-6! flex! flex-col! gap-5! sm:gap-6!">
          {secondaryCategories.map((cat, idx) => (
            <Link
              key={cat.id || idx}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="no-underline! group! block! flex-1!"
            >
              <div className="relative! h-full! min-h-[140px]! sm:min-h-[155px]! rounded-card! overflow-hidden! shadow-level-1! border! border-border! flex! items-center! justify-between! p-5! sm:p-6!">
                {/* Background Image with Zoom */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute! inset-0! w-full! h-full! object-cover! object-center! transition-transform! duration-700! ease-out! group-hover:scale-108!"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute! inset-0! bg-gradient-to-r! from-black/90! via-black/60! to-black/20! transition-opacity! group-hover:opacity-90!" />

                {/* Content */}
                <div className="relative! z-10! flex! flex-col! gap-1! max-w-[70%]!">
                  <h3 className="text-lg! sm:text-xl! font-bold! text-white! m-0! tracking-tight! group-hover:text-white! transition-colors!">
                    {cat.name}
                  </h3>
                  <p className="text-white/70! text-xs! m-0! hidden! sm:block! truncate!">
                    {cat.subtitle}
                  </p>
                </div>

                {/* Circle Arrow Button */}
                <div className="relative! z-10! w-10! h-10! rounded-full! bg-white/20! group-hover:bg-[#5433eb]! text-white! backdrop-blur-md! border! border-white/25! flex! items-center! justify-center! transition-all! shadow-sm!">
                  <ArrowRightOutlined className="text-xs! transition-transform! group-hover:translate-x-0.5!" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShopByCategory;
