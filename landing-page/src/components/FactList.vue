<script setup lang="ts">
// 示範旁的功能說明: 浮在物件旁的標示, 不畫格線, 以留白分組.
defineProps<{ items: { label: string; body: string }[] }>()
</script>

<template>
  <dl class="flex flex-col gap-6 self-start">
    <div v-for="item in items" :key="item.label" class="grid grid-cols-[5.5rem_1fr] gap-5">
      <dt class="text-core">{{ item.label }}</dt>
      <dd class="text-haze">{{ item.body }}</dd>
    </div>
  </dl>
</template>
