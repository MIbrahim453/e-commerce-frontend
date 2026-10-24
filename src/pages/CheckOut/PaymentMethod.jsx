import React from "react";
import {
  LockFilled,
  WalletFilled,
  CarOutlined,
  // CreditCardOutlined, // Kept for future card payment integration
  InfoCircleOutlined,
} from "@ant-design/icons";

export default function PaymentMethod({ paymentMethod = "COD", onChange }) {
  const handleSelect = (method) => {
    if (onChange) {
      onChange(method);
    }
  };

  return (
    <div>
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
          <span>PCI-DSS Level 1 Encrypted</span>
        </div>
      </div>

      <div className="grid! grid-cols-1! gap-3! mb-4!">
        <div
          onClick={() => handleSelect("COD")}
          className={`cursor-pointer! rounded-2xl! p-4! border-2! transition-all! flex! flex-col! justify-between! gap-2! ${paymentMethod === "COD"
              ? "border-[#5433eb]! bg-[#faf8ff]! shadow-sm!"
              : "border-[#ebebeb]! bg-[#f7f8fa]! hover:border-gray-300!"
            }`}
        >
          <div className="flex! items-center! justify-between!">
            <div className="flex! items-center! gap-2.5!">
              <div
                className={`w-8! h-8! rounded-full! flex! items-center! justify-center! text-sm! ${paymentMethod === "COD"
                    ? "bg-[#5433eb]! text-white!"
                    : "bg-white! text-gray-500! border! border-gray-200!"
                  }`}
              >
                <WalletFilled />
              </div>
              <div>
                <span className="text-xs! sm:text-sm! font-bold! text-[#1a1a1a]! block!">
                  Cash on Delivery
                </span>
                <span className="text-[11px]! text-gray-500!">
                  Pay upon doorstep delivery
                </span>
              </div>
            </div>

            <div
              className={`w-4! h-4! rounded-full! border-2! flex! items-center! justify-center! shrink-0! ${paymentMethod === "COD"
                  ? "border-[#5433eb]!"
                  : "border-gray-300!"
                }`}
            >
              {paymentMethod === "COD" && (
                <div className="w-2! h-2! rounded-full! bg-[#5433eb]!" />
              )}
            </div>
          </div>
          <span className="text-[10px]! font-bold! text-emerald-700! bg-emerald-50! px-2.5! py-0.5! rounded-full! w-fit!">
            Zero Prepayment Needed
          </span>
        </div>

        {/* Card Payment Method - Commented out for future inclusion */}
        {/*
        <div
          onClick={() => handleSelect("CARD")}
          className={`cursor-pointer! rounded-2xl! p-4! border-2! transition-all! flex! flex-col! justify-between! gap-2! ${paymentMethod === "CARD"
              ? "border-[#5433eb]! bg-[#faf8ff]! shadow-sm!"
              : "border-[#ebebeb]! bg-[#f7f8fa]! hover:border-gray-300!"
            }`}
        >
          <div className="flex! items-center! justify-between!">
            <div className="flex! items-center! gap-2.5!">
              <div
                className={`w-8! h-8! rounded-full! flex! items-center! justify-center! text-sm! ${paymentMethod === "CARD"
                    ? "bg-[#5433eb]! text-white!"
                    : "bg-white! text-gray-500! border! border-gray-200!"
                  }`}
              >
                <CreditCardOutlined />
              </div>
              <div>
                <span className="text-xs! sm:text-sm! font-bold! text-[#1a1a1a]! block!">
                  Credit / Debit Card
                </span>
                <span className="text-[11px]! text-gray-500!">
                  Instant direct payment
                </span>
              </div>
            </div>

            <div
              className={`w-4! h-4! rounded-full! border-2! flex! items-center! justify-center! shrink-0! ${paymentMethod === "CARD"
                  ? "border-[#5433eb]!"
                  : "border-gray-300!"
                }`}
            >
              {paymentMethod === "CARD" && (
                <div className="w-2! h-2! rounded-full! bg-[#5433eb]!" />
              )}
            </div>
          </div>
          <span className="text-[10px]! font-bold! text-[#5433eb]! bg-purple-50! px-2.5! py-0.5! rounded-full! w-fit!">
            Instant Dispatch Priority
          </span>
        </div>
        */}
      </div>

      {paymentMethod === "COD" ? (
        <div className="bg-[#f8f9fa]! rounded-2xl! border! border-[#ebebeb]! p-4! sm:p-5! flex! flex-col! gap-3!">
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
            Pay seamlessly with cash or contactless card upon delivery at your
            doorstep. Our courier will provide an official digital receipt upon
            payment.
          </p>

          <div className="bg-white! rounded-xl! border! border-[#ebebeb]! p-3! flex! items-start! gap-2.5! shadow-2xs!">
            <InfoCircleOutlined className="text-[#5433eb]! text-xs! mt-0.5! shrink-0!" />
            <div className="flex! flex-col! gap-0.5!">
              <span className="text-xs! font-bold! text-[#1a1a1a]!">
                Delivery Instructions
              </span>
              <span className="text-[11px]! text-gray-400! leading-relaxed!">
                Exact change appreciated. Cash collection is confirmed via SMS
                delivery code upon arrival.
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Card Information section - Commented out for future inclusion */
        /*
        <div className="bg-[#f8f9fa]! rounded-2xl! border! border-[#ebebeb]! p-4! sm:p-5! flex! flex-col! gap-3.5!">
          <div className="flex! items-center! justify-between!">
            <div className="flex! items-center! gap-2! text-xs! sm:text-sm! font-bold! text-[#1a1a1a]!">
              <CreditCardOutlined className="text-[#5433eb]! text-base!" />
              <span>Card Information</span>
            </div>
            <div className="flex! items-center! gap-1.5!">
              <span className="px-1.5! py-0.5! bg-blue-50! text-blue-700! text-[10px]! font-bold! rounded!">
                VISA
              </span>
              <span className="px-1.5! py-0.5! bg-amber-50! text-amber-700! text-[10px]! font-bold! rounded!">
                MC
              </span>
              <span className="px-1.5! py-0.5! bg-emerald-50! text-emerald-700! text-[10px]! font-bold! rounded!">
                AMEX
              </span>
            </div>
          </div>

          <div className="flex! flex-col! gap-2.5!">
            <div>
              <label className="block! text-[11px]! text-gray-500! font-medium! mb-1!">
                Card Number
              </label>
              <input
                type="text"
                maxLength="19"
                defaultValue="4242 •••• •••• 4242"
                className="w-full! bg-white! border! border-[#ebebeb]! rounded-full! px-4! py-2! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium! outline-none! focus:border-[#5433eb]!"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="grid! grid-cols-2! gap-2.5!">
              <div>
                <label className="block! text-[11px]! text-gray-500! font-medium! mb-1!">
                  Expiration Date
                </label>
                <input
                  type="text"
                  maxLength="5"
                  defaultValue="12/28"
                  className="w-full! bg-white! border! border-[#ebebeb]! rounded-full! px-4! py-2! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium! outline-none! focus:border-[#5433eb]!"
                  placeholder="MM/YY"
                />
              </div>

              <div>
                <label className="block! text-[11px]! text-gray-500! font-medium! mb-1!">
                  CVC / CVV
                </label>
                <input
                  type="password"
                  maxLength="4"
                  defaultValue="888"
                  className="w-full! bg-white! border! border-[#ebebeb]! rounded-full! px-4! py-2! text-xs! sm:text-sm! text-[#1a1a1a]! font-medium! outline-none! focus:border-[#5433eb]!"
                  placeholder="CVC"
                />
              </div>
            </div>
          </div>
        </div>
        */
        null
      )}
    </div>
  );
}
