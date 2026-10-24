import React, { useState, useEffect } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  Link,
} from "react-router-dom";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductSpecs from "./ProductSpecs";
import SimilarProducts from "./SimilarProducts";
import { getSingleProductApi } from "../../services/productService";
import { motion } from "framer-motion";

export default function ProductDetailPage() {
  const [searchParams] = useSearchParams();
  const { slug: routeSlug } = useParams();
  const slug = searchParams.get("slug") || routeSlug;
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!slug) {
          setError("Product slug is required");
          setLoading(false);
          return;
        }

        const res = await getSingleProductApi(slug);

        if (res?.data?.success && res.data.data?.product) {
          setProduct(res.data.data.product);
        } else {
          setError(res?.data?.message || "Product not found");
        }
      } catch (err) {
        console.error("Error fetching single product:", err);
        setError(
          err?.response?.data?.message || "Failed to load product details",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen! bg-canvas! flex! flex-col! justify-center! items-center! py-24!">
        <ReloadOutlined className="text-3xl! text-[#5433eb]! animate-spin! mb-3!" />
        <p className="text-sm! font-semibold! text-gray-600!">
          Loading product details...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen! bg-canvas! flex! flex-col! justify-center! items-center! py-24! px-4! text-center!">
        <div className="w-14! h-14! rounded-2xl! bg-red-50! text-red-500! flex! items-center! justify-center! text-2xl! mb-3!">
          !
        </div>
        <h2 className="text-xl! font-bold! text-[#1a1a1a]! mb-1!">
          {error || "Product Not Found"}
        </h2>
        <p className="text-xs! text-gray-500! max-w-sm! mb-6!">
          The product you are looking for does not exist or may have been
          removed.
        </p>
        <Link
          to="/products"
          className="inline-flex! items-center! gap-2! px-6! py-2.5! rounded-full! bg-[#5433eb]! text-white! text-xs! font-bold! shadow-violet-glow! hover:bg-[#4324d4]! transition-all! no-underline!"
        >
          <ArrowLeftOutlined />
          <span>Back to Products</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen! bg-canvas! py-5! sm:py-8! md:py-10!">
      <div className="max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8! flex! flex-col! gap-8! sm:gap-12!">
        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex! items-center! gap-1.5! px-3.5! py-1.5! rounded-full! bg-white! border! border-[#ebebeb]! text-xs! font-semibold! text-gray-700! hover:text-[#5433eb]! hover:border-[#5433eb]/40! shadow-xs! transition-all! cursor-pointer!"
            aria-label="Go back"
          >
            <ArrowLeftOutlined className="text-[11px]!" />
            <span>Back</span>
          </button>
        </div>

        <div className="grid! grid-cols-1! lg:grid-cols-12! gap-8! lg:gap-10! items-start!">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7!"
          >
            <ProductGallery product={product} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5!"
          >
            <ProductInfo product={product} />
          </motion.div>
        </div>

        <div className="pt-2!">
          <ProductSpecs product={product} />
        </div>

        <div className="pt-2!">
          <SimilarProducts
            category={product.category}
            collection={product.category?.categoryCollection}
            currentId={product._id}
          />
        </div>
      </div>
    </div>
  );
}
