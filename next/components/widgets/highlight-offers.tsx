import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import netflix from '../../public/netflix.jpg'
import Image from 'next/image'
import { Badge } from '../ui/badge'

function HighlightOffers() {
  return (
    <Card>
      <CardHeader>
        <Image
          src={netflix}
          alt='Netflix'
          className='w-60 object-cover h-auto rounded-lg not-prose'
        />
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-1 items-start'>
          <div className='text-lg font-semibold'>Netflix</div>
          <div className='text-sm text-muted-foreground'>Start a trial month</div>
          <div className='flex items-center justify-between w-full'>
            <div className='text-primary font-semibold text-xl'>$10</div>
            <div className='text-primary font-semibold text-xl'>
              <Badge color='accent'>Trial</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default HighlightOffers
