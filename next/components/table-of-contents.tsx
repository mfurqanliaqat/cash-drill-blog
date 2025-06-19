'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { TOCItem } from '@/lib/toc'

interface TableOfContentsProps {
  items: TOCItem[]
  className?: string
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -35% 0px' }
    )

    items.forEach(item => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

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
    <div
      className={cn(
        'sticky top-0 z-40 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800 shadow-sm',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center space-x-6 overflow-x-auto py-3 scrollbar-hide">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                'whitespace-nowrap text-sm font-medium transition-all duration-200 hover:text-neutral-200 px-2 py-1 rounded-md',
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
    </div>
  )
}
