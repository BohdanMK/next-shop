import { describe, it, expect } from 'vitest'
import { buildQuery } from '@/lib/build-query'

describe('buildQuery', () => {
  it('returns an empty string when no params are provided', () => {
    expect(buildQuery()).toBe('')
  })

  it('returns an empty string for an empty object', () => {
    expect(buildQuery({})).toBe('')
  })

  it('builds a query string with a single param', () => {
    expect(buildQuery({ page: 1 })).toBe('?page=1')
  })

  it('builds a query string with multiple params', () => {
    const result = buildQuery({ page: 1, limit: 10 })
    expect(result.startsWith('?')).toBe(true)
    expect(result).toContain('page=1')
    expect(result).toContain('limit=10')
  })

  it('omits undefined values', () => {
    expect(buildQuery({ page: 1, category: undefined })).toBe('?page=1')
  })

  it('handles string values correctly', () => {
    const result = buildQuery({ search: 'pizza' })
    expect(result).toContain('search=')
    expect(result.startsWith('?')).toBe(true)
  })

  it('returns an empty string when all values are undefined', () => {
    expect(buildQuery({ page: undefined, limit: undefined })).toBe('')
  })
})
