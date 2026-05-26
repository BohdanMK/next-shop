export function buildQuery(params?: object): string {
  if (!params) return ''
  const searchParams = new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)])
  )
  const query = searchParams.toString()
  return query ? `?${query}` : ''
}
