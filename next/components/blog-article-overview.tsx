import React from 'react'
import { Article } from '@/types/types'
import { Container } from './container'
import { BlurImage } from './blur-image'
import { strapiImage } from '@/lib/strapi/strapiImage'
import { format } from 'date-fns'
import { Heading } from './elements/heading'
import { Subheading } from './elements/subheading'
import { truncate } from '@/lib/utils'
import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'

export const BlogArticleOverview = ({ article, locale }: { article: Article; locale: string }) => {
  return (
    <Container className='mb-16'>
      {/* <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <Link href='/blog' className='flex space-x-2 items-center'>
            <IconArrowLeft className='w-4 h-4 text-muted' />
            <span className='text-sm text-muted'>Back</span>
          </Link>
          <div className='flex gap-4 flex-wrap mb-4'>
            {article.categories?.map((category, idx) => (
              <p
                key={`category-${idx}`}
                className='text-xs font-bold text-muted px-2 py-1 rounded-full bg-neutral-800 capitalize'
              >
                {category.name}
              </p>
            ))}
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              article.title
            )}&url=${encodeURIComponent(
              `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog/${article.slug}`
            )}`}
            target='_blank'
            rel='noopener noreferrer'
            className='p-2 text-muted hover:text-white rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors'
          >
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
            </svg>
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog/${article.slug}`
            )}`}
            target='_blank'
            rel='noopener noreferrer'
            className='p-2 text-muted hover:text-white rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors'
          >
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
            </svg>
          </a>

          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog/${article.slug}`
            )}&title=${encodeURIComponent(article.title)}`}
            target='_blank'
            rel='noopener noreferrer'
            className='p-2 text-muted hover:text-white rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors'
          >
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
            </svg>
          </a>
        </div>
      </div> */}
      <div className='flex items-center gap-2'>
        <div className='mx-auto text-center flex flex-col gap-10'>
          <h1 className='text-4xl font-bold tracking-tight text-neutral-200 sm:text-5xl'>
            {article.title}
          </h1>
          {article.image ? (
            <BlurImage
              src={strapiImage(article.image.url)}
              alt={article.title}
              height={200}
              width={200}
              className='h-40 md:h-[30rem] w-full object-cover rounded-3xl'
            />
          ) : (
            <div className='h-40 md:h-96 w-full aspect-square rounded-3xl shadow-derek bg-neutral-900 flex items-center justify-center'>
              {/* Optionally, place a logo or fallback here */}
            </div>
          )}
          <p className='text-muted text-center text-lg'>{article.description}</p>
          <div className='flex gap-4 flex-wrap mb-4 justify-center items-center font-bold text-muted'>
            {format(new Date(article.publishedAt), 'dd.MM.yyyy')}
            <div className='h-5 rounded-lg w-0.5 bg-neutral-700' />
            <span className='hover:text-primary'>{article.author.name}</span>
          </div>
        </div>
      </div>
    </Container>
  )
}
