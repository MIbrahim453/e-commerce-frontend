import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Switch,
  Select,
  message,
  Spin,
  Tag,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  SaveOutlined,
  UploadOutlined,
  FireOutlined,
  ThunderboltOutlined,
  LinkOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  getSingleProductApi,
  editProductApi,
  getCategoriesApi,
} from "../../services/adminService";
import Loader from "../../components/Loader";

export default function AdminEditProduct() {
  const params = useParams();
  const slug = params.slug;
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [initialLoading, setInitialLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productId, setProductId] = useState("");
  const [originalProduct, setOriginalProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    isTrending: false,
    isNewArrival: false,
    details: {
      material: "",
      color: "",
      sizes: [],
      instructions: "",
    },
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newSizeName, setNewSizeName] = useState("");
  const [newSizeStock, setNewSizeStock] = useState("");

  const storageKey = slug ? `admin_edit_product_${slug}` : null;

  const numPrice = Number(formData.price) || 0;
  const numDiscount = Number(formData.discount) || 0;
  const discountedPrice = (numPrice - numPrice * (numDiscount / 100)).toFixed(
    2,
  );
  const totalStock = formData.details.sizes.reduce(
    (acc, size) => acc + (Number(size.stock) || 0),
    0,
  );

  const [selectedCollection, setSelectedCollection] = useState("all");

  const previewSlug = formData.name
    ? formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, " ")
      .trim()
      .split(/\s+/)
      .join("-")
    : "";

  const menCategories = categories.filter(
    (c) => (c.categoryCollection || "").toLowerCase() === "men",
  );
  const womenCategories = categories.filter(
    (c) => (c.categoryCollection || "").toLowerCase() === "women",
  );
  const kidsCategories = categories.filter(
    (c) => (c.categoryCollection || "").toLowerCase() === "kids",
  );
  const otherCategories = categories.filter(
    (c) =>
      !["men", "women", "kids"].includes(
        (c.categoryCollection || "").toLowerCase(),
      ),
  );

  const selectedCategoryObj = categories.find(
    (c) => (c._id || c.id || c.name) === formData.category,
  );

  const buildGroup = (title, key, list, dotClass, badgeClass) => {
    if (list.length === 0) return null;
    return {
      label: (
        <div className="flex! items-center! justify-between! py-1! border-b! border-gray-100!">
          <span className="font-bold! text-xs! uppercase! tracking-wider! text-text-primary! flex! items-center! gap-1.5!">
            <span className={`w-2! h-2! rounded-full! ${dotClass}`} />
            {title}
          </span>
          <span className="text-[10px]! font-semibold! text-text-secondary!">
            {list.length} {list.length === 1 ? "cat" : "cats"}
          </span>
        </div>
      ),
      title,
      options: list.map((cat) => ({
        label: (
          <div className="flex! items-center! justify-between! py-0.5!">
            <span className="capitalize! font-medium! text-xs! text-text-primary!">
              {cat.name}
            </span>
            <span className={`text-[10px]! font-bold! px-1.5! py-0.2! rounded-full! ${badgeClass}`}>
              {key}
            </span>
          </div>
        ),
        value: cat._id || cat.id || cat.name,
        name: cat.name,
        collection: key,
      })),
    };
  };

  const groupedCategoryOptions = (() => {
    const groups = [];
    if (selectedCollection === "all" || selectedCollection === "men") {
      const g = buildGroup("Men's Collection", "men", menCategories, "bg-[#5433eb]", "bg-[#5433eb]/10 text-[#5433eb]");
      if (g) groups.push(g);
    }
    if (selectedCollection === "all" || selectedCollection === "women") {
      const g = buildGroup("Women's Collection", "women", womenCategories, "bg-pink-500", "bg-pink-50 text-pink-600");
      if (g) groups.push(g);
    }
    if (selectedCollection === "all" || selectedCollection === "kids") {
      const g = buildGroup("Kids' Collection", "kids", kidsCategories, "bg-amber-500", "bg-amber-50 text-amber-700");
      if (g) groups.push(g);
    }
    if (selectedCollection === "all" && otherCategories.length > 0) {
      const g = buildGroup("Other Categories", "other", otherCategories, "bg-gray-400", "bg-gray-100 text-gray-700");
      if (g) groups.push(g);
    }
    return groups;
  })();

  useEffect(() => {
    const fetchData = async () => {
      setInitialLoading(true);
      try {
        const [catRes, prodRes] = await Promise.allSettled([
          getCategoriesApi(),
          getSingleProductApi(slug),
        ]);

        if (catRes.status === "fulfilled" && catRes.value?.data?.success) {
          setCategories(catRes.value.data.data?.categories || []);
        }

        let prod = null;
        if (prodRes.status === "fulfilled" && prodRes.value?.data?.success) {
          prod = prodRes.value.data.data?.product;
        }

        if (prod) {
          setOriginalProduct(prod);
          setProductId(prod._id || prod.id || "");

          let imgList = [];
          if (Array.isArray(prod.images)) {
            imgList = prod.images;
          } else if (typeof prod.images === "string") {
            try {
              const parsed = JSON.parse(prod.images);
              imgList = Array.isArray(parsed) ? parsed : [prod.images];
            } catch {
              imgList = prod.images.includes(" ")
                ? prod.images.trim().split(/\s+/)
                : [prod.images];
            }
          }

          const defaultFormData = {
            name: prod.name || "",
            description: prod.description || "",
            price: prod.price ?? "",
            discount: prod.discount ?? "",
            category:
              typeof prod.category === "object"
                ? prod.category?._id
                : prod.category || "",
            isTrending: Boolean(prod.isTrending),
            isNewArrival: Boolean(prod.isNewArrival),
            details: {
              material: prod.details?.material || "",
              color: prod.details?.color || "",
              sizes: prod.details?.sizes || [],
              instructions: prod.details?.instructions || "",
            },
          };

          let hasRestoredDraft = false;
          if (storageKey) {
            try {
              const savedDraft = localStorage.getItem(storageKey);
              if (savedDraft) {
                const parsed = JSON.parse(savedDraft);
                if (parsed?.formData) {
                  setFormData(parsed.formData);
                  if (Array.isArray(parsed.existingImages)) {
                    setExistingImages(parsed.existingImages);
                  } else {
                    setExistingImages(imgList);
                  }
                  hasRestoredDraft = true;
                }
              }
            } catch (err) {
              console.error("Failed to read draft from localStorage", err);
            }
          }

          if (!hasRestoredDraft) {
            setFormData(defaultFormData);
            setExistingImages(imgList);
          }
        } else {
          message.error("Product could not be found.");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        message.error("Failed to fetch product data.");
      } finally {
        setInitialLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  useEffect(() => {
    if (!storageKey || initialLoading) return;
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          formData,
          existingImages,
        }),
      );
    } catch (err) {
      console.error("Failed to save draft to localStorage:", err);
    }
  }, [formData, existingImages, storageKey, initialLoading]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      details: { ...prev.details, [name]: value },
    }));
  };

  const handleNewFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setNewImages((prev) => [...prev, ...files]);
    }
    e.target.value = "";
  };

  const removeExistingImage = (indexToRemove) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const removeNewImage = (indexToRemove) => {
    setNewImages((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleAddSize = () => {
    const size = newSizeName.trim();
    const stock = Number(newSizeStock);
    if (!size) {
      message.warning("Please enter size name (e.g. S, M, L)");
      return;
    }
    if (isNaN(stock) || stock < 0) {
      message.warning("Please enter a valid stock quantity");
      return;
    }
    if (
      formData.details.sizes.some(
        (item) => item.size?.toLowerCase() === size.toLowerCase(),
      )
    ) {
      message.warning(`Size "${size}" is already added.`);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        sizes: [...prev.details.sizes, { size, stock }],
      },
    }));
    setNewSizeName("");
    setNewSizeStock("");
  };

  const handleStockUpdate = (index, value) => {
    const stock = Number(value);
    if (isNaN(stock) || stock < 0) return;
    const updated = formData.details.sizes.map((item, i) =>
      i === index ? { ...item, stock } : item,
    );
    setFormData((prev) => ({
      ...prev,
      details: { ...prev.details, sizes: updated },
    }));
  };

  const removeSize = (index) => {
    const updated = formData.details.sizes.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      details: { ...prev.details, sizes: updated },
    }));
  };

  const handleDiscardDraft = () => {
    if (!originalProduct) return;
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
    let imgList = [];
    if (Array.isArray(originalProduct.images)) {
      imgList = originalProduct.images;
    } else if (typeof originalProduct.images === "string") {
      try {
        const parsed = JSON.parse(originalProduct.images);
        imgList = Array.isArray(parsed) ? parsed : [originalProduct.images];
      } catch {
        imgList = originalProduct.images.includes(" ")
          ? originalProduct.images.trim().split(/\s+/)
          : [originalProduct.images];
      }
    }
    setFormData({
      name: originalProduct.name || "",
      description: originalProduct.description || "",
      price: originalProduct.price ?? "",
      discount: originalProduct.discount ?? "",
      category:
        typeof originalProduct.category === "object"
          ? originalProduct.category?._id
          : originalProduct.category || "",
      isTrending: Boolean(originalProduct.isTrending),
      isNewArrival: Boolean(originalProduct.isNewArrival),
      details: {
        material: originalProduct.details?.material || "",
        color: originalProduct.details?.color || "",
        sizes: originalProduct.details?.sizes || [],
        instructions: originalProduct.details?.instructions || "",
      },
    });
    setExistingImages(imgList);
    setNewImages([]);
    message.success("Draft discarded, reloaded original product values.");
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!formData.name.trim()) {
      message.warning("Please enter a product title.");
      return;
    }
    if (!formData.description.trim()) {
      message.warning("Please enter a product description.");
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      message.warning("Please enter a valid product price.");
      return;
    }
    if (!formData.category) {
      message.warning("Please select a product category.");
      return;
    }
    if (existingImages.length === 0 && newImages.length === 0) {
      message.warning("Please provide at least one product image.");
      return;
    }
    if (formData.details.sizes.length === 0) {
      message.warning("Please configure at least one size variant.");
      return;
    }
    if (!formData.details.instructions?.trim()) {
      message.warning("Please enter care/handling instructions.");
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("discount", formData.discount || 0);
      data.append("category", formData.category);
      data.append("isTrending", formData.isTrending);
      data.append("isNewArrival", formData.isNewArrival);
      data.append("details", JSON.stringify(formData.details));
      data.append("images", JSON.stringify(existingImages));

      newImages.forEach((file) => {
        data.append("images", file);
      });

      const res = await editProductApi(productId, data);
      if (res?.data?.success) {
        if (storageKey) {
          localStorage.removeItem(storageKey);
        }
        message.success(res.data.message || "Product updated successfully!");
        navigate("/admin/products");
      }
    } catch (error) {
      console.error("Error editing product:", error);
      const errMsg =
        error.response?.data?.message || "Failed to update product details.";
      message.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (initialLoading) {
    return (
      <Loader
        className="py-24"
        text="Loading product information..."
        subtext="Retrieving attributes, inventory, and media assets..."
      />
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {submitting && (
        <Loader
          fullscreen
          text="Saving Changes..."
          subtext="Uploading media assets and updating catalog ledger..."
        />
      )}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
            <Link to="/admin" className="hover:text-primary transition-colors">
              Admin
            </Link>
            <span>&gt;</span>
            <Link
              to="/admin/products"
              className="hover:text-primary transition-colors"
            >
              Products
            </Link>
            <span>&gt;</span>
            <span className="text-text-primary">Edit Product</span>
          </div>

          <div className="flex items-center gap-3 mt-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary truncate max-w-xl">
              Edit: {formData.name || "Product"}
            </h1>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Update catalogue attributes, pricing, stock levels, and media
            assets.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-nowrap shrink-0 overflow-x-auto whitespace-nowrap">
          <Button
            onClick={handleDiscardDraft}
            icon={<ReloadOutlined />}
            className="rounded-full! text-xs! font-semibold! text-text-secondary! hover:text-text-primary! bg-surface! hover:bg-canvas! border-border! h-auto! py-2.5! px-3.5! whitespace-nowrap! shrink-0!"
          >
            Reset to Original
          </Button>

          <Button
            onClick={() => navigate("/admin/products")}
            icon={<ArrowLeftOutlined />}
            className="rounded-full! text-xs! font-semibold! text-text-primary! bg-surface! hover:bg-canvas! border-border! h-auto! py-2.5! px-4! whitespace-nowrap! shrink-0!"
          >
            Cancel
          </Button>

          <Button
            type="primary"
            onClick={handleSubmit}
            loading={submitting}
            icon={<SaveOutlined className="text-xs" />}
            className="rounded-full! text-xs! font-bold! text-on-primary! bg-primary! hover:bg-primary/90! shadow-violet-glow! border-0! h-auto! py-2.5! px-6! flex! items-center! gap-2! whitespace-nowrap! shrink-0!"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface rounded-card p-6 sm:p-7 border border-border shadow-level-1 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  General Information
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  Core identity and public description
                </p>
              </div>
              <span className="text-[11px] font-semibold text-text-secondary bg-canvas px-2.5 py-0.5 rounded-full">
                Title & Description
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                PRODUCT TITLE <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g. Minimalist Studio Hoodie"
                value={formData.name}
                name="name"
                onChange={handleChange}
                className="py-2.5! px-4! bg-canvas! focus:bg-surface! text-sm! font-semibold! text-text-primary! rounded-2xl! border-border! focus:border-primary!"
              />
              {previewSlug && (
                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-text-secondary font-mono">
                  <LinkOutlined className="text-primary text-[10px]" />
                  <span>Slug: /product/{previewSlug}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                DESCRIPTION <span className="text-red-500">*</span>
              </label>
              <Input.TextArea
                rows={4}
                placeholder="Write a clear, compelling description detailing features and benefits..."
                value={formData.description}
                name="description"
                onChange={handleChange}
                className="p-4! bg-canvas! focus:bg-surface! text-xs! font-normal! text-text-primary! leading-relaxed! rounded-2xl! border-border! focus:border-primary! resize-none!"
              />
            </div>
          </div>

          <div className="bg-surface rounded-card p-6 sm:p-7 border border-border shadow-level-1 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  Product Media
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  The first image is automatically used as the catalog thumbnail
                </p>
              </div>
              <span className="text-[11px] font-semibold text-text-secondary bg-canvas px-2.5 py-0.5 rounded-full">
                {existingImages.length + newImages.length} Images
              </span>
            </div>

            {existingImages.length > 0 && (
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                  Current Uploaded Images
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {existingImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="relative group rounded-2xl overflow-hidden border border-border"
                    >
                      <img
                        src={imgUrl}
                        alt={`Product media ${idx}`}
                        className="w-full h-28 object-cover bg-canvas"
                      />
                      {idx === 0 && (
                        <span className="absolute top-2 left-2 bg-primary text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shadow-xs">
                          Cover / Thumbnail
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Tooltip title="Remove image">
                          <button
                            type="button"
                            onClick={() => removeExistingImage(idx)}
                            className="w-7 h-7 rounded-full bg-rose-600 text-white text-xs flex items-center justify-center hover:scale-110 transition-transform shadow-xs cursor-pointer"
                          >
                            <DeleteOutlined />
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {newImages.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-border">
                <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                  New Images (Will upload upon saving)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {newImages.map((file, idx) => {
                    const preview = URL.createObjectURL(file);
                    return (
                      <div
                        key={idx}
                        className="relative group rounded-2xl overflow-hidden border border-indigo-200 bg-indigo-50/20"
                      >
                        <img
                          src={preview}
                          alt="New preview"
                          className="w-full h-28 object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                          New
                        </span>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removeNewImage(idx)}
                            className="w-7 h-7 rounded-full bg-rose-600 text-white text-xs flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                          >
                            <DeleteOutlined />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handleNewFileChange}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border hover:border-primary/50 bg-canvas/60 hover:bg-canvas rounded-2xl p-6 text-center cursor-pointer transition-colors"
            >
              <div className="w-10 h-10 rounded-2xl bg-surface border border-border mx-auto flex items-center justify-center text-primary text-base shadow-2xs mb-2">
                <UploadOutlined />
              </div>
              <p className="text-xs font-bold text-text-primary">
                Click to add more product images
              </p>
              <p className="text-[11px] text-text-secondary mt-0.5">
                Supports PNG, JPG, WEBP up to 10MB each
              </p>
            </div>
          </div>

          <div className="bg-surface rounded-card p-6 sm:p-7 border border-border shadow-level-1 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  Pricing & Discounts
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  Set retail prices and promotional markdowns
                </p>
              </div>
              <span className="text-[11px] font-semibold text-text-secondary bg-canvas px-2.5 py-0.5 rounded-full">
                Commercial
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                  BASE PRICE (USD) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price}
                  name="price"
                  onChange={handleChange}
                  prefix={
                    <span className="text-text-secondary font-bold mr-1">
                      $
                    </span>
                  }
                  className="py-2.5! px-4! bg-canvas! focus:bg-surface! text-sm! font-semibold! text-text-primary! rounded-2xl! border-border! focus:border-primary!"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                  DISCOUNT PERCENTAGE (%)
                </label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0"
                  value={formData.discount}
                  name="discount"
                  onChange={handleChange}
                  suffix={
                    <span className="text-text-secondary font-bold">%</span>
                  }
                  className="py-2.5! px-4! bg-canvas! focus:bg-surface! text-sm! font-semibold! text-text-primary! rounded-2xl! border-border! focus:border-primary!"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-canvas border border-border flex items-center justify-between text-xs">
              <span className="text-text-secondary font-medium">
                Customer Checkout Price:
              </span>
              <div className="flex items-center gap-2">
                {numDiscount > 0 && (
                  <span className="line-through text-text-secondary">
                    ${numPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-base font-extrabold text-primary">
                  ${discountedPrice}
                </span>
                {numDiscount > 0 && (
                  <Tag color="green" className="font-bold rounded-full! m-0!">
                    Save {numDiscount}%
                  </Tag>
                )}
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-card p-6 sm:p-7 border border-border shadow-level-1 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  Stock & Size Variants
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  Total inventory:{" "}
                  <span className="font-bold text-primary">
                    {totalStock} units
                  </span>
                </p>
              </div>
              <span className="text-[11px] font-semibold text-text-secondary bg-canvas px-2.5 py-0.5 rounded-full">
                Inventory
              </span>
            </div>

            <div className="p-4 bg-canvas rounded-2xl border border-border space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                Add Size Variant
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-5">
                  <Input
                    placeholder="Size name (e.g. S, M, L, XL, Standard)"
                    value={newSizeName}
                    onChange={(e) => setNewSizeName(e.target.value)}
                    className="py-2! px-3! bg-surface! text-xs! font-semibold! rounded-xl! border-border!"
                  />
                </div>
                <div className="sm:col-span-4">
                  <Input
                    type="number"
                    min="0"
                    placeholder="Stock quantity"
                    value={newSizeStock}
                    onChange={(e) => setNewSizeStock(e.target.value)}
                    className="py-2! px-3! bg-surface! text-xs! font-semibold! rounded-xl! border-border!"
                  />
                </div>
                <div className="sm:col-span-3">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAddSize}
                    className="w-full! rounded-xl! bg-primary! text-on-primary! text-xs! font-bold! h-auto! py-2!"
                  >
                    Add Size
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {formData.details.sizes.length === 0 ? (
                <div className="text-center py-6 text-xs text-text-secondary">
                  No size variants configured. Add one above.
                </div>
              ) : (
                formData.details.sizes.map((item, index) => (
                  <div
                    key={index}
                    className="p-3.5 bg-canvas rounded-2xl border border-border flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-surface border border-border text-text-primary font-bold text-xs flex items-center justify-center">
                        {item.size.substring(0, 3)}
                      </div>
                      <div>
                        <p className="font-bold text-text-primary">
                          Size: {item.size}
                        </p>
                        <p className="text-[11px] text-text-secondary">
                          Configured SKU variant
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 bg-surface px-2.5 py-1 rounded-xl border border-border">
                        <span className="text-[11px] font-medium text-text-secondary">
                          Stock:
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={item.stock}
                          onChange={(e) =>
                            handleStockUpdate(index, e.target.value)
                          }
                          className="w-14 text-center text-xs font-bold text-text-primary bg-transparent outline-none"
                        />
                        <span className="text-[11px] text-text-secondary">
                          units
                        </span>
                      </div>

                      <Button
                        type="text"
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeSize(index)}
                        className="p-0!"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-surface rounded-card p-6 sm:p-7 border border-border shadow-level-1 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  Details & Specifications
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  Fabric, composition, and maintenance guidelines
                </p>
              </div>
              <span className="text-[11px] font-semibold text-text-secondary bg-canvas px-2.5 py-0.5 rounded-full">
                Specs
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                  MATERIAL
                </label>
                <Input
                  placeholder="e.g. 100% Organic Cotton, Heavyweight Fleece"
                  value={formData.details.material}
                  name="material"
                  onChange={handleDetailsChange}
                  className="py-2.5! px-4! bg-canvas! focus:bg-surface! text-xs! font-semibold! text-text-primary! rounded-2xl! border-transparent! focus:border-primary!"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                  COLOR
                </label>
                <Input
                  placeholder="e.g. Vintage Black, Sand Beige"
                  value={formData.details.color}
                  name="color"
                  onChange={handleDetailsChange}
                  className="py-2.5! px-4! bg-canvas! focus:bg-surface! text-xs! font-semibold! text-text-primary! rounded-2xl! border-transparent! focus:border-primary!"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                CARE & HANDLING INSTRUCTIONS{" "}
                <span className="text-red-500">*</span>
              </label>
              <Input.TextArea
                rows={3}
                placeholder="Care instructions (e.g. Machine wash cold with similar colors, tumble dry low)..."
                value={formData.details.instructions}
                name="instructions"
                onChange={handleDetailsChange}
                className="p-4! bg-canvas! focus:bg-surface! text-xs! font-normal! text-text-primary! leading-relaxed! rounded-2xl! border-transparent! focus:border-primary! resize-none!"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface rounded-card p-6 border border-border shadow-level-1 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-text-primary">
                  Category & Collection
                </h3>
                <p className="text-[11px] text-text-secondary mt-0.5">
                  Organized by Men, Women & Kids collections
                </p>
              </div>
              <Link
                to="/admin/categories"
                className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1 shrink-0"
              >
                Manage <ArrowRightOutlined className="text-[9px]" />
              </Link>
            </div>

            {categories.length === 0 && !initialLoading ? (
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-dashed border-amber-300 text-center space-y-3">
                <p className="text-xs font-bold text-amber-900 m-0">
                  No Categories Available
                </p>
                <p className="text-[11px] text-amber-700 m-0">
                  Please create a category to assign to this product.
                </p>
                <Link to="/admin/categories" className="inline-block pt-1">
                  <Button
                    type="primary"
                    size="small"
                    className="rounded-full! bg-[#5433eb]! text-white! text-xs! font-bold! py-1! px-4! h-auto!"
                  >
                    + Create Category
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Collection Filter Tabs */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                      COLLECTION DEPARTMENTS
                    </label>
                    <span className="text-[10px] text-text-secondary font-medium">
                      {categories.length} categories
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 p-1 bg-canvas rounded-xl border border-border text-[11px]">
                    {[
                      { key: "all", label: "All", count: categories.length },
                      { key: "men", label: "Men", count: menCategories.length },
                      { key: "women", label: "Women", count: womenCategories.length },
                      { key: "kids", label: "Kids", count: kidsCategories.length },
                    ].map((col) => {
                      const isActive = selectedCollection === col.key;
                      return (
                        <button
                          key={col.key}
                          type="button"
                          onClick={() => setSelectedCollection(col.key)}
                          className={`py-1! px-1.5! rounded-lg! font-semibold! text-[11px]! transition-all! cursor-pointer! border-0! flex! items-center! justify-center! gap-1! ${isActive
                              ? "bg-surface! text-[#5433eb]! shadow-2xs!"
                              : "bg-transparent! text-text-secondary! hover:text-text-primary!"
                            }`}
                        >
                          <span>{col.label}</span>
                          <span className="text-[9px] opacity-70">({col.count})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                      ASSIGNED CATEGORY <span className="text-red-500">*</span>
                    </label>
                    <Link
                      to="/admin/categories"
                      className="text-[10px] text-primary hover:underline font-semibold"
                    >
                      + New Category
                    </Link>
                  </div>
                  <Select
                    value={formData.category || undefined}
                    showSearch
                    optionFilterProp="name"
                    filterOption={(input, option) => {
                      const name = option?.name || "";
                      const coll = option?.collection || "";
                      return (
                        name.toLowerCase().includes(input.toLowerCase()) ||
                        coll.toLowerCase().includes(input.toLowerCase())
                      );
                    }}
                    onChange={(val) =>
                      setFormData((prev) => ({ ...prev, category: val }))
                    }
                    className="w-full text-xs font-semibold"
                    placeholder="Select category..."
                    options={groupedCategoryOptions}
                  />
                </div>

                {selectedCategoryObj && (
                  <div className="p-3 bg-canvas rounded-2xl border border-border flex items-center justify-between text-xs animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-text-secondary text-[11px]">Selected:</span>
                      <span className="font-bold text-text-primary capitalize truncate">
                        {selectedCategoryObj.name}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${(selectedCategoryObj.categoryCollection || "").toLowerCase() === "women"
                          ? "bg-pink-100 text-pink-700"
                          : (selectedCategoryObj.categoryCollection || "").toLowerCase() === "kids"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-[#5433eb]/15 text-[#5433eb]"
                        }`}
                    >
                      {(selectedCategoryObj.categoryCollection || "all")} collection
                    </span>
                  </div>
                )}
              </div>
            )}

            <p className="text-[11px] text-text-secondary leading-relaxed">
              Updating the category recalculates collection statistics and storefront department filters.
            </p>
          </div>

          <div className="bg-surface rounded-card p-6 border border-border shadow-level-1 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-text-primary">
                Product Highlights
              </h3>
              <span className="text-[11px] font-semibold text-text-secondary bg-canvas px-2.5 py-0.5 rounded-full">
                Status
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-canvas border border-border flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${formData.isTrending
                      ? "bg-amber-100 text-amber-600"
                      : "bg-surface text-text-secondary"
                    }`}
                >
                  <FireOutlined />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-primary">
                    Trending Status
                  </p>
                  <p className="text-[11px] text-text-secondary">
                    Feature in Trending highlights
                  </p>
                </div>
              </div>

              <Switch
                checked={formData.isTrending}
                onChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isTrending: checked }))
                }
                style={{
                  backgroundColor: formData.isTrending ? "#5433eb" : undefined,
                }}
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-canvas border border-border flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${formData.isNewArrival
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-surface text-text-secondary"
                    }`}
                >
                  <ThunderboltOutlined />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-primary">
                    New Arrival
                  </p>
                  <p className="text-[11px] text-text-secondary">
                    Mark as New in collection
                  </p>
                </div>
              </div>

              <Switch
                checked={formData.isNewArrival}
                onChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isNewArrival: checked }))
                }
                style={{
                  backgroundColor: formData.isNewArrival
                    ? "#5433eb"
                    : undefined,
                }}
              />
            </div>
          </div>

          <div className="bg-surface rounded-card p-6 border border-border shadow-level-1 space-y-3">
            <h3 className="text-sm font-bold text-text-primary">
              Save Changes
            </h3>
            <p className="text-xs text-text-secondary">
              Review your edits before publishing. Changes will immediately sync
              to the storefront and catalog ledger.
            </p>
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={submitting}
              icon={<SaveOutlined />}
              className="w-full! rounded-full! text-xs! font-bold! text-on-primary! bg-primary! hover:bg-primary/90! shadow-violet-glow! border-0! h-auto! py-2.5! flex! items-center! justify-center! gap-2!"
            >
              Update Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
