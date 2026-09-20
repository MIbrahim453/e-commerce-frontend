import React from 'react'
import { Link } from 'react-router-dom'
import { LeftOutlined, RightOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons'
import lampImg from '../../assets/images/lamp.jpg'
import categoryTechImg from '../../assets/images/category_tech.jpg'
import categoryWorkspaceImg from '../../assets/images/category_workspace.jpg'
import keyboardImg from '../../assets/images/keyboard.jpg'

const similarItems = [
  {
    id: 1,
    category: 'Audio Accessories',
    title: 'Sculpted Walnut Headphone Stand',
    price: '$85.00',
    image: lampImg,
  },
  {
    id: 2,
    category: 'Studio Hardware',
    title: 'Pocket High-Res USB-C DAC Amp',
    price: '$120.00',
    image: categoryTechImg,
  },
  {
    id: 3,
    category: 'Replacements',
    title: 'Perforated Lambskin Ear Pads',
    price: '$45.00',
    image: categoryWorkspaceImg,
  },
  {
    id: 4,
    category: 'Cables & Power',
    title: 'Reinforced Braided USB-C Cable (2m)',
    price: '$28.00',
    image: keyboardImg,
  },
]

export default function SimilarProducts() {
  return (
    <div className="flex! flex-col! gap-5!">
      <div className="flex! items-end! justify-between!">
        <div>
          <span className="text-[11px]! font-bold! tracking-wider! uppercase! text-gray-400! block! mb-1!">
            Curated Selections
          </span>
          <h2 className="text-xl! sm:text-2xl! font-bold! text-[#1a1a1a]! tracking-tight! m-0!">
            Similar Products
          </h2>
        </div>

        <div className="flex! items-center! gap-2!">
          <button
            type="button"
            className="w-8! h-8! sm:w-9! sm:h-9! rounded-full! bg-white! border! border-[#ebebeb]! flex! items-center! justify-center! text-gray-600! hover:bg-gray-50! transition-colors! cursor-pointer! shadow-xs!"
            aria-label="Previous items"
          >
            <LeftOutlined className="text-[10px]!" />
          </button>
          <button
            type="button"
            className="w-8! h-8! sm:w-9! sm:h-9! rounded-full! bg-white! border! border-[#ebebeb]! flex! items-center! justify-center! text-gray-600! hover:bg-gray-50! transition-colors! cursor-pointer! shadow-xs!"
            aria-label="Next items"
          >
            <RightOutlined className="text-[10px]!" />
          </button>
        </div>
      </div>

      <div className="grid! grid-cols-1! sm:grid-cols-2! lg:grid-cols-4! gap-5!">
        {similarItems.map((item) => (
          <div
            key={item.id}
            className="bg-white! rounded-[24px]! border! border-[#ebebeb]! p-3.5! hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]! transition-all! duration-300! flex! flex-col! justify-between! group!"
          >
            <div>
              <Link to="/product" className="block! relative! w-full! aspect-[4/3]! rounded-[18px]! overflow-hidden! bg-[#f5f6f8]! flex! items-center! justify-center! mb-3!">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full! h-full! object-cover! group-hover:scale-105! transition-transform! duration-500!"
                />
              </Link>

              <span className="text-[10px]! font-bold! tracking-wider! uppercase! text-gray-400! block! mb-0.5!">
                {item.category}
              </span>

              <Link to="/product" className="block! no-underline!">
                <h4 className="text-[13px]! font-bold! text-[#1a1a1a]! leading-snug! line-clamp-1! hover:text-[#5433eb]! transition-colors! mb-1!">
                  {item.title}
                </h4>
              </Link>

              <span className="text-sm! font-bold! text-[#1a1a1a]! block!">
                {item.price}
              </span>
            </div>

            <div className="flex! flex-col! gap-2! pt-3! mt-3! border-t! border-gray-100!">
              <Link
                to="/product"
                className="w-full! py-2! rounded-full! bg-white! hover:bg-gray-50! hover:border-[#5433eb]/40! text-[#1a1a1a]! text-xs! font-semibold! flex! items-center! justify-center! gap-1.5! transition-colors! cursor-pointer! border! border-[#ebebeb]! shadow-2xs! no-underline!"
              >
                <EyeOutlined className="text-[12px]!" />
                <span>View Product</span>
              </Link>

              <button
                type="button"
                className="w-full! py-2! rounded-full! bg-[#f7f8fa]! hover:bg-[#eee9ff]! hover:text-[#5433eb]! text-gray-700! text-xs! font-semibold! flex! items-center! justify-center! gap-1.5! transition-colors! cursor-pointer! border! border-[#ebebeb]!"
              >
                <PlusOutlined className="text-[10px]!" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
