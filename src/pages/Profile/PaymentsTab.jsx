import React from 'react'
import { CheckCircleFilled, ClockCircleFilled, DollarOutlined, SafetyCertificateOutlined } from '@ant-design/icons'

const codPaymentsData = [
  {
    id: 'COD-98241',
    orderId: 'LX-98241',
    date: 'Sep 19, 2026',
    time: '10:24 AM',
    method: 'Cash on Delivery (COD)',
    amount: 408.00,
    status: 'Pending at Delivery',
    statusType: 'pending',
    itemSummary: 'Studio Acoustic Headphones + 1 other item'
  },
  {
    id: 'COD-97150',
    orderId: 'LX-97150',
    date: 'Sep 17, 2026',
    time: '03:45 PM',
    method: 'Cash on Delivery (COD)',
    amount: 185.00,
    status: 'Pending at Delivery',
    statusType: 'pending',
    itemSummary: 'Custom Wireless Mechanical Keyboard'
  },
  {
    id: 'COD-96102',
    orderId: 'LX-96102',
    date: 'Sep 08, 2026',
    time: '01:12 PM',
    method: 'Cash on Delivery (COD)',
    amount: 240.00,
    status: 'Collected on Delivery',
    statusType: 'paid',
    itemSummary: 'Sculptural Brass Table Lamp'
  },
  {
    id: 'COD-93044',
    orderId: 'LX-93044',
    date: 'Aug 24, 2026',
    time: '09:30 AM',
    method: 'Cash on Delivery (COD)',
    amount: 136.00,
    status: 'Collected on Delivery',
    statusType: 'paid',
    itemSummary: 'Minimalist Ceramic Carafe (Qty: 2)'
  }
]

export default function PaymentsTab() {
  const totalAmount = codPaymentsData.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="flex! flex-col! gap-6!">
      <div className="flex! flex-col! sm:flex-row! sm:items-center! justify-between! gap-4!">
        <div>
          <h2 className="text-xl! sm:text-2xl! font-semibold! text-text-primary! tracking-[-0.04em]! m-0!">
            Payments
          </h2>
          <p className="text-xs! sm:text-sm! text-text-secondary! m-0! mt-1!">
            Cash on Delivery (COD) payment history and order settlement records
          </p>
        </div>

        <div className="flex! items-center! gap-2! bg-white! border! border-border! px-4! py-2! rounded-full! shadow-xs!">
          <span className="text-xs! text-text-secondary!">Total Order Value:</span>
          <span className="text-sm! font-bold! text-text-primary!">${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="p-4! sm:p-5! rounded-[20px]! bg-[#fcf9f8]! border! border-[#ebebeb]! flex! items-center! gap-3.5!">
        <div className="w-10! h-10! rounded-full! bg-[#e4dfff]! text-[#5433eb]! flex! items-center! justify-center! shrink-0!">
          <DollarOutlined className="text-lg!" />
        </div>
        <div>
          <h4 className="text-xs! sm:text-sm! font-semibold! text-text-primary! m-0!">
            Cash on Delivery (COD) Policy
          </h4>
          <p className="text-[11px]! sm:text-xs! text-text-secondary! m-0! mt-0.5!">
            Payments are collected in cash directly upon receipt of your package. No online card details required.
          </p>
        </div>
      </div>

      <div className="flex! flex-col! gap-4!">
        {codPaymentsData.map(payment => (
          <div
            key={payment.id}
            className="bg-white! rounded-[24px]! sm:rounded-[28px]! border! border-border! p-5! sm:p-6! shadow-level-1! flex! flex-col! sm:flex-row! sm:items-center! justify-between! gap-4! transition-all! hover:border-[#dcd9d9]!"
          >
            <div className="flex! items-start! sm:items-center! gap-4!">
              <div className="w-12! h-12! rounded-[16px]! bg-[#f6f3f2]! border! border-border! flex! items-center! justify-center! shrink-0!">
                <DollarOutlined className="text-xl! text-[#5433eb]!" />
              </div>

              <div className="flex! flex-col! gap-0.5!">
                <div className="flex! flex-wrap! items-center! gap-2!">
                  <span className="text-sm! sm:text-base! font-semibold! text-text-primary! tracking-[-0.03em]!">
                    {payment.id}
                  </span>
                  <span className="text-xs! text-text-secondary!">
                    · Order #{payment.orderId}
                  </span>
                  {payment.statusType === 'paid' ? (
                    <span className="inline-flex! items-center! gap-1! text-[11px]! font-semibold! text-[#137333]! bg-[#e6f4ea]! px-2.5! py-0.5! rounded-full!">
                      <CheckCircleFilled className="text-[10px]!" />
                      {payment.status}
                    </span>
                  ) : (
                    <span className="inline-flex! items-center! gap-1! text-[11px]! font-semibold! text-[#b45309]! bg-[#fef3c7]! px-2.5! py-0.5! rounded-full!">
                      <ClockCircleFilled className="text-[10px]!" />
                      {payment.status}
                    </span>
                  )}
                </div>

                <p className="text-xs! text-text-secondary! m-0!">
                  {payment.itemSummary}
                </p>

                <div className="flex! items-center! gap-3! text-[11px]! text-text-secondary! mt-1!">
                  <span>{payment.date} at {payment.time}</span>
                  <span>·</span>
                  <span className="font-medium! text-text-primary!">{payment.method}</span>
                </div>
              </div>
            </div>

            <div className="flex! sm:flex-col! items-end! justify-between! sm:justify-center! pt-3! sm:pt-0! border-t! sm:border-t-0! border-[#f0eded]!">
              <span className="text-xs! text-text-secondary! sm:mb-0.5!">COD Cash Due</span>
              <span className="text-base! sm:text-lg! font-bold! text-text-primary! tracking-[-0.03em]!">
                ${payment.amount.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
