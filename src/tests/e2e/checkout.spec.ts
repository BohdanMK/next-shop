import { test, expect } from '@playwright/test';

test('successful order placement', async ({ page }) => {
  await page.route('**/api/order/create', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ _id: 'test-order-123' }),
    })
  )

  await page.goto('/')
  await page.locator('[data-testid="product-add-to-cart"]').first().click()
  await page.locator('[data-testid="cart-open-btn"]').click()
  await page.locator('[data-testid="cart-checkout-btn"]').click()
  await expect(page).toHaveURL('/checkout')

  await page.locator('#pickup').click()
  await page.fill('[data-testid="checkout-name-input"]', 'Test User')
  await page.locator('[data-testid="checkout-phone-input"]').pressSequentially('0991234567')
  await page.locator('[data-testid="checkout-agree-policy"]').click()
  await page.locator('[data-testid="checkout-submit"]').click()

  await expect(page).toHaveURL(/\/checkout\/success\//)
  await expect(page.locator('[data-testid="success-page"]')).toBeVisible()
  await expect(page.locator('[data-testid="success-order-id"]')).toHaveText('test-order-123')
})

test('checkout form validation', async ({ page }) => {
    await page.goto('/')
    await page.locator('[data-testid="product-add-to-cart"]').first().click()
    await expect(page.locator('[data-testid="cart-count-badge"]')).toBeVisible()
    await page.locator('[data-testid="cart-open-btn"]').click()
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(1)
    await page.locator('[data-testid="cart-checkout-btn"]').first().click()
    await expect(page.locator('[data-testid="cart-drawer"]')).not.toBeVisible()
    await expect(page).toHaveURL('/checkout')

    await page.locator('[data-testid="checkout-submit"]').click()
    await expect(page.locator('[data-testid="checkout-error-name"]')).toBeVisible()
    await expect(page.locator('[data-testid="checkout-error-phone"]')).toBeVisible()
    await expect(page.locator('[data-testid="checkout-error-policy"]')).toBeVisible()
})