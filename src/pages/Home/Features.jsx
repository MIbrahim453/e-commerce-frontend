import React from 'react'
import {
  ThunderboltOutlined,
  UndoOutlined,
  InboxOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons'

const features = [
  {
    id: 1,
    icon: <ThunderboltOutlined className="text-primary! text-lg! sm:text-xl!" />,
    title: 'Next-Day Delivery',
    description: 'Express courier fulfillment directly from local hubs.',
  },
  {
    id: 2,
    icon: <UndoOutlined className="text-primary! text-lg! sm:text-xl!" />,
    title: '30-Day Returns',
    description: 'Guaranteed hassle-free returns with home pickup.',
  },
  {
    id: 3,
    icon: <InboxOutlined className="text-primary! text-lg! sm:text-xl!" />,
    title: 'Carbon-Neutral Packaging',
    description: '100% recyclable, plastic-free pulp containers.',
  },
  {
    id: 4,
    icon: <CustomerServiceOutlined className="text-primary! text-lg! sm:text-xl!" />,
    title: '24/7 Concierge',
    description: 'Dedicated client advisors ready at any moment.',
  },
]

function Features() {
  return (
    <section className="w-full! max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8! py-6! sm:py-8!">
      <div className="bg-surface! rounded-card! p-8! sm:p-10! lg:p-12! shadow-level-1! border! border-border!">
        <div className="grid! grid-cols-1! sm:grid-cols-2! lg:grid-cols-4! gap-8! sm:gap-10!">
          {features.map((item) => (
            <div
              key={item.id}
              className="flex! flex-col! items-center! text-center! gap-3! group!"
            >
              <div className="w-12! h-12! sm:w-14! sm:h-14! rounded-full! bg-canvas! flex! items-center! justify-center! transition-transform! duration-300! group-hover:scale-110!">
                {item.icon}
              </div>
              <h3 className="text-title-md! font-semibold! text-text-primary! tracking-[-0.02em]! m-0!">
                {item.title}
              </h3>
              <p className="text-xs! sm:text-sm! text-text-secondary! font-normal! leading-relaxed! m-0! max-w-[210px]!">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
