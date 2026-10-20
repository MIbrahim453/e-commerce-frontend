import React from "react";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  DownOutlined,
} from "@ant-design/icons";

export default function ShippingAddress({ shippingAddress = {}, onChange }) {
  const handleChange = (field, value) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  return (
    <div>
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

      <div className="flex! flex-col! gap-3.5!">
        <div className="grid! grid-cols-1! sm:grid-cols-2! gap-3!">
          <div>
            <label className="block! text-xs! text-gray-500! font-medium! mb-1.5!">
              First Name <span className="text-red-500!">*</span>
            </label>
            <input
              type="text"
              value={shippingAddress.firstName || ""}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="First Name"
              className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-2.5! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium! outline-none! focus:border-[#5433eb]! focus:bg-white! transition-all!"
              required
            />
          </div>
          <div>
            <label className="block! text-xs! text-gray-500! font-medium! mb-1.5!">
              Last Name <span className="text-red-500!">*</span>
            </label>
            <input
              type="text"
              value={shippingAddress.lastName || ""}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Last Name"
              className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-2.5! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium! outline-none! focus:border-[#5433eb]! focus:bg-white! transition-all!"
              required
            />
          </div>
        </div>

        <div>
          <label className="block! text-xs! text-gray-500! font-medium! mb-1.5!">
            Street Address <span className="text-red-500!">*</span>
          </label>
          <div className="relative! flex! items-center! w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-2.5! focus-within:border-[#5433eb]! focus-within:bg-white! transition-all!">
            <EnvironmentOutlined className="text-gray-400! mr-2.5! text-sm!" />
            <input
              type="text"
              value={shippingAddress.streetAddress || ""}
              onChange={(e) => handleChange("streetAddress", e.target.value)}
              placeholder="Street address or P.O. Box"
              className="w-full! bg-transparent! outline-none! border-0! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium!"
              required
            />
          </div>
        </div>

        <div>
          <label className="block! text-xs! text-gray-500! font-medium! mb-1.5!">
            Apartment, suite, unit (optional)
          </label>
          <input
            type="text"
            value={shippingAddress.apartment || ""}
            onChange={(e) => handleChange("apartment", e.target.value)}
            placeholder="Apt, Suite, Floor (optional)"
            className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-2.5! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium! outline-none! focus:border-[#5433eb]! focus:bg-white! transition-all!"
          />
        </div>

        <div className="grid! grid-cols-1! sm:grid-cols-3! gap-3!">
          <div>
            <label className="block! text-xs! text-gray-500! font-medium! mb-1.5!">
              City <span className="text-red-500!">*</span>
            </label>
            <input
              type="text"
              value={shippingAddress.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="City"
              className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-2.5! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium! outline-none! focus:border-[#5433eb]! focus:bg-white! transition-all!"
              required
            />
          </div>
          <div>
            <label className="block! text-xs! text-gray-500! font-medium! mb-1.5!">
              State / Region <span className="text-red-500!">*</span>
            </label>
            <input
              type="text"
              value={shippingAddress.state || ""}
              onChange={(e) => handleChange("state", e.target.value)}
              placeholder="State or Province"
              className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-2.5! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium! outline-none! focus:border-[#5433eb]! focus:bg-white! transition-all!"
              required
            />
          </div>
          <div>
            <label className="block! text-xs! text-gray-500! font-medium! mb-1.5!">
              ZIP / Postal Code <span className="text-red-500!">*</span>
            </label>
            <input
              type="text"
              value={shippingAddress.zipCode || ""}
              onChange={(e) => handleChange("zipCode", e.target.value)}
              placeholder="ZIP / Postal code"
              className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-2.5! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium! outline-none! focus:border-[#5433eb]! focus:bg-white! transition-all!"
              required
            />
          </div>
        </div>

        <div className="grid! grid-cols-1! sm:grid-cols-2! gap-3!">
          <div>
            <label className="block! text-xs! text-gray-500! font-medium! mb-1.5!">
              Country / Region <span className="text-red-500!">*</span>
            </label>
            <div className="relative! flex! items-center! w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-2.5! cursor-pointer!">
              <select
                value={shippingAddress.country || "United States"}
                onChange={(e) => handleChange("country", e.target.value)}
                className="w-full! bg-transparent! outline-none! border-0! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium! appearance-none! cursor-pointer!"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Pakistan">Pakistan</option>
                <option value="India">India</option>
                <option value="United Arab Emirates">
                  United Arab Emirates
                </option>
                <option value="Saudi Arabia">Saudi Arabia</option>
              </select>
              <DownOutlined className="text-[10px]! text-gray-400! pointer-events-none! shrink-0!" />
            </div>
          </div>

          <div>
            <label className="block! text-xs! text-gray-500! font-medium! mb-1.5!">
              Delivery Phone
            </label>
            <div className="relative! flex! items-center! w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! px-4! py-2.5! focus-within:border-[#5433eb]! focus-within:bg-white! transition-all!">
              <PhoneOutlined className="text-gray-400! mr-2.5! text-sm!" />
              <input
                type="tel"
                value={shippingAddress.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Phone for courier updates"
                className="w-full! bg-transparent! outline-none! border-0! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium!"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
