// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiFetch } from '@/lib/api-fetch'

vi.mock('next/headers', () => ({
  cookies: vi.fn().mockResolvedValue({
    toString: () => 'session=test123',
  }),
}))

describe('apiFetch', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response()))
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  describe('server side (window is undefined)', () => {
    it('builds a full URL from NEXT_PUBLIC_API_URL', async () => {
      await apiFetch('/products')
      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/products',
        expect.objectContaining({
          headers: expect.objectContaining({ Cookie: 'session=test123' }),
        })
      )
    })

    it('forwards init options and preserves the Cookie header', async () => {
      await apiFetch('/orders', { method: 'POST' })
      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/orders',
        expect.objectContaining({ method: 'POST' })
      )
    })

    it('merges custom headers with the Cookie header', async () => {
      await apiFetch('/orders', { headers: { 'Content-Type': 'application/json' } })
      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/orders',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Cookie: 'session=test123',
          }),
        })
      )
    })
  })

  describe('client side (window exists)', () => {
    beforeEach(() => {
      vi.stubGlobal('window', {})
    })

    it('uses a relative path and sets credentials: include', async () => {
      await apiFetch('/products')
      expect(fetch).toHaveBeenCalledWith('/products', { credentials: 'include' })
    })

    it('forwards init options', async () => {
      await apiFetch('/products', { method: 'POST' })
      expect(fetch).toHaveBeenCalledWith('/products', { method: 'POST', credentials: 'include' })
    })
  })
})
