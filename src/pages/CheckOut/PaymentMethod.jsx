import React from 'react'
import {
  LockFilled,
  WalletFilled,
  CarOutlined,
  InfoCircleOutlined
} from '@ant-design/icons'

export default function PaymentMethod() {
  return (
    <div>
      {/* Header */}
      <div className="flex! items-center! justify-between! mb-4!">
        <div className="flex! items-center! gap-3!">
          <div className="w-6! h-6! rounded-full! bg-[#5433eb]! text-white! text-xs! font-bold! flex! items-center! justify-center! shadow-xs!">
            4
          </div>
          <h2 className="text-base! sm:text-lg! font-bold! text-[#1a1a1a]! m-0!">
            Payment Method
          </h2>
        </div>
        <div className="flex! items-center! gap-1! text-[11px]! text-emerald-600! font-semibold!">
          <LockFilled className="text-[10px]!" />
          <span>PCI-DSS Level 1</span>
        </div>
      </div>

      {/* Selected Payment Option Pill */}
      <div className="flex! items-center! justify-between! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-3! mb-3!">
        <div className="flex! items-center! gap-3!">
          <div className="w-6! h-6! rounded-full! bg-[#5433eb]! text-white! flex! items-center! justify-center! text-xs!">
            <WalletFilled />
          </div>
          <span className="text-xs! sm:text-sm! font-bold! text-[#1a1a1a]!">
            Cash on Delivery (COD)
          </span>
        </div>
        <span className="text-[10px]! font-bold! text-gray-500! bg-gray-200/60! px-2.5! py-1! rounded-full!">
          Zero Prepayment
        </span>
      </div>

      {/* Details Box */}
      <div className="bg-[#f8f9fa]! rounded-2xl! border! border-[#ebebeb]! p-4! sm:p-5! flex! flex-col! gap-3.5!">
        <div className="flex! items-center! justify-between!">
          <div className="flex! items-center! gap-2! text-xs! sm:text-sm! font-bold! text-[#1a1a1a]!">
            <CarOutlined className="text-[#5433eb]! text-base!" />
            <span>Payment Upon Arrival</span>
          </div>
          <span className="text-[10px]! font-bold! tracking-wider! uppercase! text-gray-500! bg-gray-200/60! px-2! py-0.5! rounded-full!">
            Verified Method
          </span>
        </div>

        <p className="text-xs! text-gray-500! leading-relaxed! m-0!">
          Pay seamlessly with cash or contactless card upon delivery at your doorstep. Our courier will provide an official digital receipt upon payment.
        </p>

        {/* Verification Sub-card */}
        <div className="bg-white! rounded-xl! border! border-[#ebebeb]! p-3.5! flex! items-start! gap-2.5! shadow-2xs!">
          <InfoCircleOutlined className="text-[#5433eb]! text-xs! mt-0.5! shrink-0!" />
          <div className="flex! flex-col! gap-0.5!">
            <span className="text-xs! font-bold! text-[#1a1a1a]!">
              Delivery Verification &amp; Instructions
            </span>
            <span className="text-[11px]! text-gray-400! leading-relaxed!">
              Exact change appreciated. Cash collection verified via 4-digit SMS delivery code upon courier arrival.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
