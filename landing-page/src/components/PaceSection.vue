<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeUnmount, ref, watch } from 'vue'

import SectionHead from '@/components/SectionHead.vue'
import { useWebGPU } from '@/composables/useWebGPU'
import { useTideStore } from '@/stores/tide'

const PaceTowerLight = defineAsyncComponent(() => import('@/components/PaceTowerLight.vue'))

const tide = useTideStore()
const webgpu = useWebGPU()

// 由上到下: 用得越快越上面. 光塔裡的光柱升到目前的等級.
const BANDS = ['大幅超前均速', '超前均速', '略超前均速', '符合均速', '略低於均速', '低於均速', '大幅低於均速']

const MODES = [
  { name: 'Historical', note: '預設', body: '依你自己的歷史用量曲線預測. 資料不足時暫時改用 Linear.' },
  { name: 'Linear', note: '', body: '假設整個週期平均使用.' },
  { name: 'Off', note: '', body: '不顯示 pace.' },
]

const current = computed(() => {
  const index = BANDS.indexOf(tide.claude.pace.band)
  return index < 0 ? 3 : index
})

/** 光柱頂端的位置: 0 是塔頂, 1 是塔底; 等級改變時以 ease-out 滑到新位置. */
const target = computed(() => (current.value + 0.5) / BANDS.length)
const level = ref(target.value)
let frame = 0

watch(target, (to) => {
  cancelAnimationFrame(frame)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const from = level.value
  if (reduce) {
    level.value = to
    return
  }
  const start = performance.now()
  const step = (time: number) => {
    const t = Math.min(1, (time - start) / 700)
    level.value = from + (to - from) * (1 - Math.pow(2, -10 * t))
    if (t < 1) frame = requestAnimationFrame(step)
  }
  frame = requestAnimationFrame(step)
})

onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>

<template>
  <section class="room-deep">
    <div class="page-x py-28 lg:py-36">
      <SectionHead id="pace" title="照目前速度, 會不會提早用完">
        <p>Pace 比較你的用量和此時的預期用量. 如果照目前速度會在重置前用完, popup, widget tooltip 與 callout 會顯示預估耗盡時間.</p>
      </SectionHead>

      <div class="mt-16 grid grid-cols-[minmax(0,1fr)] gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div>
          <p class="text-sm text-haze">Claude 5h · 跟著首屏的示範 · 示意</p>
          <div class="mt-6 flex gap-6">
            <!-- 光塔: 用得越快, 光柱越高 -->
            <div class="tower object w-[4.5rem] shrink-0 overflow-hidden sm:w-[5.5rem]" aria-hidden="true" @pointerenter="tide.hold()" @pointerleave="tide.release()">
              <PaceTowerLight v-if="webgpu" :level="level" class="absolute inset-0" />
              <div v-else class="tower-fill absolute inset-x-0 bottom-0" :style="{ height: `${(1 - level) * 100}%` }" />
            </div>
            <ol class="flex min-w-0 flex-1 flex-col" aria-label="Pace 等級">
              <li
                v-for="(band, i) in BANDS"
                :key="band"
                class="relative flex h-12 items-center gap-4 transition-colors duration-300"
                :class="i === current ? 'text-core' : 'text-haze'"
                :aria-current="i === current ? 'true' : undefined"
              >
                <span
                  class="absolute -left-6 h-px transition-[width,background-color] duration-300"
                  :class="i === current ? 'w-10 bg-halo shadow-[0_0_8px_rgb(255_201_77/0.8)]' : 'w-2.5 bg-haze/40'"
                />
                <span class="pl-5 transition-[font-size] duration-300" :class="i === current ? 'text-2xl font-light tracking-[0.04em]' : 'text-base'">{{ band }}</span>
              </li>
            </ol>
          </div>
          <p class="mt-8 min-h-[1.7em] text-core">
            <template v-if="tide.claude.pace.exhaustIn !== null">{{ tide.claude.pace.text }}</template>
            <template v-else>重置前不會用完</template>
          </p>
        </div>

        <div>
          <h3 class="text-[1.6rem] font-light tracking-[0.04em] text-core">預測模式</h3>
          <dl class="mt-8 flex flex-col gap-7">
            <div v-for="mode in MODES" :key="mode.name" class="grid grid-cols-[9rem_1fr] gap-6">
              <dt class="font-mono text-core">
                {{ mode.name }}
                <span v-if="mode.note" class="mt-1 block font-sans text-sm text-halo-soft">{{ mode.note }}</span>
              </dt>
              <dd class="text-haze">{{ mode.body }}</dd>
            </div>
          </dl>
          <p class="mt-10 max-w-[56ch] text-haze">
            每次成功的讀數都存到本機 SQLite, 用來畫曲線, 也是 Historical 預測的依據.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tower {
  height: 21rem;
  border-radius: 14px;
}

/* 沒有 WebGPU 時的光柱 */
.tower-fill {
  background: linear-gradient(to top, rgb(70 80 255 / 0.55), rgb(70 80 255 / 0.12) 85%, rgb(255 217 120 / 0.35));
}
</style>
