import React, { useState } from 'react'
import { Drawer } from 'antd'
import {
  FilterOutlined,
  CloseOutlined,
  DownOutlined,
  UpOutlined
} from '@ant-design/icons'
import Filters from './Filters'
import Products from './Products'
import SearchBar from '../../components/SearchBar'

const mobileCategories = [
  { name: 'All Products', count: 128 },
  { name: 'Audio & Sound', count: 24 },
  { name: 'Ceramics & Tableware', count: 19 },
  { name: 'Lighting & Ambiance', count: 18 },
  { name: 'Living & Bedding', count: 24 },
  { name: 'Workspace Goods', count: 22 },
]

export default function ProductsPage() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [selectedMobileCategory, setSelectedMobileCategory] = useState('All Products')
  const [showInlineMobileFilters, setShowInlineMobileFilters] = useState(false)

  return (
    <div className="min-h-screen! bg-canvas! py-6! sm:py-8! md:py-10!">
      <div className="max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8!">
        <div className="w-full! mb-5! sm:mb-7!">
          <SearchBar />
        </div>

        <div className="lg:hidden! mb-4! flex! items-center! gap-2! overflow-x-auto! pb-2! no-scrollbar!">
          {mobileCategories.map((cat) => {
            const isActive = selectedMobileCategory === cat.name
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => setSelectedMobileCategory(cat.name)}
                className={`rounded-full! px-4! py-2! text-xs! font-semibold! tracking-[-0.02em]! whitespace-nowrap! shrink-0! transition-all! cursor-pointer! border! flex! items-center! gap-2! ${isActive
                    ? 'bg-[#1a1a1a]! text-white! border-transparent! shadow-xs!'
                    : 'bg-white! text-text-primary! border-border! hover:bg-canvas!'
                  }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px]! px-1.5! py-0.5! rounded-full! font-bold! ${isActive ? 'bg-white/20! text-white!' : 'bg-canvas! text-text-secondary!'
                    }`}
                >
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="lg:hidden! mb-5! flex! items-center! justify-between! bg-white! px-4! py-3! rounded-[20px]! border! border-border! shadow-level-1!">
          <div className="flex! items-center! gap-2!">
            <span className="text-xs! text-text-secondary! font-medium!">
              128 items found
            </span>
          </div>

          <div className="flex! items-center! gap-2!">
            <button
              type="button"
              onClick={() => setShowInlineMobileFilters(!showInlineMobileFilters)}
              className={`flex! items-center! gap-1.5! px-3.5! py-1.5! text-xs! font-semibold! rounded-full! transition-all! cursor-pointer! border! ${showInlineMobileFilters
                  ? 'bg-[#5433eb]! text-white! border-[#5433eb]! shadow-violet-glow!'
                  : 'bg-[#eee9ff]! text-[#5433eb]! border-transparent! hover:bg-[#e4dfff]!'
                }`}
            >
              <FilterOutlined />
              <span>Filters</span>
              {showInlineMobileFilters ? (
                <UpOutlined className="text-[10px]!" />
              ) : (
                <DownOutlined className="text-[10px]!" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              title="Open full filter sheet"
              className="w-8! h-8! rounded-full! bg-canvas! hover:bg-gray-200! text-text-primary! flex! items-center! justify-center! border-0! cursor-pointer! transition-colors!"
            >
              <FilterOutlined className="text-xs!" />
            </button>
          </div>
        </div>

        {showInlineMobileFilters && (
          <div className="lg:hidden! mb-6! transition-all! duration-300!">
            <div className="bg-white! rounded-[24px]! p-4! border! border-border! shadow-level-1!">
              <div className="flex! items-center! justify-between! mb-3! pb-2! border-b! border-border!">
                <span className="text-sm! font-semibold! text-text-primary!">Filter Options</span>
                <button
                  type="button"
                  onClick={() => setShowInlineMobileFilters(false)}
                  className="text-xs! text-text-secondary! hover:text-text-primary! bg-transparent! border-0! cursor-pointer!"
                >
                  Close
                </button>
              </div>
              <Filters isMobile={true} onClose={() => setShowInlineMobileFilters(false)} />
            </div>
          </div>
        )}

        <div className="flex! flex-col! lg:flex-row! items-start! gap-6! lg:gap-8!">
          <div className="hidden! lg:block! w-[280px]! shrink-0!">
            <Filters />
          </div>

          <main className="w-full! flex-1!">
            <Products />
          </main>
        </div>

        <Drawer
          title={
            <div className="flex! items-center! justify-between! w-full!">
              <span className="font-semibold! text-base! text-text-primary!">Filter & Refine Products</span>
            </div>
          }
          placement="left"
          onClose={() => setMobileFilterOpen(false)}
          open={mobileFilterOpen}
          width={320}
          styles={{ body: { padding: '16px' } }}
          closeIcon={<CloseOutlined className="text-text-primary!" />}
        >
          <Filters isMobile={true} onClose={() => setMobileFilterOpen(false)} />
        </Drawer>
      </div>
    </div>
  )
}
