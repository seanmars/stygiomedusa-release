import { createRequire } from 'node:module'
import path from 'node:path'
const root = path.resolve(import.meta.dirname, '..', '..')
const require = createRequire(path.join(root, 'landing-page', 'package.json'))
const { chromium } = require('@playwright/test')
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
await page.goto('http://localhost:4173/stygiomedusa-release/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2800)
const result = await page.evaluate(() => {
  const html = document.documentElement
  const rows = []
  const blocks = [...document.querySelectorAll('#top > *, main > *')]
  for (const b of blocks) {
    const prev = b.style.display
    b.style.display = 'none'
    rows.push(`${b.tagName.toLowerCase()} ${(b.querySelector('h1,h2')?.textContent ?? b.className.toString()).trim().slice(0, 30)} -> ${html.scrollWidth}`)
    b.style.display = prev
  }
  // 深入: 在造成溢出的區塊中找 scrollWidth 大於 clientWidth 的元素
  const wide = [...document.querySelectorAll('section:has(#usage) *')].filter((e) => e.getBoundingClientRect().width > html.clientWidth - 40).map((e) => `${e.tagName.toLowerCase()}.${e.className.toString().slice(0, 70)} w=${Math.round(e.getBoundingClientRect().width)} ox=${getComputedStyle(e).overflowX}`).slice(0, 12)
  return { base: html.scrollWidth, rows, wide }
})
console.log(JSON.stringify(result, null, 1))
await browser.close()
