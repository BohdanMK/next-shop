import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn', () => {
  it('merges multiple class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('ignores falsy values', () => {
    expect(cn('foo', undefined, false, '', 'bar')).toBe('foo bar')
  })

  it('resolves conflicting tailwind classes — last one wins', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('handles conditional object syntax', () => {
    expect(cn({ 'font-bold': true, italic: false })).toBe('font-bold')
  })

  it('handles an array of class names', () => {
    expect(cn(['flex', 'items-center'])).toBe('flex items-center')
  })

  it('returns an empty string when called with no arguments', () => {
    expect(cn()).toBe('')
  })
})
