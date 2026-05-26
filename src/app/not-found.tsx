import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-6xl font-bold">404</h2>
      <p className="text-muted-foreground">Сторінку не знайдено</p>
      <Link
        href="/"
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
      >
        На головну
      </Link>
    </div>
  )
}
