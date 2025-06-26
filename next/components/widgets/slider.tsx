import React, { useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import { Card, CardContent } from '../ui/card'

interface CarouselWidgetProps {
  // Add any props you need here
}

function CarouselWidget(props: CarouselWidgetProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [slideCount, setSlideCount] = useState(3) // default to 3, update on mount

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
            <CarouselItem>
              <div className='h-40 w-40 bg-red-500'></div>
            </CarouselItem>
            <CarouselItem>
              <div className='h-40 w-40 bg-red-500'></div>
            </CarouselItem>
            <CarouselItem>
              <div className='h-40 w-40 bg-red-500'></div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className='-left-4' />
          <CarouselNext className='-right-4' />
        </Carousel>
        <div className='flex justify-center mt-4 gap-2'>
          {Array.from({ length: slideCount }).map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full transition-all ${
                idx === selectedIndex ? 'bg-primary w-8' : 'bg-card w-2'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default CarouselWidget
