import React from 'react'
import Hero from './Hero'
import Features from './Features'
import TrendingProducts from './TrendingProducts'
import ShopByCategory from './ShopByCategory'
import Testimonials from './Testimonials'
import CTA from './CTA'

function Home() {
  return (
    <div className="flex! flex-col! gap-4! sm:gap-8! pb-12!">
      <Hero />
      <TrendingProducts />
      <ShopByCategory />
      <Testimonials />
      <Features />
      <CTA />
    </div>
  )
}

export default Home
