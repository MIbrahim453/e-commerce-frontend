import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Switch, Select, message } from "antd";
import {
  PictureOutlined,
  PlusOutlined,
  DeleteOutlined,
  ArrowRightOutlined,
  UploadOutlined,
  FireOutlined,
  ThunderboltOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import {
  createProductApi,
  getCategoriesApi,
} from "../../services/adminService";
import Loader from "../../components/Loader";

export default function AdminAddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    images: [],
    isTrending: false,
    isNewArrival: false,
    details: {
      material: "",
      color: "",
      sizes: [],
      instructions: "",
    },
  });

  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [newSizeName, setNewSizeName] = useState("");
  const [newSizeStock, setNewSizeStock] = useState("");
  const numPrice = Number(formData.price) || 0;
  const numDiscount = Number(formData.discount) || 0;
  const discountedPrice = (numPrice - numPrice * (numDiscount / 100)).toFixed(
    2,
  );
  const totalStock = formData.details.sizes.reduce(
    (acc, size) => acc + (Number(size.stock) || 0),
    0,
  );

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
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await getCategoriesApi();
        if (res?.data?.success) {
          setCategories(res.data.data?.categories || []);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);

    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));

    e.target.value = "";
  };

  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleAddSize = () => {
    const size = newSizeName.trim();
    const stock = Number(newSizeStock);
    if (!size) {
      message.warning("Please enter size name");
      return;
    }

    if (!stock || !Number.isInteger(stock) || stock < 0) {
      message.warning("Please enter valid stock");
      return;
    }
    if (
      formData.details.sizes.some(
        (item) => item.size?.toLowerCase() === size.toLowerCase(),
      )
    ) {
      message.warning(`Size ${size} already exists`);
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
    if (!stock || !Number.isInteger(stock) || stock < 0) {
      message.warning("Please enter valid stock");
      return;
    }
    const updatedSizes = formData.details.sizes.map((item, i) =>
      i === index ? { ...item, stock } : item,
    );
    setFormData((prev) => ({
      ...prev,
      details: { ...prev.details, sizes: updatedSizes },
    }));
  };

  const removeSize = (index) => {
    const updatedSizes = formData.details.sizes.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      details: { ...prev.details, sizes: updatedSizes },
    }));
  };

  const handleSubmit = async () => {
    if (categories.length === 0) {
      message.error(
        "Cannot create product: No categories available. Please create a category first.",
      );
      return;
    }
    if (!formData.name.trim()) {
      message.warning("Please enter product title");
      return;
    }
    if (!formData.price) {
      message.warning("Please enter product price");
      return;
    }
    if (!formData.category) {
      message.warning("Please choose a category");
      return;
    }
    if (formData.images.length === 0) {
      message.warning("Please upload at least one image");
      return;
    }
    if (!formData.details.material?.trim()) {
      message.warning("Please enter product material");
      return;
    }
    if (!formData.details.color?.trim()) {
      message.warning("Please enter product color");
      return;
    }
    if (!formData.details.instructions?.trim()) {
      message.warning("Please enter care/handling instructions");
      return;
    }

    setLoading(true);
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

      formData.images.forEach((img) => {
        data.append("images", img);
      });

      const res = await createProductApi(data);
      if (res && res.data?.success) {
        message.success(res.data.message || "Product created successfully");
        clearData();
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || "Failed to add product";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      discount: "",
      category: "",
      images: [],
      thumbnail: null,
      isTrending: false,
      isNewArrival: false,
      details: {
        material: "",
        color: "",
        sizes: [],
        instructions: "",
      },
    });
  };
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {loading && (
        <Loader
          fullscreen
          text="Creating Product..."
          subtext="Uploading images to Cloudinary and registering catalog item..."
        />
      )}

      {categories.length === 0 && !loading && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-amber-900 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl shrink-0">
              <AppstoreOutlined />
            </div>
            <div>
              <p className="text-sm font-bold m-0 text-amber-950">
                No Categories Available in Store
              </p>
              <p className="text-xs text-amber-800 m-0 mt-0.5 leading-relaxed">
                Products cannot be created without a category. Please create at least one category under Men's, Women's, or Kids' collection before creating products.
              </p>
            </div>
          </div>
          <Link to="/admin/categories" className="shrink-0">
            <Button
              type="primary"
              className="rounded-full! bg-amber-600! hover:bg-amber-700! text-white! text-xs! font-bold! h-auto! py-2! px-5! border-0! shadow-xs!"
            >
              + Create Category First
            </Button>
          </Link>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
            <Link
              to="/admin/products"
              className="hover:text-primary transition-colors"
            >
              Products
            </Link>
            <span>&gt;</span>
            <span className="text-text-primary">Add New Product</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary mt-1 m-0">
            Add New Product
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={clearData}
            className="rounded-full! text-xs! font-semibold! text-text-primary! bg-surface! hover:bg-canvas! border-border! h-auto! py-2! px-4!"
          >
            Cancel
          </Button>

          <Button
            type="primary"
            disabled={categories.length === 0}
            onClick={handleSubmit}
            icon={<ArrowRightOutlined className="text-xs" />}
            title={
              categories.length === 0
                ? "Cannot publish product: No categories available. Please create a category first."
                : "Publish product to catalog"
            }
            className={`rounded-full! text-xs! font-bold! h-auto! py-2.5! px-6! flex! items-center! gap-2! border-0! ${categories.length === 0
                ? "bg-gray-200! text-gray-400! cursor-not-allowed! shadow-none!"
                : "text-on-primary! bg-primary! hover:bg-primary/90! shadow-violet-glow!"
              }`}
          >
            Publish Product
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface rounded-card p-6 sm:p-7 border border-border shadow-level-1 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-text-primary">
                General Information
              </h2>
              <span className="text-[11px] font-semibold text-text-secondary bg-canvas px-2.5 py-0.5 rounded-full">
                Core Details
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                TITLE
              </label>
              <Input
                placeholder="e.g. Ergonomic Studio Chair"
                value={formData.name}
                name="name"
                onChange={handleChange}
                className="py-2.5! px-4! bg-canvas! focus:bg-surface! text-sm! font-semibold! text-text-primary! rounded-2xl! border-transparent! focus:border-primary!"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                DESCRIPTION
              </label>
              <Input.TextArea
                rows={5}
                placeholder="Write a clear, simple description of the product..."
                value={formData.description}
                name="description"
                onChange={handleChange}
                className="p-4! bg-canvas! focus:bg-surface! text-xs! font-normal! text-text-primary! leading-relaxed! rounded-2xl! border-transparent! focus:border-primary! resize-none!"
              />
            </div>
          </div>

          <div className="bg-surface rounded-card p-6 sm:p-7 border border-border shadow-level-1 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  Product Picture
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  Select image files from your local computer (PNG, JPG, or
                  WEBP)
                </p>
              </div>
              <PictureOutlined className="text-lg text-text-secondary" />
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              name="images"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-8 rounded-2xl border-2 border-dashed transition-all text-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center mx-auto text-primary text-xl mb-3 shadow-2xs">
                <UploadOutlined />
              </div>
              <p className="text-xs text-primary font-medium">
                browse local files
              </p>
              <p className="text-[11px] text-text-secondary/70 mt-1">
                Selected directly from local machine • Multiple files supported
              </p>
            </div>

            {formData.images.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                    SELECTED IMAGES ({formData.images.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <PlusOutlined className="text-[10px]" /> Add more files
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {formData.images.map((img, index) => (
                    <div
                      key={index}
                      className="relative group aspect-square rounded-2xl overflow-hidden border border-border bg-canvas shadow-xs"
                    >
                      <img
                        src={
                          img instanceof File
                            ? URL.createObjectURL(img)
                            : img?.url || img
                        }
                        alt={`Local image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />

                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-text-primary/85 text-white text-[10px] font-bold">
                          Primary
                        </span>
                      )}

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                          type="primary"
                          danger
                          size="small"
                          shape="circle"
                          onClick={() => removeImage(index)}
                          icon={<DeleteOutlined />}
                          className="shadow-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-surface rounded-card p-6 sm:p-7 border border-border shadow-level-1 space-y-5">
            <div>
              <h2 className="text-base font-bold text-text-primary">
                Pricing & Discount
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Set product retail price and optional promotional discount
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                  PRODUCT PRICE ($)
                </label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  prefix={
                    <span className="font-bold text-text-secondary mr-1">
                      $
                    </span>
                  }
                  value={formData.price}
                  name="price"
                  onChange={handleChange}
                  className="py-2.5! px-3.5! bg-canvas! focus:bg-surface! text-sm! font-bold! text-text-primary! rounded-2xl! border-transparent! focus:border-primary!"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                  DISCOUNT (%)
                </label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0"
                  suffix={
                    <span className="font-bold text-text-secondary ml-1">
                      %
                    </span>
                  }
                  value={formData.discount}
                  name="discount"
                  onChange={handleChange}

                  className="py-2.5! px-3.5! bg-canvas! focus:bg-surface! text-sm! font-bold! text-text-primary! rounded-2xl! border-transparent! focus:border-primary!"
                />
              </div>
            </div>

            {formData.price > 0 && (
              <div className="p-4 rounded-2xl bg-canvas border border-border flex items-center justify-between text-xs">
                <span className="text-text-secondary font-medium">
                  Customer Final Price:
                </span>
                <div className="flex items-center gap-2">
                  {numDiscount > 0 && (
                    <span className="text-text-secondary line-through font-semibold">
                      ${numPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-sm font-extrabold text-primary">
                    ${discountedPrice}
                  </span>
                  {numDiscount > 0 && (
                    <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[11px] font-bold">
                      {numDiscount}% OFF
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="bg-surface rounded-card p-6 sm:p-7 border border-border shadow-level-1 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  Product Sizes & Stock
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  Configure sizes and track stock inventory units for each size
                </p>
              </div>

              <span className="text-xs font-bold text-text-primary bg-canvas px-3 py-1.5 rounded-full border border-border">
                Total Stock: {totalStock} units
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-canvas/60 border border-border space-y-3">
              <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block">
                ADD SIZE & STOCK
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-5">
                  <Input
                    placeholder="Size name (e.g. S, M, L, XL, Standard)"
                    value={newSizeName}
                    onChange={(e) => setNewSizeName(e.target.value)}
                    className="py-2! px-3! bg-surface! text-xs! font-semibold! text-text-primary! rounded-xl! border-border!"
                  />
                </div>

                <div className="sm:col-span-4">
                  <Input
                    type="number"
                    min="0"
                    placeholder="Stock quantity"
                    value={newSizeStock}
                    onChange={(e) => setNewSizeStock(e.target.value)}
                    className="py-2! px-3! bg-surface! text-xs! font-semibold! text-text-primary! rounded-xl! border-border!"
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
                  No sizes added yet. Add a size with stock above.
                </div>
              ) : (
                formData.details.sizes.map((item, index) => (
                  <div
                    key={index}
                    className="p-3.5 bg-canvas rounded-2xl border border-border flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-surface border border-border text-text-primary font-bold text-xs flex items-center justify-center">
                        {item.size.length <= 3
                          ? item.size
                          : item.size.substring(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold text-text-primary">
                          Size: {item.size}
                        </p>
                        <p className="text-[11px] text-text-secondary">
                          Available for purchase
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
                  Set material composition, color palette, and care instructions
                </p>
              </div>
              <span className="text-[11px] font-semibold text-text-secondary bg-canvas px-2.5 py-0.5 rounded-full">
                Specifications
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                  MATERIAL
                </label>
                <Input
                  placeholder="e.g. 100% Cotton, Walnut Wood, Genuine Leather"
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
                  placeholder="e.g. Matte Black, Sand Beige, Olive Green"
                  value={formData.details.color}
                  name="color"
                  onChange={handleDetailsChange}
                  className="py-2.5! px-4! bg-canvas! focus:bg-surface! text-xs! font-semibold! text-text-primary! rounded-2xl! border-transparent! focus:border-primary!"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                CARE & HANDLING INSTRUCTIONS
              </label>
              <Input.TextArea
                rows={4}
                placeholder="Write care, washing, or maintenance instructions (e.g. Machine wash cold with like colors. Do not bleach. Tumble dry low)..."
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
              <h3 className="text-sm font-bold text-text-primary">
                Product Highlights
              </h3>
              <span className="text-[11px] font-semibold text-text-secondary bg-canvas px-2.5 py-0.5 rounded-full">
                Badges
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
                    Trending
                  </p>
                  <p className="text-[11px] text-text-secondary">
                    Feature in Trending lists
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
                    Mark as New in catalog
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

            {categories.length === 0 && !loading ? (
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-dashed border-amber-300 text-center space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-base">
                  <AppstoreOutlined />
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-900 m-0">
                    No Categories Available
                  </p>
                  <p className="text-[11px] text-amber-700 mt-1 m-0">
                    You cannot publish products until at least one category is created.
                  </p>
                </div>
                <Link to="/admin/categories" className="inline-block pt-1">
                  <Button
                    type="primary"
                    size="small"
                    className="rounded-full! bg-[#5433eb]! text-white! text-xs! font-bold! py-1! px-4! h-auto!"
                  >
                    + Create Category Now
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
                      SELECT CATEGORY <span className="text-red-500">*</span>
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
                    loading={loading}
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
                    placeholder="Choose a product category..."
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
              Every product belongs to a specific category, automatically categorizing it under Men's, Women's, or Kids' collection in the storefront.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
