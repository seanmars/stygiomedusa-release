<script setup lang="ts">
import AbyssAurora from '@/components/AbyssAurora.vue'
import AbyssSnow from '@/components/AbyssSnow.vue'
import type { Curtain } from '@/data/abyss'

// 頁尾的極光: 鈷藍的底, 紫色的核心, 螢光白紫的尖端; 光塵往上飄.
const CURTAINS: Curtain[] = [
  { x: -6, y: 12, w: 32, h: 60, duration: 16 },
  { x: 17, y: 18, w: 28, h: 52, duration: 12 },
  { x: 36, y: 8, w: 32, h: 64, duration: 18 },
  { x: 60, y: 16, w: 28, h: 56, duration: 14 },
  { x: 78, y: 10, w: 30, h: 62, duration: 20 },
]
</script>

<template>
  <div class="abyss pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <AbyssAurora :curtains="CURTAINS" :seed="12" tip="rgb(233 228 255 / 0.3)" core="rgb(167 139 250 / 0.42)" base="rgb(43 51 224 / 0.45)" />
    <AbyssSnow class="opacity-80" :seed="19" :count="16" :tile="240" :size="[0.6, 1.5]" color="#e4ddff" rise :duration="24" :twinkle="2.8" />
    <AbyssSnow class="opacity-80" :seed="31" :count="16" :tile="240" :size="[0.6, 1.5]" color="#e4ddff" rise :duration="30" :twinkle="3.6" />
    <div class="vignette absolute inset-0" />
  </div>
</template>

<style scoped>
.abyss {
  background:
    radial-gradient(120% 80% at 50% 112%, #161ba0, rgb(22 27 160 / 0.4) 45%, transparent 80%),
    var(--color-void);
}

.vignette {
  background: radial-gradient(farthest-corner at 50% 40%, transparent 45%, rgb(3 5 26 / 0.7));
}
</style>
