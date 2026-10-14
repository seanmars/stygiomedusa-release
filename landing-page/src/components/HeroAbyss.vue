<script setup lang="ts">
import AbyssAurora from '@/components/AbyssAurora.vue'
import AbyssMist from '@/components/AbyssMist.vue'
import AbyssSnow from '@/components/AbyssSnow.vue'
import { type Curtain, strandPath } from '@/data/abyss'

// 首屏的深淵: 下方鈷藍照亮的虛空, 翻動的霧, 背景的光幕, 從畫面上方垂入的水母觸手光
// (巨型幽靈水母的傘大到放不進畫面), 以及遠近兩層緩緩下沉的海雪.
// 示範桌面是半透明的螢幕, 這些光透過它可見. 上方標題區由外層的 CSS 漸層壓暗, 文字永遠在光的前面.
// 全部是 CSS 漸層與靜態 SVG, 動態只動 transform 與 opacity.
// 窄螢幕的文字佔滿整個寬度, 觸手一定會落在文字後方, 所以只在 md 以上畫觸手.

const CURTAINS: Curtain[] = [
  { x: 8, y: 22, w: 30, h: 80, duration: 17 },
  { x: 24, y: 30, w: 26, h: 72, duration: 13 },
  { x: 76, y: 18, w: 30, h: 78, duration: 19 },
]

// 觸手: 七條細發光絲, 各自以不同週期擺動. 前四條偏白, 後三條偏紫.
const STRANDS = Array.from({ length: 7 }, (_, i) => ({
  d: strandPath({ seed: 7, index: i, total: 7 }),
  pale: i % 2 === 0,
  duration: 11 + ((i * 1.7) % 6),
  delay: -((i * 3.1) % 11),
}))
</script>

<template>
  <div class="abyss pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <AbyssMist
      class="opacity-70"
      :seed="17"
      :tile="720"
      :frequency="[0.0035, 0.0045]"
      :octaves="4"
      :rgb="[0.17, 0.15, 0.66]"
      :gain="2.4"
      :bias="-0.9"
      :duration="150"
    />
    <AbyssMist
      class="opacity-50"
      :seed="29"
      :tile="560"
      :frequency="[0.005, 0.004]"
      :octaves="3"
      :rgb="[0.2, 0.2, 0.75]"
      :gain="2.2"
      :bias="-0.85"
      :duration="110"
      reverse
    />
    <AbyssAurora class="opacity-60" :curtains="CURTAINS" :seed="7" tip="rgb(233 228 255 / 0.35)" core="rgb(167 139 250 / 0.38)" base="rgb(27 31 168 / 0.5)" />

    <!-- 觸手: 寬而淡的光暈加一條細亮的核心 -->
    <div class="absolute top-[-6%] left-[6%] hidden h-[112%] w-[44%] md:block">
      <div
        v-for="(strand, i) in STRANDS"
        :key="i"
        class="strand absolute inset-0"
        :style="{ animationDuration: `${strand.duration}s`, animationDelay: `${strand.delay}s` }"
      >
        <svg class="size-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient :id="`strand-${i}`" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="100">
              <stop offset="0.3" :stop-color="strand.pale ? '#f3efff' : '#c4b5fd'" stop-opacity="0" />
              <stop offset="0.46" :stop-color="strand.pale ? '#f3efff' : '#c4b5fd'" />
              <stop offset="0.62" :stop-color="strand.pale ? '#e4ddff' : '#c4b5fd'" />
              <stop offset="0.8" :stop-color="strand.pale ? '#a78bfa' : '#6d5cff'" />
              <stop offset="1" stop-color="#6d5cff" stop-opacity="0" />
            </linearGradient>
          </defs>
          <g fill="none" :stroke="`url(#strand-${i})`" stroke-linecap="round" stroke-linejoin="round">
            <path :d="strand.d" stroke-width="14" stroke-opacity="0.07" vector-effect="non-scaling-stroke" />
            <path :d="strand.d" stroke-width="6" stroke-opacity="0.14" vector-effect="non-scaling-stroke" />
            <path :d="strand.d" stroke-width="2" stroke-opacity="0.95" vector-effect="non-scaling-stroke" />
          </g>
        </svg>
      </div>
    </div>

    <!-- 海雪: 遠層細小昏暗, 近層大而模糊; 都緩緩下沉 -->
    <AbyssSnow class="opacity-75" :seed="3" :count="14" :tile="210" :size="[0.5, 1.4]" color="#cfc6ff" :duration="42" />
    <AbyssSnow class="opacity-80" :seed="11" :count="6" :tile="380" :size="[3.5, 7]" color="#e9e4ff" :softness="0.7" :duration="34" />

    <div class="vignette absolute inset-0" />
  </div>
</template>

<style scoped>
.abyss {
  background:
    radial-gradient(110% 70% at 50% 112%, #2129c8, rgb(33 41 200 / 0.35) 45%, transparent 80%),
    var(--color-void);
}

.strand {
  transform-origin: 50% 0;
  animation: strand 13s ease-in-out infinite alternate;
  will-change: transform;
}

@keyframes strand {
  from {
    transform: rotate(-1.4deg) skewX(1.5deg);
  }
  to {
    transform: rotate(1.6deg) skewX(-2deg);
  }
}

.vignette {
  background: radial-gradient(farthest-corner at 50% 62%, transparent 40%, rgb(3 5 26 / 0.8));
}
</style>
