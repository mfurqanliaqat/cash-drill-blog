'use client'

import { useRef } from 'react'
import { IconArrowLeft } from '@tabler/icons-react'
import { Container } from './container'
import Image from 'next/image'
import { Link } from 'next-view-transitions'
import { format } from 'date-fns'
import { strapiImage } from '@/lib/strapi/strapiImage'
import DynamicZoneManager from './dynamic-zone/manager'
import { Article } from '@/types/types'
import { BlogArticleOverview } from './blog-article-overview'
import { DynamicTOC } from './dynamic-toc'

export function BlogLayout({
  article,
  locale,
  children,
}: {
  article: Article
  locale: string
  children: React.ReactNode
}) {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Container className='mt-16 lg:mt-32'>
        <BlogArticleOverview article={article} locale={locale} />
        <div className='xl:relative'>
          <div className='mx-auto max-w-2xl'>
            <article className='pb-8 pt-8'>
              <DynamicTOC contentRef={contentRef} />
              <div ref={contentRef} className='mt-8 prose prose-sm prose-invert'>
                {children}
              </div>
              <div className='flex space-x-2 items-center pt-12 border-t border-neutral-800 mt-12'>
                <div className='h-5 rounded-lg w-0.5 bg-neutral-700' />
                <time dateTime={article.publishedAt} className='flex items-center text-base '>
                  <span className='text-muted text-sm'>
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
