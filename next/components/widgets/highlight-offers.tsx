import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import netflix from '../../public/next.svg'
import Image from 'next/image'

function HighlightOffers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Highlighted Offers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex gap-4 items-center'>
          <div className='w-1/3 rounded-lg bg-background-card p-4'>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col'>
                <div className='flex items-center gap-2'>
                  <Image src={netflix} alt='Netflix' className='w-full  ' />
                </div>
                <div className='text-lg font-semibold'>Netflix</div>
                <div className='text-sm text-muted-foreground'>Start a trial month</div>
                <div className='text-sm text-muted-foreground'>
                  <span className='text-primary font-semibold text-lg'>$10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default HighlightOffers
