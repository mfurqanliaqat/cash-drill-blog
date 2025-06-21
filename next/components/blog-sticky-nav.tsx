'use client'
import React, { useEffect, useRef, useState, ReactElement } from 'react'

interface BlogStickyNavProps {
  articleTitle: string
  children: React.ReactNode
}

export default function BlogStickyNav({ articleTitle, children }: BlogStickyNavProps) {
  const articleRef = useRef<HTMLDivElement>(null)
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([])
  const [progress, setProgress] = useState(0)
  const [activeId, setActiveId] = useState<string | null>(null)

  // Extract h2s from the real article content after render
  useEffect(() => {
    if (!articleRef.current) return
    const h2s = Array.from(articleRef.current.querySelectorAll('h2'))
    const headingData = h2s.map(h2 => {
      let id = h2.id
      if (!id) {
        id = h2.textContent
          ? h2.textContent
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')
          : ''
        h2.id = id
      }
      return { id, text: h2.textContent || '' }
    })
    setHeadings(headingData)
  }, [children])

  // IntersectionObserver for active heading (relative to viewport)
  useEffect(() => {
    if (!articleRef.current || headings.length === 0) return
    const observer = new window.IntersectionObserver(
      entries => {
        const visible = entries.filter(entry => entry.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.1
      }
    )
    const h2s = Array.from(articleRef.current.querySelectorAll('h2'))
    h2s.forEach(h2 => observer.observe(h2))
    return () => {
      h2s.forEach(h2 => observer.unobserve(h2))
      observer.disconnect()
    }
  }, [headings])

  // Progress bar based on page scroll (from top to bottom of article)
  useEffect(() => {
    function onScroll() {
      if (!articleRef.current) return
      const el = articleRef.current
      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      const docScroll = window.scrollY || window.pageYOffset
      const start = rect.top + docScroll
      const end = rect.bottom + docScroll - windowHeight
      const total = end - start
      const current = docScroll - start
      let percent = total > 0 ? (current / total) * 100 : 0
      percent = Math.max(0, Math.min(100, percent))
      setProgress(percent)
    }
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Scroll to section on nav click (page scroll)
  const handleNavClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const h2 = document.getElementById(id)
    if (h2) {
      const y = h2.getBoundingClientRect().top + window.scrollY - 16 // offset for padding
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // Clone BlogContentCard to inject articleRef
  const contentWithRef = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as ReactElement<any>, { articleRef })
    }
    return child
  })

  return (
    <>
      {/* Sticky nav and progress bar, full width of content area */}
      <div className="sticky top-0 z-30 bg-neutral-900 border-b border-neutral-800">
        <nav className="flex gap-2 px-4 py-4 overflow-x-auto">
          {headings.map(heading => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={handleNavClick(heading.id)}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors whitespace-nowrap
                ${
                  activeId === heading.id
                    ? 'bg-green-600/20 text-green-400 shadow'
                    : 'bg-neutral-800 text-muted hover:bg-green-900/30 hover:text-green-300'
                }`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
        <div className="h-1 w-full bg-neutral-800">
          <div
            className="h-1 bg-green-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {contentWithRef}
    </>
  )
}
