import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeftOutlined,
  CheckCircleFilled,
  ShoppingOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import { CartContext } from "../../context/cartContext";
import { AuthContext } from "../../context/authContext";
import { createOrderApi } from "../../services/orderService";

import ContactInfo from "./ContactInfo";
import ShippingAddress from "./ShippingAddress";
import DeliveryMethod from "./DeliveryMethod";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext) || {};
  const {
    cart,
    subTotal,
    totalDiscount,
    total,
    itemCount,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext) || {
    cart: [],
    subTotal: 0,
    totalDiscount: 0,
    total: 0,
    itemCount: 0,
  };

  const [contactInfo, setContactInfo] = useState({
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const getInitialShippingAddress = () => {
    let saved = null;
    try {
      const raw = localStorage.getItem("checkout_shipping_address");
      if (raw) saved = JSON.parse(raw);
    } catch (e) {
      console.error(e);
    }

    const addr = user?.address || {};
    return {
      firstName: user?.firstName || saved?.firstName || "",
      lastName: user?.lastName || saved?.lastName || "",
      streetAddress:
        addr.street || addr.streetAddress || saved?.streetAddress || "",
      apartment: addr.apartment || saved?.apartment || "",
      city: addr.city || saved?.city || "",
      state: addr.state || saved?.state || "NY",
      zipCode: addr.zipCode ? String(addr.zipCode) : saved?.zipCode || "",
      country: addr.country || saved?.country || "United States",
      phone: user?.phone || saved?.phone || "",
    };
  };

  const [shippingAddress, setShippingAddress] = useState(
    getInitialShippingAddress,
  );

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  useEffect(() => {
    if (user) {
      setContactInfo((prev) => ({
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
      }));
      const addr = user.address || {};
      setShippingAddress((prev) => {
        const updated = {
          ...prev,
          firstName: prev.firstName || user.firstName || "",
          lastName: prev.lastName || user.lastName || "",
          phone: prev.phone || user.phone || "",
          streetAddress:
            prev.streetAddress || addr.street || addr.streetAddress || "",
          apartment: prev.apartment || addr.apartment || "",
          city: prev.city || addr.city || "",
          state:
            prev.state && prev.state !== "NY" ? prev.state : addr.state || "NY",
          zipCode: prev.zipCode || (addr.zipCode ? String(addr.zipCode) : ""),
          country:
            prev.country && prev.country !== "United States"
              ? prev.country
              : addr.country || "United States",
        };
        try {
          localStorage.setItem(
            "checkout_shipping_address",
            JSON.stringify(updated),
          );
        } catch (e) { }
        return updated;
      });
    }
  }, [user]);

  const handleContactChange = (field, value) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field, value) => {
    setShippingAddress((prev) => {
      const next = { ...prev, [field]: value };
      try {
        localStorage.setItem("checkout_shipping_address", JSON.stringify(next));
      } catch (e) { }
      return next;
    });
  };

  const handleSubmitOrder = async () => {
    if (!user) {
      message.warning("Please log in to place an order");
      navigate("/login?redirect=/checkout");
      return;
    }

    if (!cart || cart.length === 0) {
      message.warning("Your cart is empty");
      return;
    }

    const trimmedEmail = contactInfo.email?.trim() || user?.email || "";
    const trimmedPhone =
      contactInfo.phone?.trim() || shippingAddress.phone?.trim() || "";

    if (!trimmedEmail && !trimmedPhone) {
      message.error(
        "Please provide an email or phone number in Contact Information",
      );
      return;
    }

    const {
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zipCode,
      country,
    } = shippingAddress;

    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !streetAddress?.trim() ||
      !city?.trim() ||
      !state?.trim() ||
      !zipCode?.trim()
    ) {
      message.error(
        "Please complete all required fields in the Shipping Address",
      );
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        items: cart.map((item) => ({
          productId: item.productId || item._id,
          title: item.title || item.name || "Product Item",
          category: item.category || "Apparel",
          size: item.size || "Standard",
          color: item.color || "Standard",
          quantity: Number(item.quantity) || 1,
          price: Number(item.price) || 0,
        })),
        contactInfo: {
          email: trimmedEmail,
          phone: trimmedPhone,
        },
        shippingAddress: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          streetAddress: streetAddress.trim(),
          apartment: shippingAddress.apartment?.trim() || "",
          city: city.trim(),
          state: state.trim(),
          zipCode: zipCode.trim(),
          country: country?.trim() || "United States",
        },
        paymentMethod: paymentMethod === "CARD" ? "CARD" : "COD",
      };

      const res = await createOrderApi(payload);

      if (res?.data?.success) {
        const orderData = res.data.data?.newOrder || res.data.data?.order;
        setPlacedOrder(orderData);
        if (clearCart) {
          clearCart(false);
        }
        message.success(
          `Order placed successfully! Order #${orderData?.orderNumber || ""}`,
        );
      } else {
        message.error(res?.data?.message || "Failed to place order");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to place order at this time";
      message.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (placedOrder) {
    return (
      <div className="min-h-screen! bg-canvas! py-10! sm:py-16!">
        <div className="max-w-3xl! mx-auto! px-4! sm:px-6! flex! flex-col! items-center! text-center! gap-6!">
          <div className="w-16! h-16! sm:w-20! sm:h-20! rounded-full! bg-emerald-50! border-2! border-emerald-500! text-emerald-600! flex! items-center! justify-center! shadow-lg! shadow-emerald-500/10!">
            <CheckCircleFilled className="text-3xl! sm:text-4xl!" />
          </div>

          <div className="flex! flex-col! gap-1.5!">
            <span className="text-xs! font-bold! text-[#5433eb]! uppercase! tracking-widest!">
              Order Confirmed
            </span>
            <h1 className="text-2xl! sm:text-4xl! font-extrabold! text-[#1a1a1a]! m-0! tracking-tight!">
              Thank you for your order!
            </h1>
            <p className="text-xs! sm:text-sm! text-gray-500! max-w-md! mx-auto! mt-1!">
              We’ve received your order and are getting it ready for dispatch. A
              confirmation notification has been sent.
            </p>
          </div>

          <div className="w-full! bg-white! rounded-[28px]! border! border-[#ebebeb]! p-6! sm:p-8! shadow-[0_4px_24px_rgba(0,0,0,0.04)]! text-left! flex! flex-col! gap-5!">
            <div className="flex! flex-col! sm:flex-row! sm:items-center! justify-between! gap-3! pb-4! border-b! border-gray-100!">
              <div>
                <span className="text-[11px]! text-gray-400! font-semibold! uppercase! tracking-wider! block!">
                  Order Identifier
                </span>
                <span className="text-base! sm:text-lg! font-bold! text-[#1a1a1a]!">
                  {placedOrder.orderNumber}
                </span>
              </div>
              <div className="sm:text-right!">
                <span className="text-[11px]! text-gray-400! font-semibold! uppercase! tracking-wider! block!">
                  Estimated Delivery
                </span>
                <span className="text-xs! sm:text-sm! font-bold! text-emerald-600!">
                  3–5 Business Days (Ground)
                </span>
              </div>
            </div>

            <div className="flex! flex-col! gap-3!">
              <span className="text-xs! font-bold! text-gray-400! uppercase! tracking-wider!">
                Purchased Items ({placedOrder.items?.length || 0})
              </span>
              <div className="flex! flex-col! gap-2.5!">
                {placedOrder.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex! items-center! justify-between! p-2.5! rounded-xl! bg-[#f8f9fa]! border! border-gray-100! text-xs!"
                  >
                    <div className="flex! items-center! gap-2.5!">
                      <span className="w-5! h-5! rounded-full! bg-purple-100! text-[#5433eb]! font-bold! flex! items-center! justify-center! text-[10px]!">
                        {item.quantity}×
                      </span>
                      <span className="font-bold! text-[#1a1a1a]!">
                        {item.title}
                      </span>
                      <span className="text-gray-400!">({item.size})</span>
                    </div>
                    <span className="font-semibold! text-[#1a1a1a]!">
                      ${(Number(item.price) * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid! grid-cols-1! sm:grid-cols-2! gap-4! pt-4! border-t! border-gray-100! text-xs!">
              <div>
                <span className="text-[11px]! font-bold! text-gray-400! uppercase! tracking-wider! block! mb-1!">
                  Shipping Address
                </span>
                <p className="text-gray-700! font-medium! leading-relaxed! m-0!">
                  {placedOrder.shippingAddress?.firstName}{" "}
                  {placedOrder.shippingAddress?.lastName}
                  <br />
                  {placedOrder.shippingAddress?.streetAddress}
                  {placedOrder.shippingAddress?.apartment &&
                    ` ${placedOrder.shippingAddress.apartment}`}
                  <br />
                  {placedOrder.shippingAddress?.city},{" "}
                  {placedOrder.shippingAddress?.state}{" "}
                  {placedOrder.shippingAddress?.zipCode}
                  <br />
                  {placedOrder.shippingAddress?.country}
                </p>
              </div>

              <div>
                <span className="text-[11px]! font-bold! text-gray-400! uppercase! tracking-wider! block! mb-1!">
                  Payment Summary
                </span>
                <p className="text-gray-700! font-medium! leading-relaxed! m-0!">
                  Method:{" "}
                  <span className="font-bold! text-[#1a1a1a]!">
                    {placedOrder.paymentMethod === "CARD"
                      ? "Card Payment (Paid)"
                      : "Cash on Delivery (COD)"}
                  </span>
                  <br />
                  Status:{" "}
                  <span className="font-semibold! text-emerald-600!">
                    {placedOrder.paymentStatus || "Confirmed"}
                  </span>
                  <br />
                  Total Amount:{" "}
                  <span className="text-sm! font-extrabold! text-[#1a1a1a]!">
                    ${Number(placedOrder.total || 0).toFixed(2)} USD
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex! flex-wrap! items-center! justify-center! gap-3.5! mt-2!">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="px-6! py-3! rounded-full! bg-[#5433eb]! hover:bg-[#4324d4]! text-white! font-semibold! text-xs! sm:text-sm! shadow-[0_4px_16px_rgba(84,51,235,0.35)]! transition-all! cursor-pointer! border-0!"
            >
              Continue Shopping
            </button>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-6! py-3! rounded-full! bg-white! hover:bg-gray-50! text-gray-800! font-semibold! text-xs! sm:text-sm! border! border-[#ebebeb]! shadow-2xs! transition-all! cursor-pointer!"
            >
              View Order in Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen! bg-canvas! py-12! sm:py-20!">
        <div className="max-w-xl! mx-auto! px-4! text-center! flex! flex-col! items-center! gap-5!">
          <div className="w-16! h-16! sm:w-20! sm:h-20! rounded-full! bg-[#eee9ff]! text-[#5433eb]! flex! items-center! justify-center! shadow-inner!">
            <ShoppingOutlined className="text-3xl! sm:text-4xl!" />
          </div>

          <div className="flex! flex-col! gap-1!">
            <h2 className="text-xl! sm:text-2xl! font-bold! text-[#1a1a1a]! m-0!">
              Your Shopping Bag is Empty
            </h2>
            <p className="text-xs! sm:text-sm! text-gray-500! max-w-sm! mx-auto!">
              Looks like you haven’t added any items yet. Explore our curated
              collections to find thoughtful lifestyle designs.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex! items-center! gap-2! px-6! py-3! rounded-full! bg-[#5433eb]! hover:bg-[#4324d4]! text-white! font-semibold! text-xs! sm:text-sm! shadow-[0_4px_18px_rgba(84,51,235,0.35)]! transition-all! no-underline!"
          >
            <span>Explore Collection</span>
            <RightOutlined className="text-xs!" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen! bg-canvas! py-6! sm:py-8! md:py-10!">
      <div className="max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8! flex! flex-col! gap-6! sm:gap-8!">
        <div className="flex! items-center! justify-between!">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="inline-flex! items-center! gap-1.5! px-3.5! py-1.5! rounded-full! bg-white! border! border-[#ebebeb]! text-xs! font-semibold! text-gray-700! hover:text-[#5433eb]! hover:border-[#5433eb]/40! shadow-xs! transition-all! cursor-pointer!"
            aria-label="Back to Catalog"
          >
            <ArrowLeftOutlined className="text-[11px]!" />
            <span>Continue Shopping</span>
          </button>

          {!user && (
            <div className="text-xs! text-amber-800! bg-amber-50! border! border-amber-200! px-3! py-1! rounded-full!">
              Please{" "}
              <Link
                to="/login?redirect=/checkout"
                className="font-bold! text-[#5433eb]! underline!"
              >
                log in
              </Link>{" "}
              to complete checkout
            </div>
          )}
        </div>

        <div className="grid! grid-cols-1! lg:grid-cols-12! gap-8! items-start!">
          <div className="lg:col-span-7! xl:col-span-8! bg-white! rounded-[28px]! border! border-[#ebebeb]! p-5! sm:p-8! shadow-[0_4px_24px_rgba(0,0,0,0.03)]! flex! flex-col! gap-6! sm:gap-7!">
            <ContactInfo
              contactInfo={contactInfo}
              onChange={handleContactChange}
            />
            <div className="h-[1px]! bg-[#f0f0f0]!" />
            <ShippingAddress
              shippingAddress={shippingAddress}
              onChange={handleAddressChange}
            />
            <div className="h-[1px]! bg-[#f0f0f0]!" />
            <DeliveryMethod />
            <div className="h-[1px]! bg-[#f0f0f0]!" />
            <PaymentMethod
              paymentMethod={paymentMethod}
              onChange={setPaymentMethod}
            />
          </div>

          <div className="lg:col-span-5! xl:col-span-4!">
            <OrderSummary
              cart={cart}
              subTotal={subTotal}
              totalDiscount={totalDiscount}
              total={total}
              itemCount={itemCount}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              paymentMethod={paymentMethod}
              submitting={submitting}
              onSubmitOrder={handleSubmitOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
