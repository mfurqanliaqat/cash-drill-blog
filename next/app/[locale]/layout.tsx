import React from 'react'

import { Rethink_Sans } from 'next/font/google'

import { Metadata } from 'next'
import { generateMetadataObject } from '@/lib/shared/metadata'

import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { cn } from '@/lib/utils'
import { ViewTransitions } from 'next-view-transitions'
import fetchContentType from '@/lib/strapi/fetchContentType'

const rethinkSans = Rethink_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rethink-sans',
  display: 'swap',
  preload: true,
  style: ['normal', 'italic'],
})

// Default Global SEO for pages without them
export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const pageData = await fetchContentType(
    'global',
    {
      filters: { locale: params.locale },
      populate: 'seo.metaImage',
    },
    true
  )

  const seo = pageData?.seo
  const metadata = generateMetadataObject(seo)
  return metadata
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const pageData = await fetchContentType('global', { filters: { locale } }, true)
  return (
    <html lang={locale}>
      <ViewTransitions>
        <body className={cn('bg-background-main antialiased h-full w-full', rethinkSans.className)}>
          <Navbar data={pageData.navbar} locale={locale} />
          {children}
          <Footer data={pageData.footer} locale={locale} />
        </body>
      </ViewTransitions>
    </html>
  )
}
