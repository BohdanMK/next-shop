export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      ...init,
      headers: { ...(init.headers as object), Cookie: cookieStore.toString() },
    })
  }
  return fetch(path, { ...init, credentials: 'include' })
}
