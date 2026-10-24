import React, { useRef, useState } from "react";
import { Carousel, Button } from "antd";
import {
  ArrowRightOutlined,
  CompassOutlined,
  LeftOutlined,
  RightOutlined,
  ThunderboltFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import heroApparelImg from "../../assets/images/hero_apparel.jpg";
import heroShoesImg from "../../assets/images/hero_shoes.jpg";
import heroKidsImg from "../../assets/images/hero_kids.jpg";

const slides = [
  {
    id: 1,
    image: heroApparelImg,
    badge: "NEW SEASON · MEN & WOMEN",
    titlePrimary: "Elevated Apparel for",
    titleSecondary: "Men & Women",
    description:
      "Deliberate simplicity meets artisan craft. Discover organic cotton tees, tailored jackets, and versatile daily uniforms engineered for modern lifestyles.",
    primaryCta: "Shop Apparel",
    primaryLink: "/products",
    secondaryCta: "Explore Men",
    secondaryLink: "/collections/men",
    tabLabel: "Apparel · Men & Women",
    tagline: "100% GOTS Organic Cottons",
  },
  {
    id: 2,
    image: heroShoesImg,
    badge: "FOOTWEAR SPOTLIGHT · SNEAKERS & BOOTS",
    titlePrimary: "Engineered Footwear &",
    titleSecondary: "Urban Sneakers",
    description:
      "Step into all-day ergonomic comfort. Hand-finished Italian suede, shock-absorbing responsive soles, and weatherproof construction for street to studio.",
    primaryCta: "Explore Footwear",
    primaryLink: "/products?category=Shoes%20%26%20Footwear",
    secondaryCta: "Explore Women",
    secondaryLink: "/collections/women",
    tabLabel: "Footwear & Shoes",
    tagline: "Ergonomic Cushion Soles",
  },
  {
    id: 3,
    image: heroKidsImg,
    badge: "PLAYFUL & DURABLE · KIDS EDITION",
    titlePrimary: "Thoughtful Clothes &",
    titleSecondary: "Shoes for Kids",
    description:
      "Gentle on sensitive skin and built for non-stop adventures. Breathable organic fabrics, easy-wash materials, and scuff-resistant everyday shoes.",
    primaryCta: "Discover Kids",
    primaryLink: "/collections/kids",
    secondaryCta: "Browse All",
    secondaryLink: "/products",
    tabLabel: "Kids Collection",
    tagline: "Adventure-Ready Materials",
  },
];

export default function Hero() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (current) => {
    setActiveSlide(current);
  };

  const goToSlide = (index) => {
    if (carouselRef.current) {
      carouselRef.current.goTo(index);
    }
  };

  return (
    <section className="relative! w-full! -mt-[74px]! sm:-mt-[78px]! pb-0!">
      {/* Hero Outer Wrapper extending all the way behind the navbar to eliminate white space */}
      <div className="relative! w-full! h-screen! rounded-none! overflow-hidden! shadow-md!">
        {/* Ant Design Carousel Component */}
        <Carousel
          ref={carouselRef}
          autoplay
          autoplaySpeed={5000}
          effect="fade"
          dots={false}
          beforeChange={(_, next) => handleSlideChange(next)}
          className="h-full! [&_.slick-slider]:h-full! [&_.slick-list]:h-full! [&_.slick-track]:h-full!"
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative! w-full! h-screen! outline-none!"
            >
              {/* Slide Background Image */}
              <img
                src={slide.image}
                alt={slide.tabLabel}
                className="absolute! inset-0! w-full! h-full! object-cover! object-center! scale-102! transition-transform! duration-1000!"
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* Seamless Editorial Dark Scrim with Gradient */}
              <div className="absolute! inset-0! bg-gradient-to-t! from-black/92! via-black/65! via-50%! to-black/45! sm:bg-gradient-to-r! sm:from-black/92! sm:from-25%! sm:via-black/70! sm:via-60%! sm:to-black/35!" />
              <div className="absolute! inset-0! bg-radial! from-transparent! via-black/15! to-black/65! pointer-events-none!" />

              {/* Decorative Brand Accent Glow */}
              <div className="absolute! top-1/4! left-1/6! w-72! h-72! bg-[#5433eb]/20! rounded-full! blur-[100px]! pointer-events-none!" />

              {/* Content Layer Inside Slide - Padded top so content sits perfectly below floating navbar */}
              <div className="relative! z-10! w-full! h-full! flex! flex-col! justify-center! pt-20! sm:pt-24! lg:pt-26! pb-14! px-5! sm:px-10! lg:px-16! max-w-7xl! mx-auto!">
                <div className="max-w-2xl! flex! flex-col! items-start! gap-2! sm:gap-2.5!">
                  {/* Live Kicker Pill */}
                  <motion.div
                    key={`kicker-${activeSlide}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex! items-center! gap-2! px-3! py-1! rounded-full! bg-white/12! backdrop-blur-md! border! border-white/20! text-white!"
                  >
                    <span className="relative! flex! h-2! w-2!">
                      <span className="animate-ping! absolute! inline-flex! h-full! w-full! rounded-full! bg-[#a594fd]! opacity-75!" />
                      <span className="relative! inline-flex! rounded-full! h-2! w-2! bg-[#5433eb]!" />
                    </span>
                    <span className="text-[10px]! sm:text-[11px]! font-bold! tracking-widest! uppercase! text-white/95!">
                      {slide.badge}
                    </span>
                  </motion.div>

                  {/* Master Slide Headline */}
                  <motion.h1
                    key={`heading-${activeSlide}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-2xl! sm:text-3xl! lg:text-[38px]! xl:text-[42px]! font-extrabold! text-white! leading-[1.15]! m-0! tracking-[-0.03em]!"
                  >
                    {slide.titlePrimary}{" "}
                    <span className="bg-gradient-to-r! from-white! via-white! to-white/75! bg-clip-text! text-transparent!">
                      {slide.titleSecondary}
                    </span>
                    <span className="text-[#a594fd]!">.</span>
                  </motion.h1>

                  {/* Value Proposition Description */}
                  <motion.p
                    key={`subcopy-${activeSlide}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xs! sm:text-sm! lg:text-[14px]! text-white/85! font-normal! leading-relaxed! max-w-xl! m-0!"
                  >
                    {slide.description}
                  </motion.p>

                  {/* Action CTAs */}
                  <motion.div
                    key={`actions-${activeSlide}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex! flex-row! flex-wrap! items-center! gap-2.5! sm:gap-3.5! pt-1.5!"
                  >
                    <Button
                      type="primary"
                      onClick={() => navigate(slide.primaryLink)}
                      icon={<ArrowRightOutlined className="text-xs!" />}
                      iconPosition="end"
                      className="rounded-full! bg-[#5433eb]! hover:bg-[#4324d4]! text-white! shadow-[0_4px_20px_rgba(84,51,235,0.45)]! text-xs! sm:text-sm! font-bold! px-5! sm:px-7! h-10! sm:h-11! border-0! inline-flex! items-center! justify-center! gap-2! transition-all! duration-300! active:scale-95! cursor-pointer!"
                    >
                      {slide.primaryCta}
                    </Button>

                    <Button
                      type="text"
                      onClick={() => navigate(slide.secondaryLink)}
                      icon={<CompassOutlined className="text-xs! sm:text-sm! text-white/90!" />}
                      className="rounded-full! bg-white/15! hover:bg-white/25! backdrop-blur-md! text-white! border! border-white/20! text-xs! sm:text-sm! font-semibold! px-4! sm:px-6! h-10! sm:h-11! inline-flex! items-center! justify-center! gap-2! transition-all! duration-300! cursor-pointer!"
                    >
                      {slide.secondaryCta}
                    </Button>
                  </motion.div>

                  {/* Quality Assurance Tagline */}
                  <div className="pt-1.5! flex! items-center! gap-2! text-white/70! text-[11px]! font-medium!">
                    <ThunderboltFilled className="text-[#a594fd]! text-xs!" />
                    <span>{slide.tagline}</span>
                    <span className="text-white/40!">·</span>
                    <span>Free express shipping over $75</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        {/* Carousel Prev/Next Quick Navigation Arrows (adjusted top so they don't collide with navbar) */}
        <div className="absolute! right-6! sm:right-10! top-22! sm:top-24! z-20! hidden! sm:flex! items-center! gap-1.5!">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => carouselRef.current?.prev()}
            className="w-8! h-8! rounded-full! bg-black/40! hover:bg-black/60! backdrop-blur-md! text-white! border! border-white/20! flex! items-center! justify-center! transition-all! cursor-pointer!"
          >
            <LeftOutlined className="text-xs!" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => carouselRef.current?.next()}
            className="w-8! h-8! rounded-full! bg-black/40! hover:bg-black/60! backdrop-blur-md! text-white! border! border-white/20! flex! items-center! justify-center! transition-all! cursor-pointer!"
          >
            <RightOutlined className="text-xs!" />
          </button>
        </div>

        {/* Floating Bottom Slide Switcher Tabs */}
        <div className="absolute! bottom-3! sm:bottom-3.5! inset-x-4! sm:inset-x-8! z-20! flex! items-center! justify-center!">
          <div className="bg-black/50! backdrop-blur-xl! border! border-white/15! rounded-full! p-1! sm:p-1.5! flex! items-center! gap-1! sm:gap-2! max-w-full! overflow-x-auto!">
            {slides.map((slide, idx) => {
              const isActive = activeSlide === idx;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`relative! flex! items-center! gap-2! px-3! sm:px-4! py-1.5! rounded-full! text-[11px]! sm:text-xs! font-bold! transition-all! duration-300! border-0! cursor-pointer! whitespace-nowrap! ${
                    isActive
                      ? "bg-white! text-[#1a1a1a]! shadow-sm!"
                      : "bg-transparent! text-white/75! hover:text-white! hover:bg-white/10!"
                  }`}
                >
                  <span
                    className={`w-1.5! h-1.5! rounded-full! transition-colors! ${
                      isActive ? "bg-[#5433eb]!" : "bg-white/40!"
                    }`}
                  />
                  <span>{slide.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
