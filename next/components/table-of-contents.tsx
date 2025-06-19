'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { TOCItem } from '@/lib/toc'

interface TableOfContentsProps {
  items: TOCItem[]
  className?: string
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [progressWidth, setProgressWidth] = useState(0)
  const navRef = useRef<HTMLElement>(null)
  const activeButtonRef = useRef<HTMLButtonElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  // Debounced scroll function
  const debouncedScroll = useCallback((callback: () => void, delay: number) => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    scrollTimeoutRef.current = setTimeout(callback, delay)
  }, [])

  // Update scroll progress bar (vertical scroll)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgressWidth(Math.max(0, Math.min(100, progress)))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
        behavior: 'smooth'
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
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <div
        className={cn(
          'sticky top-0 z-40 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800 shadow-sm',
          className
        )}
      >
        <div className="container mx-auto px-4">
          <nav
            ref={navRef}
            className="flex items-center space-x-6 overflow-x-auto py-3 scrollbar-hide relative"
          >
            {items.map(item => (
              <button
                key={item.id}
                ref={activeId === item.id ? activeButtonRef : null}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'whitespace-nowrap text-sm font-medium transition-all duration-200 hover:text-neutral-200 px-2 py-1 rounded-md relative z-10',
                  activeId === item.id
                    ? 'text-neutral-200 bg-neutral-800/50 border-b-2 border-blue-500'
                    : 'text-neutral-400 hover:bg-neutral-800/30'
                )}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </div>
        {/* Progress bar directly below header */}
        <div className="w-full h-1 bg-neutral-700">
          <div
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>
    </>
  )
}
