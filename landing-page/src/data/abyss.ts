// 深淵背景的靜態圖塊: 海雪的光點, 霧與光幕的雜訊, 觸手的曲線.
// 圖塊是 SVG, 瀏覽器只點陣化一次; 動態只靠移動整層 (transform), 由合成器處理, 每一幀不重畫.

/** 固定種子的亂數 (mulberry32): 同一個種子永遠產生同一張圖塊. */
export function seeded(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function svgUrl(svg: string) {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

const round = (value: number) => Math.round(value * 100) / 100

export interface SnowOptions {
  seed: number
  /** 每個圖塊的光點數. */
  count: number
  /** 圖塊邊長 (px). */
  tile: number
  /** 光點半徑的範圍 (px). 小光點比大光點多. */
  size: [number, number]
  color: string
  /** 0 是清楚的光點, 1 是從中心淡到邊緣的光團. */
  softness?: number
}

/** 海雪圖塊: 隨機散布的光點. 光點不跨過圖塊邊緣, 鋪滿時沒有接縫. */
export function snowTile({ seed, count, tile, size, color, softness = 0 }: SnowOptions) {
  const next = seeded(seed)
  const [min, max] = size
  let dots = ''
  for (let i = 0; i < count; i++) {
    const r = min + (max - min) * next() ** 2
    const x = r + (tile - 2 * r) * next()
    const y = r + (tile - 2 * r) * next()
    const opacity = 0.35 + 0.65 * next()
    dots += `<circle cx="${round(x)}" cy="${round(y)}" r="${round(r)}" fill-opacity="${round(opacity)}"/>`
  }
  const soft = softness > 0
  const defs = soft
    ? `<defs><radialGradient id="d"><stop offset="${round(1 - softness)}" stop-color="${color}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient></defs>`
    : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${tile}" height="${tile}">${defs}<g fill="${soft ? 'url(#d)' : color}">${dots}</g></svg>`
}

export interface NoiseOptions {
  seed: number
  /** 圖塊邊長 (px). */
  tile: number
  /** 雜訊頻率 [x, y]. y 遠小於 x 時是垂直的光束 (光幕). */
  frequency: [number, number]
  octaves: number
  /** 雜訊的顏色, 0 到 1 的 RGB. */
  rgb: [number, number, number]
  /** 透明度 = gain * 雜訊 + bias. gain 越大, 濃淡越分明. */
  gain: number
  bias: number
}

/** 雜訊圖塊: feTurbulence 以 stitchTiles 接縫, 鋪滿時沒有接縫. */
export function noiseTile({ seed, tile, frequency, octaves, rgb, gain, bias }: NoiseOptions) {
  const [r, g, b] = rgb
  const matrix = `0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} ${gain} 0 0 0 ${bias}`
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${tile}" height="${tile}">` +
    `<filter id="n" x="0" y="0" width="100%" height="100%">` +
    `<feTurbulence type="fractalNoise" baseFrequency="${frequency[0]} ${frequency[1]}" numOctaves="${octaves}" seed="${seed}" stitchTiles="stitch"/>` +
    `<feColorMatrix values="${matrix}"/>` +
    `</filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`
  )
}

/** 一片光幕: 左上角與大小皆為容器的百分比; duration 是擺動一次的秒數. */
export interface Curtain {
  x: number
  y: number
  w: number
  h: number
  duration: number
}

export interface StrandOptions {
  seed: number
  /** 第幾條 (0 起算) 與總數: 決定在扇形裡的位置. */
  index: number
  total: number
}

/**
 * 一條觸手的路徑, 座標 0 到 100 (viewBox), 由上往下.
 * 觸手從上方集中的一點垂下, 往下散開, 沿途以兩個正弦波擺動.
 */
export function strandPath({ seed, index, total }: StrandOptions) {
  const next = seeded(seed + index * 101)
  const offset = total > 1 ? (index / (total - 1)) * 2 - 1 : 0
  const phase = next() * Math.PI * 2
  const amplitude = 3 + next() * 4
  const cycles = 0.9 + next() * 0.6
  const points: string[] = []
  const STEPS = 48
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS
    const center = 45 + 16 * t
    const spread = (6 + 14 * t) * offset
    const wave = amplitude * t * Math.sin(phase + t * cycles * Math.PI * 2) + 1.5 * Math.sin(phase * 1.7 + t * 9)
    points.push(`${round(center + spread + wave)} ${round(t * 100)}`)
  }
  return `M${points.join(' L')}`
}
