'use client'

import { useEffect, useState } from 'react'
import { TOCItem, generateIdFromTitle } from '@/lib/toc'
import { TableOfContents } from './table-of-contents'

interface DynamicTOCProps {
  contentRef: React.RefObject<HTMLElement>
  className?: string
}

export function DynamicTOC({ contentRef, className }: DynamicTOCProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])

  useEffect(() => {
    if (!contentRef.current) return

    const extractHeadings = () => {
      const content = contentRef.current
      if (!content) return []

      const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6')
      const items: TOCItem[] = []

      headings.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1))
        const title = heading.textContent?.trim() || ''

        // Use existing id or generate one
        let id = heading.id
        if (!id) {
          id = generateIdFromTitle(title)
          heading.id = id
        }

        items.push({
          id,
          title,
          level
        })
      })

      return items
    }

    // Initial extraction
    const items = extractHeadings()
    setTocItems(items)

    // Watch for content changes
    const observer = new MutationObserver(() => {
      const newItems = extractHeadings()
      setTocItems(newItems)
    })

    observer.observe(contentRef.current, {
      childList: true,
      subtree: true
    })

    return () => observer.disconnect()
  }, [contentRef])

  if (tocItems.length === 0) return null

  return <TableOfContents items={tocItems} className={className} contentRef={contentRef} />
}
