<script setup lang="ts">
import { computed } from 'vue'

import { remainingCurve, WINDOW, type AgentReading, type Tone, type WindowReading } from '@/data/tide'
import { useTideStore } from '@/stores/tide'

// 重現 app popup 的配額卡 (QuotaCard.vue): 標題用 agent 識別色, 每個視窗一列已用/剩餘, bar, 用量曲線,
// pace 與重置倒數. bar 使用 "剩餘" 顯示模式. data-anchor 是引線的連接點.
const props = defineProps<{ reading: AgentReading; plan: string }>()

const tide = useTideStore()

const TONE_BG: Record<Tone, string> = {
  normal: 'bg-tone-normal',
  warning: 'bg-tone-warning',
  danger: 'bg-tone-danger',
}
const TONE_STROKE: Record<Tone, string> = {
  normal: 'var(--color-tone-normal)',
  warning: 'var(--color-tone-warning)',
  danger: 'var(--color-tone-danger)',
}

const titleColor = computed(() => (props.reading.agent === 'claude' ? 'text-agent-claude' : 'text-agent-codex'))

/** 5h 曲線: 目前視窗的已用 %, x 軸是整個視窗. */
const fiveHourCurve = computed(() => {
  const start = tide.now < WINDOW ? 0 : WINDOW
  return remainingCurve(props.reading.agent, tide.now)
    .map((segment) => ({
      tone: segment.tone,
      points: segment.points.filter(([t]) => t >= start).map(([t, r]) => `${(((t - start) / WINDOW) * 100).toFixed(2)},${(48 - ((100 - r) / 100) * 46 - 1).toFixed(2)}`),
    }))
    .filter((segment) => segment.points.length > 1)
})

/** 7d 視窗的示意: 重置倒數與 pace. */
const week = computed(() => {
  const totalMinutes = 7 * 1440
  const left = (props.reading.agent === 'claude' ? 3 * 1440 + 5 * 60 : 5 * 1440 + 2 * 60) - tide.now
  const expected = ((totalMinutes - left) / totalMinutes) * 100
  const diff = props.reading.sevenDay.used - expected
  const band = Math.abs(diff) < 5 ? '符合均速' : diff > 0 ? '略超前均速' : '略低於均速'
  return { left, band }
})

function countdown(minutes: number) {
  const total = Math.max(0, Math.ceil(minutes))
  const d = Math.floor(total / 1440)
  const h = Math.floor((total % 1440) / 60)
  const m = total % 60
  if (d > 0) return [String(d), '天', String(h), '小時']
  if (h > 0) return [String(h), '小時', String(m), '分']
  return ['', '', String(m), '分']
}

const rows = computed(() => [
  { key: '5h', w: props.reading.fiveHour, pace: props.reading.pace.text, reset: countdown(props.reading.resetIn), curve: true },
  { key: '7d', w: props.reading.sevenDay, pace: week.value.band, reset: countdown(week.value.left), curve: false },
])

function pad(w: WindowReading, field: 'used' | 'remaining') {
  return String(w[field]).padStart(3, ' ')
}
</script>

<template>
  <section class="flex w-full flex-col gap-3 rounded-[8px] border border-win-line bg-win-card p-4 font-win text-win-text">
    <header class="flex items-center gap-2">
      <h3 class="text-lg font-semibold" :class="titleColor" data-anchor="title">{{ reading.name }}</h3>
      <span class="rounded-full border border-white/40 px-2 text-xs leading-5 text-white/85">{{ plan }}</span>
      <span class="ml-auto grid size-8 place-items-center rounded-[6px] text-white/85" data-anchor="refresh" title="立即更新">
        <svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 3v6h-6" />
        </svg>
      </span>
    </header>

    <div v-for="row in rows" :key="row.key" class="flex flex-col gap-1">
      <div class="flex items-center justify-between text-base">
        <span class="font-medium">{{ row.key }}</span>
        <span class="flex gap-2 tabular-nums" :data-anchor="row.key === '5h' ? 'numbers' : undefined">
          <span>已用 {{ pad(row.w, 'used') }}%</span>
          <span>剩餘 {{ pad(row.w, 'remaining') }}%</span>
        </span>
      </div>
      <span class="block h-2 overflow-hidden rounded-full bg-white/15" :data-anchor="row.key === '5h' ? 'bar' : undefined">
        <span class="block h-full rounded-full transition-[width] duration-300" :class="TONE_BG[row.w.tone]" :style="{ width: `${row.w.remaining}%` }" />
      </span>
      <svg
        v-if="row.curve"
        viewBox="0 0 100 48"
        preserveAspectRatio="none"
        class="h-12 w-full rounded-[4px] bg-win-bg"
        data-anchor="curve"
        aria-hidden="true"
      >
        <polyline
          v-for="(segment, i) in fiveHourCurve"
          :key="i"
          :points="segment.points.join(' ')"
          fill="none"
          :style="{ stroke: TONE_STROKE[segment.tone] }"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
      <div class="flex items-center justify-between gap-3 text-sm text-white/80">
        <span :data-anchor="row.key === '5h' ? 'pace' : undefined">{{ row.pace }}</span>
        <span class="grid shrink-0 grid-cols-[2ch_2em_2ch_2em_auto] gap-x-[2px] text-right tabular-nums" :data-anchor="row.key === '5h' ? 'reset' : undefined">
          <span>{{ row.reset[0] }}</span><span class="text-left">{{ row.reset[1] }}</span>
          <span>{{ row.reset[2] }}</span><span class="text-left">{{ row.reset[3] }}</span>
          <span>後重置</span>
        </span>
      </div>
    </div>
  </section>
</template>
