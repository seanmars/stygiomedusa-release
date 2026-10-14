<script setup lang="ts">
import { computed } from 'vue'

import { type SnowOptions, snowTile, svgUrl } from '@/data/abyss'

// 海雪 (光塵): 光點圖塊鋪滿一層, 整層位移一個圖塊高度後循環, 外層再緩緩左右擺動.
// 只動 transform, 不重畫. 不同大小與速度的多層疊在一起就有遠近.
const props = withDefaults(
  defineProps<
    SnowOptions & {
      /** 位移一個圖塊高度的秒數. */
      duration: number
      /** 往上飄; 預設往下沉. */
      rise?: boolean
      /** 明暗呼吸的秒數; 0 不呼吸. */
      twinkle?: number
    }
  >(),
  { rise: false, twinkle: 0, softness: 0 },
)

const style = computed(() => ({
  backgroundImage: svgUrl(snowTile(props)),
  '--tile': `${props.tile}px`,
  '--fall': `${props.duration}s`,
  '--twinkle': `${props.twinkle}s`,
  // 各層從不同的時間點開始, 避免同時轉向
  '--offset': `${-((props.seed * 7) % 13)}s`,
}))
</script>

<template>
  <div class="sway pointer-events-none absolute inset-y-0 -inset-x-8" aria-hidden="true">
    <div class="snow absolute inset-x-0" :class="{ rise, twinkle: twinkle > 0 }" :style="style" />
  </div>
</template>

<style scoped>
.sway {
  animation: sway 17s ease-in-out var(--offset, 0s) infinite alternate;
}

.snow {
  top: calc(-1 * var(--tile));
  bottom: 0;
  background-size: var(--tile) var(--tile);
  animation: fall var(--fall) linear infinite;
  will-change: transform;
}
.snow.rise {
  top: 0;
  bottom: calc(-1 * var(--tile));
  animation-name: rise;
}
.snow.twinkle {
  animation:
    fall var(--fall) linear infinite,
    twinkle var(--twinkle) ease-in-out var(--offset) infinite alternate;
}
.snow.rise.twinkle {
  animation-name: rise, twinkle;
}

@keyframes sway {
  from {
    translate: -1.25rem 0;
  }
  to {
    translate: 1.25rem 0;
  }
}

@keyframes fall {
  to {
    transform: translateY(var(--tile));
  }
}

@keyframes rise {
  to {
    transform: translateY(calc(-1 * var(--tile)));
  }
}

@keyframes twinkle {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.3;
  }
}
</style>
