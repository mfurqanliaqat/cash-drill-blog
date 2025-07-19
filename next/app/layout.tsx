import type { Viewport } from 'next'
import { Locale, i18n } from '@/i18n.config'

import './globals.css'

import { SlugProvider } from './context/SlugContext'
import { Rethink_Sans } from 'next/font/google'

const rethinkSans = Rethink_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#06b6d4' },
    { media: '(prefers-color-scheme: dark)', color: '#06b6d4' },
  ],
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  const { locale } = await params
  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SlugProvider>{children}</SlugProvider>
      </body>
    </html>
  )
}
