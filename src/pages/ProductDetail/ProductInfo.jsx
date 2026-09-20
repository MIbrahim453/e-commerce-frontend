import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  StarFilled,
  ShoppingOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  SyncOutlined,
  CarOutlined
} from '@ant-design/icons'

export default function ProductInfo() {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="bg-white! rounded-[28px]! border! border-[#ebebeb]! p-6! sm:p-8! shadow-[0_4px_24px_rgba(0,0,0,0.03)]! flex! flex-col! gap-5!">
      <h1 className="text-2xl! sm:text-3xl! font-bold! text-[#1a1a1a]! leading-tight! tracking-tight! m-0!">
        Noise-Cancelling Over-Ear Studio Headphones
      </h1>

      <p className="text-xs! sm:text-sm! text-gray-500! leading-relaxed! m-0!">
        Engineered with proprietary 40mm acoustic drivers for uncompromising clarity, active sound isolation, and refined ergonomics.
      </p>

      <div className="flex! items-center! gap-2!">
        <div className="flex! items-center! text-[#f59e0b]! text-sm! gap-0.5!">
          <StarFilled />
          <StarFilled />
          <StarFilled />
          <StarFilled />
          <StarFilled />
        </div>
        <span className="text-xs! font-bold! text-[#1a1a1a]!">4.9</span>
        <span className="text-xs! text-gray-400! font-normal!">(123)</span>
      </div>

      <div className="flex! items-center! gap-3! pt-1!">
        <span className="text-2xl! sm:text-3xl! font-extrabold! text-[#1a1a1a]! tracking-tight!">
          $290.00
        </span>
        <span className="text-base! sm:text-lg! text-gray-400! line-through! font-normal!">
          $360.00
        </span>
        <span className="px-2.5! py-1! rounded-full! bg-[#eee9ff]! text-[#5433eb]! text-xs! font-bold! tracking-tight!">
          -20% OFF
        </span>
      </div>

      <div className="h-[1px]! bg-[#f0f0f0]! my-1!" />

      <div className="flex! items-center! justify-between! gap-4!">
        <div className="inline-flex! items-center! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! p-1!">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-8! h-8! rounded-full! bg-white! text-gray-700! hover:bg-gray-100! flex! items-center! justify-center! text-sm! font-semibold! transition-colors! cursor-pointer! border! border-gray-200/60! shadow-xs!"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="w-10! text-center! font-bold! text-[#1a1a1a]! text-sm!">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-8! h-8! rounded-full! bg-white! text-gray-700! hover:bg-gray-100! flex! items-center! justify-center! text-sm! font-semibold! transition-colors! cursor-pointer! border! border-gray-200/60! shadow-xs!"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className="flex! items-center! gap-1.5! text-xs! font-medium! text-[#d97706]!">
          <span className="w-2! h-2! rounded-full! bg-[#d97706]! animate-pulse!" />
          <span>Only 4 units left at this price</span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="w-full! h-12! sm:h-14! rounded-full! bg-[#5433eb]! hover:bg-[#4324d4]! text-white! font-semibold! text-sm! sm:text-base! flex! items-center! justify-center! gap-2! shadow-[0_6px_24px_rgba(84,51,235,0.35)]! transition-all! active:scale-98! cursor-pointer! border-0! no-underline!"
      >
        <ShoppingOutlined className="text-base! sm:text-lg!" />
        <span>Add to Cart — $290.00</span>
      </Link>

      <Link
        to="/checkout"
        className="w-full! h-11! sm:h-12! rounded-full! bg-[#f7f8fa]! hover:bg-[#eeeff2]! text-[#1a1a1a]! font-semibold! text-xs! sm:text-sm! flex! items-center! justify-center! gap-2! border! border-[#e5e7eb]! transition-colors! active:scale-98! cursor-pointer! no-underline!"
      >
        <ThunderboltOutlined className="text-sm! text-gray-600!" />
        <span>Instant 1-Click Checkout</span>
      </Link>

      <div className="grid! grid-cols-1! sm:grid-cols-2! gap-2.5! pt-3! border-t! border-[#f0f0f0]!">
        <div className="flex! items-center! gap-2! text-[11px]! text-gray-500! font-medium!">
          <CarOutlined className="text-[#5433eb]! text-xs!" />
          <span>Complementary 2-day delivery</span>
        </div>
        <div className="flex! items-center! gap-2! text-[11px]! text-gray-500! font-medium!">
          <SyncOutlined className="text-[#5433eb]! text-xs!" />
          <span>30-day home trial, free returns</span>
        </div>
        <div className="flex! items-center! gap-2! text-[11px]! text-gray-500! font-medium!">
          <SafetyCertificateOutlined className="text-[#5433eb]! text-xs!" />
          <span>2-year studio warranty</span>
        </div>
        <div className="flex! items-center! gap-2! text-[11px]! text-gray-500! font-medium!">
          <CheckCircleOutlined className="text-[#5433eb]! text-xs!" />
          <span>Carbon neutral certified</span>
        </div>
      </div>
    </div>
  )
}
