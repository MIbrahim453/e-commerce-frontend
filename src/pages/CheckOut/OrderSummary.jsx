import React from 'react'
import {
  CarOutlined,
  ArrowRightOutlined,
  SafetyCertificateOutlined,
  SyncOutlined,
  SmileOutlined,
  CommentOutlined
} from '@ant-design/icons'
import headphonesImg from '../../assets/images/headphones.jpg'
import lampImg from '../../assets/images/lamp.jpg'

const orderItems = [
  {
    id: 1,
    title: 'Aether Studio Head...',
    specs: 'Obsidian Black • 40mm H...',
    badge: 'In Stock',
    badgeColor: 'text-emerald-700! bg-emerald-50!',
    price: '$290.00',
    originalPrice: '$360.00',
    image: headphonesImg,
  },
  {
    id: 2,
    title: 'Sculpted Walnut Stand',
    specs: 'American Walnut • Oiled',
    badge: 'Crafted to Order',
    badgeColor: 'text-amber-700! bg-amber-50!',
    price: '$85.00',
    originalPrice: null,
    image: lampImg,
  },
]

export default function OrderSummary() {
  return (
    <div className="flex! flex-col! gap-4!">
      {/* Main Order Summary Card */}
      <div className="bg-white! rounded-[28px]! border! border-[#ebebeb]! p-5! sm:p-7! shadow-[0_4px_24px_rgba(0,0,0,0.03)]! flex! flex-col! gap-5!">

        {/* Header */}
        <div className="flex! items-center! justify-between! border-b! border-[#f0f0f0]! pb-4!">
          <h3 className="text-base! sm:text-lg! font-bold! text-[#1a1a1a]! m-0!">
            Order Summary
          </h3>
          <span className="text-[11px]! font-semibold! text-gray-500! bg-gray-100! px-2.5! py-0.5! rounded-full!">
            2 Items
          </span>
        </div>

        {/* Product Items List */}
        <div className="flex! flex-col! gap-4!">
          {orderItems.map((item) => (
            <div key={item.id} className="flex! items-center! gap-3.5!">
              {/* Product Thumbnail */}
              <div className="w-14! h-14! sm:w-16! sm:h-16! rounded-2xl! overflow-hidden! bg-[#f6f6f7]! border! border-[#ebebeb]! shrink-0! flex! items-center! justify-center! p-1!">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full! h-full! object-cover! rounded-xl!"
                />
              </div>

              {/* Item Info */}
              <div className="flex-1! min-w-0!">
                <h4 className="text-xs! sm:text-[13px]! font-bold! text-[#1a1a1a]! truncate! m-0! mb-0.5!">
                  {item.title}
                </h4>
              </div>

              {/* Item Price */}
              <div className="text-right! shrink-0!">
                <span className="text-xs! sm:text-sm! font-bold! text-[#1a1a1a]! block!">
                  {item.price}
                </span>
                {item.originalPrice && (
                  <span className="text-[11px]! text-gray-400! line-through! block!">
                    {item.originalPrice}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="h-[1px]! bg-[#f0f0f0]!" />

        {/* Pricing Subtotal Breakdown (Promo code and Tax removed as requested) */}
        <div className="flex! flex-col! gap-2.5! text-xs!">
          <div className="flex! items-center! justify-between!">
            <span className="text-gray-500!">Items Subtotal</span>
            <span className="font-semibold! text-[#1a1a1a]!">$375.00</span>
          </div>

          <div className="flex! items-center! justify-between!">
            <span className="text-gray-500!">Carbon-Neutral Shipping</span>
            <span className="font-bold! text-emerald-600!">FREE</span>
          </div>
        </div>

        <div className="h-[1px]! bg-[#f0f0f0]!" />

        {/* Total Due */}
        <div className="flex! items-baseline! justify-between!">
          <div>
            <span className="text-sm! sm:text-base! font-bold! text-[#1a1a1a]! block!">
              Total Due
            </span>
          </div>
          <div className="text-right!">
            <span className="text-xl! sm:text-2xl! font-extrabold! text-[#1a1a1a]! block!">
              $375.00
            </span>
            <span className="text-[10px]! text-gray-400! font-medium! uppercase!">
              USD
            </span>
          </div>
        </div>

        {/* Primary Place Order CTA Button */}
        <button
          type="button"
          className="w-full! h-12! sm:h-14! rounded-full! bg-[#5433eb]! hover:bg-[#4324d4]! text-white! font-semibold! text-xs! sm:text-sm! flex! items-center! justify-center! gap-2.5! shadow-[0_6px_24px_rgba(84,51,235,0.35)]! transition-color! active:scale-98! cursor-pointer! border-0!"
        >
          <CarOutlined className="text-base!" />
          <span>Place Order with Cash on Delivery</span>
          <ArrowRightOutlined className="text-xs!" />
        </button>

      </div>

      {/* Need Assistance Card */}
      <div className="bg-white! rounded-[24px]! border! border-[#ebebeb]! p-4! sm:p-4.5! flex! items-center! justify-between! gap-3! shadow-2xs!">
        <div className="flex! items-center! gap-3!">
          <div className="w-8! h-8! rounded-full! bg-[#eee9ff]! text-[#5433eb]! flex! items-center! justify-center! shrink-0!">
            <CommentOutlined className="text-sm!" />
          </div>
          <div>
            <span className="text-xs! font-bold! text-[#1a1a1a]! block!">
              Need assistance?
            </span>
            <span className="text-[11px]! text-gray-400!">
              Our concierge is live 24/7
            </span>
          </div>
        </div>

        <button
          type="button"
          className="px-3.5! py-1.5! rounded-full! bg-[#f7f8fa]! hover:bg-gray-100! text-[#1a1a1a]! text-xs! font-semibold! border! border-[#ebebeb]! transition-colors! cursor-pointer!"
        >
          Chat Now
        </button>
      </div>
    </div>
  )
}
