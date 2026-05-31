"use client"

import { useEffect } from "react"
import { useTranslations } from "next-intl"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('errors')

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h2 className="text-2xl font-bold">{t('critical')}</h2>
        <p className="text-sm">{error.message}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-black text-white rounded-md hover:opacity-80 transition-opacity"
        >
          {t('retry')}
        </button>
      </body>
    </html>
  )
}
