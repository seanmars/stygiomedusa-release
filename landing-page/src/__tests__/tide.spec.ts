import { describe, it, expect } from 'vitest'

import { WINDOW, formatDuration, paceAt, readAgent, remainingCurve, toneOf } from '../data/tide'

describe('toneOf', () => {
  it('依剩餘 % 判斷狀態, 門檻與 app 預設相同', () => {
    expect(toneOf(26)).toBe('normal')
    expect(toneOf(25)).toBe('warning')
    expect(toneOf(11)).toBe('warning')
    expect(toneOf(10)).toBe('danger')
  })
})

describe('formatDuration', () => {
  it('寫成 "x 天 y 小時", "x 小時 y 分" 或 "x 分"', () => {
    expect(formatDuration(45)).toBe('45 分')
    expect(formatDuration(134)).toBe('2 小時 14 分')
    expect(formatDuration(1440 + 125)).toBe('1 天 2 小時')
  })
})

describe('paceAt', () => {
  it('用得比平均快且會在重置前用完時, 附上預估耗盡時間', () => {
    const pace = paceAt(80, 150)
    expect(pace.band).toBe('大幅超前均速')
    expect(pace.exhaustIn).not.toBeNull()
    expect(pace.text).toContain('後耗盡')
  })

  it('接近平均速度時不顯示耗盡時間', () => {
    const pace = paceAt(50, 150)
    expect(pace.band).toBe('符合均速')
    expect(pace.exhaustIn).toBeNull()
  })
})

describe('readAgent', () => {
  it('重置後剩餘回到接近 100%', () => {
    const before = readAgent('claude', WINDOW - 5)
    const after = readAgent('claude', WINDOW + 5)
    expect(before.fiveHour.tone).toBe('danger')
    expect(after.fiveHour.remaining).toBeGreaterThan(95)
    expect(after.resetIn).toBe(WINDOW - 5)
  })
})

describe('remainingCurve', () => {
  it('依狀態切段, 相鄰段在交界共用同一點', () => {
    const segments = remainingCurve('claude', 280)
    expect(segments.map((s) => s.tone)).toEqual(['normal', 'warning', 'danger'])
    expect(segments[1]!.points[0]).toEqual(segments[0]!.points[segments[0]!.points.length - 1])
  })

  it('跨過重置時另起一段, 不與前一段相連', () => {
    const segments = remainingCurve('claude', 330)
    const last = segments[segments.length - 1]!
    expect(last.points[0]![0]).toBeGreaterThanOrEqual(WINDOW)
  })
})
