import React from 'react'
import { Logo } from '@/components/logo'
import { Link } from 'next-view-transitions'
import { Container } from './container'

export const Footer = async ({ data, locale }: { data: any; locale: string }) => {
  return (
    <div className='relative'>
      <Container className='border-t-4 border-card pt-20 pb-5 flex flex-col gap-10'>
        <div className='flex sm:flex-row flex-col justify-between items-start gap-20'>
          <div className='flex flex-col gap-4 md:w-1/3'>
            <div className='mr-4  md:flex mb-4'>
              {data?.logo?.image && <Logo image={data?.logo?.image} />}
            </div>
            <div className='max-w-xs text-muted text-sm'>{data?.description}</div>
          </div>
          <div className='grid grid-cols-2 gap-10 items-start mt-10 md:mt-0 md:flex md:flex-row w-full md:justify-between'>
            <LinkSection links={data?.internal_links || []} locale={locale} />
            <LinkSection links={data?.resource_links || []} locale={locale} />
            <LinkSection links={data?.business_links || []} locale={locale} />
            <LinkSection links={data?.earning_links || []} locale={locale} />
            {/* <LinkSection links={data?.policy_links || []} locale={locale} /> */}
            {/* <LinkSection links={data?.social_media_links || []} locale={locale} /> */}
          </div>
        </div>
        <div className='flex gap-4 items-start mt-10'>
          <div className='font-semibold'>{data?.copyright}</div>
          <span className='text-muted opacity-50 select-none'>|</span>
          {data?.policy_links.map((link: { text: string; URL: string }, index: number) => (
            <React.Fragment key={link.text}>
              <Link
                className='transition-colors hover:text-primary text-muted font-semibold'
                href={`${link.URL.startsWith('http') ? '' : `/${locale}`}${link.URL}`}
              >
                {link.text}
              </Link>
              {index < data.policy_links.length - 1 && (
                <span className='text-muted opacity-50 select-none'>|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </div>
  )
}

const LinkSection = ({
  links,
  locale,
}: {
  links: { text: string; URL: never | string }[]
  locale: string
}) => (
  <div className='flex justify-center space-y-4 flex-col mt-4'>
    {links.map(link => (
      <Link
        key={link.text}
        className='transition-colors hover:text-primary text-muted font-semibold'
        href={`${link.URL.startsWith('http') ? '' : `/${locale}`}${link.URL}`}
      >
        {link.text}
      </Link>
    ))}
  </div>
)
