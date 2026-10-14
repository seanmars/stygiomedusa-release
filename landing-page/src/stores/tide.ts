import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { DOMAIN, readAgent } from '@/data/tide'

/** 自動播放的範圍: 視窗開始後 30 分到重置後 50 分, 會經過警告, 危險與重置. */
const LOOP_FROM = 30
const LOOP_TO = DOMAIN - 10
/** 示意時間每秒前進的分鐘數. */
const MINUTES_PER_SECOND = 9
/** 減少動態時固定的時間點. */
const STILL_AT = 150

/**
 * 示範用的共用時間. 工作列 widget, 史萊姆與 popup 都讀這個值.
 * 時間自動快轉並循環; 游標停在任何示範上 (hold) 或分頁不在前景時暫停.
 */
export const useTideStore = defineStore('tide', () => {
  const now = ref(STILL_AT)
  const holds = ref(0)
  const playing = ref(false)

  function setNow(minutes: number) {
    now.value = Math.min(DOMAIN, Math.max(0, Math.round(minutes)))
  }

  /** 游標停在某個示範上: 示意時間停住 (首屏狀態點停止呼吸). */
  const held = computed(() => holds.value > 0)

  const claude = computed(() => readAgent('claude', now.value))
  const codex = computed(() => readAgent('codex', now.value))
  const agents = computed(() => [claude.value, codex.value])

  function hold() {
    holds.value += 1
  }

  function release() {
    holds.value = Math.max(0, holds.value - 1)
  }

  // 用計時器每次前進一分鐘, 不用 requestAnimationFrame: 讀數一秒只變 9 次,
  // 每一幀都排程會讓瀏覽器每一幀都重算樣式, 排版與繪製.
  let timer = 0

  function tick() {
    if (holds.value > 0 || document.hidden) return
    setNow(now.value >= LOOP_TO ? LOOP_FROM : now.value + 1)
  }

  /** 開始自動播放. 使用者要求減少動態時不播放, 停在固定時間點. */
  function startAutoplay() {
    if (playing.value) return
    const reduce = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    playing.value = true
    setNow(LOOP_FROM)
    timer = window.setInterval(tick, 1000 / MINUTES_PER_SECOND)
  }

  function stopAutoplay() {
    window.clearInterval(timer)
    playing.value = false
  }

  return { now, setNow, claude, codex, agents, held, hold, release, playing, startAutoplay, stopAutoplay }
})
