import fetchContentType from '@/lib/strapi/fetchContentType'
import QuickOverviewClient from './quick-overview-client'
import React from 'react'

async function QuickOverview({ locale }: { locale: string }) {
  const pageData = await fetchContentType('global', { filters: { locale } }, true)
  const sideNavigation = pageData.sideNavigation
  return <QuickOverviewClient sideNavigation={sideNavigation} />
}

export default QuickOverview
