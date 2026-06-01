import { test, expect } from '@playwright/test';

test('add product to cart', async ({ page }) => {
  await page.goto('/')
  await page.locator('[data-testid="product-add-to-cart"]').first().click()
  await expect(page.locator('[data-testid="cart-count-badge"]')).toBeVisible()
  await page.locator('[data-testid="cart-open-btn"]').click()
  await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(1)
})

test('cart item quantity increment and decrement', async ({ page }) => {
  await page.goto('/')
  await page.locator('[data-testid="product-add-to-cart"]').first().click()
  await page.locator('[data-testid="cart-open-btn"]').click()

  await expect(page.locator('[data-testid="cart-item-quantity"]')).toHaveValue('1')

  await page.locator('[data-testid="cart-item-increase"]').click()
  await expect(page.locator('[data-testid="cart-item-quantity"]')).toHaveValue('2')

  await page.locator('[data-testid="cart-item-decrease"]').click()
  await expect(page.locator('[data-testid="cart-item-quantity"]')).toHaveValue('1')
})


