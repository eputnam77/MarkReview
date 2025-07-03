import { test, expect } from '@playwright/test'

delete (globalThis as Record<string, unknown>)[
  Symbol.for('$$jest-matchers-object')
]

test('dummy', async ({ page }) => {
  await page.goto('about:blank')
  await expect(page).toBeTruthy()
})
