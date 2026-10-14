<script setup lang="ts">
import { Aurora, FloatingParticles, RadialGradient, Vignette } from 'shaders/vue'

import AbyssShader from '@/components/AbyssShader.vue'

// 頁尾的極光: 鈷藍的底, 紫色的核心, 螢光白紫的尖端; 光塵往上飄.
</script>

<template>
  <AbyssShader>
    <RadialGradient
      color-a="#161ba0"
      color-b="#03051a"
      :center="{ x: 0.5, y: 1.1 }"
      :radius="1.1"
      :aspect="1.6"
      color-space="oklch"
    />
    <Aurora
      color-a="#2b33e0"
      color-b="#a78bfa"
      color-c="#e9e4ff"
      :intensity="55"
      :curtain-count="3"
      :speed="1.6"
      :waviness="70"
      :ray-density="34"
      :height="105"
      :balance="46"
      :seed="12"
      color-space="oklch"
      blend-mode="screen"
    />
    <FloatingParticles
      particle-color="#e4ddff"
      :count="260"
      :particle-size="0.7"
      :softness="0.4"
      :speed="0.06"
      :angle="90"
      :angle-variance="30"
      :randomness="0.4"
      :twinkle="0.6"
      :opacity="0.75"
      blend-mode="screen"
    />
    <Vignette color="#03051a" :center="{ x: 0.5, y: 0.4 }" :radius="0.7" :falloff="0.8" :intensity="0.7" />
  </AbyssShader>
</template>
