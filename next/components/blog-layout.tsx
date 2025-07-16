import { Container } from './container'
import DynamicZoneManager from './dynamic-zone/manager'
import { Article } from '@/types/types'
import { BlogArticleOverview } from './blog-article-overview'
import { DynamicTOC } from './dynamic-toc'
import SpinWheel from './widgets/spin-wheel'
import PayoutSliderStrip from './payout-slider-strip'
import CarouselWidget from './widgets/slider'
import BlogSocialLinks from './blog-social-links'
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
      <Container className='mt-16 lg:mt-18'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
          <div className='lg:col-span-9'>
            <BlogArticleOverview article={article} locale={locale} />
            <Card className='bg-background-main'>
              <DynamicTOC contentSelector='#blog-content' />
              <article className='pb-8 pt-8 px-4'>
                <div className='flex items-center justify-center'>
                  <div id='blog-content' className='mt-8 prose prose-lg prose-invert'>
                    {children}
                  </div>
                </div>
              </article>
            </Card>
          </div>
          <div className='lg:col-span-3 flex flex-col gap-4'>
            <QuickOverview locale={locale} />
            <div className='sticky top-2 rounded-3xl flex flex-col items-center justify-center gap-4'>
              <h1 className='font-bold text-muted'>SHARE THIS ARTICLE</h1>
              <BlogSocialLinks />
            </div>
          </div>
        </div>
        {/* {article?.dynamic_zone && (
          <DynamicZoneManager dynamicZone={article?.dynamic_zone} locale={locale} />
        )} */}
      </Container>
    </>
  )
}
