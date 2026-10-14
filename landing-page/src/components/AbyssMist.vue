<script setup lang="ts">
import { computed } from 'vue'

import { type NoiseOptions, noiseTile, svgUrl } from '@/data/abyss'

// 霧 (或光幕的光束): 雜訊圖塊鋪滿一層, 整層水平位移一個圖塊寬度後循環.
// 兩層往反方向漂, 交疊處的濃淡就會不斷變化, 看起來像霧在翻動. 只動 transform, 不重畫.
const props = withDefaults(
  defineProps<
    NoiseOptions & {
      /** 位移一個圖塊寬度的秒數. */
      duration: number
      reverse?: boolean
    }
  >(),
  { reverse: false },
)

const style = computed(() => ({
  backgroundImage: svgUrl(noiseTile(props)),
  '--tile': `${props.tile}px`,
  '--drift': `${props.duration}s`,
}))
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div class="mist absolute inset-y-0 right-0" :class="{ reverse }" :style="style" />
  </div>
</template>

<style scoped>
.mist {
  left: calc(-1 * var(--tile));
  background-size: var(--tile) var(--tile);
  animation: drift var(--drift) linear infinite;
  will-change: transform;
}
.mist.reverse {
  animation-direction: reverse;
}

@keyframes drift {
  to {
    transform: translateX(var(--tile));
  }
}
</style>
