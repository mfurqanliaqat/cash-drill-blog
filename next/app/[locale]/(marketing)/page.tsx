import { redirect } from 'next/navigation'

export default async function RedirectToBlog({ params }: { params: { locale: string } }) {
  const { locale } = await params
  redirect(`/${locale}/blog`)
}
