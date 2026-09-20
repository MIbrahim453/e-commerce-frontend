import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { 
  CheckCircleOutlined, 
  CarOutlined, 
  EyeOutlined,
  CalendarOutlined
} from '@ant-design/icons'

import carafeImg from '../../assets/images/carafe.jpg'
import headphonesImg from '../../assets/images/headphones.jpg'
import keyboardImg from '../../assets/images/keyboard.jpg'
import lampImg from '../../assets/images/lamp.jpg'

const ordersData = [
  {
    id: 'LX-98241',
    date: 'September 19, 2026',
    status: 'In Transit',
    statusType: 'transit',
    estimatedDate: 'September 22, 2026',
    total: 408.00,
    items: [
      {
        id: 1,
        title: 'Studio Acoustic Headphones',
        category: 'Audio & Acoustics',
        price: 340.00,
        quantity: 1,
        image: headphonesImg
      },
      {
        id: 2,
        title: 'Minimalist Ceramic Carafe',
        category: 'Kitchen & Tableware',
        price: 68.00,
        quantity: 1,
        image: carafeImg
      }
    ]
  },
  {
    id: 'LX-97150',
    date: 'September 17, 2026',
    status: 'In Transit',
    statusType: 'transit',
    estimatedDate: 'September 24, 2026',
    total: 185.00,
    items: [
      {
        id: 3,
        title: 'Custom Wireless Mechanical Keyboard',
        category: 'Workspace Tech',
        price: 185.00,
        quantity: 1,
        image: keyboardImg
      }
    ]
  },
  {
    id: 'LX-96102',
    date: 'September 08, 2026',
    status: 'Delivered',
    statusType: 'delivered',
    estimatedDate: 'September 11, 2026',
    total: 240.00,
    items: [
      {
        id: 4,
        title: 'Sculptural Brass Table Lamp',
        category: 'Lighting',
        price: 240.00,
        quantity: 1,
        image: lampImg
      }
    ]
  },
  {
    id: 'LX-93044',
    date: 'August 24, 2026',
    status: 'Delivered',
    statusType: 'delivered',
    estimatedDate: 'August 27, 2026',
    total: 136.00,
    items: [
      {
        id: 5,
        title: 'Minimalist Ceramic Carafe',
        category: 'Kitchen & Tableware',
        price: 68.00,
        quantity: 2,
        image: carafeImg
      }
    ]
  }
]

