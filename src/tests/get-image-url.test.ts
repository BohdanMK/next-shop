import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { getImageUrl } from '@/lib/get-image-url'

describe('getImageUrl', () => {
  const originalEnv = process.env.NEXT_PUBLIC_API_URL

  beforeEach(() => {
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com'
  })

  afterEach(() => {
    process.env.NEXT_PUBLIC_API_URL = originalEnv
  })

  it('returns the placeholder when no path is provided', () => {
    expect(getImageUrl()).toBe('/placeholder.jpg')
  })

  it('returns the placeholder when path is an empty string', () => {
    expect(getImageUrl('')).toBe('/placeholder.jpg')
  })

  it('builds a URL from a path starting with /', () => {
    expect(getImageUrl('/images/pizza.jpg')).toBe('https://api.example.com/images/pizza.jpg')
  })

  it('builds a URL from a path without a leading /', () => {
    expect(getImageUrl('images/pizza.jpg')).toBe('https://api.example.com/images/pizza.jpg')
  })

  it('strips trailing slash from the base URL', () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com/'
    expect(getImageUrl('/image.jpg')).toBe('https://api.example.com/image.jpg')
  })
})
