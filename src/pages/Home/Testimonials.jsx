import React from 'react'
import { Rate, Avatar } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'

const testimonials = [
  {
    id: 1,
    rating: 5,
    quote:
      'The craftsmanship on the ceramic pour-over and the textured table lamp exceeded all my expectations. My morning ritual feels completely transformed.',
    author: 'Elena Rostova',
    role: 'Interior Designer, Stockholm',
    avatar: 'ER',
    verifiedProduct: 'Nordic Ceramic Carafe',
  },
  {
    id: 2,
    rating: 5,
    quote:
      'Finding technology that doesn’t scream gadget is so rare. The obsidian headphones blend naturally into my living space with concert-hall acoustic clarity.',
    author: 'Marcus Vance',
    role: 'Creative Director, London',
    avatar: 'MV',
    verifiedProduct: 'Over-Ear Headphones',
  },
  {
    id: 3,
    rating: 5,
    quote:
      'From seamless checkout to the unboxing experience, every detail breathes intentionality and care. It’s hard to imagine shopping anywhere else.',
    author: 'Sophia Chen',
    role: 'Architect, Tokyo',
    avatar: 'SC',
    verifiedProduct: 'Sculptural Table Lamp',
  },
]

function Testimonials() {
  return (
    <section className="w-full! max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8! py-8! sm:py-12!">
      <div className="flex! flex-col! items-center! text-center! mb-8! sm:mb-12! max-w-2xl! mx-auto!">``
        <div className="inline-flex! items-center! gap-2! px-3.5! py-1.5! rounded-full! bg-canvas! border! border-border! mb-3! sm:mb-4!">
          <span className="w-1.5! h-1.5! rounded-full! bg-primary!" />
          <span className="text-label-sm! font-medium! text-text-secondary!">
            Community Voices
          </span>
        </div>

        <h2 className="text-2xl! sm:text-3xl! lg:text-4xl! font-semibold! text-text-primary! tracking-[-0.031em]! m-0! mb-2! sm:mb-3!">
          Loved by Curators & Collectors<span className="text-primary!">.</span>
        </h2>

        <p className="text-body-md! text-text-secondary! font-normal! leading-relaxed! m-0!">
          Real stories from design enthusiasts who elevated their daily rituals with our objects.
        </p>
      </div>

      <div className="grid! grid-cols-1! md:grid-cols-3! gap-6! lg:gap-8!">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-surface! rounded-card! p-6! sm:p-8! shadow-level-1! border! border-border! flex! flex-col! justify-between! gap-6! transition-all! duration-300! hover:-translate-y-1!"
          >
            <div className="flex! items-center! justify-between!">
              <Rate
                disabled
                defaultValue={item.rating}
                className="text-primary! text-sm!"
              />
              <span className="inline-flex! items-center! gap-1! text-[11px]! font-medium! text-text-secondary! bg-canvas! px-2.5! py-1! rounded-full! border! border-border!">
                <CheckCircleFilled className="text-primary! text-[10px]!" />
                <span>Verified</span>
              </span>
            </div>

            <p className="text-body-md! sm:text-body-lg! text-text-primary! font-normal! leading-relaxed! m-0! italic!">
              “{item.quote}”
            </p>

            <div className="pt-4! border-t! border-border! flex! items-center! gap-3!">
              <Avatar
                size={44}
                className="bg-canvas! text-text-primary! font-semibold! text-sm! border! border-border! shrink-0!"
              >
                {item.avatar}
              </Avatar>

              <div className="flex! flex-col! gap-0.5! min-w-0!">
                <h4 className="text-title-md! font-semibold! text-text-primary! tracking-[-0.02em]! m-0! truncate!">
                  {item.author}
                </h4>
                <span className="text-label-sm! text-text-secondary! font-normal! truncate!">
                  {item.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
