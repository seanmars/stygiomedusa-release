<script setup lang="ts">
import { computed } from 'vue'

import { type Curtain, noiseTile, svgUrl } from '@/data/abyss'

// 光幕 (極光): 每一片是由上往下的色階 (光亮的尖端, 紫色核心, 鈷藍的底),
// 以橢圓遮罩收邊, 再以垂直的雜訊遮罩切出光束. 每片以不同週期左右擺動, 歪斜與伸縮.
// 只動 transform 與 opacity, 不重畫.
const props = defineProps<{
  curtains: Curtain[]
  /** 光束雜訊的種子. */
  seed: number
  tip: string
  core: string
  base: string
}>()

const RAY_TILE = 512

const rays = computed(() =>
  svgUrl(
    noiseTile({
      seed: props.seed,
      tile: RAY_TILE,
      frequency: [0.03, 0.002],
      octaves: 2,
      rgb: [0, 0, 0],
      gain: 1.5,
      bias: 0,
    }),
  ),
)

const style = computed(() => ({
  '--rays': rays.value,
  '--ray-tile': `${RAY_TILE}px`,
  '--tip': props.tip,
  '--core': props.core,
  '--base': props.base,
}))
</script>

<template>
  <div class="pointer-events-none absolute inset-0" :style="style" aria-hidden="true">
    <div
      v-for="(curtain, i) in curtains"
      :key="i"
      class="curtain absolute"
      :style="{
        left: `${curtain.x}%`,
        top: `${curtain.y}%`,
        width: `${curtain.w}%`,
        height: `${curtain.h}%`,
        animationDuration: `${curtain.duration}s`,
        animationDelay: `${-curtain.duration * (i * 0.37 % 1)}s`,
        maskPosition: `center, ${i * 137}px 0`,
      }"
    />
  </div>
</template>

<style scoped>
.curtain {
  background: linear-gradient(to bottom, transparent, var(--tip) 22%, var(--core) 48%, var(--base) 78%, transparent);
  mask-image: radial-gradient(closest-side, #000 30%, transparent), var(--rays);
  mask-size: 100% 100%, var(--ray-tile) var(--ray-tile);
  mask-repeat: no-repeat, repeat;
  mask-composite: intersect;
  transform-origin: 50% 20%;
  animation: curtain 15s ease-in-out infinite alternate;
  will-change: transform, opacity;
}

@keyframes curtain {
  from {
    transform: translateX(-5%) skewX(-7deg) scaleY(0.94);
    opacity: 0.7;
  }
  to {
    transform: translateX(5%) skewX(6deg) scaleY(1.04);
    opacity: 1;
  }
}
</style>
