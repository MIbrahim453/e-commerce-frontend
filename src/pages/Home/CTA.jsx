import React, { useState } from "react";
import { Button, Input, message } from "antd";
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  MailOutlined,
  LockOutlined,
  GiftFilled,
} from "@ant-design/icons";

function CTA() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      message.error("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
    message.success("Welcome to the Studio Circle! Check your inbox for your 10% welcome code.");
  };

  return (
    <section className="w-full! max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8! py-10! sm:py-14!">
      <div className="relative! overflow-hidden! bg-gradient-to-b! from-[#1a1a1a]! to-[#0d0d0d]! text-white! rounded-card! p-8! sm:p-14! lg:p-18! shadow-xl! text-center! flex! flex-col! items-center!">
        {/* Ambient Brand Glow */}
        <div className="absolute! -top-24! left-1/2! -translate-x-1/2! w-96! h-96! bg-[#5433eb]/30! rounded-full! blur-[120px]! pointer-events-none!" />
        <div className="absolute! -bottom-24! right-10! w-80! h-80! bg-[#a594fd]/15! rounded-full! blur-[100px]! pointer-events-none!" />

        {/* Brand Kicker */}
        <div className="relative! z-10! inline-flex! items-center! gap-2! px-4! py-1.5! rounded-full! bg-white/10! backdrop-blur-md! border! border-white/15! mb-4! sm:mb-6!">
          <GiftFilled className="text-[#a594fd]! text-xs!" />
          <span className="text-[11px]! font-bold! tracking-widest! uppercase! text-white/95!">
            The Studio Circle · Private Membership
          </span>
        </div>

        {/* Headline */}
        <h2 className="relative! z-10! text-3xl! sm:text-4xl! lg:text-5xl! font-extrabold! text-white! tracking-[-0.04em]! leading-[1.12]! m-0! mb-3! sm:mb-4! max-w-2xl!">
          Receive 10% off your first capsule acquisition<span className="text-[#a594fd]!">.</span>
        </h2>

        {/* Subcopy */}
        <p className="relative! z-10! text-sm! sm:text-base! text-white/80! font-normal! leading-relaxed! max-w-xl! m-0! mb-8! sm:mb-10!">
          Join over 24,000 design enthusiasts. Enjoy private sale allocations, early access to limited seasonal runs, and curated editorial issues.
        </p>

        {/* Interactive Subscription Form */}
        {subscribed ? (
          <div className="relative! z-10! p-6! rounded-2xl! bg-white/10! backdrop-blur-md! border! border-white/20! max-w-md! w-full! flex! flex-col! items-center! gap-2! animate-fade-in!">
            <CheckCircleFilled className="text-emerald-400! text-3xl! mb-1!" />
            <h3 className="text-white! font-bold! text-lg! m-0!">
              You're on the Guest List
            </h3>
            <p className="text-white/70! text-xs! m-0!">
              Your exclusive code <span className="text-[#a594fd]! font-mono! font-bold!">STUDIO10</span> is active for your first order.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="relative! z-10! flex! flex-col! sm:flex-row! items-center! gap-3! w-full! max-w-md! mx-auto!"
          >
            <div className="relative! w-full!">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full! h-12! rounded-full! bg-white/10! hover:bg-white/15! focus:bg-white/20! text-white! placeholder-white/50! px-5! text-xs! sm:text-sm! font-medium! border! border-white/20! focus:border-[#a594fd]! outline-none! backdrop-blur-md! transition-all!"
              />
            </div>

            <Button
              type="primary"
              htmlType="submit"
              icon={<ArrowRightOutlined className="text-xs!" />}
              iconPosition="end"
              className="w-full! sm:w-auto! shrink-0! rounded-full! bg-[#5433eb]! hover:bg-[#4324d4]! text-white! shadow-[0_4px_24px_rgba(84,51,235,0.45)]! text-xs! sm:text-sm! font-bold! px-7! h-12! border-0! inline-flex! items-center! justify-center! gap-2! transition-all! cursor-pointer!"
            >
              Join Circle
            </Button>
          </form>
        )}

        {/* Privacy & Perks Ribbon */}
        <div className="relative! z-10! mt-8! sm:mt-10! pt-6! border-t! border-white/10! flex! flex-wrap! items-center! justify-center! gap-x-6! gap-y-2! text-xs! text-white/60!">
          <div className="inline-flex! items-center! gap-1.5!">
            <CheckCircleFilled className="text-[#a594fd]! text-xs!" />
            <span>Instant code dispatch</span>
          </div>
          <div className="hidden! sm:inline-block! w-1! h-1! rounded-full! bg-white/30!" />
          <div className="inline-flex! items-center! gap-1.5!">
            <CheckCircleFilled className="text-[#a594fd]! text-xs!" />
            <span>No marketing spam</span>
          </div>
          <div className="hidden! sm:inline-block! w-1! h-1! rounded-full! bg-white/30!" />
          <div className="inline-flex! items-center! gap-1.5!">
            <CheckCircleFilled className="text-[#a594fd]! text-xs!" />
            <span>Unsubscribe anytime in 1-click</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
