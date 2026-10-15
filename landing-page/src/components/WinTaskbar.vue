<script setup lang="ts">
import { computed } from 'vue'

import TaskbarWidget from '@/components/TaskbarWidget.vue'
import { formatClock } from '@/data/tide'
import { useTideStore } from '@/stores/tide'

// 重現 Windows 深色工作列: 左側是配額 widget, 中間是開始鈕與 app, 右側系統匣有 Stygiomedusa 圖示.
// 左鍵點系統匣圖示開關 popup, 與 app 相同. widget 為 false 時不顯示配額 widget (例如改用史萊姆時).
withDefaults(defineProps<{ popupOpen?: boolean; mode?: 'remaining' | 'used'; tray?: boolean; apps?: boolean; widget?: boolean }>(), {
  popupOpen: false,
  mode: 'remaining',
  tray: true,
  apps: true,
  widget: true,
})
const emit = defineEmits<{ tray: [] }>()

const tide = useTideStore()
const clock = computed(() => formatClock(tide.now))
const iconUrl = `${import.meta.env.BASE_URL}icon-256.png`
</script>

<template>
  <div class="flex h-[60px] items-center border-t border-white/10 bg-win-bg font-win text-white/90 select-none">
    <div class="flex h-full min-w-0 flex-1 items-center">
      <TaskbarWidget v-if="widget" :mode="mode" />
    </div>

    <!-- 置中的開始鈕與 app -->
    <div v-if="apps" class="hidden items-center gap-1 md:flex" aria-hidden="true">
      <span class="grid size-11 place-items-center rounded-[5px]">
        <svg viewBox="0 0 20 20" class="size-[22px]"><path class="fill-win-accent" d="M1 1h8.5v8.5H1zM10.5 1H19v8.5h-8.5zM1 10.5h8.5V19H1zM10.5 10.5H19V19h-8.5z" /></svg>
      </span>
      <span class="grid size-11 place-items-center rounded-[5px]">
        <svg viewBox="0 0 20 20" class="size-5" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8.5" cy="8.5" r="5.5" /><path d="m13 13 5 5" stroke-linecap="round" /></svg>
      </span>
      <span class="grid size-11 place-items-center rounded-[5px]">
        <svg viewBox="0 0 20 20" class="size-[22px]"><path fill="#f5c84c" d="M1.5 5.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" /></svg>
      </span>
      <span class="relative grid size-11 place-items-center rounded-[5px] bg-white/8">
        <svg viewBox="0 0 20 20" class="size-[22px]" fill="none"><rect x="1.5" y="3" width="17" height="14" rx="2" fill="#1e1e1e" stroke="#9a9a9a" stroke-width="1.2" /><path d="m5 8 2.5 2L5 12M9 12.5h5" stroke="#f5f5f5" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
        <span class="absolute bottom-0.5 h-[3px] w-4 rounded-full bg-win-accent" />
      </span>
    </div>

    <!-- 系統匣與時鐘 -->
    <div class="flex flex-1 items-center justify-end gap-1 pr-2">
      <button
        v-if="tray"
        type="button"
        class="grid size-10 place-items-center rounded-[5px] transition-colors hover:bg-white/10"
        :class="popupOpen ? 'bg-white/10' : ''"
        :aria-pressed="popupOpen"
        aria-label="Stygiomedusa 系統匣圖示: 開關 popup"
        @click="emit('tray')"
      >
        <img :src="iconUrl" width="20" height="20" alt="" class="rounded-[4px]" />
      </button>
      <span class="hidden h-10 items-center gap-2.5 rounded-[5px] px-2 sm:flex" aria-hidden="true">
        <svg viewBox="0 0 20 20" class="size-[17px]" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2.5 8a11 11 0 0 1 15 0M5 11a7.3 7.3 0 0 1 10 0M7.5 14a3.6 3.6 0 0 1 5 0" /><circle cx="10" cy="16.5" r="0.6" fill="currentColor" /></svg>
        <svg viewBox="0 0 20 20" class="size-[17px]" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"><path d="M3 8v4h3l4 3.5v-11L6 8z" /><path d="M13.5 7.5a3.5 3.5 0 0 1 0 5M15.5 5.5a6.4 6.4 0 0 1 0 9" /></svg>
      </span>
      <span class="flex h-10 flex-col items-end justify-center rounded-[5px] px-2 text-right text-[13px] leading-[1.3]" aria-hidden="true">
        <span class="font-mono text-[12.5px]">{{ clock }}</span>
        <span>2026/10/14</span>
      </span>
    </div>
  </div>
</template>
