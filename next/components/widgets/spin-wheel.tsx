import React from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

function SpinWheel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-center'>
          Earn <span className='text-primary'>up to $100</span> on your first completed offer
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center justify-center gap-4 text-center'>
        <Button>Spin The Wheel</Button>
      </CardContent>
    </Card>
  )
}

export default SpinWheel
