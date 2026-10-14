// 首屏示範用的配額模型. 所有讀數都是示意資料, 不是真實帳號的用量.
// 規則與 app 相同: 狀態依剩餘 % 判斷 (≤10 危險, ≤25 警告), 百分比四捨五入,
// 時間長度寫成 "x 小時 y 分", Linear pace 假設整個週期平均使用.

export type Tone = 'normal' | 'warning' | 'danger'
export type AgentId = 'claude' | 'codex'

/** 5h 視窗長度 (分鐘). */
export const WINDOW = 300
/** 潮位圖涵蓋的範圍: 一個完整視窗加上重置後的一小時. */
export const DOMAIN = 360
/** 示意時間軸的起點 (09:30). */
const START_CLOCK = 9 * 60 + 30

export const WARNING_AT = 25
export const DANGER_AT = 10

type Keyframes = readonly (readonly [number, number])[]

interface Series {
  /** 第一個視窗內 [分鐘, 已用 %]. */
  first: Keyframes
  /** 重置後的新視窗. */
  next: Keyframes
  /** 7d 已用 % 在示意時間軸起點與每分鐘的增加量. */
  weekStart: number
  weekRate: number
}

const SERIES: Record<AgentId, Series> = {
  claude: {
    first: [
      [0, 0], [25, 4], [55, 18], [90, 24], [125, 41], [150, 52], [175, 58],
      [205, 71], [230, 80], [255, 88], [275, 93], [300, 96],
    ],
    next: [[0, 0], [30, 4], [60, 11]],
    weekStart: 61,
    weekRate: 0.012,
  },
  codex: {
    first: [[0, 0], [40, 3], [80, 11], [120, 15], [160, 27], [200, 34], [240, 46], [300, 55]],
    next: [[0, 0], [60, 6]],
    weekStart: 27,
    weekRate: 0.006,
  },
}

function interpolate(frames: Keyframes, t: number): number {
  const first = frames[0]
  if (!first || t <= first[0]) return first?.[1] ?? 0
  for (let i = 1; i < frames.length; i++) {
    const a = frames[i - 1]!
    const b = frames[i]!
    if (t <= b[0]) return a[1] + ((b[1] - a[1]) * (t - a[0])) / (b[0] - a[0])
  }
  return frames[frames.length - 1]![1]
}

/** 視窗內經過的分鐘數. */
export function elapsedInWindow(t: number): number {
  return t < WINDOW ? t : t - WINDOW
}

export function usedAt(agent: AgentId, t: number): number {
  const series = SERIES[agent]
  return t < WINDOW ? interpolate(series.first, t) : interpolate(series.next, t - WINDOW)
}

export function toneOf(remaining: number): Tone {
  if (remaining <= DANGER_AT) return 'danger'
  if (remaining <= WARNING_AT) return 'warning'
  return 'normal'
}

export const TONE_LABEL: Record<Tone, string> = {
  normal: '正常',
  warning: '警告',
  danger: '危險',
}

export function formatDuration(minutes: number): string {
  const total = Math.max(0, Math.ceil(minutes))
  const days = Math.floor(total / 1440)
  const hours = Math.floor((total % 1440) / 60)
  const mins = total % 60
  if (days > 0) return `${days} 天 ${hours} 小時`
  if (hours > 0) return `${hours} 小時 ${mins} 分`
  return `${mins} 分`
}

export function formatClock(t: number): string {
  const minutes = START_CLOCK + Math.round(t)
  const hh = Math.floor(minutes / 60) % 24
  const mm = minutes % 60
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
}

export interface WindowReading {
  used: number
  remaining: number
  tone: Tone
}

export interface Pace {
  band: string
  /** 照目前速度在重置前耗盡時, 距離耗盡的分鐘數. */
  exhaustIn: number | null
  /** 重置時預估的剩餘 %. */
  remainingAtReset: number
  text: string
}

export interface AgentReading {
  agent: AgentId
  name: string
  fiveHour: WindowReading
  sevenDay: WindowReading
  resetIn: number
  resetClock: string
  pace: Pace
}

function reading(used: number): WindowReading {
  const usedPct = Math.min(100, Math.round(used))
  const remaining = 100 - usedPct
  return { used: usedPct, remaining, tone: toneOf(remaining) }
}

function paceBand(diff: number): string {
  const size = Math.abs(diff)
  if (size < 5) return '符合均速'
  const prefix = size < 15 ? '略' : size < 30 ? '' : '大幅'
  return diff > 0 ? `${prefix}超前均速` : `${prefix}低於均速`
}

/** Linear pace: 以目前視窗的平均速度推估. */
export function paceAt(used: number, t: number): Pace {
  const elapsed = elapsedInWindow(t)
  const expected = (elapsed / WINDOW) * 100
  const band = paceBand(used - expected)
  const rate = elapsed > 0 ? used / elapsed : 0
  const left = WINDOW - elapsed
  let exhaustIn: number | null = null
  if (rate > 0) {
    const toEmpty = (100 - used) / rate
    if (toEmpty < left) exhaustIn = toEmpty
  }
  const remainingAtReset = Math.max(0, 100 - (used + rate * left))
  const text = exhaustIn === null ? band : `${band} · 預估 ${formatDuration(exhaustIn)}後耗盡`
  return { band, exhaustIn, remainingAtReset, text }
}

export function readAgent(agent: AgentId, t: number): AgentReading {
  const series = SERIES[agent]
  const used = usedAt(agent, t)
  const resetAt = t < WINDOW ? WINDOW : WINDOW * 2
  return {
    agent,
    name: agent === 'claude' ? 'Claude' : 'Codex',
    fiveHour: reading(used),
    sevenDay: reading(series.weekStart + series.weekRate * t),
    resetIn: resetAt - t,
    resetClock: formatClock(resetAt),
    pace: paceAt(used, t),
  }
}

export interface CurveSegment {
  tone: Tone
  points: [number, number][]
}

/** 從 0 到 t 的剩餘 % 曲線, 依狀態切段. 重置時另起一段. */
export function remainingCurve(agent: AgentId, t: number, step = 2): CurveSegment[] {
  const segments: CurveSegment[] = []
  let current: CurveSegment | undefined
  for (let x = 0; x <= t + step; x += step) {
    const at = Math.min(x, t)
    const remaining = 100 - usedAt(agent, at)
    const tone = toneOf(Math.round(remaining))
    const crossedReset = current !== undefined && at >= WINDOW && (current.points[current.points.length - 1]?.[0] ?? 0) < WINDOW
    if (!current || current.tone !== tone || crossedReset) {
      const joint = current && !crossedReset ? current.points[current.points.length - 1] : undefined
      current = { tone, points: joint ? [joint] : [] }
      segments.push(current)
    }
    current.points.push([at, remaining])
    if (at === t) break
  }
  return segments
}
