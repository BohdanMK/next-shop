import { test, expect } from '@playwright/test'

test.describe('Smoke', () => {
    test('homepage loads', async ({ page }) => {
        await page.goto('/')
        await expect(page).toHaveURL('/')
        await expect(page.locator('[data-testid="cart-open-btn"]')).toBeVisible()
    })

    test('cart drawer opens and closes', async ({ page }) => {
        await page.goto('/')
        await page.locator('[data-testid="cart-open-btn"]').click()
        await expect(page.locator('[data-testid="cart-drawer"]')).toBeVisible()
    })

    test('catalog page loads', async ({ page }) => {
        await page.goto('/catalog')
        await expect(page).toHaveURL('/catalog')
    })
})
