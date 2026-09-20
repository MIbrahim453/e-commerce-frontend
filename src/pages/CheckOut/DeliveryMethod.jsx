import React from 'react'
import { CheckCircleFilled, SyncOutlined } from '@ant-design/icons'

export default function DeliveryMethod() {
  return (
    <div>
      {/* Header */}
      <div className="flex! items-center! justify-between! mb-4!">
        <div className="flex! items-center! gap-3!">
          <div className="w-6! h-6! rounded-full! bg-[#5433eb]! text-white! text-xs! font-bold! flex! items-center! justify-center! shadow-xs!">
            3
          </div>
          <h2 className="text-base! sm:text-lg! font-bold! text-[#1a1a1a]! m-0!">
            Delivery Method
          </h2>
        </div>
        <span className="text-[11px]! font-medium! text-gray-400!">
          Carbon-Neutral Fleet
        </span>
      </div>

      {/* Selected Delivery Option Box */}
      <div className="border-2! border-[#5433eb]! bg-[#faf8ff]! rounded-2xl! p-4! sm:p-5! flex! flex-col! gap-3! shadow-xs!">
        <div className="flex! items-center! justify-between!">
          <div className="flex! items-center! gap-3!">
            {/* Custom Radio */}
            <div className="w-4! h-4! rounded-full! border-2! border-[#5433eb]! flex! items-center! justify-center! shrink-0!">
              <div className="w-2! h-2! rounded-full! bg-[#5433eb]!" />
            </div>

            <div>
              <div className="flex! items-center! gap-2!">
                <span className="text-xs! sm:text-sm! font-bold! text-[#1a1a1a]!">
                  Standard Delivery
                </span>
                <span className="px-2! py-0.5! rounded-full! bg-[#5433eb]! text-white! text-[10px]! font-bold! uppercase! tracking-wider!">
                  Free
                </span>
              </div>
              <span className="text-xs! text-gray-500!">
                3–5 Business Days
              </span>
            </div>
          </div>
        </div>

        <div className="flex! items-center! justify-between! pt-2.5! border-t! border-purple-100! text-xs! text-gray-500!">
          <div className="flex! items-center! gap-1.5! text-emerald-600! font-medium!">
            <svg className="w-3.5! h-3.5!" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>100% Carbon-Neutral</span>
          </div>
          <span className="text-gray-400! font-medium!">FedEx Ground</span>
        </div>
      </div>
    </div>
  )
}
