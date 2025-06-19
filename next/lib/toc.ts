export interface TOCItem {
  id: string
  title: string
  level: number
}

export function extractTOCFromHTML(html: string): TOCItem[] {
  const headingRegex = /<h([1-6])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[1-6]>/g
  const items: TOCItem[] = []

  let match
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1])
    const id = match[2]
    const title = match[3].replace(/<[^>]*>/g, '') // Remove any HTML tags from title

    items.push({
      id,
      title,
      level
    })
  }

  return items
}

export function generateIdFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
