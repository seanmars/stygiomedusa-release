import { test, expect } from '@playwright/test'

test('首頁顯示標題, 下載連結與示範桌面', async ({ page }) => {
  await page.goto('/stygiomedusa-release/')
  await expect(page.locator('h1')).toHaveText(/不開視窗,\s*也看得到配額\./)
  const download = page.getByRole('link', { name: '下載最新版' }).first()
  await expect(download).toHaveAttribute('href', 'https://github.com/seanmars/stygiomedusa-release/releases/latest')
  const tray = page.getByRole('button', { name: /Stygiomedusa 系統匣圖示/ })
  await expect(tray).toHaveAttribute('aria-pressed', 'true')
  await tray.click()
  await expect(tray).toHaveAttribute('aria-pressed', 'false')
})
