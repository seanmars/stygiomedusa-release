<script setup lang="ts">
import { Beam, FloatingParticles, Glow, RadialGradient } from 'shaders/vue'

import AbyssShader from '@/components/AbyssShader.vue'

// Pace 光塔裡的光: 光柱從塔底升到目前的等級 (level, 0 是塔頂, 1 是塔底), 用得越快光柱越高.
// 塔頂一團光標示目前的等級, 塔裡有光塵往上飄.
defineProps<{ level: number }>()
</script>

<template>
  <AbyssShader>
    <Glow :intensity="2" :threshold="0.3" :size="30">
      <Beam
        :start-position="{ x: 0.5, y: 1.04 }"
        :end-position="{ x: 0.5, y: level }"
        :start-thickness="0.9"
        :end-thickness="0.5"
        :start-softness="6"
        :end-softness="3"
        inside-color="#5560ff"
        outside-color="#10165a"
        color-space="oklch"
        :opacity="0.55"
      />
      <RadialGradient
        color-a="#ffe3a0"
        color-b="transparent"
        :center="{ x: 0.5, y: level }"
        :radius="0.32"
        :aspect="0.55"
        :opacity="0.5"
        blend-mode="screen"
      />
    </Glow>
    <FloatingParticles
      particle-color="#d9d0ff"
      :count="220"
      :particle-size="1.4"
      :softness="0.4"
      :speed="0.08"
      :angle="90"
      :angle-variance="12"
      :twinkle="0.6"
      blend-mode="screen"
    />
  </AbyssShader>
</template>
