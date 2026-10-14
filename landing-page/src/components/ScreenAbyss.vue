<script setup lang="ts">
import AbyssMist from '@/components/AbyssMist.vue'

// 示範螢幕裡的深淵: 下緣的鈷藍光與緩慢的霧. 不畫海雪, 讓史萊姆是畫面裡唯一的物件.
</script>

<template>
  <div class="abyss pointer-events-none absolute inset-0" aria-hidden="true">
    <AbyssMist
      class="opacity-70"
      :seed="41"
      :tile="560"
      :frequency="[0.005, 0.006]"
      :octaves="4"
      :rgb="[0.17, 0.15, 0.66]"
      :gain="2.4"
      :bias="-0.9"
      :duration="120"
    />
  </div>
</template>

<style scoped>
.abyss {
  background:
    radial-gradient(100% 75% at 50% 115%, #1d24b8, rgb(29 36 184 / 0.3) 50%, transparent 85%),
    var(--color-void);
}
</style>
