import { createRequire } from 'node:module'
import path from 'node:path'
const root = path.resolve(import.meta.dirname, '..', '..')
const require = createRequire(path.join(root, 'landing-page', 'package.json'))
const { chromium } = require('@playwright/test')
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2800)
const result = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth
  const out = []
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect()
    if (r.right > vw + 1 && r.width > 0) {
      let p = el.parentElement, clipped = false
      while (p) { const s = getComputedStyle(p); if (s.overflowX !== 'visible') { clipped = true; break } p = p.parentElement }
      const pr = el.parentElement?.getBoundingClientRect(); if (pr && pr.right <= vw + 1) out.push(`${el.tagName.toLowerCase()}.${String(el.className.baseVal ?? el.className).slice(0, 60)} right=${Math.round(r.right)}`)
    }
  }
  return { vw, scroll: document.documentElement.scrollWidth, out: out.slice(0, 15) }
})
console.log(JSON.stringify(result, null, 1))
await browser.close()
