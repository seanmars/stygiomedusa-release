<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Aurora, FloatingParticles, Fog, RadialGradient, Strands, Vignette } from 'shaders/vue'

import AbyssShader from '@/components/AbyssShader.vue'

// 首屏的深淵: 下方鈷藍照亮的虛空, 會被游標推開的霧, 背景的光幕, 從畫面上方垂入的水母觸手光
// (巨型幽靈水母的傘大到放不進畫面), 以及遠近兩層緩緩下沉的海雪.
// 示範桌面是半透明的螢幕, 這些光透過它可見.
// 座標: 原點在左上, y 往下. 上方標題區由外層的 CSS 漸層壓暗, 文字永遠在光的前面.
// 不用 Glow 濾鏡: 它會把觸手的顏色洗成白色. 光暈改由一層寬而淡的觸手提供.
// 窄螢幕的文字佔滿整個寬度, 觸手一定會落在文字後方, 所以只在 md 以上畫觸手.
const wide = ref(false)
let query: MediaQueryList | undefined
const syncWide = () => (wide.value = query?.matches ?? false)

onMounted(() => {
  query = window.matchMedia('(min-width: 48rem)')
  syncWide()
  query.addEventListener('change', syncWide)
})
onBeforeUnmount(() => query?.removeEventListener('change', syncWide))

const TENTACLE_FROM = { x: 0.26, y: -0.05 }
const TENTACLE_TO = { x: 0.33, y: 1.05 }

const TENTACLES = [
  { color: '#f3efff', position: 0 },
  { color: '#c4b5fd', position: 0.4 },
  { color: '#a78bfa', position: 0.7 },
  { color: '#6d5cff', position: 1 },
]
</script>

<template>
  <AbyssShader>
    <RadialGradient color-a="#2129c8" color-b="#03051a" :center="{ x: 0.5, y: 1.12 }" :radius="0.95" :aspect="2.2" color-space="oklch" />
    <Fog
      color-a="#2a26a8"
      color-b="#03051a"
      :seed="17"
      :speed="0.3"
      :turbulence="0.6"
      :detail="20"
      :blending="0.5"
      :mouse-influence="0.35"
      :mouse-radius="0.16"
      :opacity="0.4"
      blend-mode="screen"
    />
    <Aurora
      color-a="#1b1fa8"
      color-b="#e9e4ff"
      color-c="#a78bfa"
      :center="{ x: 0.42, y: 0.58 }"
      :intensity="55"
      :curtain-count="3"
      :speed="1.2"
      :waviness="95"
      :ray-density="30"
      :height="135"
      :balance="45"
      :seed="7"
      color-space="oklch"
      blend-mode="screen"
    />
    <!-- 觸手的光暈: 同一組觸手, 線寬大而很淡 -->
    <Strands
      v-if="wide"
      :start="TENTACLE_FROM"
      :end="TENTACLE_TO"
      :line-count="7"
      :amplitude="0.3"
      :frequency="0.6"
      :line-width="0.008"
      :softness="1"
      :spread="0.3"
      :speed="0.15"
      :stops="TENTACLES"
      :color-variance="0.6"
      :color-speed="0.2"
      :opacity="0.12"
      blend-mode="screen"
    />
    <!-- 觸手的核心: 七條分開的細發光絲 -->
    <Strands
      v-if="wide"
      :start="TENTACLE_FROM"
      :end="TENTACLE_TO"
      :line-count="7"
      :amplitude="0.3"
      :frequency="0.6"
      :line-width="0.003"
      :softness="0.15"
      :spread="0.3"
      :speed="0.15"
      :stops="TENTACLES"
      :color-variance="0.6"
      :color-speed="0.2"
      :opacity="0.95"
      blend-mode="screen"
    />
    <!-- 海雪: 遠層細小昏暗, 近層大而模糊; 都緩緩下沉 -->
    <FloatingParticles
      particle-color="#cfc6ff"
      :count="300"
      :particle-size="0.55"
      :softness="0.4"
      :speed="0.02"
      :angle="270"
      :angle-variance="25"
      :speed-variance="0.8"
      :randomness="0.5"
      :twinkle="0.15"
      :opacity="0.55"
      blend-mode="screen"
    />
    <FloatingParticles
      particle-color="#e9e4ff"
      :count="45"
      :particle-size="2.8"
      :softness="1"
      :speed="0.045"
      :angle="270"
      :angle-variance="30"
      :speed-variance="0.6"
      :randomness="0.6"
      :twinkle="0.1"
      :cursor-strength="0.2"
      :opacity="0.35"
      blend-mode="screen"
    />
    <Vignette color="#03051a" :center="{ x: 0.5, y: 0.62 }" :radius="0.55" :falloff="0.75" :intensity="0.9" />
  </AbyssShader>
</template>
