<script setup lang="ts">
import AbyssSnow from '@/components/AbyssSnow.vue'

// Pace 光塔裡的光: 光柱從塔底升到目前的等級 (level, 0 是塔頂, 1 是塔底), 用得越快光柱越高.
// 光柱頂端一團光標示目前的等級, 塔裡有光塵往上飄.
// 等級改變時整個光柱以 transform 滑到新位置, 不重新排版.
defineProps<{ level: number }>()
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div class="beam absolute inset-0" :style="{ '--level': level }">
      <div class="body absolute inset-0" />
      <div class="orb absolute inset-x-[-30%] top-0" />
    </div>
    <AbyssSnow :seed="5" :count="9" :tile="88" :size="[0.6, 1.5]" color="#d9d0ff" rise :duration="11" :twinkle="2.6" />
    <AbyssSnow class="opacity-70" :seed="23" :count="5" :tile="88" :size="[0.6, 1.4]" color="#d9d0ff" rise :duration="14" :twinkle="3.4" />
  </div>
</template>

<style scoped>
/* 光柱高度等於塔高; 往下位移 level 個塔高, 頂端就落在目前的等級 */
.beam {
  transform: translateY(calc(var(--level) * 100%));
  transition: transform 700ms var(--ease-out-expo);
}

.body {
  background: linear-gradient(to bottom, rgb(150 150 255 / 0), rgb(150 150 255 / 0.8) 10%, rgb(85 96 255 / 0.6) 32%, rgb(16 22 90 / 0.55));
  mask-image: linear-gradient(to right, transparent, #000 30%, #000 70%, transparent);
}

/* 等級的光: 中心近白的暖光, 往外淡成金色 */
.orb {
  height: 46%;
  translate: 0 -50%;
  background: radial-gradient(closest-side, rgb(255 250 235 / 0.95), rgb(255 227 160 / 0.6) 40%, rgb(255 227 160 / 0.15) 72%, transparent);
}
</style>
