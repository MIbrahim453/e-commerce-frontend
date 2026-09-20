import React from 'react'
import { EnvironmentOutlined, PhoneOutlined, DownOutlined, CheckCircleFilled } from '@ant-design/icons'

export default function ShippingAddress() {
  return (
    <div>
      {/* Header */}
      <div className="flex! items-center! justify-between! mb-4!">
        <div className="flex! items-center! gap-3!">
          <div className="w-6! h-6! rounded-full! bg-[#5433eb]! text-white! text-xs! font-bold! flex! items-center! justify-center! shadow-xs!">
            2
          </div>
          <h2 className="text-base! sm:text-lg! font-bold! text-[#1a1a1a]! m-0!">
            Shipping Address
          </h2>
        </div>
      </div>

      {/* Form Fields */}
      <div className="flex! flex-col! gap-3.5!">
        {/* First & Last Name */}
        <div className="grid! grid-cols-1! sm:grid-cols-2! gap-3!">
          <div>
            <label className="block! text-xs! text-gray-500! font-medium! mb-1.5!">
              First Name
            </label>
            <input
              type="text"
              defaultValue="Alex"
              className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-2.5! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium! outline-none! focus:border-[#5433eb]! focus:bg-white! transition-all!"
            />
          </div>
          <div>
            <label className="block! text-xs! text-gray-500! font-medium! mb-1.5!">
              Last Name
            </label>
            <input
              type="text"
              defaultValue="Morgan"
              className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-2.5! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium! outline-none! focus:border-[#5433eb]! focus:bg-white! transition-all!"
            />
          </div>
        </div>

        {/* Street Address */}
        <div>
          <label className="block! text-xs! text-gray-500! font-medium! mb-1.5!">
            Street Address
          </label>
          <div className="relative! flex! items-center! w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-2.5! focus-within:border-[#5433eb]! focus-within:bg-white! transition-all!">
            <EnvironmentOutlined className="text-gray-400! mr-2.5! text-sm!" />
            <input
              type="text"
              defaultValue="492 Broome Street"
              className="w-full! bg-transparent! outline-none! border-0! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium!"
            />
            <span className="text-[10px]! font-bold! tracking-wider! uppercase! text-emerald-600! bg-emerald-50! px-2! py-0.5! rounded-full! shrink-0!">
              Verified
            </span>
          </div>
        </div>

        {/* Apartment / Suite (optional) */}
        <div>
          <label className="block! text-xs! text-gray-500! font-medium! mb-1.5!">
            Apartment, suite, unit (optional)
          </label>
          <input
            type="text"
            defaultValue="Apt 4B"
            className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-2.5! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium! outline-none! focus:border-[#5433eb]! focus:bg-white! transition-all!"
          />
        </div>

        {/* City, State, ZIP */}
        <div className="grid! grid-cols-1! sm:grid-cols-3! gap-3!">
          <div>
            <label className="block! text-xs! text-gray-500! font-medium! mb-1.5!">
              City
            </label>
            <input
              type="text"
              defaultValue="New York"
              className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-2.5! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium! outline-none! focus:border-[#5433eb]! focus:bg-white! transition-all!"
            />
          </div>
          <div>
            <label className="block! text-xs! text-gray-500! font-medium! mb-1.5!">
              State
            </label>
            <div className="relative! flex! items-center! w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-2.5! cursor-pointer!">
              <select
                defaultValue="NY"
                className="w-full! bg-transparent! outline-none! border-0! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium! appearance-none! cursor-pointer!"
              >
                <option value="NY">New York (NY)</option>
                <option value="CA">California (CA)</option>
                <option value="TX">Texas (TX)</option>
              </select>
              <DownOutlined className="text-[10px]! text-gray-400! pointer-events-none! shrink-0!" />
            </div>
          </div>
          <div>
            <label className="block! text-xs! text-gray-500! font-medium! mb-1.5!">
              ZIP Code
            </label>
            <input
              type="text"
              defaultValue="10013"
              className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-2.5! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium! outline-none! focus:border-[#5433eb]! focus:bg-white! transition-all!"
            />
          </div>
        </div>

        {/* Country & Phone */}
        <div className="grid! grid-cols-1! sm:grid-cols-2! gap-3!">
          <div>
            <label className="block! text-xs! text-gray-500! font-medium! mb-1.5!">
              Country / Region
            </label>
            <div className="relative! flex! items-center! w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-2.5! cursor-pointer!">
              <select
                defaultValue="US"
                className="w-full! bg-transparent! outline-none! border-0! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium! appearance-none! cursor-pointer!"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
              </select>
              <DownOutlined className="text-[10px]! text-gray-400! pointer-events-none! shrink-0!" />
            </div>
          </div>

          <div>
            <label className="block! text-xs! text-gray-500! font-medium! mb-1.5!">
              Phone for Delivery Status
            </label>
            <div className="relative! flex! items-center! w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-2.5! focus-within:border-[#5433eb]! focus-within:bg-white! transition-all!">
              <PhoneOutlined className="text-gray-400! mr-2.5! text-sm!" />
              <input
                type="text"
                defaultValue="+1 (212) 555-0184"
                className="w-full! bg-transparent! outline-none! border-0! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium!"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
