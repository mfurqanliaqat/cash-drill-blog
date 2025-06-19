import { IconArrowLeft } from '@tabler/icons-react'
import { Container } from './container'
import Image from 'next/image'
import { Link } from 'next-view-transitions'
import { format } from 'date-fns'
import { strapiImage } from '@/lib/strapi/strapiImage'
import DynamicZoneManager from './dynamic-zone/manager'
import { Article } from '@/types/types'
import { BlogArticleOverview } from './blog-article-overview'
import { TableOfContents } from './table-of-contents'
import { TOCItem } from '@/lib/toc'

// Sample TOC items based on the Freecash article structure
const defaultTocItems: TOCItem[] = [
  { id: 'key-takeaways', title: 'Key Takeaways', level: 1 },
  { id: 'talk-as-influencer', title: 'Talk as an Influencer on Chat Apps', level: 1 },
  { id: 'chat-and-game', title: 'Chat and Game with Gamers', level: 1 },
  { id: 'dating-chat-apps', title: 'Sign Up for Dating Chat Apps', level: 1 },
  { id: 'freelance-support', title: 'Freelance for Chat Support Gigs', level: 1 },
  { id: 'twitter-ghostwriter', title: 'Be a Twitter Ghostwriter', level: 1 }
]

export async function BlogLayout({
  article,
  locale,
  children,
  tocItems = defaultTocItems
}: {
  article: Article
  locale: string
  children: React.ReactNode
  tocItems?: TOCItem[]
}) {
  return (
    <>
      <Container className="mt-16 lg:mt-32">
        <BlogArticleOverview article={article} locale={locale} />
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            <article className="pb-8 pt-8">
              <TableOfContents items={tocItems} />
              <div className="mt-8 prose prose-sm prose-invert">{children}</div>
              <div className="flex space-x-2 items-center pt-12 border-t border-neutral-800 mt-12">
                <div className="h-5 rounded-lg w-0.5 bg-neutral-700" />
                <time dateTime={article.publishedAt} className="flex items-center text-base ">
                  <span className="text-muted text-sm">
                    {format(new Date(article.publishedAt), 'MMMM dd, yyyy')}
                  </span>
                </time>
              </div>
            </article>
          </div>
        </div>
        {article?.dynamic_zone && (
          <DynamicZoneManager dynamicZone={article?.dynamic_zone} locale={locale} />
        )}
      </Container>
    </>
  )
}
