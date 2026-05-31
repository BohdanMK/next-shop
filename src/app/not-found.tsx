import { getTranslations } from "next-intl/server"
import Link from "next/link"

export default async function NotFound() {
  const t = await getTranslations('notFound')

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-6xl font-bold">404</h2>
      <p className="text-foreground">{t('title')}</p>
      <Link
        href="/"
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
      >
        {t('backHome')}
      </Link>
    </div>
  )
}
