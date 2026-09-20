import React, { useState } from 'react'

const tabs = [
  'Specifications',
  "What's in the Box",
  'Shipping & Returns',
  'Verified Reviews (123)',
]

const specsGrid = [
  {
    title: 'Transducer Topology',
    value: '40mm Ceramic Titanium Driver',
    detail: 'High-flux neodymium magnet system',
  },
  {
    title: 'Frequency Response',
    value: '10 Hz – 48,000 Hz',
    detail: 'Certified Hi-Res Wireless & Cable',
  },
  {
    title: 'Wireless Architecture',
    value: 'Bluetooth 5.3 + Multipoint',
    detail: 'Range to 15m*, aptX Adaptive, AAC, SBC',
  },
  {
    title: 'Battery & Power System',
    value: '55 Hours (ANC On) / 62 Hours (Off)',
    detail: 'Quick-charge yields 7 hours playback',
  },
  {
    title: 'Microphone System',
    value: '6 MEMS Beamforming Array',
    detail: 'AI ambient noise reduction & wind protection',
  },
  {
    title: 'Total Mass',
    value: '248 grams',
    detail: 'Lightweight forged aluminum & leather',
  },
]

export default function ProductSpecs() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="flex! flex-col! gap-5!">
      <div className="flex! items-center! gap-2! overflow-x-auto! pb-1! no-scrollbar!">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`px-4! sm:px-5! py-2! sm:py-2.5! rounded-full! text-xs! sm:text-sm! font-semibold! transition-all! cursor-pointer! shrink-0! border-0! ${
              activeTab === idx
                ? 'bg-[#1a1a1a]! text-white! shadow-xs!'
                : 'bg-white! text-gray-600! hover:text-gray-900! border! border-[#ebebeb]!'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white! rounded-[28px]! border! border-[#ebebeb]! p-6! sm:p-8! lg:p-10! shadow-[0_4px_24px_rgba(0,0,0,0.03)]!">
        <div className="grid! grid-cols-1! lg:grid-cols-12! gap-8! lg:gap-12! items-start!">
          <div className="lg:col-span-5! flex! flex-col! gap-4!">
            <h3 className="text-xl! sm:text-2xl! font-bold! text-[#1a1a1a]! leading-snug! tracking-tight! m-0!">
              Uncompromised clarity across the full audible spectrum.
            </h3>

            <p className="text-xs! sm:text-sm! text-gray-500! leading-relaxed! m-0!">
              Developed in Copenhagen with custom tuned 40mm titanium diaphragm transducers, precision laser vent dampeners, and 4 dedicated feedback microphones.
            </p>

            <div className="flex! flex-col! gap-3! pt-4! border-t! border-[#f0f0f0]!">
              <div className="flex! items-center! justify-between! text-xs!">
                <span className="text-gray-400! font-medium!">THD (Total Harmonic Distortion)</span>
                <span className="font-semibold! text-gray-800!">&lt; 0.05% @ 1kHz</span>
              </div>
              <div className="flex! items-center! justify-between! text-xs!">
                <span className="text-gray-400! font-medium!">Acoustic Principle</span>
                <span className="font-semibold! text-gray-800!">Closed-back circumaural</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7! grid! grid-cols-1! sm:grid-cols-2! gap-3.5! sm:gap-4!">
            {specsGrid.map((spec) => (
              <div
                key={spec.title}
                className="bg-[#f8f9fa]! rounded-[20px]! p-4! border! border-[#ebebeb]! flex! flex-col! justify-center! gap-1!"
              >
                <span className="text-[11px]! font-medium! text-gray-400!">
                  {spec.title}
                </span>
                <span className="text-[13px]! sm:text-sm! font-bold! text-[#1a1a1a]! leading-snug!">
                  {spec.value}
                </span>
                <span className="text-[11px]! text-gray-500! leading-tight!">
                  {spec.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
