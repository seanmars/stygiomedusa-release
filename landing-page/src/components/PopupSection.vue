<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import PopupDemo from '@/components/PopupDemo.vue'
import PopupFigure from '@/components/PopupFigure.vue'
import ScreenshotGallery from '@/components/ScreenshotGallery.vue'
import SectionHead from '@/components/SectionHead.vue'
import { useTideStore } from '@/stores/tide'

const tide = useTideStore()

// 完整的 popup: 寬度足夠時為 720px 兩欄, 不夠時等比縮小; 很窄時改為單欄窄版.
const frame = ref<HTMLElement>()
const zoom = ref(1)
const narrow = ref(false)

function fit() {
  const width = frame.value?.clientWidth ?? 720
  narrow.value = width < 560
  zoom.value = Math.min(1, width / 720)
}

let observer: ResizeObserver | undefined

onMounted(() => {
  fit()
  if (typeof ResizeObserver === 'function' && frame.value) {
    observer = new ResizeObserver(fit)
    observer.observe(frame.value)
  }
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section class="page-x py-24 lg:py-32">
    <SectionHead id="popup" title="Popup">
      <p>想看細節時, 點系統匣圖示或史萊姆打開. 每個來源一張配額卡, 另有用量, 活動, 史萊姆與設定分頁. bar 的顯示模式與 widget 分開設定.</p>
    </SectionHead>

    <div
      ref="frame"
      class="mt-14 flex flex-col items-center gap-3"
      @pointerenter="tide.hold()"
      @pointerleave="tide.release()"
    >
      <div :style="narrow ? undefined : { zoom }" :class="narrow ? 'w-full' : ''">
        <PopupDemo :narrow="narrow" />
      </div>
      <p class="text-sm text-mist">讀數為示意, 跟著首屏的示範變化.</p>
    </div>

    <h3 class="mt-24 mb-10 font-display text-2xl text-white">配額卡的每個部分</h3>
    <PopupFigure />

    <ScreenshotGallery />
  </section>
</template>
