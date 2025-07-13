import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import OfferHighlightCard from './offer-highlights/offer-highlight-card'

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
  return (
    <div className='w-full max-w-3xl mx-auto my-8'>
      <Card variant='gradient'>
        <CardHeader>{heading}</CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
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
