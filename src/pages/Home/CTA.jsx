import React from 'react'
import { Button } from 'antd'
import { ArrowRightOutlined, CompassOutlined, CheckCircleFilled } from '@ant-design/icons'

function CTA() {
  return (
    <section className="w-full! max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8! py-8! sm:py-12!">
      <div className="relative! overflow-hidden! bg-surface! rounded-card! p-8! sm:p-12! lg:p-16! shadow-level-1! border! border-border! text-center! flex! flex-col! items-center!">
        <div className="absolute! -top-24! left-1/2! -translate-x-1/2! w-96! h-96! bg-primary/5! rounded-full! blur-3xl! pointer-events-none!" />
        <div className="absolute! -bottom-24! right-10! w-80! h-80! bg-primary/5! rounded-full! blur-3xl! pointer-events-none!" />
        <div className="inline-flex! items-center! gap-2! px-3.5! py-1.5! rounded-full! bg-canvas! border! border-border! mb-4! sm:mb-5!">
          <span className="w-1.5! h-1.5! rounded-full! bg-primary!" />
          <span className="text-label-sm! font-medium! text-text-secondary!">
            New Season Collection
          </span>
        </div>
        <h2 className="text-3xl! sm:text-4xl! lg:text-5xl! font-semibold! text-text-primary! tracking-[-0.05em]! leading-[1.12]! m-0! mb-3! sm:mb-4! max-w-2xl!">
          Ready to elevate your everyday living<span className="text-primary!">?</span>
        </h2>
        <p className="text-body-md! sm:text-body-lg! text-text-secondary! font-normal! leading-relaxed! max-w-xl! m-0! mb-8! sm:mb-10!">
          Explore our curated collection of architectural objects, artisan home goods, and precision everyday carry crafted for intentional living.
        </p>
        <div className="flex! flex-col! sm:flex-row! items-center! justify-center! gap-3.5! sm:gap-4! w-full! sm:w-auto!">
          <Button
            type="primary"
            icon={<ArrowRightOutlined className="text-xs!" />}
            iconPosition="end"
            className="w-full! sm:w-auto! rounded-full! bg-primary! hover:bg-primary/90! text-on-primary! shadow-violet-glow! text-sm! font-semibold! px-8! h-12! border-0! inline-flex! items-center! justify-center! gap-2! transition-color! active:scale-95!"
          >
            Start Shopping
          </Button>

          <Button
            type="default"
            icon={<CompassOutlined className="text-sm! text-text-secondary!" />}
            className="w-full! sm:w-auto! rounded-full! bg-canvas! hover:bg-surface! text-text-primary! border! border-border! text-sm! font-semibold! px-7! h-12! inline-flex! items-center! justify-center! gap-2! transition-color! active:scale-95!"
          >
            Explore Catalog
          </Button>
        </div>
        <div className="mt-8! sm:mt-10! pt-6! border-t! border-border/80! flex! flex-wrap! items-center! justify-center! gap-x-6! gap-y-2.5! text-xs! text-text-secondary!">
          <div className="inline-flex! items-center! gap-1.5!">
            <CheckCircleFilled className="text-primary! text-xs!" />
            <span>Complimentary express delivery over $150</span>
          </div>
          <div className="hidden! sm:inline-block! w-1! h-1! rounded-full! bg-border!" />
          <div className="inline-flex! items-center! gap-1.5!">
            <CheckCircleFilled className="text-primary! text-xs!" />
            <span>30-day hassle-free returns</span>
          </div>
          <div className="hidden! sm:inline-block! w-1! h-1! rounded-full! bg-border!" />
          <div className="inline-flex! items-center! gap-1.5!">
            <CheckCircleFilled className="text-primary! text-xs!" />
            <span>Direct artisan provenance</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
