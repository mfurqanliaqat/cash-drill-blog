import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import logo from '@/public/logos/mark-white.svg'
import Image from 'next/image'

const PRIZES = ['$0.50', '$1', '$2', '$0', '$5', '$10', '$100', 'Free Spin']

// Theme colors
const SEGMENT_COLORS = ['#22c55e', '#3b82f6'] // green, blue
const CENTER_CIRCLE_COLOR = '#3b82f6' // blue
const CENTER_TEXT_COLOR = '#fff'

function SpinWheel() {
  const [spinning, setSpinning] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [rotation, setRotation] = useState(0)
  const [transition, setTransition] = useState<string | undefined>(undefined)
  const wheelRef = useRef<SVGSVGElement>(null)

  const spin = () => {
    if (spinning) return
    setSpinning(true)
    setTransition('transform 4s cubic-bezier(0.22, 1, 0.36, 1)')
    const prizeIndex = Math.floor(Math.random() * PRIZES.length)
    setSelected(null)
    // More spins for drama
    const spins = 24
    const degreesPerPrize = 360 / PRIZES.length
    // The pointer is at 0deg (top, after flip), but SVG segments start at 0deg (3 o'clock), so we need to rotate by -90deg to align 0 index to top
    // To land the selected prize at the pointer, subtract 90deg offset
    const targetRotation = 360 * spins - (prizeIndex * degreesPerPrize + degreesPerPrize / 2) - 90
    setRotation(targetRotation)
    setTimeout(() => {
      setSpinning(false)
      setSelected(prizeIndex)
      setTransition(undefined)
    }, 4000)
  }

  // Bigger wheel size
  const WHEEL_SIZE = 320
  const RADIUS = 145
  const CENTER = WHEEL_SIZE / 2
  const CENTER_CIRCLE_RADIUS = 60

  // Overlay logic
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
        <Button onClick={spin} disabled={spinning}>
          {spinning ? 'Spinning...' : 'Spin The Wheel'}
        </Button>
      </div>
    )

  return (
    <Card className='overflow-hidden'>
      <CardContent className='flex flex-col items-center justify-center gap-4 text-center p-0'>
        {/* Spinning Wheel SVG with overlay */}
        <div
          className='relative flex items-center justify-center'
          style={{ width: WHEEL_SIZE + 20, height: WHEEL_SIZE + 20 }}
        >
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
          <svg width={WHEEL_SIZE} height={WHEEL_SIZE} viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}>
            {/* Rotating segments group */}
            <g
              style={{
                transition: transition,
              }}
              transform={`rotate(${rotation} ${CENTER} ${CENTER})`}
            >
              {PRIZES.map((prize, i) => {
                const angle = (360 / PRIZES.length) * i
                const nextAngle = (360 / PRIZES.length) * (i + 1)
                const largeArc = nextAngle - angle > 180 ? 1 : 0
                const x1 = CENTER + RADIUS * Math.cos((Math.PI * angle) / 180)
                const y1 = CENTER + RADIUS * Math.sin((Math.PI * angle) / 180)
                const x2 = CENTER + RADIUS * Math.cos((Math.PI * nextAngle) / 180)
                const y2 = CENTER + RADIUS * Math.sin((Math.PI * nextAngle) / 180)
                return (
                  <g key={prize}>
                    <path
                      d={`M${CENTER},${CENTER} L${x1},${y1} A${RADIUS},${RADIUS} 0 ${largeArc},1 ${x2},${y2} Z`}
                      fill={SEGMENT_COLORS[i % 2]}
                      stroke='#fff'
                      strokeWidth={3}
                    />
                    <text
                      x={
                        CENTER +
                        (RADIUS - 35) *
                          Math.cos((Math.PI * (angle + 360 / PRIZES.length / 2)) / 180)
                      }
                      y={
                        CENTER +
                        (RADIUS - 35) *
                          Math.sin((Math.PI * (angle + 360 / PRIZES.length / 2)) / 180)
                      }
                      textAnchor='middle'
                      alignmentBaseline='middle'
                      fontSize='18'
                      fill='#fff'
                      fontWeight='bold'
                      transform={`rotate(${angle + 360 / PRIZES.length / 2},${
                        CENTER +
                        (RADIUS - 35) *
                          Math.cos((Math.PI * (angle + 360 / PRIZES.length / 2)) / 180)
                      },${
                        CENTER +
                        (RADIUS - 35) *
                          Math.sin((Math.PI * (angle + 360 / PRIZES.length / 2)) / 180)
                      })`}
                    >
                      {prize}
                    </text>
                  </g>
                )
              })}
            </g>
          </svg>
          {/* Center logo absolutely centered over SVG */}
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 bg-primary p-3 rounded-full border-4 border-white'>
            <Image src={logo} alt='logo' width={40} height={40} />
          </div>
          {/* Pointer */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translate(-50%, -30%) rotate(180deg)',
            }}
          >
            <svg width='40' height='40' viewBox='0 0 40 40'>
              <polygon points='20,0 40,40 0,40' fill='#22c55e' />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SpinWheel
