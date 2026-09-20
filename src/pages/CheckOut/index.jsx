import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import ContactInfo from './ContactInfo'
import ShippingAddress from './ShippingAddress'
import DeliveryMethod from './DeliveryMethod'
import PaymentMethod from './PaymentMethod'
import OrderSummary from './OrderSummary'

export default function CheckoutPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen! bg-canvas! py-6! sm:py-8! md:py-10!">
      <div className="max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8! flex! flex-col! gap-6! sm:gap-8!">
        
        {/* Top Back Navigation */}
        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex! items-center! gap-1.5! px-3.5! py-1.5! rounded-full! bg-white! border! border-[#ebebeb]! text-xs! font-semibold! text-gray-700! hover:text-[#5433eb]! hover:border-[#5433eb]/40! shadow-xs! transition-all! cursor-pointer!"
            aria-label="Go back"
          >
            <ArrowLeftOutlined className="text-[11px]!" />
            <span>Back to Shopping</span>
          </button>
        </div>

        {/* 2-Column Responsive Checkout Layout */}
        <div className="grid! grid-cols-1! lg:grid-cols-12! gap-8! items-start!">
          
          {/* Left Column: Form Steps Card (7 cols) */}
          <div className="lg:col-span-7! xl:col-span-8! bg-white! rounded-[28px]! border! border-[#ebebeb]! p-5! sm:p-8! shadow-[0_4px_24px_rgba(0,0,0,0.03)]! flex! flex-col! gap-6! sm:gap-7!">
            <ContactInfo />
            <div className="h-[1px]! bg-[#f0f0f0]!" />
            <ShippingAddress />
            <div className="h-[1px]! bg-[#f0f0f0]!" />
            <DeliveryMethod />
            <div className="h-[1px]! bg-[#f0f0f0]!" />
            <PaymentMethod />
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5! xl:col-span-4!">
            <OrderSummary />
          </div>

        </div>

      </div>
    </div>
  )
}
