import React from "react";
import { Avatar } from "antd";
import { CheckCircleFilled, StarFilled } from "@ant-design/icons";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    rating: 5,
    quote:
      "The heavyweight cotton on the graphic tee has an architectural drape I've only ever found in bespoke Japanese ateliers. It holds its structure perfectly through washes.",
    author: "Elena Rostova",
    role: "Interior Architect, Stockholm",
    avatar: "ER",
    verifiedProduct: "Urban Pulse Oversized Graphic Tee",
    date: "Verified 2 days ago",
  },
  {
    id: 2,
    rating: 5,
    quote:
      "Finding wardrobe staples and ergonomic shoes that don't scream for attention is rare. The footwear is comfortable for 10-hour days and looks impeccably sharp.",
    author: "Marcus Vance",
    role: "Design Director, London",
    avatar: "MV",
    verifiedProduct: "Minimalist Italian Suede Trainers",
    date: "Verified last week",
  },
  {
    id: 3,
    rating: 5,
    quote:
      "Bought clothes and sneakers for my kids and myself. The fabrics are super durable, soft on the skin, and hold up through endless washes. Highly recommended!",
    author: "Sophia Chen",
    role: "Creative Strategist, Tokyo",
    avatar: "SC",
    verifiedProduct: "Youth Comfort Flex Sneaker & Tee Set",
    date: "Verified 3 weeks ago",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full! max-w-7xl! mx-auto! px-3! sm:px-6! lg:px-8! py-6! sm:py-12!">
      {/* Community Header */}
      <div className="flex! flex-col! items-center! text-center! mb-8! sm:mb-10! max-w-2xl! mx-auto!">
        <div className="inline-flex! items-center! gap-2! px-3.5! py-1.5! rounded-full! bg-canvas! border! border-border! mb-3! sm:mb-4!">
          <span className="w-1.5! h-1.5! rounded-full! bg-[#5433eb]!" />
          <span className="text-[11px]! font-bold! tracking-wider! uppercase! text-text-secondary!">
            Community Reviews
          </span>
        </div>
        <h2 className="text-2xl! sm:text-3xl! lg:text-4xl! font-bold! text-text-primary! tracking-[-0.03em]! m-0! mb-2! sm:mb-3!">
          Loved by Families & Professionals<span className="text-[#5433eb]!">.</span>
        </h2>
        <p className="text-sm! sm:text-base! text-text-secondary! font-normal! leading-relaxed! m-0!">
          Over 24,000 satisfied shoppers who choose high-quality apparel and footwear for men, women, and kids.
        </p>
      </div>

      {/* Testimonial Cards */}
      <div className="grid! grid-cols-1! md:grid-cols-3! gap-6! lg:gap-8!">
        {testimonials.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-surface! rounded-2xl! sm:rounded-[24px]! p-6! sm:p-7! shadow-level-1! border! border-border! flex! flex-col! justify-between! gap-6! transition-all! duration-300! hover:shadow-md! hover:-translate-y-1!"
          >
            <div>
              <div className="flex! items-center! justify-between! mb-4!">
                <div className="flex! items-center! gap-1!">
                  {[...Array(item.rating)].map((_, i) => (
                    <StarFilled key={i} className="text-amber-400! text-xs!" />
                  ))}
                </div>
                <span className="inline-flex! items-center! gap-1! text-[10px]! font-bold! uppercase! tracking-wider! text-emerald-700! bg-emerald-50! px-2.5! py-0.5! rounded-full! border! border-emerald-200!">
                  <CheckCircleFilled className="text-emerald-500! text-[9px]!" />
                  <span>Verified Purchase</span>
                </span>
              </div>

              <p className="text-sm! sm:text-[14px]! text-[#1a1a1a]! font-normal! leading-relaxed! m-0! italic!">
                "{item.quote}"
              </p>
            </div>

            <div className="pt-4! border-t! border-border! flex! flex-col! gap-3!">
              <div className="inline-flex! items-center! gap-1.5! text-[11px]! font-medium! text-text-secondary! truncate!">
                <span className="text-[#5433eb]! font-bold!">Ordered:</span>
                <span className="truncate!">{item.verifiedProduct}</span>
              </div>

              <div className="flex! items-center! gap-3!">
                <Avatar
                  size={40}
                  className="bg-[#1a1a1a]! text-white! font-bold! text-xs! border! border-border! shrink-0!"
                >
                  {item.avatar}
                </Avatar>

                <div className="flex! flex-col! min-w-0!">
                  <h4 className="text-sm! font-bold! text-text-primary! tracking-tight! m-0! truncate!">
                    {item.author}
                  </h4>
                  <span className="text-[11px]! text-text-secondary! font-normal! truncate!">
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
