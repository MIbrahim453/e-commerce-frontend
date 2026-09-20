import React from 'react'
import { MailOutlined } from '@ant-design/icons'

export default function ContactInfo() {
  return (
    <div>
      {/* Header */}
      <div className="flex! items-center! justify-between! mb-4!">
        <div className="flex! items-center! gap-3!">
          <div className="w-6! h-6! rounded-full! bg-[#5433eb]! text-white! text-xs! font-bold! flex! items-center! justify-center! shadow-xs!">
            1
          </div>
          <h2 className="text-base! sm:text-lg! font-bold! text-[#1a1a1a]! m-0!">
            Contact Information
          </h2>
        </div>
      </div>

      {/* Input Field */}
      <div className="flex! flex-col! gap-3!">
        <div>
          <label className="block! text-xs! text-gray-500! font-medium! mb-1.5!">
            Email or mobile phone number
          </label>
          <div className="relative! flex! items-center! w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-2.5! focus-within:border-[#5433eb]! focus-within:bg-white! transition-all!">
            <MailOutlined className="text-gray-400! mr-2.5! text-sm!" />
            <input
              type="text"
              defaultValue="alex.morgan@designstudio.com"
              className="w-full! bg-transparent! outline-none! border-0! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium!"
              placeholder="Enter your email or phone"
            />
          </div>
        </div>

      </div>
    </div>
  )
}
