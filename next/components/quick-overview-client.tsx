'use client'
import CarouselWidget from './widgets/slider'
import React from 'react'
import SpinWheel from './widgets/spin-wheel'

function QuickOverviewClient({ sideNavigation }: { sideNavigation: any }) {
  // Find the first carousel component in sideNavigation
  const carouselData = Array.isArray(sideNavigation)
    ? sideNavigation.find(item => item.__component === 'shared.carousel')
    : null

  return (
    <div className='max-w-2xl mx-auto w-full flex flex-col gap-4'>
      <SpinWheel stopAtPrize='$5.00' />
      <div className='sticky top-4 z-10'>
        <CarouselWidget data={carouselData} />
      </div>
    </div>
  )
}

export default QuickOverviewClient
