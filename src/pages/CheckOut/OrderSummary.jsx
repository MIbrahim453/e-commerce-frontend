import React from "react";
import {
  CarOutlined,
  CreditCardOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusOutlined,
  LoadingOutlined,
  CommentOutlined,
} from "@ant-design/icons";

export default function OrderSummary({
  cart = [],
  subTotal = 0,
  totalDiscount = 0,
  total = 0,
  itemCount = 0,
  onUpdateQuantity,
  onRemoveItem,
  paymentMethod = "COD",
  submitting = false,
  onSubmitOrder,
}) {
  return (
    <div className="flex! flex-col! gap-4!">
      <div className="bg-white! rounded-[28px]! border! border-[#ebebeb]! p-5! sm:p-7! shadow-[0_4px_24px_rgba(0,0,0,0.03)]! flex! flex-col! gap-5!">
        <div className="flex! items-center! justify-between! border-b! border-[#f0f0f0]! pb-4!">
          <h3 className="text-base! sm:text-lg! font-bold! text-[#1a1a1a]! m-0!">
            Order Summary
          </h3>
          <span className="text-[11px]! font-semibold! text-[#5433eb]! bg-purple-50! px-2.5! py-0.5! rounded-full!">
            {itemCount} {itemCount === 1 ? "Item" : "Items"}
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="py-8! text-center! text-gray-400! text-xs!">
            Your cart is currently empty.
          </div>
        ) : (
          <div className="flex! flex-col! gap-3.5! max-h-[380px]! overflow-y-auto! pr-1!">
            {cart.map((item) => {
              const itemKey = item._id;
              const itemPrice = Number(item.price) || 0;
              const itemOrig = Number(item.originalPrice) || itemPrice;
              const itemTotal = (itemPrice * (item.quantity || 1)).toFixed(2);
              const itemOrigTotal = (itemOrig * (item.quantity || 1)).toFixed(
                2,
              );

              return (
                <div
                  key={itemKey}
                  className="flex! items-start! gap-3! p-2.5! rounded-2xl! bg-[#fbfbfb]! border! border-[#f0f0f0]! hover:border-gray-200! transition-all!"
                >
                  <div className="w-14! h-14! sm:w-16! sm:h-16! rounded-xl! overflow-hidden! bg-white! border! border-[#ebebeb]! shrink-0! flex! items-center! justify-center! p-1!">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title || item.name}
                        className="w-full! h-full! object-cover! rounded-lg!"
                      />
                    ) : (
                      <div className="text-[10px]! text-gray-400! font-bold!">
                        ITEM
                      </div>
                    )}
                  </div>

                  <div className="flex-1! min-w-0! flex! flex-col! gap-1!">
                    <h4 className="text-xs! sm:text-[13px]! font-bold! text-[#1a1a1a]! truncate! m-0!">
                      {item.title || item.name}
                    </h4>

                    <div className="flex! flex-wrap! items-center! gap-1! text-[10px]! text-gray-500!">
                      <span className="px-1.5! py-0.5! rounded-md! bg-gray-100! font-medium!">
                        Size: {item.size || "Standard"}
                      </span>
                      {item.color && item.color !== "Standard" && (
                        <span className="px-1.5! py-0.5! rounded-md! bg-gray-100! font-medium!">
                          {item.color}
                        </span>
                      )}
                    </div>

                    <div className="flex! items-center! gap-2! mt-1!">
                      <div className="flex! items-center! bg-white! border! border-gray-200! rounded-full! px-1.5! py-0.5! shadow-2xs!">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity &&
                            onUpdateQuantity(itemKey, (item.quantity || 1) - 1)
                          }
                          className="w-4! h-4! rounded-full! hover:bg-gray-100! text-gray-600! flex! items-center! justify-center! cursor-pointer! border-0! bg-transparent!"
                          aria-label="Decrease quantity"
                        >
                          <MinusOutlined className="text-[8px]!" />
                        </button>
                        <span className="text-xs! font-bold! text-gray-800! px-2!">
                          {item.quantity || 1}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity &&
                            onUpdateQuantity(itemKey, (item.quantity || 1) + 1)
                          }
                          className="w-4! h-4! rounded-full! hover:bg-gray-100! text-gray-600! flex! items-center! justify-center! cursor-pointer! border-0! bg-transparent!"
                          aria-label="Increase quantity"
                        >
                          <PlusOutlined className="text-[8px]!" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem && onRemoveItem(itemKey)}
                        className="text-gray-400! hover:text-red-500! transition-colors! cursor-pointer! border-0! bg-transparent! p-1!"
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <DeleteOutlined className="text-xs!" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right! shrink-0! pt-0.5!">
                    <span className="text-xs! sm:text-sm! font-bold! text-[#1a1a1a]! block!">
                      ${itemTotal}
                    </span>
                    {itemOrig > itemPrice && (
                      <span className="text-[10px]! text-gray-400! line-through! block!">
                        ${itemOrigTotal}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="h-[1px]! bg-[#f0f0f0]!" />

        <div className="flex! flex-col! gap-2.5! text-xs!">
          <div className="flex! items-center! justify-between!">
            <span className="text-gray-500!">Items Subtotal</span>
            <span className="font-semibold! text-[#1a1a1a]!">
              ${Number(subTotal).toFixed(2)}
            </span>
          </div>

          {totalDiscount > 0 && (
            <div className="flex! items-center! justify-between!">
              <span className="text-gray-500!">Total Discount Savings</span>
              <span className="font-bold! text-emerald-600!">
                -${Number(totalDiscount).toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex! items-center! justify-between!">
            <span className="text-gray-500!">Carbon-Neutral Delivery</span>
            <span className="font-bold! text-emerald-600!">FREE</span>
          </div>
        </div>

        <div className="h-[1px]! bg-[#f0f0f0]!" />

        <div className="flex! items-baseline! justify-between!">
          <div>
            <span className="text-sm! sm:text-base! font-bold! text-[#1a1a1a]! block!">
              Total Due
            </span>
            <span className="text-[11px]! text-gray-400!">
              Includes all applicable taxes
            </span>
          </div>
          <div className="text-right!">
            <span className="text-xl! sm:text-2xl! font-extrabold! text-[#1a1a1a]! block!">
              ${Number(total).toFixed(2)}
            </span>
            <span className="text-[10px]! text-gray-400! font-medium! uppercase!">
              USD
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={cart.length === 0 || submitting}
          onClick={onSubmitOrder}
          className={`w-full! h-12! sm:h-14! rounded-full! font-semibold! text-xs! sm:text-sm! flex! items-center! justify-center! gap-2.5! shadow-[0_6px_24px_rgba(84,51,235,0.35)]! transition-all! border-0! ${cart.length === 0 || submitting
              ? "bg-gray-300! text-gray-500! cursor-not-allowed! shadow-none!"
              : "bg-[#5433eb]! hover:bg-[#4324d4]! text-white! cursor-pointer! active:scale-98!"
            }`}
        >
          {submitting ? (
            <>
              <LoadingOutlined className="text-base! animate-spin!" />
              <span>Processing Order...</span>
            </>
          ) : paymentMethod === "CARD" ? (
            <>
              <CreditCardOutlined className="text-base!" />
              <span>Pay ${Number(total).toFixed(2)} &amp; Place Order</span>
              <ArrowRightOutlined className="text-xs!" />
            </>
          ) : (
            <>
              <CarOutlined className="text-base!" />
              <span>Place Order with Cash on Delivery</span>
              <ArrowRightOutlined className="text-xs!" />
            </>
          )}
        </button>
      </div>

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
          onClick={() => window.open("mailto:support@shopstudio.com", "_blank")}
          className="px-3.5! py-1.5! rounded-full! bg-[#f7f8fa]! hover:bg-gray-100! text-[#1a1a1a]! text-xs! font-semibold! border! border-[#ebebeb]! transition-colors! cursor-pointer!"
        >
          Concierge
        </button>
      </div>
    </div>
  );
}
