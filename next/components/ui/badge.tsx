import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-xl text-sm font-extrabold ring-offset-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300',
  {
    variants: {
      variant: {
        default:
          'px-3 py-1.5 text-base flex items-center justify-center transition-all duration-200 hover:brightness-105 active:translate-y-0.5 bg-[var(--badge-bg)] text-[var(--badge-text)] shadow-lg shadow-[var(--badge-shadow)] active:shadow-[0_1px_0_0_var(--badge-shadow)]',
        secondary:
          'px-3 py-1.5 text-base flex items-center justify-center transition-all duration-200 hover:brightness-105 active:translate-y-0.5 bg-[var(--badge-bg)] text-[var(--badge-text)] shadow-lg shadow-[var(--badge-shadow)] active:shadow-[0_1px_0_0_var(--badge-shadow)]',
        destructive:
          'px-3 py-1.5 text-base flex items-center justify-center transition-all duration-200 hover:brightness-105 active:translate-y-0.5 bg-error text-white shadow-lg shadow-error/70 active:shadow-[0_1px_0_0_var(--tw-shadow-color)]',
        outline:
          'px-3 py-1.5 text-base flex items-center justify-center transition-all duration-200 hover:brightness-105 active:translate-y-0.5 bg-transparent border-2 border-[var(--badge-border)] text-[var(--badge-text)] shadow-lg shadow-[var(--badge-shadow)] active:shadow-[0_1px_0_0_var(--badge-outline-shadow)]',
      },
      size: {
        default: 'px-3 py-1.5 text-sm',
        sm: 'px-2 py-1 text-xs',
        lg: 'px-4 py-2 text-base',
      },
      colorVariant: {
        primary:
          '[--badge-bg:theme(colors.primary)] [--badge-text:black] [--badge-border:theme(colors.primary)] [--badge-shadow:theme(colors.primary/0.4)] [--badge-outline-shadow:theme(colors.primary)]',
        secondary:
          '[--badge-bg:theme(colors.secondary)] [--badge-text:white] [--badge-border:theme(colors.secondary)] [--badge-shadow:theme(colors.secondary/0.7)] [--badge-outline-shadow:theme(colors.secondary)]',
        accent:
          '[--badge-bg:theme(colors.accent)] [--badge-text:white] [--badge-border:theme(colors.accent)] [--badge-shadow:theme(colors.accent/0.4)] [--badge-outline-shadow:theme(colors.accent)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      colorVariant: 'primary',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  color?: 'primary' | 'secondary' | 'accent'
}

function Badge({ className, variant, size, color, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({
          variant,
          size,
          colorVariant: color as 'primary' | 'secondary' | 'accent',
          className,
        })
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