export default function OrdersTab() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)

  const filterTabs = [
    { key: 'all', label: 'All Orders', count: 4 },
    { key: 'transit', label: 'In Transit', count: 2 },
    { key: 'delivered', label: 'Delivered', count: 2 },
  ]

  const filteredOrders = ordersData.filter(order => {
    if (activeFilter === 'all') return true
    return order.statusType === activeFilter
  })

  return (
    <div className="flex! flex-col! gap-6!">
      <div className="flex! flex-wrap! items-center! justify-between! gap-4! pb-2!">
        <div className="flex! flex-wrap! items-center! gap-2!">
          {filterTabs.map(tab => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`rounded-full! px-4! py-2! text-xs! sm:text-sm! font-semibold! tracking-[-0.02em]! transition-all! cursor-pointer! border! flex! items-center! gap-2! ${
                activeFilter === tab.key
                  ? 'bg-[#1a1a1a]! text-white! border-transparent! shadow-sm!'
                  : 'bg-white! text-text-primary! border-border! hover:bg-canvas!'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[11px]! px-2! py-0.5! rounded-full! font-bold! ${
                activeFilter === tab.key ? 'bg-white/20! text-white!' : 'bg-canvas! text-text-secondary!'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <span className="text-xs! text-text-secondary! font-medium!">
          Showing {filteredOrders.length} of {ordersData.length} orders
        </span>
      </div>

      <div className="flex! flex-col! gap-5!">
        {filteredOrders.map(order => (
          <div 
            key={order.id}
            className="bg-white! rounded-[24px]! sm:rounded-[28px]! border! border-border! p-5! sm:p-7! shadow-level-1! transition-all! hover:border-[#dcd9d9]!"
          >
            <div className="flex! flex-col! sm:flex-row! sm:items-center! justify-between! gap-4! pb-4! border-b! border-border!">
              <div className="flex! flex-wrap! items-center! gap-3!">
                <span className="text-base! sm:text-lg! font-semibold! text-text-primary! tracking-[-0.03em]!">
                  Order #{order.id}
                </span>
                <span className="text-xs! text-text-secondary! font-medium!">
                  Placed on {order.date}
                </span>
              </div>

              <div className="flex! items-center! gap-3!">
                {order.statusType === 'transit' ? (
                  <span className="inline-flex! items-center! gap-1.5! bg-[#e4dfff]! text-[#5433eb]! px-3! py-1! rounded-full! text-xs! font-semibold! tracking-[-0.02em]!">
                    <CarOutlined className="text-xs!" />
                    {order.status}
                  </span>
                ) : (
                  <span className="inline-flex! items-center! gap-1.5! bg-[#e6f4ea]! text-[#137333]! px-3! py-1! rounded-full! text-xs! font-semibold! tracking-[-0.02em]!">
                    <CheckCircleOutlined className="text-xs!" />
                    {order.status}
                  </span>
                )}
                <span className="text-base! sm:text-lg! font-semibold! text-text-primary! tracking-[-0.03em]!">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-4! p-3.5! sm:p-4! bg-[#fcf9f8]! rounded-[16px]! border! border-[#ebebeb]! flex! items-center! justify-between!">
              <div className="flex! items-center! gap-2.5! text-xs! sm:text-sm! text-text-primary! font-medium!">
                <CalendarOutlined className="text-[#5433eb]! text-sm!" />
                <span className="text-text-secondary!">
                  {order.statusType === 'transit' ? 'Estimated Date:' : 'Delivered Date:'}
                </span>
                <span className="font-semibold! text-text-primary!">
                  {order.estimatedDate}
                </span>
              </div>
            </div>

            <div className="flex! flex-col! gap-4! my-5!">
              {order.items.map(item => (
                <div key={item.id} className="flex! items-center! justify-between! gap-4!">
                  <div className="flex! items-center! gap-4!">
                    <div className="w-16! h-16! sm:w-20! sm:h-20! rounded-[18px]! overflow-hidden! bg-[#f6f3f2]! border! border-border! shrink-0!">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full! h-full! object-cover! object-center!"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm! sm:text-base! font-semibold! text-text-primary! m-0! tracking-[-0.03em]!">
                        {item.title}
                      </h4>
                      <p className="text-xs! text-text-secondary! m-0! mt-0.5!">
                        {item.category}
                      </p>
                      <span className="text-xs! text-text-secondary! font-medium! mt-1! inline-block!">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm! sm:text-base! font-semibold! text-text-primary! shrink-0!">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex! items-center! justify-between! pt-4! border-t! border-border!">
              <div className="text-xs! text-text-secondary!">
                {order.items.length} item{order.items.length > 1 ? 's' : ''} in order
              </div>

              <div>
                <Button
                  type="text"
                  onClick={() => setSelectedOrder(order)}
                  className="rounded-full! bg-white! border! border-border! hover:bg-canvas! hover:border-text-primary! text-text-primary! text-xs! font-semibold! px-5! h-9! flex! items-center! gap-1.5!"
                >
                  <EyeOutlined /> Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title={
          <span className="font-semibold! text-base! text-text-primary!">
            Order Details {selectedOrder ? `(#${selectedOrder.id})` : ''}
          </span>
        }
        open={!!selectedOrder}
        onCancel={() => setSelectedOrder(null)}
        footer={[
          <Button
            key="close"
            type="primary"
            onClick={() => setSelectedOrder(null)}
            className="rounded-full! bg-[#1a1a1a]! text-white! border-0! px-6!"
          >
            Close
          </Button>
        ]}
        styles={{ body: { padding: '20px 0' } }}
      >
        {selectedOrder && (
          <div className="flex! flex-col! gap-4!">
            <div className="bg-[#fcf9f8]! p-4! rounded-[16px]! border! border-border!">
              <div className="flex! items-center! justify-between! mb-1!">
                <span className="text-xs! text-text-secondary!">Status</span>
                <span className={`text-xs! font-semibold! ${
                  selectedOrder.statusType === 'transit' ? 'text-[#5433eb]!' : 'text-[#137333]!'
                }`}>
                  {selectedOrder.status}
                </span>
              </div>
              <div className="flex! items-center! justify-between! mb-1!">
                <span className="text-xs! text-text-secondary!">Estimated Date</span>
                <span className="text-xs! font-semibold! text-text-primary!">{selectedOrder.estimatedDate}</span>
              </div>
              <div className="flex! items-center! justify-between!">
                <span className="text-xs! text-text-secondary!">Payment Method</span>
                <span className="text-xs! font-semibold! text-[#5433eb]!">Cash on Delivery (COD)</span>
              </div>
            </div>

            <div className="flex! flex-col! gap-3!">
              <span className="text-xs! font-semibold! text-text-secondary! uppercase! tracking-wider!">Items</span>
              {selectedOrder.items.map(item => (
                <div key={item.id} className="flex! items-center! justify-between! gap-3!">
                  <div className="flex! items-center! gap-3!">
                    <img src={item.image} alt={item.title} className="w-12! h-12! rounded-[12px]! object-cover!" />
                    <div>
                      <div className="text-xs! font-semibold! text-text-primary!">{item.title}</div>
                      <div className="text-[11px]! text-text-secondary!">Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <span className="text-xs! font-semibold! text-text-primary!">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-3! border-t! border-border! flex! items-center! justify-between!">
              <span className="text-sm! font-semibold! text-text-primary!">Total Due (COD)</span>
              <span className="text-base! font-bold! text-text-primary!">${selectedOrder.total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
