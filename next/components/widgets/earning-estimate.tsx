'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'

const MIN_MINUTES = 10
const MAX_MINUTES = 240
const STEP = 1

// Calculate rates based on the provided values
const CASH_DRILL_RATE = 108.2 / 240 // ≈ 0.451
const AVERAGE_RATE = 36.0 / 240 // = 0.15
const MAX_CASH_DRILL = 108.2

function EarningEstimate() {
  const [minutes, setMinutes] = useState(210)

  // Calculate earnings
  const cashDrillEarnings = +(minutes * CASH_DRILL_RATE).toFixed(2)
  const averageEarnings = +(minutes * AVERAGE_RATE).toFixed(2)

  // Bar heights (relative to max value, so 108.20 is 100%)
  const cashDrillBarHeight = (cashDrillEarnings / MAX_CASH_DRILL) * 100
  const averageBarHeight = (averageEarnings / MAX_CASH_DRILL) * 100

  return (
    <div className='w-full max-w-3xl mx-auto bg-background-card rounded-2xl border-2 border-border-card p-8 flex flex-col md:flex-row gap-20 shadow-lg'>
      {/* Left Side */}
      <div className='flex-1 flex flex-col justify-between'>
        <div className='space-y-4 mb-20'>
          <h2 className='text-2xl font-semibold leading-tight text-white'>
            How Much Can You Really Earn Chatting Online?
          </h2>
          <p className='text-muted text-base'>
            CashDrill compared to alternative ways to get paid to chat
          </p>
        </div>
        <div className='mb-8'>
          <label className='block text-muted text-base mb-2'>Minutes using CashDrill:</label>
          <div className='relative w-full h-14 flex items-center'>
            {/* Custom slider track */}
            <div className='absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 rounded-lg bg-[#23243a] w-full'></div>
            <div
              className='absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded-lg bg-secondary'
              style={{ width: `${((minutes - MIN_MINUTES) / (MAX_MINUTES - MIN_MINUTES)) * 100}%` }}
            ></div>
            {/* Custom thumb as label */}
            {(() => {
              const percent = (minutes - MIN_MINUTES) / (MAX_MINUTES - MIN_MINUTES)
              return (
                <div
                  className='absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer select-none'
                  style={{ left: `calc(${percent * 100}% - 20px)` }}
                  tabIndex={0}
                  role='slider'
                  aria-valuenow={minutes}
                  aria-valuemin={MIN_MINUTES}
                  aria-valuemax={MAX_MINUTES}
                  aria-label='Minutes using CashDrill'
                  onMouseDown={e => {
                    const slider = e.currentTarget.parentElement
                    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
                      if (!slider) return
                      const rect = slider.getBoundingClientRect()
                      const x =
                        'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX
                      let percent = (x - rect.left) / rect.width
                      percent = Math.max(0, Math.min(1, percent))
                      const newValue = Math.round(
                        MIN_MINUTES + percent * (MAX_MINUTES - MIN_MINUTES)
                      )
                      setMinutes(newValue)
                    }
                    const onUp = () => {
                      window.removeEventListener('mousemove', onMove)
                      window.removeEventListener('touchmove', onMove)
                      window.removeEventListener('mouseup', onUp)
                      window.removeEventListener('touchend', onUp)
                    }
                    window.addEventListener('mousemove', onMove)
                    window.addEventListener('touchmove', onMove)
                    window.addEventListener('mouseup', onUp)
                    window.addEventListener('touchend', onUp)
                  }}
                  onTouchStart={e => {
                    const slider = e.currentTarget.parentElement
                    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
                      if (!slider) return
                      const rect = slider.getBoundingClientRect()
                      const x =
                        'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX
                      let percent = (x - rect.left) / rect.width
                      percent = Math.max(0, Math.min(1, percent))
                      const newValue = Math.round(
                        MIN_MINUTES + percent * (MAX_MINUTES - MIN_MINUTES)
                      )
                      setMinutes(newValue)
                    }
                    const onUp = () => {
                      window.removeEventListener('mousemove', onMove)
                      window.removeEventListener('touchmove', onMove)
                      window.removeEventListener('mouseup', onUp)
                      window.removeEventListener('touchend', onUp)
                    }
                    window.addEventListener('mousemove', onMove)
                    window.addEventListener('touchmove', onMove)
                    window.addEventListener('mouseup', onUp)
                    window.addEventListener('touchend', onUp)
                  }}
                >
                  <span className='px-4 py-2 rounded-full bg-white text-black font-bold text-xs shadow text-center pointer-events-none whitespace-nowrap'>
                    {minutes} min
                  </span>
                </div>
              )
            })()}
            {/* Hidden native range for accessibility and keyboard support */}
            <input
              type='range'
              min={MIN_MINUTES}
              max={MAX_MINUTES}
              step={STEP}
              value={minutes}
              onChange={e => setMinutes(Number(e.target.value))}
              className='absolute w-full h-2 opacity-0 cursor-pointer z-20'
              style={{ accentColor: 'theme(colors.primary)' }}
              tabIndex={-1}
              aria-hidden='true'
            />
          </div>
        </div>
        <Button>Start Earning Now &rarr;</Button>
      </div>
      {/* Right Side - Bars */}
      <div className='flex-1 flex flex-col justify-center items-center gap-4'>
        <div className='flex flex-row items-end gap-8 h-full w-full justify-center'>
          {/* CashDrill Bar */}
          <div className='flex flex-col items-center w-24 h-full'>
            <div className='relative w-full flex-1 flex flex-col justify-end items-center'>
              <span className='text-primary text-3xl font-extrabold mb-2'>
                ${cashDrillEarnings.toFixed(2)}
              </span>
              <span className='text-primary text-sm font-bold mb-2 flex items-center gap-1'>
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 20 20'
                  fill='none'
                  className='inline-block'
                >
                  <circle cx='10' cy='10' r='10' fill='#00E676' />
                  <text
                    x='50%'
                    y='60%'
                    textAnchor='middle'
                    fill='black'
                    fontSize='10'
                    fontWeight='bold'
                    dy='.3em'
                  >
                    CD
                  </text>
                </svg>
                CashDrill
              </span>
              <div
                className='w-full rounded-xl bg-primary transition-all duration-300'
                style={{ height: `${cashDrillBarHeight}%`, minHeight: '8px' }}
              ></div>
            </div>
          </div>
          {/* Average Bar */}
          <div className='flex flex-col items-center w-24 h-full'>
            <div className='relative w-full flex-1 flex flex-col justify-end items-center'>
              <span className='text-white text-2xl font-extrabold mb-2'>
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
        <p className='text-xs text-muted mt-4 max-w-xs'>
          *Earnings displayed are based on average figures and may vary depending on the specific
          offers available at the time of playing.
        </p>
      </div>
    </div>
  )
}

export default EarningEstimate
