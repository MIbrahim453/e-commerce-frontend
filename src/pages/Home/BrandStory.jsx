import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircleFilled,
  ArrowRightOutlined,
  SkinOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import craftImg from "../../assets/images/apparel_shoe_craft.jpg";

export default function BrandStory() {
  return (
    <section className="w-full! max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8! py-8! sm:py-12!">
      <div className="bg-surface! rounded-2xl! sm:rounded-[28px]! p-6! sm:p-8! lg:p-12! shadow-level-1! border! border-border! overflow-hidden!">
        <div className="grid! grid-cols-1! lg:grid-cols-12! gap-8! lg:gap-12! items-center!">
          {/* Left Column: Authentic Atelier Workshop Photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5! relative!"
          >
            <div className="relative! w-full! aspect-[4/3.5]! sm:aspect-[4/3.8]! rounded-2xl! overflow-hidden! shadow-md!">
              <img
                src={craftImg}
                alt="Apparel and footwear crafting atelier"
                className="w-full! h-full! object-cover! object-center! transition-transform! duration-700! hover:scale-104!"
              />
              <div className="absolute! inset-0! bg-gradient-to-t! from-black/80! via-black/20! to-transparent!" />

              {/* Inset Atelier Provenance Badge */}
              <div className="absolute! bottom-3.5! inset-x-3.5! p-3! rounded-xl! bg-white/15! backdrop-blur-md! border! border-white/25! text-white! flex! items-center! gap-3!">
                <div className="w-8! h-8! rounded-full! bg-[#5433eb]! flex! items-center! justify-center! shrink-0! shadow-xs!">
                  <SkinOutlined className="text-white! text-sm!" />
                </div>
                <div className="min-w-0!">
                  <p className="text-[10px]! font-bold! uppercase! tracking-wider! text-[#a594fd]! m-0!">
                    Precision Manufacturing
                  </p>
                  <p className="text-xs! text-white/95! m-0! truncate! font-medium!">
                    Artisanal stitching, leatherwork & organic textiles
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Top Quality Seal */}
            <div className="absolute! -top-2.5! -right-2.5! hidden! sm:flex! items-center! gap-2! px-3! py-1! rounded-full! bg-white! border! border-border! shadow-sm! text-xs! font-bold! text-[#1a1a1a]!">
              <CheckCircleFilled className="text-emerald-500! text-xs!" />
              <span>Certified Handcrafted</span>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7! flex! flex-col! items-start! gap-3.5! sm:gap-4.5!"
          >
            <div className="inline-flex! items-center! gap-2! px-3! py-1! rounded-full! bg-canvas! border! border-border!">
              <span className="w-1.5! h-1.5! rounded-full! bg-[#5433eb]!" />
              <span className="text-[11px]! font-bold! tracking-wider! uppercase! text-text-secondary!">
                Apparel & Footwear Craft
              </span>
            </div>

            <h2 className="text-2xl! sm:text-3xl! lg:text-[36px]! font-extrabold! text-text-primary! tracking-[-0.035em]! leading-[1.14]! m-0!">
              Engineered to endure.
              <br />
              Tailored clothing & precision footwear<span className="text-[#5433eb]!">.</span>
            </h2>

            <p className="text-xs! sm:text-sm! lg:text-[15px]! text-text-secondary! font-normal! leading-relaxed! m-0!">
              We focus strictly on the essentials: high-durability apparel and ergonomic footwear for men, women, and kids. Every piece is constructed with certified organic yarns, double-stitched stress points, and abrasion-resistant soles built to hold up to years of real life.
            </p>

            {/* Three Pillar Metrics */}
            <div className="grid! grid-cols-1! sm:grid-cols-3! gap-3! sm:gap-4! w-full! pt-1! pb-1!">
              <div className="p-3.5! rounded-xl! bg-canvas! border! border-border! flex! flex-col! gap-0.5!">
                <span className="text-xl! sm:text-2xl! font-extrabold! text-[#1a1a1a]! tracking-tight!">
                  100%
                </span>
                <span className="text-xs! font-semibold! text-text-primary!">
                  Organic & Recycled
                </span>
                <span className="text-[11px]! text-text-secondary! leading-tight!">
                  Certified GOTS cottons & natural leathers.
                </span>
              </div>

              <div className="p-3.5! rounded-xl! bg-canvas! border! border-border! flex! flex-col! gap-0.5!">
                <span className="text-xl! sm:text-2xl! font-extrabold! text-[#1a1a1a]! tracking-tight!">
                  Triple-Stitch
                </span>
                <span className="text-xs! font-semibold! text-text-primary!">
                  Reinforced Build
                </span>
                <span className="text-[11px]! text-text-secondary! leading-tight!">
                  Engineered seams & cushioned soles.
                </span>
              </div>

              <div className="p-3.5! rounded-xl! bg-canvas! border! border-border! flex! flex-col! gap-0.5!">
                <span className="text-xl! sm:text-2xl! font-extrabold! text-[#1a1a1a]! tracking-tight!">
                  All Ages
                </span>
                <span className="text-xs! font-semibold! text-text-primary!">
                  Men, Women & Kids
                </span>
                <span className="text-[11px]! text-text-secondary! leading-tight!">
                  Coordinated sizing & durable materials.
                </span>
              </div>
            </div>

            {/* Action Link */}
            <div className="pt-1.5!">
              <Link
                to="/products"
                className="inline-flex! items-center! gap-2! px-5! sm:px-6! py-2.5! rounded-full! bg-[#1a1a1a]! hover:bg-[#5433eb]! text-white! text-xs! sm:text-sm! font-bold! shadow-xs! transition-all! duration-300! no-underline!"
              >
                <span>Browse the Collections</span>
                <ArrowRightOutlined className="text-xs!" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
