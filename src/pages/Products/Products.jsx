import React from 'react'
import { Link } from 'react-router-dom'
import {
  HeartOutlined,
  StarFilled,
  ArrowRightOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons'

import headphonesImg from '../../assets/images/headphones.jpg'
import carafeImg from '../../assets/images/carafe.jpg'
import lampImg from '../../assets/images/lamp.jpg'
import keyboardImg from '../../assets/images/keyboard.jpg'
import linenImg from '../../assets/images/category_decor.jpg'
import dutchOvenImg from '../../assets/images/category_kitchen.jpg'
import tumblerImg from '../../assets/images/category_tech.jpg'
import valetTrayImg from '../../assets/images/category_workspace.jpg'

const productsData = [
  {
    id: 1,
    title: 'Noise-Cancelling Over-Ear Stud...',
    category: 'Studio Audio',
    brand: 'AETHER STUDIO',
    rating: '4.9',
    reviews: '123',
    specs: 'Obsidian Black • Custom 40mm Driver',
    price: '$290.00',
    originalPrice: '$360.00',
    discount: '-20%',
    image: headphonesImg,
  },
  {
    id: 2,
    title: 'Nordic Ceramic Pour-Over Carafe',
    category: 'Artisan Ceramics',
    brand: 'CHALK LABS',
    rating: '4.8',
    reviews: '94',
    specs: 'Chalk White • 650ml Stoneware',
    price: '$42.00',
    originalPrice: '$56.00',
    discount: '-25%',
    image: carafeImg,
  },
  {
    id: 3,
    title: 'Sculptural Matte Terracotta Tabl...',
    category: 'Lighting & Glow',
    brand: 'MOKU CRAFT',
    rating: '5.0',
    reviews: '62',
    specs: 'Sand Dune • Dimmable LED Base',
    price: '$115.00',
    originalPrice: '$150.00',
    discount: null,
    image: lampImg,
  },
  {
    id: 4,
    title: 'Linear Aluminum Mechanical...',
    category: 'Workspace Goods',
    brand: 'OBSIDIAN CO.',
    rating: '4.9',
    reviews: '67',
    specs: 'Studio Silver • Gasket Mounted',
    price: '$180.00',
    originalPrice: '$240.00',
    discount: null,
    image: keyboardImg,
  },
  {
    id: 5,
    title: 'Organic Washed Linen Bedding...',
    category: 'Living & Bedding',
    brand: 'NORDIC GOODS',
    rating: '4.7',
    reviews: '115',
    specs: 'Natural Flax • Pure French Flax',
    price: '$195.00',
    originalPrice: '$230.00',
    discount: null,
    image: linenImg,
  },
  {
    id: 6,
    title: 'Cast Iron Enameled Dutch Oven...',
    category: 'Culinary Objects',
    brand: 'CHALK LABS',
    rating: '4.9',
    reviews: '89',
    specs: 'Forest Enamel • Hand-cast Iron',
    price: '$145.00',
    originalPrice: '$180.00',
    discount: '-20%',
    image: dutchOvenImg,
  },
  {
    id: 7,
    title: 'Insulated Japanese Travel...',
    category: 'Everyday Carry',
    brand: 'MOKU CRAFT',
    rating: '4.8',
    reviews: '104',
    specs: 'Raw Steel • 500ml Ergonomic',
    price: '$38.00',
    originalPrice: '$48.00',
    discount: null,
    image: tumblerImg,
  },
  {
    id: 8,
    title: 'Botanical Hand & Body Wash...',
    category: 'Care & Ritual',
    brand: 'AETHER STUDIO',
    rating: '4.9',
    reviews: '210',
    specs: 'Cedar & Vetiver • Essential Oils',
    price: '$34.00',
    originalPrice: null,
    discount: null,
    image: null,
  },
  {
    id: 9,
    title: 'Wireless Charging Valet Tray',
    category: 'Workspace Goods',
    brand: 'OBSIDIAN CO.',
    rating: '4.8',
    reviews: '73',
    specs: 'Milled Walnut • Dual 15W Qi Fast',
    price: '$88.00',
    originalPrice: '$110.00',
    discount: '-20%',
    image: valetTrayImg,
  },
]

export default function Products() {
  return (
    <div className="flex-1! flex! flex-col! justify-between!">
      <div className="grid! grid-cols-1! sm:grid-cols-2! lg:grid-cols-3! gap-5! sm:gap-6!">
        {productsData.map((product) => (
          <div
            key={product.id}
            className="bg-white! rounded-[24px]! border! border-[#ebebeb]! p-3! hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]! hover:border-gray-300! transition-all! duration-300! flex! flex-col! justify-between! group!"
          >
            <div className="relative! w-full! aspect-[4/3]! rounded-[18px]! overflow-hidden! bg-[#f5f6f8]! flex! items-center! justify-center!">
              {product.discount && (
                <span className="absolute! top-2.5! left-2.5! z-10! px-2.5! py-0.5! rounded-full! bg-[#eee9ff]/90! backdrop-blur-sm! text-[#5433eb]! font-semibold! text-[11px]! tracking-tight! shadow-xs!">
                  {product.discount}
                </span>
              )}

              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full! h-full! object-cover! group-hover:scale-105! transition-transform! duration-500!"
                />
              ) : (
                <div className="w-full! h-full! bg-gradient-to-br! from-[#f8f9fa]! to-[#edeef2]! flex! flex-col! items-center! justify-center! p-4! text-center! select-none! group-hover:scale-102! transition-transform! duration-500!">
                  <div className="w-12! h-12! rounded-2xl! bg-white! shadow-xs! border! border-gray-100! flex! items-center! justify-center! mb-2! text-[#5433eb]!">
                    <svg
                      className="w-6! h-6!"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <span className="text-[11px]! font-semibold! text-gray-700! tracking-wide!">
                    Botanical Elixir
                  </span>
                  <span className="text-[10px]! text-gray-400!">Minimal Edition</span>
                </div>
              )}

              <div className="absolute! bottom-2.5! left-2.5! z-10! px-2.5! py-1! rounded-full! bg-white/90! backdrop-blur-sm! text-[11px]! font-medium! text-gray-700! shadow-xs!">
                {product.category}
              </div>
            </div>

            <div className="pt-3! px-1!">
              <div className="flex! items-center! justify-between! text-[11px]! mb-1!">
                <span className="font-bold! text-gray-400! tracking-wider! uppercase! text-[10px]!">
                  {product.brand}
                </span>
                <div className="flex! items-center! gap-1! font-semibold! text-gray-700!">
                  <StarFilled className="text-[#f59e0b]! text-[10px]!" />
                  <span>{product.rating}</span>
                  <span className="text-gray-400! font-normal!">({product.reviews})</span>
                </div>
              </div>

              <Link to="/product" className="block! no-underline!">
                <h4 className="font-bold! text-[#1a1a1a]! text-[13.5px]! leading-snug! tracking-tight! truncate! hover:text-[#5433eb]! transition-colors! mb-0.5!">
                  {product.title}
                </h4>
              </Link>

              <div className="flex! items-center! justify-between! pt-1! border-t! border-gray-100/80!">
                <div className="flex! items-baseline! gap-1.5!">
                  <span className="font-bold! text-[#1a1a1a]! text-[15px]!">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[12px]! text-gray-400! line-through!">
                      {product.originalPrice}
                    </span>
                  )}
                </div>

                <Link
                  to="/product"
                  className="w-8! h-8! rounded-full! bg-[#5433eb]! hover:bg-[#4324d4]! text-white! flex! items-center! justify-center! shadow-[0_4px_14px_rgba(84,51,235,0.35)]! transition-all! active:scale-95! cursor-pointer! border-0!"
                  aria-label="View product"
                >
                  <ArrowRightOutlined className="text-[12px]!" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex! flex-col! sm:flex-row! items-center! justify-between! gap-4! mt-8! sm:mt-12! pt-6! border-t! border-gray-200/60!">
        <p className="text-xs! text-gray-500! order-2! sm:order-1!">
          Showing <span className="font-semibold! text-gray-800!">1-9</span> of{' '}
          <span className="font-semibold! text-gray-800!">128</span> items
        </p>

        <div className="flex! items-center! gap-1.5! order-1! sm:order-2! bg-white! px-3! py-1.5! rounded-full! border! border-gray-200/80! shadow-xs!">
          <button
            type="button"
            className="flex! items-center! gap-1! px-2.5! py-1! text-xs! text-gray-500! hover:text-gray-900! cursor-pointer! transition-colors! bg-transparent! border-0!"
          >
            <LeftOutlined className="text-[9px]!" />
            <span>Prev</span>
          </button>

          <button
            type="button"
            className="w-7! h-7! rounded-full! bg-[#5433eb]! text-white! text-xs! font-semibold! flex! items-center! justify-center! shadow-xs! cursor-pointer! border-0!"
          >
            1
          </button>
          <button
            type="button"
            className="w-7! h-7! rounded-full! text-gray-600! hover:bg-gray-100! text-xs! font-medium! flex! items-center! justify-center! cursor-pointer! transition-colors! bg-transparent! border-0!"
          >
            2
          </button>
          <button
            type="button"
            className="w-7! h-7! rounded-full! text-gray-600! hover:bg-gray-100! text-xs! font-medium! flex! items-center! justify-center! cursor-pointer! transition-colors! bg-transparent! border-0!"
          >
            3
          </button>
          <span className="px-1! text-gray-400! text-xs!">—</span>
          <button
            type="button"
            className="w-7! h-7! rounded-full! text-gray-600! hover:bg-gray-100! text-xs! font-medium! flex! items-center! justify-center! cursor-pointer! transition-colors! bg-transparent! border-0!"
          >
            12
          </button>

          <button
            type="button"
            className="flex! items-center! gap-1! px-2.5! py-1! text-xs! text-gray-600! hover:text-gray-900! cursor-pointer! transition-colors! bg-transparent! border-0!"
          >
            <span>Next</span>
            <RightOutlined className="text-[9px]!" />
          </button>
        </div>
      </div>
    </div>
  )
}
