import React, { useState } from 'react'
import { Slider, Switch, Button } from 'antd'
import {
  UpOutlined,
  DownOutlined,
  StarFilled,
  ReloadOutlined
} from '@ant-design/icons'

const categories = [
  { name: 'Audio & Sound', count: 24, active: true },
  { name: 'Ceramics & Tableware', count: 19, active: false },
  { name: 'Lighting & Ambiance', count: 18, active: false },
  { name: 'Living & Bedding', count: 24, active: false },
  { name: 'Workspace Goods', count: 22, active: false },
]

const ratings = [
  { stars: 4, label: '& Up', count: 164, active: true },
  { stars: 3, label: '& Up', count: 112, active: false },
]

export default function Filters({ isMobile = false, onClose }) {
  const [selectedCat, setSelectedCat] = useState('Audio & Sound')
  const [inStock, setInStock] = useState(true)
  const [onSale, setOnSale] = useState(false)
  const [priceRange, setPriceRange] = useState([50, 350])
  const [categoriesOpen, setCategoriesOpen] = useState(true)

  const handleReset = () => {
    setSelectedCat('Audio & Sound')
    setInStock(true)
    setOnSale(false)
    setPriceRange([50, 350])
  }

  return (
    <aside
      className={`bg-white! rounded-[24px]! sm:rounded-[28px]! border! border-border! p-5! sm:p-6! shadow-level-1! ${isMobile ? 'w-full! border-0! sm:border! shadow-none! sm:shadow-level-1!' : 'w-full! max-w-[290px]!'
        }`}
    >
      <div>
        <div
          onClick={() => setCategoriesOpen(!categoriesOpen)}
          className="flex! items-center! justify-between! mb-3.5! cursor-pointer!"
        >
          <h3 className="text-[15px]! font-semibold! text-text-primary! tracking-tight! m-0!">
            Categories
          </h3>
          {categoriesOpen ? (
            <UpOutlined className="text-[10px]! text-gray-400! hover:text-gray-600! transition-colors!" />
          ) : (
            <DownOutlined className="text-[10px]! text-gray-400! hover:text-gray-600! transition-colors!" />
          )}
        </div>

        {categoriesOpen && (
          <div className="flex! flex-col! gap-1.5!">
            {categories.map((cat) => {
              const isActive = selectedCat === cat.name
              return (
                <div
                  key={cat.name}
                  onClick={() => setSelectedCat(cat.name)}
                  className={`flex! items-center! justify-between! px-3.5! py-2! rounded-full! cursor-pointer! transition-all! ${isActive
                      ? 'bg-[#eee9ff]! text-[#5433eb]! font-semibold! text-xs!'
                      : 'text-gray-600! hover:text-gray-900! hover:bg-canvas! text-xs! font-medium!'
                    }`}
                >
                  <div className="flex! items-center! gap-2!">
                    <span
                      className={`w-1.5! h-1.5! rounded-full! ${isActive ? 'bg-[#5433eb]!' : 'bg-gray-300!'
                        }`}
                    />
                    <span>{cat.name}</span>
                  </div>
                  <span
                    className={`text-[11px]! px-2! py-0.5! rounded-full! ${isActive
                        ? 'bg-[#5433eb]/15! text-[#5433eb]! font-semibold!'
                        : 'text-gray-400!'
                      }`}
                  >
                    {cat.count}
                  </span>
                </div>
              )
            })}
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
            onChange={(val) => setPriceRange(val)}
            min={0}
            max={500}
            className="custom-price-slider!"
            tooltip={{ open: false }}
          />
        </div>

        <div className="flex! items-center! justify-between! gap-3! mt-3!">
          <div className="flex-1! flex! items-center! bg-[#f7f8fa]! border! border-border! rounded-full! px-3! py-1.5! text-xs! text-gray-500!">
            <span>$</span>
            <span className="ml-1! text-text-primary! font-semibold!">{priceRange[0]}</span>
          </div>
          <div className="flex-1! flex! items-center! bg-[#f7f8fa]! border! border-border! rounded-full! px-3! py-1.5! text-xs! text-gray-500!">
            <span>$</span>
            <span className="ml-1! text-text-primary! font-semibold!">{priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div className="h-[1px]! bg-[#f0f0f0]! my-5!" />

      <div>
        <div className="flex! items-center! justify-between! mb-3!">
          <h3 className="text-[15px]! font-semibold! text-text-primary! tracking-tight! m-0!">
            Customer Rating
          </h3>
        </div>

        <div className="flex! flex-col! gap-1.5!">
          {ratings.map((rate) => (
            <div
              key={rate.stars}
              className="flex! items-center! justify-between! px-3.5! py-1.5! rounded-full! hover:bg-canvas! cursor-pointer! text-xs! transition-colors!"
            >
              <div className="flex! items-center! gap-1.5!">
                <div className="flex! items-center! text-[#f59e0b]!">
                  {[...Array(rate.stars)].map((_, i) => (
                    <StarFilled key={i} className="text-[11px]!" />
                  ))}
                </div>
                <span className="text-gray-700! font-medium!">{rate.label}</span>
              </div>
              <span className="text-[11px]! text-gray-400!">{rate.count}</span>
            </div>
          ))}
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
            <span className="text-xs! font-medium! text-gray-700!">In Stock Only</span>
            <Switch
              checked={inStock}
              onChange={(checked) => setInStock(checked)}
              size="small"
              style={{ backgroundColor: inStock ? '#5433eb' : '#d1d5db' }}
            />
          </div>

          <div className="flex! items-center! justify-between!">
            <span className="text-xs! font-medium! text-gray-700!">On Sale</span>
            <Switch
              checked={onSale}
              onChange={(checked) => setOnSale(checked)}
              size="small"
              style={{ backgroundColor: onSale ? '#5433eb' : '#d1d5db' }}
            />
          </div>
        </div>
      </div>

      {isMobile && (
        <div className="flex! items-center! gap-3! mt-6! pt-5! border-t! border-border!">
          <Button
            type="text"
            onClick={handleReset}
            className="rounded-full! text-text-secondary! hover:text-text-primary! hover:bg-canvas! text-xs! font-semibold! px-4! h-10! flex-1!"
          >
            <ReloadOutlined className="text-xs!" /> Reset
          </Button>
          <Button
            type="primary"
            onClick={onClose}
            className="rounded-full! bg-primary! hover:bg-primary/90! text-white! shadow-violet-glow! text-xs! font-semibold! px-6! h-10! flex-2! border-0!"
          >
            Apply Filters
          </Button>
        </div>
      )}
    </aside>
  )
}
