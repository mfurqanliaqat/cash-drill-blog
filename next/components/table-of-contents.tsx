'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { TOCItem } from '@/lib/toc'
import { Progress } from './ui/progress'

interface TableOfContentsProps {
  items: TOCItem[]
  className?: string
  contentRef?: React.RefObject<HTMLElement>
}

export function TableOfContents({ items, className, contentRef }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [progressWidth, setProgressWidth] = useState(0)
  const navRef = useRef<HTMLElement>(null)
  const activeButtonRef = useRef<HTMLButtonElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  // Update scroll progress bar (vertical scroll)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      let contentHeight = 0
      let contentTop = 0
      let contentBottom = 0
      if (contentRef && contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect()
        contentHeight = contentRef.current.scrollHeight
        contentTop = rect.top + window.scrollY
      } else {
        contentHeight = document.documentElement.scrollHeight
        contentTop = 0
      }
      const windowHeight = window.innerHeight
      const docHeight = contentHeight - windowHeight
      contentBottom = contentTop + contentHeight
      // Calculate progress based on content bottom
      // Progress is 100% when contentBottom has crossed above scrollTop (viewport top)
      const contentBottomDistance = contentBottom - scrollTop
      const maxScrollDistance = contentHeight
      const progress =
        maxScrollDistance > 0
          ? Math.max(
              0,
              Math.min(100, ((maxScrollDistance - contentBottomDistance) / maxScrollDistance) * 100)
            )
          : 0
      setProgressWidth(progress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [contentRef])

  useEffect(() => {
    const handleScroll = () => {
      const offset = 100 // Height of sticky header
      let currentId = items[0]?.id || ''
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const element = document.getElementById(item.id)
        if (element) {
          const top = element.getBoundingClientRect().top
          if (top - offset <= 0) {
            currentId = item.id
          } else {
            break
          }
        }
      }
      setActiveId(currentId)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [items])

  // Auto-center the active chip in the horizontal nav
  useEffect(() => {
    if (!activeId || !navRef.current || !activeButtonRef.current) return
    const nav = navRef.current
    const activeButton = activeButtonRef.current
    const navRect = nav.getBoundingClientRect()
    const buttonRect = activeButton.getBoundingClientRect()
    const navWidth = navRect.width
    const buttonLeft = buttonRect.left - navRect.left
    const buttonWidth = buttonRect.width
    const buttonCenter = buttonLeft + buttonWidth / 2
    const navCenter = navWidth / 2
    const scrollOffset = buttonCenter - navCenter
    // Only scroll if the button is significantly off-center
    if (Math.abs(scrollOffset) > 30) {
      nav.scrollTo({
        left: nav.scrollLeft + scrollOffset,
        behavior: 'smooth',
      })
    }
  }, [activeId])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // Account for sticky header height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <div
        className={cn(
          'sticky top-0 z-40 bg-background-header backdrop-blur-sm border-b border-border-card shadow-sm rounded-t-3xl',
          className
        )}
      >
        <div className='container mx-auto px-4'>
          <nav
            ref={navRef}
            className='flex items-center space-x-6 overflow-x-auto scrollbar-hide relative'
          >
            {items.map(item => (
              <button
                key={item.id}
                ref={activeId === item.id ? activeButtonRef : null}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'whitespace-nowrap font-bold transition-all duration-200 hover:text-neutral-200 px-2 py-4 relative z-10',
                  activeId === item.id ? 'text-primary' : 'text-muted'
                )}
              >
                {item.title}
                {/* Animated line indicator */}
                <div
                  className={cn(
                    'absolute top-0 left-1/2 h-1 bg-primary rounded-full transition-all duration-300 ease-out transform -translate-x-1/2',
                    activeId === item.id ? 'w-full opacity-100' : 'w-0 opacity-0'
                  )}
                />
              </button>
            ))}
          </nav>
        </div>
        {/* Progress bar directly below header */}
        <Progress value={progressWidth} className='h-1' color='primary' />
      </div>
    </>
  )
}
