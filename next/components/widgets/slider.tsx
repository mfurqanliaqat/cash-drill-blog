import React, { useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { strapiImage } from '@/lib/strapi/strapiImage'

interface CarouselWidgetProps {
  data?: {
    heading?: string | null
    description?: string | null
    items?: Array<{
      id: number
      heading?: string
      description?: string
      image?: any
    }>
  } | null
}

function CarouselWidget({ data }: CarouselWidgetProps) {
  const items = data?.items || []
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [slideCount, setSlideCount] = useState(items.length)

  const handleSetApi = (api: any) => {
    if (!api) return
    setSlideCount(api.scrollSnapList().length)
    setSelectedIndex(api.selectedScrollSnap())
    api.on('select', () => {
      setSelectedIndex(api.selectedScrollSnap())
    })
  }

  return (
    <Card className='relative'>
      <CardContent className='relative block'>
        <Carousel setApi={handleSetApi} opts={{ loop: true }}>
          <CarouselContent>
            {items.map(item => (
              <CarouselItem key={item.id}>
                <div className='h-64 w-full flex flex-col items-center justify-start rounded-lg p-4'>
                  {item.heading && (
                    <h1
                      className='font-bold text-2xl mb-1 text-center'
                      dangerouslySetInnerHTML={{
                        __html: item.heading.replace(
                          /\|([^|]+)\|/g,
                          '<span class="text-primary">$1</span>'
                        ),
                      }}
                    />
                  )}
                  {item.description && (
                    <div className='text-sm text-muted mb-2 text-center'>{item.description}</div>
                  )}
                  {item.image?.url && (
                    <Image
                      src={strapiImage(item.image.url)}
                      alt={item.image.alternativeText || item.heading || ''}
                      width={320}
                      height={160}
                      className='object-cover rounded w-full h-40'
                      style={{ objectPosition: 'center', borderRadius: '0.5rem' }}
                    />
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='flex items-center justify-center mt-4 gap-4 w-full'>
            <CarouselPrevious className='translate-y-0 top-0 relative' />
            <div className='flex gap-2'>
              {Array.from({ length: slideCount }).map((_, idx) => (
                <span
                  key={idx}
                  className={`h-2 w-2 rounded-full transition-all ${
                    idx === selectedIndex ? 'bg-primary w-8' : 'bg-card w-2'
                  }`}
                />
              ))}
            </div>
            <CarouselNext className='translate-y-0 top-0 relative' />
          </div>
        </Carousel>
      </CardContent>
    </Card>
  )
}

export default CarouselWidget
