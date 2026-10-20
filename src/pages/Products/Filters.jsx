import React, { useState } from "react";
import { Slider, Switch, Button } from "antd";
import { UpOutlined, DownOutlined, ReloadOutlined } from "@ant-design/icons";

export default function Filters({
  isMobile = false,
  onClose,
  categories = [],
  selectedCategory = "All",
  onSelectCategory,
  selectedCollection = "",
  onSelectCollection,
  priceRange = [0, 500],
  onPriceChange,
  inStock = false,
  onInStockChange,
  onSale = false,
  onSaleChange,
  onReset,
}) {
  const [categoriesOpen, setCategoriesOpen] = useState(true);

  const COLLECTION_SECTIONS = [
    {
      key: "men",
      title: "Men's Collection",
      shortTitle: "Men",
      dotColor: "bg-[#5433eb]",
      tagBg: "bg-[#5433eb]/10",
      tagText: "text-[#5433eb]",
    },
    {
      key: "women",
      title: "Women's Collection",
      shortTitle: "Women",
      dotColor: "bg-rose-500",
      tagBg: "bg-rose-50",
      tagText: "text-rose-600",
    },
    {
      key: "kids",
      title: "Kids' Collection",
      shortTitle: "Kids",
      dotColor: "bg-amber-500",
      tagBg: "bg-amber-50",
      tagText: "text-amber-700",
    },
  ];

  const totalCount = categories.reduce(
    (sum, c) => sum + (Number(c.count) || 0),
    0,
  );

  const otherCategories = categories.filter(
    (c) =>
      !["men", "women", "kids"].includes(
        (c.categoryCollection || "").toLowerCase(),
      ),
  );

  return (
    <aside
      className={`bg-white! rounded-[24px]! sm:rounded-[28px]! border! border-border! p-5! sm:p-6! shadow-level-1! ${isMobile
          ? "w-full! border-0! sm:border! shadow-none! sm:shadow-level-1!"
          : "w-full! max-w-[290px]!"
        }`}
    >
      <div>
        <div
          onClick={() => setCategoriesOpen(!categoriesOpen)}
          className="flex! items-center! justify-between! mb-3.5! cursor-pointer!"
        >
          <div className="flex! items-center! gap-2!">
            <h3 className="text-[15px]! font-semibold! text-text-primary! tracking-tight! m-0!">
              Categories
            </h3>
            <span className="text-[10px]! font-semibold! px-2! py-0.5! rounded-full! bg-canvas! text-text-secondary!">
              By Collection
            </span>
          </div>
          {categoriesOpen ? (
            <UpOutlined className="text-[10px]! text-gray-400! hover:text-gray-600! transition-colors!" />
          ) : (
            <DownOutlined className="text-[10px]! text-gray-400! hover:text-gray-600! transition-colors!" />
          )}
        </div>

        {categoriesOpen && (
          <div className="flex! flex-col! gap-2! max-h-[380px]! overflow-y-auto! pr-1! no-scrollbar!">
            <div
              onClick={() => {
                onSelectCategory?.("All");
                if (selectedCollection && onSelectCollection) {
                  onSelectCollection("");
                }
              }}
              className={`flex! items-center! justify-between! px-3.5! py-2! rounded-full! cursor-pointer! transition-all! ${selectedCategory === "All" &&
                  (!selectedCollection || selectedCollection === "all")
                  ? "bg-[#1a1a1a]! text-white! font-semibold! text-xs! shadow-xs!"
                  : "text-gray-600! hover:text-gray-900! hover:bg-canvas! text-xs! font-medium!"
                }`}
            >
              <div className="flex! items-center! gap-2!">
                <span
                  className={`w-1.5! h-1.5! rounded-full! ${selectedCategory === "All" &&
                      (!selectedCollection || selectedCollection === "all")
                      ? "bg-white!"
                      : "bg-gray-300!"
                    }`}
                />
                <span>All Products</span>
              </div>
              <span
                className={`text-[11px]! px-2! py-0.5! rounded-full! shrink-0! ${selectedCategory === "All" &&
                    (!selectedCollection || selectedCollection === "all")
                    ? "bg-white/20! text-white! font-bold!"
                    : "text-gray-400!"
                  }`}
              >
                {totalCount}
              </span>
            </div>

            {COLLECTION_SECTIONS.map((sec) => {
              const secCategories = categories.filter(
                (c) => (c.categoryCollection || "").toLowerCase() === sec.key,
              );
              const isColActive = selectedCollection?.toLowerCase() === sec.key;
              const secTotalCount = secCategories.reduce(
                (sum, c) => sum + (Number(c.count) || 0),
                0,
              );

              return (
                <div
                  key={sec.key}
                  className="pt-2.5! pb-1! border-t! border-gray-100!"
                >
                  <div className="flex! items-center! justify-between! mb-1.5! px-1!">
                    <button
                      type="button"
                      onClick={() => onSelectCollection?.(sec.key)}
                      className="flex! items-center! gap-2! text-left! bg-transparent! border-0! cursor-pointer! p-0! group!"
                      title={`Filter by ${sec.title}`}
                    >
                      <span
                        className={`w-2! h-2! rounded-full! shrink-0! ${sec.dotColor}`}
                      />
                      <span className="text-[12px]! font-bold! uppercase! tracking-wider! text-gray-700! group-hover:text-[#5433eb]! transition-colors!">
                        {sec.title}
                      </span>
                      {isColActive && (
                        <span className="text-[9px]! font-bold! px-1.5! py-0.2! rounded-full! bg-[#5433eb]! text-white! uppercase! tracking-normal!">
                          Active
                        </span>
                      )}
                    </button>
                    <span className="text-[10px]! font-semibold! text-gray-400!">
                      {secTotalCount} items
                    </span>
                  </div>

                  <div className="flex! flex-col! gap-1! pl-2!">
                    {secCategories.length === 0 ? (
                      <div className="px-3! py-1! text-[11px]! text-gray-400! italic!">
                        No categories
                      </div>
                    ) : (
                      secCategories.map((cat) => {
                        const isCatActive =
                          selectedCategory.toLowerCase() ===
                          cat.name.toLowerCase();

                        return (
                          <div
                            key={cat._id || cat.name}
                            onClick={() =>
                              onSelectCategory?.(cat.name, sec.key)
                            }
                            className={`flex! items-center! justify-between! px-3! py-1.5! rounded-full! cursor-pointer! transition-all! ${isCatActive
                                ? "bg-[#eee9ff]! text-[#5433eb]! font-semibold! text-xs! shadow-xs!"
                                : "text-gray-600! hover:text-gray-900! hover:bg-canvas! text-xs! font-medium!"
                              }`}
                          >
                            <div className="flex! items-center! gap-2! truncate!">
                              <span
                                className={`w-1.5! h-1.5! rounded-full! shrink-0! ${isCatActive ? "bg-[#5433eb]!" : "bg-gray-300!"
                                  }`}
                              />
                              <span className="truncate! capitalize!">
                                {cat.name}
                              </span>
                            </div>
                            {cat.count !== undefined && (
                              <span
                                className={`text-[10px]! px-2! py-0.5! rounded-full! shrink-0! font-medium! ${isCatActive
                                    ? "bg-[#5433eb]/15! text-[#5433eb]! font-bold!"
                                    : "text-gray-400!"
                                  }`}
                              >
                                {cat.count}
                              </span>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}

            {otherCategories.length > 0 && (
              <div className="pt-2.5! pb-1! border-t! border-gray-100!">
                <div className="flex! items-center! justify-between! mb-1.5! px-1!">
                  <span className="text-[12px]! font-bold! uppercase! tracking-wider! text-gray-700!">
                    Other Categories
                  </span>
                </div>
                <div className="flex! flex-col! gap-1! pl-2!">
                  {otherCategories.map((cat) => {
                    const isCatActive =
                      selectedCategory.toLowerCase() === cat.name.toLowerCase();
                    return (
                      <div
                        key={cat._id || cat.name}
                        onClick={() => onSelectCategory?.(cat.name)}
                        className={`flex! items-center! justify-between! px-3! py-1.5! rounded-full! cursor-pointer! transition-all! ${isCatActive
                            ? "bg-[#eee9ff]! text-[#5433eb]! font-semibold! text-xs!"
                            : "text-gray-600! hover:text-gray-900! hover:bg-canvas! text-xs! font-medium!"
                          }`}
                      >
                        <div className="flex! items-center! gap-2! truncate!">
                          <span
                            className={`w-1.5! h-1.5! rounded-full! ${isCatActive ? "bg-[#5433eb]!" : "bg-gray-300!"
                              }`}
                          />
                          <span className="truncate! capitalize!">
                            {cat.name}
                          </span>
                        </div>
                        {cat.count !== undefined && (
                          <span className="text-[10px]! px-2! py-0.5! rounded-full! text-gray-400!">
                            {cat.count}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="h-[1px]! bg-[#f0f0f0]! my-5!" />

      <div>
        <div className="flex! items-center! justify-between! mb-2!">
          <h3 className="text-[15px]! font-semibold! text-text-primary! tracking-tight! m-0!">
            Price Range
          </h3>
          <span className="text-xs! font-semibold! text-[#5433eb]!">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>

        <div className="px-1! py-1!">
          <Slider
            range
            value={priceRange}
            onChange={(val) => onPriceChange?.(val)}
            min={0}
            max={500}
            className="custom-price-slider!"
            tooltip={{ open: false }}
          />
        </div>

        <div className="flex! items-center! justify-between! gap-3! mt-3!">
          <div className="flex-1! flex! items-center! bg-[#f7f8fa]! border! border-border! rounded-full! px-3! py-1.5! text-xs! text-gray-500!">
            <span>$</span>
            <span className="ml-1! text-text-primary! font-semibold!">
              {priceRange[0]}
            </span>
          </div>
          <div className="flex-1! flex! items-center! bg-[#f7f8fa]! border! border-border! rounded-full! px-3! py-1.5! text-xs! text-gray-500!">
            <span>$</span>
            <span className="ml-1! text-text-primary! font-semibold!">
              {priceRange[1]}
            </span>
          </div>
        </div>
      </div>

      <div className="h-[1px]! bg-[#f0f0f0]! my-5!" />

      <div>
        <div className="flex! items-center! justify-between! mb-3.5!">
          <h3 className="text-[15px]! font-semibold! text-text-primary! tracking-tight! m-0!">
            Availability & Deals
          </h3>
        </div>

        <div className="flex! flex-col! gap-3!">
          <div className="flex! items-center! justify-between!">
            <span className="text-xs! font-medium! text-gray-700!">
              In Stock Only
            </span>
            <Switch
              checked={inStock}
              onChange={(checked) => onInStockChange?.(checked)}
              size="small"
              style={{ backgroundColor: inStock ? "#5433eb" : "#d1d5db" }}
            />
          </div>

          <div className="flex! items-center! justify-between!">
            <span className="text-xs! font-medium! text-gray-700!">
              On Sale
            </span>
            <Switch
              checked={onSale}
              onChange={(checked) => onSaleChange?.(checked)}
              size="small"
              style={{ backgroundColor: onSale ? "#5433eb" : "#d1d5db" }}
            />
          </div>
        </div>
      </div>

      <div className="mt-5! pt-4! border-t! border-gray-100!">
        <button
          type="button"
          onClick={onReset}
          className="w-full! flex! items-center! justify-center! gap-1.5! py-2! text-xs! font-semibold! text-gray-500! hover:text-[#5433eb]! bg-canvas! hover:bg-[#eee9ff]! rounded-full! transition-colors! cursor-pointer! border-0!"
        >
          <ReloadOutlined className="text-[11px]!" /> Reset Filters
        </button>
      </div>

      {isMobile && (
        <div className="flex! items-center! gap-3! mt-4! pt-4! border-t! border-border!">
          <Button
            type="primary"
            onClick={onClose}
            className="w-full! rounded-full! bg-primary! hover:bg-primary/90! text-white! shadow-violet-glow! text-xs! font-semibold! h-10! border-0!"
          >
            Apply Filters
          </Button>
        </div>
      )}
    </aside>
  );
}
