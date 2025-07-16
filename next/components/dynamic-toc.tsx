'use client'

import { useEffect, useState } from 'react'
import { TOCItem, generateIdFromTitle } from '@/lib/toc'
import { TableOfContents } from './table-of-contents'

interface DynamicTOCProps {
  contentSelector: string
  className?: string
}

export function DynamicTOC({ contentSelector, className }: DynamicTOCProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])

  useEffect(() => {
    const content = document.querySelector(contentSelector) as HTMLElement | null
    if (!content) return

    const extractHeadings = () => {
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
          level,
        })
      })

      console.log('Headings', headings)

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

    observer.observe(content, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [contentSelector])

  if (tocItems.length === 0) return null

  console.log('TOC Items', tocItems)

  return <TableOfContents items={tocItems} className={className} contentRef={undefined} />
}
