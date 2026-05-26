export function getImageUrl(path?: string): string {
  if (!path) return "/placeholder.jpg"
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${base}${normalizedPath}`
}