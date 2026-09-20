import React, { useState } from 'react'
import headphonesImg from '../../assets/images/headphones.jpg'
import categoryTechImg from '../../assets/images/category_tech.jpg'
import categoryWorkspaceImg from '../../assets/images/category_workspace.jpg'

const thumbnails = [
  { id: 1, img: headphonesImg, label: 'Front View' },
  { id: 2, img: headphonesImg, label: 'Side Angle' },
  { id: 3, img: categoryTechImg, label: 'Driver Detail' },
  { id: 4, img: categoryWorkspaceImg, label: 'Lifestyle Desk' },
  { id: 5, img: headphonesImg, label: 'Folded Case' },
]

const features = [
  {
    id: 1,
    title: '40mm',
    subtitle: 'Custom Driver',
    icon: (
      <svg className="w-4! h-4! text-[#5433eb]!" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
  {
    id: 2,
    title: '55 Hours',
    subtitle: 'Total Playtime',
    icon: (
      <svg className="w-4! h-4! text-[#5433eb]!" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: '-42dB',
    subtitle: 'Hybrid ANC',
    icon: (
      <svg className="w-4! h-4! text-[#5433eb]!" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Lossless',
    subtitle: 'LDAC & aptX HD',
    icon: (
      <svg className="w-4! h-4! text-[#5433eb]!" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
]

export default function ProductGallery() {
  const [activeThumb, setActiveThumb] = useState(0)

  return (
    <div className="flex! flex-col! gap-4! sm:gap-5!">
      {/* Main Full Product Image (Clean: No overlay icons as requested) */}
      <div className="w-full! aspect-[4/3]! sm:aspect-[16/11]! rounded-[28px]! overflow-hidden! bg-[#f6f6f7]! border! border-[#ebebeb]! shadow-[0_4px_24px_rgba(0,0,0,0.03)]! flex! items-center! justify-center! p-4! sm:p-8!">
        <img
          src={thumbnails[activeThumb].img}
          alt="Noise-Cancelling Over-Ear Studio Headphones"
          className="w-full! h-full! object-contain! object-center! transition-all! duration-500! hover:scale-105!"
        />
      </div>

      {/* Thumbnails Row */}
      <div className="grid! grid-cols-5! gap-2.5! sm:gap-3!">
        {thumbnails.map((thumb, index) => (
          <button
            key={thumb.id}
            type="button"
            onClick={() => setActiveThumb(index)}
            className={`aspect-square! rounded-[16px]! sm:rounded-[20px]! overflow-hidden! bg-[#f6f6f7]! border! transition-all! duration-200! p-1.5! sm:p-2! flex! items-center! justify-center! cursor-pointer! ${
              activeThumb === index
                ? 'border-[#5433eb]! ring-2! ring-[#5433eb]/20! shadow-xs!'
                : 'border-[#ebebeb]! hover:border-gray-300!'
            }`}
          >
            <img
              src={thumb.img}
              alt={thumb.label}
              className="w-full! h-full! object-contain! object-center!"
            />
          </button>
        ))}
      </div>

      {/* Feature Highlights Pills */}
      <div className="grid! grid-cols-2! sm:grid-cols-4! gap-2.5! sm:gap-3! pt-1!">
        {features.map((item) => (
          <div
            key={item.id}
            className="bg-white! rounded-[20px]! border! border-[#ebebeb]! p-3! sm:p-3.5! flex! items-center! gap-3! shadow-xs!"
          >
            <div className="w-8! h-8! rounded-full! bg-[#eee9ff]! flex! items-center! justify-center! shrink-0!">
              {item.icon}
            </div>
            <div className="flex! flex-col! min-w-0!">
              <span className="text-[13px]! font-bold! text-[#1a1a1a]! leading-tight! truncate!">
                {item.title}
              </span>
              <span className="text-[11px]! text-gray-400! font-medium! leading-tight! truncate!">
                {item.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
