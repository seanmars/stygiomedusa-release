<script setup lang="ts">
import { latestReleaseUrl, releasesUrl } from '@/data/release'

// 連到 GitHub 的最新 release 頁面, 由訪客在那裡下載安裝檔. 不顯示版本號, 發布新版不必重新 build 網站.
withDefaults(defineProps<{ size?: 'md' | 'lg' }>(), { size: 'md' })
</script>

<template>
  <div class="flex flex-col items-start gap-2">
    <a
      :href="latestReleaseUrl"
      class="group inline-flex items-center gap-3 rounded-[3px] bg-ink font-semibold text-harbor no-underline transition-colors duration-200 hover:bg-white active:translate-y-px"
      :class="size === 'lg' ? 'h-16 px-8 text-xl' : 'h-13 px-6 text-lg'"
    >
      <svg viewBox="0 0 20 20" class="size-5" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M10 3v10M5.5 8.5 10 13l4.5-4.5M4 17h12" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      下載最新版
    </a>
    <p class="text-sm leading-snug text-mist">
      Windows 11 x64 · MIT 授權 ·
      <a :href="releasesUrl" class="text-ink underline hover:text-white">所有版本</a>
    </p>
  </div>
</template>
