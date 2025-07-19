import { Container } from './container'
import DynamicZoneManager from './dynamic-zone/manager'
import { Article } from '@/types/types'
import { BlogArticleOverview } from './blog-article-overview'
import { DynamicTOC } from './dynamic-toc'
import PayoutSliderStrip from './payout-slider-strip'
import { Card } from './ui/card'
import QuickOverview from './quick-overview'

export function BlogLayout({
  article,
  locale,
  children,
}: {
  article: Article
  locale: string
  children: React.ReactNode
}) {
  return (
    <>
      <PayoutSliderStrip />
      <Container className='mt-8 sm:mt-12 lg:mt-16'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6'>
          {/* Main content area */}
          <div className='md:col-span-8 lg:col-span-9 order-1 md:order-1 '>
            <BlogArticleOverview article={article} locale={locale} />
            <Card className='bg-background-main'>
              <DynamicTOC contentSelector='#blog-content' />
              <article className='pb-6 sm:pb-8 pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-center'>
                  <div
                    id='blog-content'
                    className='mt-6 sm:mt-8 prose prose-sm sm:prose-base lg:prose-lg prose-invert w-full'
                  >
                    {children}
                  </div>
                </div>
              </article>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='md:col-span-4 lg:col-span-3 order-2 md:order-2 flex flex-col gap-4'>
            <QuickOverview locale={locale} />
          </div>
        </div>

        {/* Dynamic zone section */}
        {article?.dynamic_zone && (
          <div className='mt-8 sm:mt-12'>
            <DynamicZoneManager dynamicZone={article?.dynamic_zone} locale={locale} />
          </div>
        )}
      </Container>
    </>
  )
}
