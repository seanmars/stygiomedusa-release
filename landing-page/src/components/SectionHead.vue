<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ id: string; title: string }>()

// 標題只在逗號後換行. 逗號後的空格改成不換行空格, 否則在 inline-block 結尾會被吃掉.
const chunks = computed(() => props.title.split(/(?<=, )/).map((chunk) => chunk.replace(/ $/, ' ')))
</script>

<template>
  <header class="grid grid-cols-[minmax(0,1fr)] gap-x-12 gap-y-4 border-b-2 border-ink pb-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-end">
    <h2 :id="id" class="font-display text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.15] tracking-[0.01em] text-white">
      <span v-for="chunk in chunks" :key="chunk" class="inline-block">{{ chunk }}</span>
    </h2>
    <div class="max-w-[62ch] text-[1.05rem] text-mist">
      <slot />
    </div>
  </header>
</template>
