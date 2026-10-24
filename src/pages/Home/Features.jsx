import React from "react";
import {
  ThunderboltOutlined,
  SyncOutlined,
  SafetyCertificateOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    icon: <ThunderboltOutlined className="text-[#5433eb]! text-2xl!" />,
    badge: "Fast Dispatch",
    title: "Next-Day Delivery",
    description:
      "Express courier fulfillment directly from local climate-controlled facilities.",
  },
  {
    id: 2,
    icon: <SyncOutlined className="text-[#5433eb]! text-2xl!" />,
    badge: "Risk-Free",
    title: "30-Day Guaranteed Returns",
    description:
      "Complimentary pre-paid return label with scheduled doorstep pickup.",
  },
  {
    id: 3,
    icon: <SafetyCertificateOutlined className="text-[#5433eb]! text-2xl!" />,
    badge: "Sustainable",
    title: "100% Recycled Packaging",
    description:
      "Zero single-use plastics. Custom compostable molded paper pulp.",
  },
  {
    id: 4,
    icon: <CustomerServiceOutlined className="text-[#5433eb]! text-2xl!" />,
    badge: "Always On",
    title: "Dedicated Concierge",
    description:
      "Real garment and footwear advisors available 24/7 via chat and email.",
  },
];

export default function Features() {
  return (
    <section className="w-full! max-w-7xl! mx-auto! px-3! sm:px-6! lg:px-8! py-4! sm:py-8!">
      <div className="bg-surface! rounded-2xl! sm:rounded-[28px]! p-6! sm:p-8! lg:p-10! shadow-level-1! border! border-border!">
        <div className="grid! grid-cols-1! sm:grid-cols-2! lg:grid-cols-4! gap-6! sm:gap-6!">
          {features.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex! flex-col! items-center! text-center! justify-center! p-5! sm:p-6! rounded-2xl! bg-canvas/40! hover:bg-canvas! transition-all! duration-300! border! border-transparent! hover:border-black/5! group!"
            >
              {/* Perfectly Centered Icon Box */}
              <div className="w-13! h-13! rounded-2xl! bg-white! shadow-xs! group-hover:shadow-sm! group-hover:bg-[#5433eb]/10! flex! items-center! justify-center! transition-all! duration-300! group-hover:scale-108! mb-3.5! mx-auto!">
                {item.icon}
              </div>

              {/* Perfectly Centered Badge */}
              <span className="text-[10px]! font-extrabold! tracking-widest! uppercase! text-[#5433eb]! bg-[#5433eb]/10! px-3! py-1! rounded-full! mb-2.5! mx-auto! inline-block!">
                {item.badge}
              </span>

              {/* Perfectly Centered Headline */}
              <h3 className="text-sm! sm:text-base! font-bold! text-text-primary! tracking-tight! m-0! mb-2! text-center!">
                {item.title}
              </h3>

              {/* Perfectly Centered Description */}
              <p className="text-xs! text-text-secondary! font-normal! leading-relaxed! m-0! max-w-[240px]! mx-auto! text-center!">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
