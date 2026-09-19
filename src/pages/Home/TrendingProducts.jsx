import React from 'react'
import { Link } from 'react-router-dom'
import {
    HeartOutlined,
    LeftOutlined,
    RightOutlined,
    DoubleLeftOutlined
} from '@ant-design/icons'
import keyboardImg from '../../assets/images/keyboard.jpg'
import carafeImg from '../../assets/images/carafe.jpg'
import headphonesImg from '../../assets/images/headphones.jpg'
import lampImg from '../../assets/images/lamp.jpg'

const trendingProducts = [
    {
        id: 1,
        tag: '-25% OFF',
        subtitle: 'Studio Silver',
        name: 'Linear Aluminum Mechanical Keyboard',
        price: '$180',
        originalPrice: '$240',
        image: keyboardImg,
    },
    {
        id: 2,
        tag: '-25% OFF',
        subtitle: 'Chalk White',
        name: 'Nordic Ceramic Pour-Over Carafe',
        price: '$42',
        originalPrice: '$56',
        image: carafeImg,
    },
    {
        id: 3,
        tag: '-20% OFF',
        subtitle: 'Obsidian Black',
        name: 'Noise-Cancelling Over-Ear Headphones',
        price: '$290',
        originalPrice: '$360',
        image: headphonesImg,
    },
    {
        id: 4,
        tag: '-23% OFF',
        subtitle: 'Sand Dune',
        name: 'Sculptural Matte Table Lamp',
        price: '$115',
        originalPrice: '$150',
        image: lampImg,
    },
]

function TrendingProducts() {
    return (
        <section className="w-full! max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8! py-8! sm:py-12!">
            <div className="flex! items-center! justify-between! mb-6! sm:mb-8!">
                <div className="flex! items-baseline! gap-3! sm:gap-4!">
                    <h2 className="text-2xl! sm:text-3xl! font-semibold! text-text-primary! tracking-[-0.031em]! m-0!">
                        Trending Deals
                    </h2>
                    <Link
                        to="/catalog"
                        className="text-primary! hover:text-primary/80! text-xs! sm:text-sm! font-medium! tracking-[-0.02em]! inline-flex! items-center! gap-1! transition-colors!"
                    >
                        <span>View all (48)</span>
                        <span>›</span>
                    </Link>
                </div>
                <div className="flex! items-center! gap-2!">
                    <button
                        type="button"
                        aria-label="Previous slide"
                        className="w-8! h-8! sm:w-9! sm:h-9! rounded-full! border! border-border! bg-surface! text-text-primary! flex! items-center! justify-center! hover:bg-canvas! transition-colors! cursor-pointer!"
                    >
                        <LeftOutlined className="text-xs! text-text-primary!" />
                    </button>
                    <button
                        type="button"
                        aria-label="Next slide"
                        className="w-8! h-8! sm:w-9! sm:h-9! rounded-full! border! border-border! bg-surface! text-text-primary! flex! items-center! justify-center! hover:bg-canvas! transition-colors! cursor-pointer!"
                    >
                        <RightOutlined className="text-xs! text-text-primary!" />
                    </button>
                </div>
            </div>

            <div className="grid! grid-cols-1! sm:grid-cols-2! lg:grid-cols-4! gap-5! sm:gap-6!">
                {trendingProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-surface! rounded-card! p-3.5! sm:p-4! shadow-level-1! border! border-border! flex! flex-col! justify-between! transition-all! duration-300! hover:-translate-y-1!"
                    >
                        <div className="relative! w-full! aspect-4/3! sm:aspect-square! rounded-media! overflow-hidden! bg-canvas!">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full! h-full! object-cover! object-center! transition-transform! duration-500! hover:scale-105!"
                            />
                            <span className="absolute! top-3! left-3! bg-surface/95! backdrop-blur-xs! text-text-primary! text-[11px]! sm:text-xs! font-bold! px-2.5! py-1! rounded-full! shadow-xs! tracking-[-0.02em]!">
                                {product.tag}
                            </span>
                        </div>
                        <div className="pt-3.5! px-1! pb-1! flex! flex-col! gap-1!">
                            <span className="text-label-sm! text-text-secondary! font-normal! tracking-[-0.01em]!">
                                {product.subtitle}
                            </span>
                            <h3
                                title={product.name}
                                className="text-title-md! font-semibold! text-text-primary! tracking-[-0.031em]! m-0! truncate!"
                            >
                                {product.name}
                            </h3>
                        </div>
                        <div className="flex! items-center! justify-between! pt-2! px-1!">
                            <div className="flex! items-baseline! gap-1.5!">
                                <span className="text-title-md! sm:text-lg! font-semibold! text-text-primary! tracking-[-0.02em]!">
                                    {product.price}
                                </span>
                                <span className="text-xs! sm:text-sm! text-text-secondary! line-through! font-normal!">
                                    {product.originalPrice}
                                </span>
                            </div>

                            <button
                                type="button"
                                aria-label="View product details"
                                className="w-8! h-8! rounded-full! bg-canvas! hover:bg-[#eae7e7]! text-text-primary!"
                            >
                                <DoubleLeftOutlined />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default TrendingProducts