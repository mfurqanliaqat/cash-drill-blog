import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import { strapiImage } from '@/lib/strapi/strapiImage'
import Currency from '@/components/currency'

interface OfferHighlightCardProps {
  title: string
  description: string
  price: string
  badge: string
  images: {
    url: string
    alt: string
  }[]
}

function OfferHighlightCard({ title, description, price, badge, images }: OfferHighlightCardProps) {
  return (
    <Card>
      {images && (
        <CardHeader className='p-0'>
          <div className='h-[120px] relative'>
            <Image
              src={strapiImage(images[0].url)}
              alt={images[0].alt}
              className='object-cover mx-auto rounded-lg not-prose'
              fill
            />
          </div>
        </CardHeader>
      )}
      <CardContent>
        <div className='flex flex-col gap-1 items-start'>
          <div className='text-lg font-semibold'>{title}</div>
          <div className='text-sm text-muted-foreground'>{description}</div>
          <div className='flex items-center justify-between w-full'>
            <Currency
              value={Number(price)}
              currency='USD'
              className='text-xl font-semibold text-primary'
            />
            <Badge color='accent' size='sm'>
              {badge}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default OfferHighlightCard
