import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import logo from '@/public/logos/mark-white.svg'
import Image from 'next/image'

function SpinWheel({ stopAtPrize }: { stopAtPrize?: string }) {
  const [spinning, setSpinning] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [rotation, setRotation] = useState(0)
  const [transition, setTransition] = useState<string | undefined>(undefined)

  const PRIZES = ['$100', '$5.00', '$0.10', '$5.00', '$0.10', '$5.00', '$0.10', '$5.00']
  const SEGMENT_COLORS = [
    'url(#gradient-100)', // gold
    '#01D676', // green
    'url(#gradient-010)', // purple
    '#01D676', // green
    'url(#gradient-010)', // purple
    '#01D676', // green
    'url(#gradient-010)', // purple
    '#01D676', // green
  ]

  const spin = () => {
    if (spinning) return
    setSpinning(true)
    setTransition('transform 8s cubic-bezier(0.22, 1, 0.36, 1)')

    let prizeIndex: number
    if (stopAtPrize && PRIZES.includes(stopAtPrize)) {
      const matchingIndices = PRIZES.map((p, index) => (p === stopAtPrize ? index : -1)).filter(
        index => index !== -1
      )
      prizeIndex = matchingIndices[Math.floor(Math.random() * matchingIndices.length)]
    } else {
      prizeIndex = Math.floor(Math.random() * PRIZES.length)
    }

    setSelected(null)
    const spins = 10
    const degreesPerPrize = 360 / PRIZES.length
    const targetRotation = 360 * spins - prizeIndex * degreesPerPrize - 20
    setRotation(targetRotation)

    setTimeout(() => {
      setSpinning(false)
      setSelected(prizeIndex)
      setTransition(undefined)
    }, 8000)
  }

  // Wheel size
  const WHEEL_SIZE = 350
  const SEGMENT_ANGLE = 360 / PRIZES.length

  // Overlay logic (unchanged)
  const showOverlay = !spinning || (selected !== null && !spinning)
  const overlayText =
    selected !== null && !spinning ? (
      <div className='flex flex-col items-center justify-center gap-2 text-center p-10'>
        <h1 className='text-2xl font-bold'>Congratulations!</h1>
        <h1 className='text-xl font-bold'>
          We&apos;ve added <span className='text-primary'>{PRIZES[selected]}</span> to your wallet.
        </h1>
      </div>
    ) : (
      <div className='flex flex-col items-center justify-center gap-2 text-center p-10'>
        <h1 className='text-2xl font-bold'>
          Earn <span className='text-primary'>up to $100</span> on your first completed offer
        </h1>
        <p className='text-white/80'>Spin the wheel to win a prize.</p>
        <Button onClick={spin}>Spin the wheel</Button>
      </div>
    )

  return (
    <Card className='overflow-hidden relative'>
      <CardContent className='flex flex-col items-center justify-center gap-4 text-center'>
        {/* Overlay with blur and absolute centering */}
        {showOverlay && (
          <div
            className='absolute inset-0 z-30 flex flex-col items-center justify-center transition-opacity duration-300'
            style={{
              background: 'rgba(30,41,59,0.45)', // dark overlay
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            {overlayText}
          </div>
        )}
        {/* Spinning Wheel with SVG segments */}
        <div
          className='relative flex items-center justify-center'
          style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}
        >
          {/* Wheel segments as absolutely positioned SVGs */}
          <div
            className='absolute left-1/2 top-1/2'
            style={{
              width: WHEEL_SIZE,
              height: WHEEL_SIZE,
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              transition: transition,
              zIndex: 10,
            }}
          >
            {PRIZES.map((prize, i) => (
              <div
                key={i}
                className='absolute w-full h-full'
                style={{ transform: `rotate(${i * SEGMENT_ANGLE}deg)` }}
              >
                <svg
                  width='80'
                  height='90'
                  viewBox='0 0 95 98'
                  fill='none'
                  className='absolute top-0 left-1/2 -translate-x-1/2'
                  style={{ transform: 'translateY(28px) rotate(-36deg)' }}
                >
                  <defs>
                    <linearGradient id='gradient-100' x1='0%' y1='0%' x2='0%' y2='100%'>
                      <stop offset='0%' stopColor='#FFC700' />
                      <stop offset='33%' stopColor='#FFE177' />
                      <stop offset='67%' stopColor='#FFC700' />
                      <stop offset='100%' stopColor='#FFF6D6' />
                    </linearGradient>
                    <linearGradient id='gradient-010' x1='0%' y1='0%' x2='0%' y2='100%'>
                      <stop offset='0%' stopColor='#1281f7' />
                    </linearGradient>
                  </defs>
                  <path
                    d='M43.8687 2.532C45.7439 0.504981 48.9138 0.376704 50.8808 2.31482C72.3385 23.4575 87.3413 50.2717 94.1336 79.6199C94.7562 82.3102 92.9885 84.9445 90.2799 85.4822L29.9978 97.4482C27.2893 97.9859 24.6719 96.2212 23.9802 93.5478C20.2127 78.9869 12.7468 65.6433 2.30871 54.8147C0.392281 52.8265 0.25765 49.6727 2.13291 47.6457L43.8687 2.532Z'
                    fill={SEGMENT_COLORS[i % SEGMENT_COLORS.length]}
                    stroke='white'
                    strokeWidth={4}
                  />
                  <foreignObject x='-20' y='14' width='140' height='80'>
                    <div className='flex items-center justify-center h-full w-full rotate-[-120deg]'>
                      <div className='p-px rounded-md'>
                        <div className='px-3 py-1 rounded-[5px] text-lg font-semibold whitespace-nowrap text-white'>
                          {prize}
                        </div>
                      </div>
                    </div>
                  </foreignObject>
                </svg>
              </div>
            ))}
          </div>
          {/* Center logo absolutely centered over wheel */}
          <div
            className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 p-5 rounded-full border-4 border-white'
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFB300 100%)',
            }}
          >
            <Image src={logo} alt='logo' width={60} height={60} />
          </div>
          {/* Pointer */}
          <div
            style={{
              position: 'absolute',
              top: '25px',
              left: '50%',
              transform: 'translate(-50%, -30%) rotate(180deg)',
              zIndex: 20,
            }}
          >
            <svg
              width='44'
              height='44'
              viewBox='0 0 44 44'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <defs>
                <filter
                  id='pointer-glow'
                  x='-10'
                  y='-10'
                  width='64'
                  height='64'
                  filterUnits='userSpaceOnUse'
                >
                  <feDropShadow
                    dx='0'
                    dy='0'
                    stdDeviation='4'
                    floodColor='#22c55e'
                    floodOpacity='0.7'
                  />
                </filter>
              </defs>
              <path
                d='M22 4 Q23 8 40 40 Q22 36 4 40 Q21 8 22 4 Z'
                fill='#22c55e'
                stroke='#16a34a'
                strokeWidth='2'
                filter='url(#pointer-glow)'
              />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SpinWheel
