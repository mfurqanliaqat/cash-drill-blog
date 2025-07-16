import React from 'react'

interface CurrencyProps {
  value: number
  currency: string
  className?: string
}

function Currency({ value, currency, className }: CurrencyProps) {
  const formattedValue = value.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
  })

  return <span className={className}>{formattedValue}</span>
}

export default Currency
