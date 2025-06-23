'use client'

import React, { useRef, useEffect } from 'react'
import PayoutSmallCard from './payout-small-card'

const mockPayouts = [
  {
    avatarUrl: '/avatars/paulina.png',
    method: 'PayPal',
    username: 'Paulina',
    amount: 50,
  },
  {
    avatarUrl: '',
    method: 'GooglePlay',
    username: 'masonramey63',
    amount: 25,
  },
  {
    avatarUrl: '',
    method: 'PayPal',
    username: 'jane',
    amount: 7,
  },
  {
    avatarUrl: '',
    method: 'Amazon',
    username: 'sarah_smith',
    amount: 10,
  },
  {
    avatarUrl: '',
    method: 'Apple',
    username: 'crypto_king',
    amount: 41,
  },
  {
    avatarUrl: '',
    method: 'PayPal',
    username: 'trader_pro',
    amount: 98,
  },
  {
    avatarUrl: '',
    method: 'PayPal',
    username: 'diamond_hands',
    amount: 11,
  },
  {
    avatarUrl: '',
    method: 'Amazon',
    username: 'moon_walker',
    amount: 45,
  },
  {
    avatarUrl: '',
    method: 'ACH',
    username: 'hodl_master',
    amount: 110,
  },
]

const AUTO_SCROLL_SPEED = 0.4 // px per frame

const PayoutSliderStrip: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const inner = innerRef.current
    if (!container || !inner) return

    // Clone the items to create the infinite effect
    const items = inner.children
    const itemWidth = items[0].getBoundingClientRect().width
    const totalWidth = itemWidth * items.length

    // Clone enough items to fill the container twice
    Array.from(items).forEach(item => {
      const clone = item.cloneNode(true)
      inner.appendChild(clone)
    })

    let position = 0
    let animationFrame: number

    const animate = () => {
      position -= AUTO_SCROLL_SPEED

      // Reset position when we've scrolled the width of the original items
      if (Math.abs(position) >= totalWidth) {
        position = 0
      }

      inner.style.transform = `translateX(${position}px)`
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className='w-full bg-transparent py-2 px-0 overflow-hidden'>
      <div ref={containerRef} className='relative'>
        <div ref={innerRef} className='flex gap-3 px-4 py-2'>
          {mockPayouts.map((payout, idx) => (
            <PayoutSmallCard key={idx} {...payout} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PayoutSliderStrip
