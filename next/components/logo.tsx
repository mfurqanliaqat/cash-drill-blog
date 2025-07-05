import React from 'react'

import { Link } from 'next-view-transitions'
import { BlurImage } from './blur-image'

import { strapiImage } from '@/lib/strapi/strapiImage'
import { Image } from '@/types/types'

export const Logo = ({ image, locale }: { image?: Image; locale?: string }) => {
  if (image) {
    return (
      <Link
        href={`/${locale || 'en'}`}
        className='font-normal flex space-x-2 items-center text-sm mr-4  text-black   relative z-20'
      >
        <BlurImage
          src={strapiImage(image?.url)}
          alt={image.alternativeText}
          width={600}
          height={200}
          className='w-48 rounded-xl mr-2'
        />
      </Link>
    )
  }

  return
}
