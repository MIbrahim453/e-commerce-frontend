import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightOutlined } from '@ant-design/icons'
import decorImg from '../../assets/images/category_decor.jpg'
import techImg from '../../assets/images/category_tech.jpg'
import kitchenImg from '../../assets/images/category_kitchen.jpg'
import workspaceImg from '../../assets/images/category_workspace.jpg'

const categories = [
  {
    id: 1,
    title: 'Living & Decor',
    count: '128 Curated Objects',
    image: decorImg,
    link: '/catalog?category=living-decor',
  },
  {
    id: 2,
    title: 'Audio & Sound',
    count: '46 Precision Devices',
    image: techImg,
    link: '/catalog?category=audio-sound',
  },
  {
    id: 3,
    title: 'Kitchen & Dining',
    count: '84 Table Essentials',
    image: kitchenImg,
    link: '/catalog?category=kitchen-dining',
  },
  {
    id: 4,
    title: 'Desk & Workspace',
    count: '62 Minimalist Tools',
    image: workspaceImg,
    link: '/catalog?category=desk-workspace',
  },
]

function ShopByCategory() {
  return (
    <section className="w-full! max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8! py-8! sm:py-12!">
      <div className="flex! flex-col! sm:flex-row! sm:items-baseline! justify-between! gap-2! mb-6! sm:mb-8!">
        <div className="flex! items-baseline! gap-3! sm:gap-4!">
          <h2 className="text-2xl! sm:text-3xl! font-semibold! text-text-primary! tracking-[-0.031em]! m-0!">
            Shop by Category
          </h2>
          <Link
            to="/catalog"
            className="text-primary! hover:text-primary/80! text-xs! sm:text-sm! font-medium! tracking-[-0.02em]! inline-flex! items-center! gap-1! transition-colors!"
          >
            <span>Explore all</span>
            <span>›</span>
          </Link>
        </div>
        <p className="text-text-secondary! text-xs! sm:text-sm! font-normal! m-0! tracking-[-0.01em]!">
          Curated aesthetics for elevated modern spaces
        </p>
      </div>
      <div className="grid! grid-cols-1! sm:grid-cols-2! lg:grid-cols-4! gap-5! sm:gap-6!">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-surface! rounded-card! p-3.5! sm:p-4! shadow-level-1! border! border-border! flex! flex-col! justify-between! transition-all! duration-300! hover:-translate-y-1! group! cursor-pointer!"
          >
            <div className="relative! w-full! aspect-4/3! sm:aspect-square! rounded-media! overflow-hidden! bg-canvas!">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full! h-full! object-cover! object-center! transition-transform! duration-500! group-hover:scale-105!"
              />
              <span className="absolute! bottom-3! left-3! bg-surface/90! backdrop-blur-xs! text-text-primary! text-[11px]! sm:text-xs! font-medium! px-3! py-1! rounded-full! shadow-xs! tracking-[-0.01em]!">
                {cat.count}
              </span>
            </div>
            <div className="flex! items-center! justify-between! pt-3.5! px-1! pb-1!">
              <div className="flex! flex-col! gap-0.5!">
                <h3 className="text-title-md! font-semibold! text-text-primary! tracking-[-0.031em]! m-0! group-hover:text-primary! transition-colors!">
                  {cat.title}
                </h3>
              </div>

              <div className="w-8! h-8! rounded-full! bg-canvas! group-hover:bg-primary! group-hover:text-on-primary! text-text-primary! flex! items-center! justify-center! transition-all! shadow-xs!">
                <ArrowRightOutlined className="text-xs! transition-transform! group-hover:translate-x-0.5!" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ShopByCategory
