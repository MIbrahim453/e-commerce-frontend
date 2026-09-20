import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import ProductGallery from './ProductGallery'
import ProductInfo from './ProductInfo'
import ProductSpecs from './ProductSpecs'
import SimilarProducts from './SimilarProducts'

export default function ProductDetailPage() {
  const navigate = useNavigate()

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
          <div className="lg:col-span-7!">
            <ProductGallery />
          </div>

          <div className="lg:col-span-5!">
            <ProductInfo />
          </div>
        </div>

        <div className="pt-2!">
          <ProductSpecs />
        </div>

        <div className="pt-2!">
          <SimilarProducts />
        </div>
      </div>
    </div>
  )
}
