import React from "react";
import { Button } from "antd";
import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  CarOutlined,
} from "@ant-design/icons";
import heroImg from "../../assets/images/hero.png";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative! w-full! min-h-[440px]! sm:min-h-[500px]! lg:min-h-[560px]! xl:min-h-[600px]! flex! items-center! overflow-hidden! border-b! border-border!">
      <img
        src={heroImg}
        alt="Curated objects for refined living"
        className="absolute! inset-0! w-full! h-full! object-cover! object-top! sm:object-[60%_top]! lg:object-[65%_top]!"
      />

      <div className="absolute! inset-0! bg-gradient-to-t! from-black/95! via-black/70! via-60%! to-black/30! sm:bg-gradient-to-r! sm:from-black/90! sm:from-25%! sm:via-black/55! sm:via-55%! sm:to-transparent!" />

      <div className="relative! z-10! w-full! max-w-7xl! mx-auto! px-5! sm:px-6! lg:px-8! py-10! sm:py-14! lg:py-16!">
        <div className="max-w-xl! flex! flex-col! items-start! gap-4! sm:gap-5!">
          <h1 className="text-3xl! sm:text-4xl! lg:text-5xl! xl:text-[54px]! font-bold! text-white! leading-[1.12]! sm:leading-[1.08]! m-0! tracking-[-0.03em]!">
            Shop smarter.
            <br />
            Live better<span className="text-[#a594fd]!">.</span>
          </h1>
          <p className="text-sm! sm:text-base! text-white/90! font-normal! leading-relaxed! max-w-md! sm:max-w-lg! m-0!">
            Curated objects for refined living, crafted with deliberate
            simplicity and delivered seamlessly to your door.
          </p>
          <div className="flex! flex-row! flex-wrap! items-center! gap-3! sm:gap-4! pt-1! w-full! sm:w-auto!">
            <Button
              type="primary"
              onClick={() => navigate("/products")}
              icon={<ArrowRightOutlined className="text-xs! sm:text-sm!" />}
              iconPosition="end"
              className="rounded-full! bg-[#5433eb]! hover:bg-[#4324d4]! text-white! shadow-[0_4px_24px_rgba(84,51,235,0.45)]! text-xs! sm:text-sm! font-semibold! px-5! sm:px-7! h-10! sm:h-11! border-0! inline-flex! items-center! justify-center! duration-300! active:scale-95! cursor-pointer!"
            >
              Shop now
            </Button>

            <Button
              type="text"
              onClick={() => {
                const el = document.getElementById("trending-deals");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                } else {
                  navigate("/products?filter=trending");
                }
              }}
              className="rounded-full! bg-white/15! hover:bg-white/25! backdrop-blur-md! text-white! border! border-white/25! text-xs! sm:text-sm! font-medium! px-5! sm:px-7! h-10! sm:h-11! inline-flex! items-center! justify-center! transition-colors! duration-300! cursor-pointer!"
            >
              Explore deals
            </Button>
          </div>

          <div className="flex! flex-wrap! items-center! gap-x-3.5! gap-y-2! sm:gap-4! pt-1! text-white/85! text-xs! font-medium!">
            <div className="flex! items-center! gap-1.5!">
              <CarOutlined className="text-[#a594fd]! text-xs! sm:text-sm!" />
              <span>Free express delivery</span>
            </div>

            <span className="text-white/30! hidden! sm:inline!">•</span>

            <div className="flex! items-center! gap-1.5!">
              <CheckCircleOutlined className="text-[#a594fd]! text-xs! sm:text-sm!" />
              <span>Carbon-neutral certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
