import { describe, it, expect } from 'vitest'

import { noiseTile, snowTile, strandPath } from '../data/abyss'

describe('snowTile', () => {
  const options = { seed: 3, count: 20, tile: 100, size: [1, 4] as [number, number], color: '#fff' }

  it('同一個種子產生同一張圖塊', () => {
    expect(snowTile(options)).toBe(snowTile(options))
    expect(snowTile({ ...options, seed: 4 })).not.toBe(snowTile(options))
  })

  it('光點不跨過圖塊邊緣, 鋪滿時沒有接縫', () => {
    const circles = [...snowTile(options).matchAll(/cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)"/g)]
    expect(circles).toHaveLength(20)
    for (const [, x, y, r] of circles) {
      expect(Number(x) - Number(r)).toBeGreaterThanOrEqual(-0.01)
      expect(Number(x) + Number(r)).toBeLessThanOrEqual(100.01)
      expect(Number(y) - Number(r)).toBeGreaterThanOrEqual(-0.01)
      expect(Number(y) + Number(r)).toBeLessThanOrEqual(100.01)
    }
  })
})

describe('noiseTile', () => {
  it('雜訊以 stitchTiles 接縫', () => {
    const svg = noiseTile({ seed: 1, tile: 256, frequency: [0.01, 0.01], octaves: 2, rgb: [0, 0, 1], gain: 2, bias: -0.5 })
    expect(svg).toContain('stitchTiles="stitch"')
    expect(svg).toContain('width="256"')
  })
})

describe('strandPath', () => {
  it('觸手從上緣垂到下緣', () => {
    const path = strandPath({ seed: 7, index: 2, total: 7 })
    expect(path).toMatch(/^M[\d.-]+ 0 L/)
    expect(path).toMatch(/ 100$/)
  })
})
