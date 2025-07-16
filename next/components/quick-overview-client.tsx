'use client'
import CarouselWidget from './widgets/slider'
import React from 'react'
import SpinWheel from './widgets/spin-wheel'
import BlogSocialLinks from './blog-social-links'

function QuickOverviewClient({ sideNavigation }: { sideNavigation: any }) {
  // Find the first carousel component in sideNavigation
  const carouselData = Array.isArray(sideNavigation)
    ? sideNavigation.find(item => item.__component === 'shared.carousel')
    : null

  return (
    <>
      <div className='flex flex-col items-center justify-center gap-4'>
        <SpinWheel stopAtPrize='$5.00' />
      </div>
      <div className='sticky top-2 rounded-3xl flex flex-col items-center justify-center gap-4'>
        <CarouselWidget data={carouselData} />
        <h1 className='font-bold text-muted'>SHARE THIS ARTICLE</h1>
        <BlogSocialLinks />
      </div>
    </>
  )
}

export default QuickOverviewClient
