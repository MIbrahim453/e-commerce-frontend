import React from 'react'
import { Button } from 'antd'
import { ArrowRightOutlined, CheckCircleOutlined } from '@ant-design/icons'
import heroImg from '../../assets/images/hero.png'

function Hero() {
  return (
    <section className="w-full! max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8! py-6! sm:py-10!">
      <div className="bg-surface! rounded-card! p-6! sm:p-10! lg:p-12! xl:p-16! shadow-level-1! border! border-border!">
        <div className="grid! grid-cols-1! lg:grid-cols-2! items-center! gap-8! sm:gap-10! lg:gap-12! xl:gap-16!">
          <div className="flex! flex-col! items-start! gap-6! sm:gap-8!">
            <div className="inline-flex! items-center! gap-2! px-3.5! py-1.5! rounded-full! bg-canvas! border! border-border!">
              <span className="w-1.5! h-1.5! rounded-full! bg-primary!" />
              <span className="text-label-sm! font-medium! text-text-secondary!">
                Spring Collection 2025
              </span>
            </div>
            <h1 className="text-display-lg-mobile! lg:text-display-lg! font-semibold! text-text-primary! leading-[1.08]! m-0!">
              Shop smarter.
              <br />
              Live better<span className="text-primary!">.</span>
            </h1>
            <p className="text-body-md! sm:text-body-lg! text-text-secondary! font-normal! leading-relaxed! max-w-lg! m-0!">
              Curated objects for refined living, crafted with deliberate simplicity
              and delivered seamlessly to your door.
            </p>
            <div className="flex! flex-wrap! items-center! gap-3! sm:gap-4! pt-1!">
              <Button
                type="primary"
                icon={<ArrowRightOutlined className="text-xs! sm:text-sm!" />}
                iconPosition="end"
                className="rounded-full! bg-primary! hover:bg-primary/90! text-on-primary! shadow-violet-glow! text-label-md! font-semibold! px-6! sm:px-7! h-11! sm:h-12! border-0! inline-flex! items-center! justify-center! transition-transform! active:scale-95!"
              >
                Shop now
              </Button>

              <Button
                type="text"
                className="rounded-full! bg-canvas! hover:bg-[#eae7e7]! text-text-primary! text-label-md! font-medium! px-6! sm:px-7! h-11! sm:h-12! border-0! inline-flex! items-center! justify-center! transition-colors!"
              >
                Explore deals
              </Button>
            </div>


            <div className="flex! flex-wrap! items-center! gap-3! sm:gap-4! pt-2! text-text-secondary! text-label-sm! font-medium!">
              <div className="flex! items-center! gap-1.5!">
                <svg
                  className="w-4! h-4! text-primary!"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
                <span>Free express delivery</span>
              </div>

              <span className="text-border!">•</span>

              <div className="flex! items-center! gap-1.5!">
                <CheckCircleOutlined className="text-primary! text-xs! sm:text-sm!" />
                <span>Carbon-neutral certified</span>
              </div>
            </div>
          </div>
          <div className="w-full! h-[280px]! sm:h-[380px]! lg:h-[460px]! xl:h-[500px]! rounded-media! overflow-hidden! bg-canvas! border! border-border!">
            <img
              src={heroImg}
              alt="Curated objects for refined living"
              className="w-full! h-full! object-cover! object-center! transition-transform! duration-500! hover:scale-105!"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero