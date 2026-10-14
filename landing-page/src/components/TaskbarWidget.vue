<script setup lang="ts">
import { ref } from 'vue'

import AgentIcon from '@/components/AgentIcon.vue'
import { formatDuration, type AgentId, type AgentReading, type Tone, type WindowReading } from '@/data/tide'
import { useTideStore } from '@/stores/tide'

// 重現 app 的工作列 widget (原生 Win32 繪製): 每個來源一組, 圖示, 上排 5h, 下排 7d, 右側百分比.
// 尺寸是 app 的 1.25 倍. 直式工作列改為縱向排列, 不顯示百分比. 過期的來源在圖示右下角加琥珀色圓點.
const props = withDefaults(
  defineProps<{
    mode?: 'remaining' | 'used'
    vertical?: boolean
    stale?: AgentId
  }>(),
  { mode: 'remaining', vertical: false, stale: undefined },
)

const tide = useTideStore()
const open = ref<string | null>(null)

const FILL: Record<Tone, string> = {
  normal: 'bg-tone-normal',
  warning: 'bg-tone-warning',
  danger: 'bg-tone-danger',
}

const value = (w: WindowReading) => (props.mode === 'used' ? w.used : w.remaining)

function line(label: string, w: WindowReading, reading: AgentReading, isFiveHour: boolean) {
  const used = String(w.used).padStart(3, ' ')
  const remaining = String(w.remaining).padStart(3, ' ')
  const reset = isFiveHour ? ` ${formatDuration(reading.resetIn)}後重置 (${reading.resetClock})` : ''
  return `${label} 已用 ${used}% 剩餘 ${remaining}%${reset}`
}

function tooltip(reading: AgentReading) {
  const status = props.stale === reading.agent ? ' · 過期' : ''
  return `${reading.name}${status}\n${line('5h', reading.fiveHour, reading, true)}\n   ${reading.pace.text}\n${line('7d', reading.sevenDay, reading, false)}`
}
</script>

<template>
  <div class="flex items-center" :class="vertical ? 'flex-col gap-3 py-2' : 'h-full gap-3 px-2'">
    <div
      v-for="reading in tide.agents"
      :key="reading.agent"
      class="relative flex items-center rounded-[4px] outline-none hover:bg-white/8 focus-visible:bg-white/8"
      :class="vertical ? 'flex-col gap-[5px] px-1.5 py-1.5' : 'h-full gap-[5px] px-1'"
      tabindex="0"
      :aria-label="`${reading.name} 5h 剩餘 ${reading.fiveHour.remaining}%, 7d 剩餘 ${reading.sevenDay.remaining}%${stale === reading.agent ? ', 過期' : ''}`"
      @mouseenter="open = reading.agent"
      @mouseleave="open = null"
      @focus="open = reading.agent"
      @blur="open = null"
    >
      <span class="relative">
        <AgentIcon :agent="reading.agent" :size="20" />
        <span v-if="stale === reading.agent" class="absolute -right-[3px] -bottom-[3px] size-[7.5px] rounded-full bg-tone-stale" />
      </span>
      <div class="flex flex-col" :class="vertical ? 'w-[35px] gap-[5px]' : 'w-10 gap-[10px]'">
        <span v-for="w in [reading.fiveHour, reading.sevenDay]" :key="w === reading.fiveHour ? '5h' : '7d'" class="block h-[7px] overflow-hidden rounded-full bg-white/20">
          <span class="block h-full rounded-full transition-[width] duration-300 ease-out" :class="FILL[w.tone]" :style="{ width: `${value(w)}%` }" />
        </span>
      </div>
      <div v-if="!vertical" class="flex w-[35px] flex-col gap-[1px] text-right font-win text-[13.5px] leading-[17px] text-white/90">
        <span>{{ value(reading.fiveHour) }}%</span>
        <span>{{ value(reading.sevenDay) }}%</span>
      </div>

      <!-- Windows tooltip -->
      <div
        v-if="open === reading.agent"
        role="tooltip"
        class="absolute z-20 rounded-[6px] border border-win-line bg-win-card px-2.5 py-1.5 font-win text-[13px] leading-[1.45] whitespace-pre text-win-text shadow-[0_6px_18px_rgb(0_0_0/0.45)]"
        :class="vertical ? 'top-0 right-[calc(100%+10px)]' : 'bottom-[calc(100%+10px)] left-0'"
      >{{ tooltip(reading) }}</div>
    </div>
  </div>
</template>
