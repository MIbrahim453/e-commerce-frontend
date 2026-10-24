import React from "react";
import Hero from "./Hero";
import TrendingProducts from "./TrendingProducts";
import ShopByCategory from "./ShopByCategory";
import BrandStory from "./BrandStory";
import Testimonials from "./Testimonials";
import Features from "./Features";
import CTA from "./CTA";

function Home() {
  return (
    <div className="flex! flex-col! gap-4! sm:gap-6! pb-12!">
      <Hero />
      <TrendingProducts />
      <ShopByCategory />
      <BrandStory />
      <Testimonials />
      <Features />
      <CTA />
    </div>
  );
}

export default Home;
