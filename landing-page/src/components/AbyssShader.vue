<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Shader } from 'shaders/vue'

// 深淵的 WebGPU 光. GPU 失敗時 canvas 保持透明, 外層的 CSS 漸層就是後備畫面.
// 不送出 shaders 的匿名效能統計. 減少動態時只畫一個靜止畫面.
// 游標停在示範上時只停住示意時間; 深淵的光不暫停, 否則看起來像畫面卡住.
const shader = ref<InstanceType<typeof Shader>>()
const ready = ref(false)
let reduce = false

onMounted(() => {
  reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

async function onReady() {
  ready.value = true
  const s = shader.value
  if (!s || !reduce) return
  // 先讓光塵與霧發展幾秒, 再停在這個畫面
  s.pause()
  await s.renderSyntheticFrame(6)
}
</script>

<template>
  <Shader
    ref="shader"
    class="pointer-events-none size-full transition-opacity duration-[1400ms] ease-out"
    :class="ready ? 'opacity-100' : 'opacity-0'"
    disable-telemetry
    aria-hidden="true"
    @ready="onReady"
  >
    <slot />
  </Shader>
</template>
