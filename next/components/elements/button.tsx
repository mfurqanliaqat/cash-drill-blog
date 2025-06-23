import { cn } from '@/lib/utils'
import React from 'react'
import { LinkProps } from 'next/link' // Or from your routing library

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'default' | 'outline'
  /**
   * Tailwind color name (e.g., 'green', 'red', 'blue', 'yellow', etc.)
   * Will be used to generate bg, border, and shadow classes.
   */
  color?: string
  as?: React.ElementType
  className?: string
  children?: React.ReactNode
  href?: LinkProps['href']
  onClick?: () => void
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  color = 'primary',
  as: Tag = 'button',
  className,
  children,
  leftIcon,
  rightIcon,
  ...props
}) => {
  // Compose Tailwind classes dynamically based on color
  // Use 600 for bg, border, and shadow, and white text for contrast
  const bgClass = `bg-${color}`
  const borderClass = `border-${color}/70`
  const textClass = 'text-white'

  const variantClass =
    variant === 'outline'
      ? `bg-transparent border-2 ${borderClass} shadow-lg shadow-${color}/70 active:shadow-[0_2px_0_0_var(--tw-shadow-color)] font-extrabold rounded-xl px-8 py-4 text-lg flex items-center justify-center transition-all duration-200 hover:brightness-105 active:translate-y-1 ${textClass}`
      : `${bgClass} shadow-lg shadow-${color}/70 active:shadow-[0_2px_0_0_var(--tw-shadow-color)] font-extrabold rounded-xl px-8 py-4 text-lg flex items-center justify-center transition-all duration-200 hover:brightness-105 active:translate-y-1 ${textClass}`

  return (
    <Tag className={cn(variantClass, className)} {...props}>
      {leftIcon && <span className='mr-2 flex items-center'>{leftIcon}</span>}
      <span className='flex items-center gap-2'>{children}</span>
      {rightIcon && <span className='ml-2 flex items-center'>{rightIcon}</span>}
    </Tag>
  )
}

// Helper to get Tailwind hex color for a given color and shade
function getTailwindHex(color: string, shade: number): string {
  // You can expand this map as needed
  const map: Record<string, Record<number, string>> = {
    green: { 600: '16a34a' },
    red: { 600: 'dc2626' },
    blue: { 600: '2563eb' },
    yellow: { 600: 'ca8a04' },
    purple: { 600: '7c3aed' },
    pink: { 600: 'db2777' },
    gray: { 600: '4b5563' },
    // Add more as needed
  }
  return map[color]?.[shade] || '16a34a' // fallback to green
}
