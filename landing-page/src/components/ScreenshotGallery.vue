<script setup lang="ts">
import { screenshots } from '@/data/screenshots'

const base = import.meta.env.BASE_URL
</script>

<template>
  <div v-if="screenshots.length" class="mt-24">
    <h3 class="mb-10 text-[1.6rem] font-light tracking-[0.04em] text-core">實際畫面</h3>
    <div class="grid gap-10 md:grid-cols-2">
      <figure v-for="shot in screenshots" :key="shot.file" class="flex flex-col gap-3">
        <img
          :src="`${base}${shot.file}`"
          :width="shot.width"
          :height="shot.height"
          :alt="shot.caption"
          loading="lazy"
          class="h-auto w-full rounded-[10px] border border-edge shadow-[0_30px_70px_-30px_rgb(27_31_168/0.9)]"
        />
        <figcaption class="text-sm text-haze">{{ shot.caption }}</figcaption>
      </figure>
    </div>
  </div>
</template>
