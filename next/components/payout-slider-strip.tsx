'use client'

import React, { useRef, useEffect } from 'react'
import PayoutSmallCard from './payout-small-card'

const mockPayouts = [
  {
    avatarUrl: '/avatars/paulina.png',
    username: 'Paulina',
    amount: 5.0
  },
  {
    avatarUrl: '',
    username: 'masonramey63',
    amount: 5.0
  },
  {
    avatarUrl: '/avatars/jane.png',
    username: 'jane',
    amount: 5.0
  }
  // Add more mock data as needed
]

const AUTO_SCROLL_SPEED = 1 // px per frame

const PayoutSliderStrip: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return
    let animationFrame: number
    let scrollLeft = 0
    const scroll = () => {
      if (slider.scrollWidth - slider.clientWidth > 0) {
        scrollLeft =
          (slider.scrollLeft + AUTO_SCROLL_SPEED) % (slider.scrollWidth - slider.clientWidth + 1)
        slider.scrollLeft = scrollLeft
      }
      animationFrame = requestAnimationFrame(scroll)
    }
    animationFrame = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <div className="w-full bg-transparent py-2 px-0 overflow-x-hidden">
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 py-2"
        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
      >
        {mockPayouts.map((payout, idx) => (
          <PayoutSmallCard key={idx} {...payout} />
        ))}
      </div>
    </div>
  )
}

export default PayoutSliderStrip
