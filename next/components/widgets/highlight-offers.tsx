'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import OfferHighlightCard from './offer-highlights/offer-highlight-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '../ui/carousel'
import styles from './highlight-offers.module.css'

interface HighloghtedOffer {
  title: string
  description: string
  price: string
  badge: string
  images: {
    url: string
    alt: string
  }[]
}

interface HighlightOffersProps {
  heading: string
  offers: HighloghtedOffer[]
}

function HighlightOffers({ heading, offers }: HighlightOffersProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className='w-full max-w-3xl mx-auto my-8'>
      <Card variant='gradient'>
        <CardHeader>
          <CardTitle className='flex items-center justify-between gap-2'>
            {heading}
            <div className={styles.liveDot}>
              <div className={styles.liveDotCenter}></div>
              <div className={styles.ripple}></div>
              <div className={`${styles.ripple} ${styles.ripple2}`}></div>
              <div className={`${styles.ripple} ${styles.ripple3}`}></div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Mobile Carousel */}
          <div className='lg:hidden'>
            <Carousel
              opts={{
                align: 'center',
                loop: true,
                containScroll: 'trimSnaps',
              }}
              setApi={setApi}
              className='w-full'
            >
              <CarouselContent className='-ml-4'>
                {offers.map((offer, index) => (
                  <CarouselItem key={offer.title} className='pl-1 basis-3/4'>
                    <div
                      className={`${styles.carouselItem} ${
                        current === index ? styles.carouselItemActive : styles.carouselItemInactive
                      }`}
                    >
                      <OfferHighlightCard {...offer} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='-left-4' />
              <CarouselNext className='-right-4' />
            </Carousel>
          </div>

          {/* Desktop Grid */}
          <div className='hidden lg:grid lg:grid-cols-3 gap-4'>
            {offers.map(offer => (
              <OfferHighlightCard key={offer.title} {...offer} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default HighlightOffers
