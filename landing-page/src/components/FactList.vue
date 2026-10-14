<script setup lang="ts">
// 示範旁的功能說明: 每列一個標籤與說明, 以格線分隔.
defineProps<{ items: { label: string; body: string }[] }>()
</script>

<template>
  <dl class="self-start border-t-2 border-ink">
    <div v-for="item in items" :key="item.label" class="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-grid py-4">
      <dt class="text-white">{{ item.label }}</dt>
      <dd class="text-mist">{{ item.body }}</dd>
    </div>
  </dl>
</template>
