import { describe, expect, it } from 'vitest'

const sum = (a: number, b: number) => a + b
const subtract = (a: number, b: number) => a - b

describe('sum', () => {
    it('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3)

    })
})

describe('subtract', () => {
    it('subtracts 2 - 1 to equal 1', () => {
        expect(subtract(2, 1)).toBe(1)
    })
})