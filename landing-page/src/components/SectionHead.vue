<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ id: string; title: string }>()

// 標題只在逗號後換行. 逗號後的空格改成不換行空格, 否則在 inline-block 結尾會被吃掉.
const chunks = computed(() => props.title.split(/(?<=, )/).map((chunk) => chunk.replace(/ $/, ' ')))
</script>

<template>
  <!-- 房間的入口: 細體標題與說明並排, 不畫底線, 以留白分開 -->
  <header class="grid grid-cols-[minmax(0,1fr)] gap-x-16 gap-y-5 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-end">
    <h2 :id="id" class="display-thin text-[clamp(2.1rem,3.6vw,3.4rem)] leading-[1.18]">
      <span v-for="chunk in chunks" :key="chunk" class="inline-block">{{ chunk }}</span>
    </h2>
    <div class="max-w-[60ch] text-[1.05rem] text-haze">
      <slot />
    </div>
  </header>
</template>
