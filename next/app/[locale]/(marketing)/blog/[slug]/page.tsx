import React from 'react'

import { BlogLayout } from '@/components/blog-layout'
import fetchContentType from '@/lib/strapi/fetchContentType'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

import ClientSlugHandler from '../../ClientSlugHandler'
import { Button } from '@/components/ui/button'
import { CTA } from '@/components/widgets/cta'
import Table from '@/components/widgets/data-table'
import ComparisonTable from '@/components/widgets/comparison-table'
import EarningEstimate from '@/components/widgets/earning-estimate'
import HighlightOffers from '@/components/widgets/highlight-offers'

export default async function SingleArticlePage({
  params,
}: {
  params: { slug: string; locale: string }
}) {
  const article = await fetchContentType(
    'articles',
    {
      filters: {
        slug: params.slug,
        locale: params.locale,
      },
    },
    true
  )

  const payouts = await fetchContentType('payouts', { populate: '*' }, false)

  if (!article) {
    return <div>Blog not found</div>
  }

  console.log(JSON.stringify(article?.dynamicContent, null, 2))

  const localizedSlugs = article.localizations?.reduce(
    (acc: Record<string, string>, localization: any) => {
      acc[localization.locale] = localization.slug
      return acc
    },
    { [params.locale]: params.slug }
  )

  return (
    <BlogLayout article={article} locale={params.locale}>
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      {/* <BlocksRenderer content={article.content} /> */}
      {article.dynamicContent?.map((block: any, index: number) => {
        if (block.__component === 'shared.rich-text') {
          return <BlocksRenderer key={index} content={block.content} />
        }
        if (block.__component === 'widgets.cta') {
          return <CTA key={index} locale={params.locale} {...block} />
        }
        if (block.__component === 'widgets.table') {
          return <Table key={index} {...block} />
        }
        if (block.__component === 'widgets.comparison-table') {
          return <ComparisonTable key={index} {...block} />
        }
        if (block.__component === 'widgets.estimation-bar-chart') {
          return <EarningEstimate key={index} {...block} />
        }
        if (block.__component === 'widgets.highlighted-offers') {
          return <HighlightOffers key={index} {...block} />
        }
      })}
      <div className='mb-8'></div>
    </BlogLayout>
  )
}
