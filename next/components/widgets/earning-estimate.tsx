'use client'
import React, { useState, useMemo } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import cdLogo from '@/public/logos/primary-green.svg'
import * as SliderPrimitive from '@radix-ui/react-slider'
import Image from 'next/image'

const MIN_MINUTES = 10
const MAX_MINUTES = 240
const STEP = 10

// Calculate rates based on the provided values
const CASH_DRILL_RATE = 108.2 / 240 // ≈ 0.451
const AVERAGE_RATE = 36.0 / 240 // = 0.15
const MAX_CASH_DRILL = 108.2

function EarningEstimate({ heading, caption, sliderText }: any) {
  const [minutes, setMinutes] = useState(210)

  // Calculate earnings
  const cashDrillEarnings = +(minutes * CASH_DRILL_RATE).toFixed(2)
  const averageEarnings = +(minutes * AVERAGE_RATE).toFixed(2)

  // Bar heights (relative to max value, so 108.20 is 100%)
  const cashDrillBarHeight = (cashDrillEarnings / MAX_CASH_DRILL) * 100
  const averageBarHeight = (averageEarnings / MAX_CASH_DRILL) * 100

  // Memoize the logo to prevent re-rendering
  const cashDrillLogo = useMemo(
    () => (
      <Image src={cdLogo} alt='Cash Drill Logo' width={100} height={32} className='not-prose' />
    ),
    []
  )

  return (
    <div className='w-full max-w-3xl mx-auto my-8'>
      <Card variant='gradient'>
        <CardContent className='p-6 flex flex-col md:flex-row gap-4 md:gap-20'>
          {/* Left Side */}
          <div className='flex-1 flex flex-col justify-between'>
            <div className='space-y-4 mb-2 md:mb-20'>
              <h2 className='text-2xl font-semibold leading-tight text-white'>{heading}</h2>
              <p className='text-muted text-base'>{caption}</p>
            </div>
            <div className='mb-8 hidden md:block'>
              <label className='block text-muted text-base mb-3'>{sliderText}</label>
              <SliderPrimitive.Root
                min={MIN_MINUTES - 20}
                max={MAX_MINUTES}
                step={STEP}
                value={[minutes]}
                onValueChange={([val]) => {
                  if (val >= MIN_MINUTES) setMinutes(val)
                }}
                className='relative flex w-full touch-none select-none items-center'
              >
                <SliderPrimitive.Track className='relative h-2 w-full grow overflow-hidden rounded-full bg-muted'>
                  <SliderPrimitive.Range className='absolute h-full bg-secondary' />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb asChild>
                  <span className='px-2 py-1 -ml-8 rounded-full bg-white text-black text-xs shadow text-center whitespace-nowrap outline-none cursor-pointer'>
                    {minutes} min
                  </span>
                </SliderPrimitive.Thumb>
              </SliderPrimitive.Root>
            </div>

            <Button className='hidden md:block'>Start Earning Now &rarr;</Button>
          </div>
          {/* Right Side - Bars */}
          <div className='flex-1 flex flex-col justify-center items-center gap-4'>
            <div className='flex flex-row items-end gap-8 h-60 md:h-full w-full justify-center'>
              {/* CashDrill Bar */}
              <div className='flex flex-col items-center w-24 h-full'>
                <div className='relative w-full flex-1 flex flex-col justify-end items-center'>
                  <div className='text-primary text-2xl md:text-3xl font-extrabold mb-2'>
                    ${cashDrillEarnings.toFixed(2)}
                  </div>
                  <div className='w-full h-6 mb-3 flex items-center justify-center'>
                    <div className='w-full flex items-center justify-center'>{cashDrillLogo}</div>
                  </div>
                  <div
                    className='w-full rounded-xl bg-primary transition-all duration-300'
                    style={{ height: `${cashDrillBarHeight}%`, minHeight: '8px' }}
                  ></div>
                </div>
              </div>
              {/* Average Bar */}
              <div className='flex flex-col items-center w-24 h-full'>
                <div className='relative w-full flex-1 flex flex-col justify-end items-center'>
                  <span className='text-white text-xl md:text-2xl font-extrabold mb-2'>
                    ${averageEarnings.toFixed(2)}
                  </span>
                  <span className='text-muted text-sm font-bold mb-2 text-center'>
                    Average Chat Gigs
                  </span>
                  <div
                    className='bottom-0 left-0 w-full rounded-xl bg-neutral-700 transition-all duration-300'
                    style={{ height: `${averageBarHeight}%`, minHeight: '8px' }}
                  ></div>
                </div>
              </div>
            </div>
            <p className='text-xs text-muted max-w-xs not-prose'>
              *Earnings displayed are based on average figures and may vary depending on the
              specific offers available at the time of playing.
            </p>
          </div>

          <div className='mb-2 block md:hidden'>
            <label className='block text-muted text-base mb-2'>{sliderText}</label>
            <SliderPrimitive.Root
              min={MIN_MINUTES - 20}
              max={MAX_MINUTES}
              step={STEP}
              value={[minutes]}
              onValueChange={([val]) => {
                if (val >= MIN_MINUTES) setMinutes(val)
              }}
              className='relative flex w-full touch-none select-none items-center'
            >
              <SliderPrimitive.Track className='relative h-2 w-full grow overflow-hidden rounded-full bg-muted'>
                <SliderPrimitive.Range className='absolute h-full bg-secondary' />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb asChild>
                <span className='px-2 py-1 -ml-8 rounded-full bg-white text-black text-xs shadow text-center whitespace-nowrap outline-none cursor-pointer'>
                  {minutes} min
                </span>
              </SliderPrimitive.Thumb>
            </SliderPrimitive.Root>
          </div>

          <Button className='block md:hidden'>Start Earning Now &rarr;</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default EarningEstimate
