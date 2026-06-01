import { describe, it, expect } from 'vitest'
import { createCheckOutSchema } from '@/schema/zod'

const t = (key: string) => key
const schema = createCheckOutSchema(t)

const baseValid = {
  name: 'John',
  phone: '+38 099 123 4567',
  deliveryType: 'pickup' as const,
  deliveryTime: 'in_time' as const,
  birthdayDiscount: false,
  valuePerson: 1,
  agreePolicy: true,
}

describe('createCheckOutSchema', () => {

  describe('pickup — address fields are not required', () => {
    it('passes without address fields', () => {
      expect(schema.safeParse(baseValid).success).toBe(true)
    })

    it('passes even when address fields are empty strings', () => {
      const result = schema.safeParse({ ...baseValid, cityId: '', street: '', house: '' })
      expect(result.success).toBe(true)
    })
  })

  describe('delivery — address fields are required', () => {
    const delivery = { ...baseValid, deliveryType: 'delivery' as const }

    it('passes when all address fields are provided', () => {
      const result = schema.safeParse({ ...delivery, cityId: 'kyiv', street: 'Main St', house: '1' })
      expect(result.success).toBe(true)
    })

    it('fails when cityId is missing', () => {
      const result = schema.safeParse({ ...delivery, street: 'Main St', house: '1' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.map(i => i.path[0])).toContain('cityId')
      }
    })

    it('fails when street is missing', () => {
      const result = schema.safeParse({ ...delivery, cityId: 'kyiv', house: '1' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.map(i => i.path[0])).toContain('street')
      }
    })

    it('fails when house is missing', () => {
      const result = schema.safeParse({ ...delivery, cityId: 'kyiv', street: 'Main St' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.map(i => i.path[0])).toContain('house')
      }
    })

    it('returns all 3 errors at once when all address fields are missing', () => {
      const result = schema.safeParse(delivery)
      expect(result.success).toBe(false)
      if (!result.success) {
        const paths = result.error.issues.map(i => i.path[0])
        expect(paths).toContain('cityId')
        expect(paths).toContain('street')
        expect(paths).toContain('house')
      }
    })
  })

  describe('name', () => {
    it('fails when empty', () => {
      const result = schema.safeParse({ ...baseValid, name: '' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.map(i => i.path[0])).toContain('name')
      }
    })
  })

  describe('phone', () => {
    it('fails when empty', () => {
      const result = schema.safeParse({ ...baseValid, phone: '' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.map(i => i.path[0])).toContain('phone')
      }
    })
  })

  describe('agreePolicy', () => {
    it('fails when false', () => {
      const result = schema.safeParse({ ...baseValid, agreePolicy: false })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.map(i => i.path[0])).toContain('agreePolicy')
      }
    })

    it('passes when true', () => {
      expect(schema.safeParse({ ...baseValid, agreePolicy: true }).success).toBe(true)
    })
  })

})
