// 擷取介紹頁的審查截圖. 用法: node .impeccable/scripts/capture.mjs [baseUrl]
// 首屏與整頁在 "減少動態" 下擷取 (時間固定, shader 停在靜止畫面); 另擷取自動播放到警告狀態的首屏與各種互動狀態.
// shader 需要 WebGPU: 預設用 Edge (PW_CHANNEL 可改), 並另擷取一張沒有 WebGPU 的後備首屏.
import { createRequire } from 'node:module'
import { mkdirSync } from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..', '..')
const require = createRequire(path.join(root, 'landing-page', 'package.json'))
const { chromium } = require('@playwright/test')

const url = process.argv[2] ?? 'http://localhost:4173/stygiomedusa-release/'
const out = path.join(root, '.impeccable', 'review')
mkdirSync(out, { recursive: true })

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? 'msedge', args: ['--enable-unsafe-webgpu'] })
const shot = (page, name, options = {}) => page.screenshot({ path: path.join(out, name), ...options })

async function open(viewport, reducedMotion = 'reduce', { webgpu = true } = {}) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion })
  if (!webgpu) await context.addInitScript(() => delete Navigator.prototype.gpu)
  const page = await context.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  // shader 準備好後淡入 1.4 秒
  await page.waitForTimeout(2600)
  return page
}

// 桌面: 固定時間的首屏與整頁.
const desktop = await open({ width: 1440, height: 900 })
await shot(desktop, 'desktop-fold.png')
await shot(desktop, 'desktop.png', { fullPage: true })

// 首屏史萊姆 hover: callout 在 300ms 後出現.
await desktop.locator('[aria-label^="史萊姆示範"]').first().hover()
await desktop.waitForTimeout(1000)
await shot(desktop, 'desktop-stage-slime.png')
await desktop.mouse.move(5, 5)

// 工作列 widget 段落: hover 放大的 widget 顯示 tooltip.
const widget = desktop.locator('section:has(#widget)')
await widget.scrollIntoViewIfNeeded()
await widget.locator('[aria-label^="Claude 5h 剩餘"]').first().hover()
await desktop.waitForTimeout(400)
await shot(desktop, 'desktop-widget.png')
await desktop.mouse.move(5, 5)

// 史萊姆段落: 把珠子拖到下緣.
const slimeSection = desktop.locator('section:has(#slime)')
await slimeSection.locator('.screen').scrollIntoViewIfNeeded()
const box = await slimeSection.locator('.screen').boundingBox()
const beadBox = await slimeSection.locator('[aria-label^="史萊姆示範"]').boundingBox()
await desktop.mouse.move(beadBox.x + beadBox.width / 2, beadBox.y + 60)
await desktop.mouse.down()
await desktop.mouse.move(box.x + box.width * 0.5, box.y + box.height - 20, { steps: 12 })
await desktop.mouse.up()
await desktop.mouse.move(5, 5)
await desktop.waitForTimeout(500)
await shot(desktop, 'desktop-slime-dragged.png')

// 自動播放 24 秒後的首屏 (約 13:30, Claude 進入警告).
const playing = await open({ width: 1440, height: 900 }, 'no-preference')
await playing.mouse.move(5, 5)
await playing.waitForTimeout(24000)
await shot(playing, 'desktop-autoplay.png')

// 沒有 WebGPU 時的後備首屏.
const fallback = await open({ width: 1440, height: 900 }, 'reduce', { webgpu: false })
await shot(fallback, 'desktop-fold-no-webgpu.png')

// Pace 光塔: 捲到畫面內, shader 才會初始化.
await desktop.locator('section:has(#pace)').scrollIntoViewIfNeeded()
await desktop.locator('.tower').scrollIntoViewIfNeeded()
await desktop.waitForTimeout(2600)
await shot(desktop, 'desktop-pace.png')

// 頁尾的極光.
await desktop.locator('footer').scrollIntoViewIfNeeded()
await desktop.waitForTimeout(2600)
await shot(desktop, 'desktop-footer.png')

// 手機.
const mobile = await open({ width: 390, height: 844 })
await shot(mobile, 'mobile-fold.png')
await shot(mobile, 'mobile.png', { fullPage: true })

await browser.close()
console.log(`saved to ${out}`)
