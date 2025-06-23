'use client'

import { useRef } from 'react'
import {
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandReddit,
  IconBrandTumblr,
  IconBrandX,
  IconBrandYoutube,
} from '@tabler/icons-react'
import { Container } from './container'
import { format } from 'date-fns'
import DynamicZoneManager from './dynamic-zone/manager'
import { Article } from '@/types/types'
import { BlogArticleOverview } from './blog-article-overview'
import { DynamicTOC } from './dynamic-toc'
import SpinWheel from './widgets/spin-wheel'
import PayoutSliderStrip from './payout-slider-strip'
import { Button } from './elements/button'

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
      <PayoutSliderStrip />
      <Container className='mt-16 lg:mt-18'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
          <div className='lg:col-span-9'>
            <BlogArticleOverview article={article} locale={locale} />
            <div className='bg-background-main border-4 border-border-card rounded-3xl'>
              <DynamicTOC contentRef={contentRef} />
              <article className='pb-8 pt-8'>
                <div className='flex items-center justify-center'>
                  <div ref={contentRef} className='mt-8 prose prose-lg prose-invert'>
                    {children}
                  </div>
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
          <div className='lg:col-span-3'>
            <div className='sticky top-2 rounded-3xl flex flex-col items-center justify-center gap-4'>
              <SpinWheel />
              <h1 className='font-bold text-muted'>SHARE THIS ARTICLE</h1>
              <div className='flex gap-4 w-full flex-wrap items-center justify-center'>
                <Button variant='outline' className='p-2'>
                  <IconBrandX />
                </Button>
                <Button variant='outline' className='p-2'>
                  <IconBrandFacebook />
                </Button>
                <Button variant='outline' className='p-2'>
                  <IconBrandInstagram />
                </Button>
                <Button variant='outline' className='p-2'>
                  <IconBrandReddit />
                </Button>
                <Button variant='outline' className='p-2'>
                  <IconBrandDiscord />
                </Button>
                <Button variant='outline' className='p-2'>
                  <IconBrandYoutube />
                </Button>
                <Button variant='outline' className='p-2'>
                  <IconBrandTumblr />
                </Button>
              </div>
            </div>
          </div>
        </div>
        {article?.dynamic_zone && (
          <DynamicZoneManager dynamicZone={article?.dynamic_zone} locale={locale} />
        )}
      </Container>
    </>
  )
}
