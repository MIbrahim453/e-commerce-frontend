import React, { useState } from 'react'
import { 
  ShoppingOutlined, 
  UserOutlined, 
  CreditCardOutlined
} from '@ant-design/icons'

import ProfileHeader from './ProfileHeader'
import OrdersTab from './OrdersTab'
import PersonalInfoTab from './PersonalInfoTab'
import PaymentsTab from './PaymentsTab'

const tabs = [
  { key: 'orders', label: 'Orders & Shipments', icon: ShoppingOutlined, badge: 4 },
  { key: 'info', label: 'Account Details', icon: UserOutlined },
  { key: 'payments', label: 'Payments', icon: CreditCardOutlined },
]

export default function CustomerProfile() {
  const [activeTab, setActiveTab] = useState('orders')

  return (
    <div className="min-h-screen! bg-canvas! py-6! sm:py-10! px-4! sm:px-8! lg:px-12!">
      <div className="max-w-7xl! mx-auto!">
        <ProfileHeader onEditClick={() => setActiveTab('info')} />

        <div className="flex! items-center! gap-2.5! overflow-x-auto! pb-3! mb-8! no-scrollbar!">
          {tabs.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full! px-5! py-2.5! text-xs! sm:text-sm! font-semibold! tracking-[-0.02em]! transition-all! whitespace-nowrap! cursor-pointer! border! flex! items-center! gap-2! shrink-0! ${
                  isActive
                    ? 'bg-[#1a1a1a]! text-white! border-transparent! shadow-sm!'
                    : 'bg-white! text-text-primary! border-border! hover:bg-white/80! hover:border-[#dcd9d9]!'
                }`}
              >
                <Icon className={isActive ? 'text-white!' : 'text-[#5433eb]!'} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[11px]! px-2! py-0.5! rounded-full! font-bold! ${
                    isActive ? 'bg-white/20! text-white!' : 'bg-canvas! text-text-secondary!'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="transition-opacity! duration-200!">
          {activeTab === 'orders' && <OrdersTab />}
          {activeTab === 'info' && <PersonalInfoTab />}
          {activeTab === 'payments' && <PaymentsTab />}
        </div>
      </div>
    </div>
  )
}
