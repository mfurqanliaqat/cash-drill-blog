'use client'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

interface CTAProps {
  text: string
  URL: string
  target: '_blank' | '_self'
  variant: 'default' | 'outline'
  locale: string
}

export const CTA = ({ text, URL, target, variant, locale }: CTAProps) => {
  return (
    <Button
      target={target}
      href={`${URL}`}
      variant={variant}
      size='lg'
      className='max-w-sm mx-auto'
    >
      {text}
    </Button>
  )
}
