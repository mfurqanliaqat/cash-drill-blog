import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300',
  {
    variants: {
      variant: {
        default:
          'font-extrabold rounded-xl px-4 py-2 text-lg flex items-center justify-center transition-all duration-200 hover:brightness-105 active:translate-y-1 bg-[var(--button-bg)] text-[var(--button-text)] shadow-lg shadow-[var(--button-shadow)] active:shadow-[0_2px_0_0_var(--button-shadow)]',
        destructive:
          'bg-error shadow-lg shadow-error/70 active:shadow-[0_2px_0_0_var(--tw-shadow-color)] font-extrabold rounded-xl px-4 py-2 text-lg flex items-center justify-center transition-all duration-200 hover:brightness-105 active:translate-y-1',
        outline:
          'bg-transparent border-2 font-extrabold rounded-xl px-4 py-2 text-lg flex items-center justify-center transition-all duration-200 hover:brightness-105 active:translate-y-1 border-[var(--button-border)] text-white shadow-lg shadow-[var(--button-shadow)] active:shadow-[0_2px_0_0_var(--button-outline-shadow)]',
        secondary:
          'bg-secondary shadow-lg shadow-secondary/70 active:shadow-[0_2px_0_0_var(--tw-shadow-color)] font-extrabold rounded-xl px-4 py-2 text-lg flex items-center justify-center transition-all duration-200 hover:brightness-105 active:translate-y-1',
        ghost:
          'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        link: 'text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-12 w-12',
      },
      colorVariant: {
        primary:
          '[--button-bg:theme(colors.primary)] [--button-text:black] [--button-border:theme(colors.primary)] [--button-shadow:theme(colors.primary/0.4)] [--button-outline-shadow:theme(colors.primary)]',
        secondary:
          '[--button-bg:theme(colors.secondary)] [--button-text:white] [--button-border:theme(colors.secondary)] [--button-shadow:theme(colors.secondary/0.7)] [--button-outline-shadow:theme(colors.secondary)]',
        accent:
          '[--button-bg:theme(colors.accent)] [--button-text:white] [--button-border:theme(colors.accent)] [--button-shadow:theme(colors.accent/0.4)] [--button-outline-shadow:theme(colors.accent)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      colorVariant: 'primary',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: string
  target?: '_blank' | '_self'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color, asChild = false, href, target, ...props }, ref) => {
    const buttonClassName = cn(
      buttonVariants({
        variant,
        size,
        colorVariant: color as 'primary' | 'secondary' | 'accent',
        className,
      })
    )

    if (href) {
      // For links, render as Link component
      return (
        <Link
          href={href}
          target={target}
          className={buttonClassName}
          onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          id={props.id}
          style={{ textDecoration: 'none', ...props.style }}
          role={props.role}
          tabIndex={props.tabIndex}
        >
          {props.children}
        </Link>
      )
    }

    // For buttons, render as button element
    const Comp = asChild ? Slot : 'button'
    return <Comp className={buttonClassName} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
