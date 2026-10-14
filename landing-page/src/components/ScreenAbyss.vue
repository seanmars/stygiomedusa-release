<script setup lang="ts">
import { Fog, RadialGradient } from 'shaders/vue'

import AbyssShader from '@/components/AbyssShader.vue'

// 示範螢幕裡的深淵: 下緣的鈷藍光與緩慢的霧. 不畫海雪, 讓史萊姆是畫面裡唯一的物件.
</script>

<template>
  <AbyssShader>
    <RadialGradient color-a="#1d24b8" color-b="#03051a" :center="{ x: 0.5, y: 1.15 }" :radius="1" :aspect="1.6" color-space="oklch" />
    <Fog
      color-a="#2a26a8"
      color-b="#03051a"
      :seed="41"
      :speed="0.25"
      :turbulence="0.5"
      :detail="18"
      :blending="0.5"
      :mouse-influence="0.3"
      :mouse-radius="0.18"
      :opacity="0.45"
      blend-mode="screen"
    />
  </AbyssShader>
</template>
