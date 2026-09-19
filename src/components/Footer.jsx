import React from 'react'
import { Layout } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import logo from '../assets/logo/logo.png'

const { Footer: AntFooter } = Layout

const navigationGroups = [
  {
    title: 'SHOP',
    links: [
      { label: 'All Products', to: '/products' },
      { label: 'Featured Edition', to: '/featured' },
      { label: 'New Arrivals', to: '/new-arrivals' },
      { label: 'Studio Capsules', to: '/capsules' },
    ],
  },
  {
    title: 'ACCOUNT',
    links: [
      { label: 'Overview', to: '/account' },
      { label: 'Orders & Tracking', to: '/orders' },
      { label: 'Wishlist', to: '/wishlist' },
      { label: 'Saved Addresses', to: '/addresses' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'Philosophy', to: '/philosophy' },
      { label: 'Showrooms', to: '/showrooms' },
      { label: 'Materials', to: '/materials' },
      { label: 'Careers', to: '/careers' },
    ],
  },
  {
    title: 'HELP',
    links: [
      { label: 'Shipping & Returns', to: '/shipping-returns' },
      { label: 'Client Care', to: '/client-care' },
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Privacy Policy', to: '/privacy' },
    ],
  },
]

function Footer() {
  return (
    <AntFooter className="bg-surface! text-text-primary! border-t! border-border! px-6! sm:px-12! lg:px-16! py-12! lg:py-16! font-sans!">
      <div className="max-w-7xl! mx-auto!">
        {/* Main Content Grid */}
        <div className="grid! grid-cols-1! md:grid-cols-2! lg:grid-cols-6! gap-10! lg:gap-8! pb-12! sm:pb-16!">
          {/* Brand Column */}
          <div className="lg:col-span-2! flex! flex-col! gap-4! max-w-sm!">
            <Link to="/" className="inline-block! w-fit!">
              <img
                src={logo}
                alt="shop."
                className="h-7! w-auto! object-contain!"
              />
            </Link>
            <p className="text-sm! sm:text-[15px]! leading-relaxed! text-text-secondary! mt-1! font-normal!">
              Curated essentials and progressive commerce crafted for effortless modern living.
            </p>
          </div>

          {/* Navigation Link Columns */}
          <div className="lg:col-span-4! grid! grid-cols-2! sm:grid-cols-4! gap-8!">
            {navigationGroups.map((group) => (
              <div key={group.title} className="flex! flex-col! gap-3.5!">
                <h3 className="text-xs! font-semibold! tracking-wider! text-text-primary! uppercase! select-none! m-0!">
                  {group.title}
                </h3>
                <ul className="flex! flex-col! gap-2.5! p-0! m-0! list-none!">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm! text-[#5f6368]! hover:text-text-primary! transition-colors! duration-200! block!"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6! flex! flex-col! sm:flex-row! items-start! sm:items-center! justify-between! gap-4! text-xs! text-text-secondary!">
          {/* Copyright */}
          <p className="m-0! text-[#71717a]! font-normal!">
            © 2025 Shop Inc. All rights reserved.
          </p>
        </div>
      </div>
    </AntFooter>
  )
}

export default Footer