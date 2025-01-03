import { test, expect } from '@playwright/test'

test('rental calculator form', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Fill out the form
    await page.selectOption('select[name="toolCode"]', 'CHNS')
    await page.fill('input[name="checkoutDate"]', '2023-07-02')
    await page.fill('input[name="discountPercent"]', '20')

    // Submit the form
    await page.click('button[type="submit"]')

    // Wait for results
    await page.waitForSelector('[data-testid="rental-results"]')

    // Check if the rental agreement is displayed
    await expect(page.locator('[data-testid="rental-results"]')).toBeVisible()
    await expect(page.locator('text=Chainsaw')).toBeVisible()
    await expect(page.locator('text=Stihl')).toBeVisible()
    await expect(page.locator('text=20%')).toBeVisible()
}) 