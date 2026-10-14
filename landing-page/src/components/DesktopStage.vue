<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import PopupDemo from '@/components/PopupDemo.vue'
import SlimeDemo from '@/components/SlimeDemo.vue'
import WinTaskbar from '@/components/WinTaskbar.vue'
import { useTideStore } from '@/stores/tide'

// 首屏的示範桌面: 底部工作列 (widget + 系統匣圖示), 系統匣上方的 popup, 貼在上緣的史萊姆.
// popup 預設打開; 點系統匣圖示或史萊姆開關.
// 寬桌面: popup 為 720px 兩欄, 依剩餘空間等比縮小. 窄桌面: popup 改為單欄窄版, 文字不縮小,
// 超出的部分裁掉並在底部淡出; 史萊姆縮小讓出空間.
const tide = useTideStore()
const stage = ref<HTMLElement>()
const popup = ref<HTMLElement>()
const popupOpen = ref(true)
const size = ref({ w: 0, h: 0 })
const wideScale = ref(1)

const TASKBAR = 60
const GAP = 12
const NARROW_BELOW = 560
/** 史萊姆貼在上緣時佔用的深度 (未縮放). */
const SLIME_DEPTH = 112

const narrow = computed(() => size.value.w > 0 && size.value.w < NARROW_BELOW)
const slimeScale = computed(() => (narrow.value ? 0.72 : 1))
/** popup 可用的高度: 扣掉工作列, 間距與上緣的史萊姆. */
const available = computed(() => size.value.h - TASKBAR - GAP * 2 - SLIME_DEPTH * slimeScale.value - GAP)

const popupStyle = computed(() => {
  const base = { right: `${GAP}px`, bottom: `${TASKBAR + GAP}px` }
  if (narrow.value) {
    return { ...base, width: `${Math.min(360, size.value.w - GAP * 2)}px`, maxHeight: `${Math.max(160, available.value)}px`, '--s': 1 }
  }
  return { ...base, '--s': wideScale.value }
})

function togglePopup() {
  popupOpen.value = !popupOpen.value
}

function fit() {
  const el = stage.value
  if (!el) return
  size.value = { w: el.clientWidth, h: el.clientHeight }
  const box = popup.value
  if (!box || narrow.value) return
  const byWidth = (el.clientWidth - GAP * 2) / box.offsetWidth
  const byHeight = available.value / box.offsetHeight
  wideScale.value = Math.max(0.3, Math.min(1, byWidth, byHeight))
}

let observer: ResizeObserver | undefined

onMounted(() => {
  fit()
  if (typeof ResizeObserver === 'function' && stage.value && popup.value) {
    observer = new ResizeObserver(fit)
    observer.observe(stage.value)
    observer.observe(popup.value)
  }
  tide.startAutoplay()
})

onBeforeUnmount(() => {
  observer?.disconnect()
  tide.stopAutoplay()
})
</script>

<template>
  <div
    ref="stage"
    class="relative min-h-[20rem] flex-1 overflow-hidden rounded-[6px] border border-grid bg-harbor-deep md:min-h-[24rem]"
    @pointerenter="tide.hold()"
    @pointerleave="tide.release()"
  >
    <SlimeDemo initial-edge="top" :initial-at="0.24" :scale="slimeScale" @activate="togglePopup" />

    <div
      ref="popup"
      class="popup absolute z-10 flex origin-bottom-right flex-col"
      :class="{ open: popupOpen }"
      :style="popupStyle"
      :aria-hidden="!popupOpen"
    >
      <PopupDemo :narrow="narrow" :clipped="narrow" class="min-h-0" />
    </div>

    <WinTaskbar class="absolute inset-x-0 bottom-0 z-30" :popup-open="popupOpen" @tray="togglePopup" />
  </div>
</template>

<style scoped>
.popup {
  transform: translateY(16px) scale(calc(var(--s) * 0.96));
  opacity: 0;
  visibility: hidden;
  transition:
    transform 220ms var(--ease-out-expo),
    opacity 160ms ease-in,
    visibility 0s linear 220ms;
}
.popup.open {
  transform: scale(var(--s));
  opacity: 1;
  visibility: visible;
  transition:
    transform 320ms var(--ease-out-expo),
    opacity 200ms ease-out,
    visibility 0s;
}
</style>
