import React, { useState, useEffect } from "react";
import {
  CheckCircleFilled,
  ClockCircleFilled,
  DollarOutlined,
  SafetyCertificateOutlined,
  LoadingOutlined,
  CreditCardOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { getUserPaymentsApi } from "../../services/paymentService";

export default function PaymentsTab() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await getUserPaymentsApi();
      if (res?.data?.success) {
        setPayments(res.data.data?.payments || []);
      }
    } catch (err) {
      console.error("Failed to load user payments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const totalAmount = payments.reduce(
    (sum, p) => sum + (Number(p.total) || 0),
    0,
  );

  return (
    <div className="flex! flex-col! gap-6!">
      <div className="flex! flex-col! sm:flex-row! sm:items-center! justify-between! gap-4!">
        <div>
          <h2 className="text-xl! sm:text-2xl! font-semibold! text-text-primary! tracking-[-0.04em]! m-0!">
            Payments &amp; Settlements
          </h2>
          <p className="text-xs! sm:text-sm! text-text-secondary! m-0! mt-1!">
            Official payment history, receipts, and order settlement records
          </p>
        </div>

        <div className="flex! items-center! gap-2! bg-white! border! border-border! px-4! py-2! rounded-full! shadow-xs!">
          <span className="text-xs! text-text-secondary!">
            Total Settled / Due:
          </span>
          <span className="text-sm! font-bold! text-text-primary!">
            ${totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="p-4! sm:p-5! rounded-[20px]! bg-[#fcf9f8]! border! border-[#ebebeb]! flex! items-center! gap-3.5!">
        <div className="w-10! h-10! rounded-full! bg-[#e4dfff]! text-[#5433eb]! flex! items-center! justify-center! shrink-0!">
          <DollarOutlined className="text-lg!" />
        </div>
        <div>
          <h4 className="text-xs! sm:text-sm! font-semibold! text-text-primary! m-0!">
            Flexible &amp; Verified Settlement
          </h4>
          <p className="text-[11px]! sm:text-xs! text-text-secondary! m-0! mt-0.5!">
            Supports verified Cash on Delivery (COD) upon courier arrival and
            encrypted instant Card payments.
          </p>
        </div>
      </div>

      <div className="flex! flex-col! gap-4!">
        {loading ? (
          <div className="py-16! text-center! text-gray-400! flex! flex-col! items-center! justify-center! gap-2!">
            <LoadingOutlined className="text-2xl! text-[#5433eb]! animate-spin!" />
            <span className="text-xs!">Loading payment records...</span>
          </div>
        ) : payments.length === 0 ? (
          <div className="bg-white! rounded-[28px]! border! border-border! p-10! sm:p-14! text-center! flex! flex-col! items-center! gap-3.5! shadow-level-1!">
            <div className="w-14! h-14! rounded-full! bg-[#eee9ff]! text-[#5433eb]! flex! items-center! justify-center! text-2xl!">
              <DollarOutlined />
            </div>
            <h3 className="text-lg! font-bold! text-[#1a1a1a]! m-0!">
              No payment records found
            </h3>
            <p className="text-xs! text-gray-500! max-w-sm! m-0!">
              When you place an order via Cash on Delivery or Card, your
              transaction details will appear here.
            </p>
          </div>
        ) : (
          payments.map((payment) => {
            const isPaid = payment.paymentStatus === "PAID";
            const formattedDate = payment.createdAt
              ? new Date(payment.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Recent";
            const formattedTime = payment.createdAt
              ? new Date(payment.createdAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "";

            const itemSummary =
              payment.items?.length > 1
                ? `${payment.items[0]?.title} + ${payment.items.length - 1} other item${payment.items.length > 2 ? "s" : ""}`
                : payment.items?.[0]?.title || "Order Purchase";

            return (
              <div
                key={payment._id}
                className="bg-white! rounded-[24px]! sm:rounded-[28px]! border! border-border! p-5! sm:p-6! shadow-level-1! flex! flex-col! sm:flex-row! sm:items-center! justify-between! gap-4! transition-all! hover:border-[#dcd9d9]!"
              >
                <div className="flex! items-start! sm:items-center! gap-4!">
                  <div className="w-12! h-12! rounded-[16px]! bg-[#f6f3f2]! border! border-border! flex! items-center! justify-center! shrink-0!">
                    {payment.paymentMethod === "CARD" ? (
                      <CreditCardOutlined className="text-xl! text-[#5433eb]!" />
                    ) : (
                      <DollarOutlined className="text-xl! text-[#5433eb]!" />
                    )}
                  </div>

                  <div className="flex! flex-col! gap-0.5!">
                    <div className="flex! flex-wrap! items-center! gap-2!">
                      <span className="text-sm! sm:text-base! font-semibold! text-text-primary! tracking-[-0.03em]!">
                        Order #{payment.orderNumber}
                      </span>

                      {isPaid ? (
                        <span className="inline-flex! items-center! gap-1! text-[11px]! font-semibold! text-[#137333]! bg-[#e6f4ea]! px-2.5! py-0.5! rounded-full!">
                          <CheckCircleFilled className="text-[10px]!" />
                          Paid
                        </span>
                      ) : (
                        <span className="inline-flex! items-center! gap-1! text-[11px]! font-semibold! text-[#b45309]! bg-[#fef3c7]! px-2.5! py-0.5! rounded-full!">
                          <ClockCircleFilled className="text-[10px]!" />
                          Pending at Delivery
                        </span>
                      )}
                    </div>

                    <p className="text-xs! text-text-secondary! m-0!">
                      {itemSummary}
                    </p>

                    <div className="flex! items-center! gap-3! text-[11px]! text-text-secondary! mt-1!">
                      <span>
                        {formattedDate} {formattedTime && `at ${formattedTime}`}
                      </span>
                      <span>·</span>
                      <span className="font-medium! text-text-primary!">
                        {payment.paymentMethod === "CARD"
                          ? "Card Online"
                          : "Cash on Delivery (COD)"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex! sm:flex-col! items-end! justify-between! sm:justify-center! pt-3! sm:pt-0! border-t! sm:border-t-0! border-[#f0eded]!">
                  <span className="text-xs! text-text-secondary! sm:mb-0.5!">
                    {isPaid ? "Amount Paid" : "Cash Due"}
                  </span>
                  <span className="text-base! sm:text-lg! font-bold! text-text-primary! tracking-[-0.03em]!">
                    ${Number(payment.total || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
