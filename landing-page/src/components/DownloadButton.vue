<script setup lang="ts">
import { latestReleaseUrl, releasesUrl } from '@/data/release'

// 連到 GitHub 的最新 release 頁面, 由訪客在那裡下載安裝檔. 不顯示版本號, 發布新版不必重新 build 網站.
// 頁面上唯一常駐的金色物件: 它是預設被選取的動作, 所以從內部亮著.
withDefaults(defineProps<{ size?: 'md' | 'lg' }>(), { size: 'md' })
</script>

<template>
  <div class="flex flex-col items-start gap-2.5">
    <a
      :href="latestReleaseUrl"
      class="download inline-flex items-center gap-3 rounded-[8px] font-medium tracking-[0.06em] no-underline"
      :class="size === 'lg' ? 'h-16 px-8 text-xl' : 'h-13 px-6 text-lg'"
    >
      <svg viewBox="0 0 20 20" class="size-5" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
        <path d="M10 3v10M5.5 8.5 10 13l4.5-4.5M4 17h12" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      下載最新版
    </a>
    <p class="text-sm leading-snug text-haze">
      Windows 11 x64 · MIT 授權 ·
      <a :href="releasesUrl" class="link">所有版本</a>
    </p>
  </div>
</template>

<style scoped>
/* 被點亮的金色物件: 暖色從內部透出, 下方有琥珀光 */
.download {
  color: #fff4d6;
  background:
    radial-gradient(120% 150% at 50% 0%, rgb(255 214 120 / 0.42), rgb(255 190 60 / 0.16) 58%, rgb(214 140 30 / 0.14)),
    rgb(30 22 20);
  box-shadow:
    inset 0 0 0 1px rgb(255 201 77 / 0.85),
    inset 0 1px 0 rgb(255 240 200 / 0.55),
    inset 0 -14px 28px rgb(255 170 40 / 0.2),
    0 14px 40px -10px rgb(255 190 60 / 0.6),
    0 4px 14px -4px rgb(255 201 77 / 0.45);
  text-shadow: 0 1px 0 rgb(60 35 0 / 0.5);
  transition:
    background 200ms ease-out,
    color 200ms ease-out,
    box-shadow 300ms var(--ease-out-expo),
    translate 120ms ease-out;
}
.download:hover {
  background: radial-gradient(120% 150% at 50% 0%, #ffe2a0, var(--color-halo) 60%, #f0b23a);
  color: var(--color-void);
  text-shadow: none;
  box-shadow:
    inset 0 0 0 1px var(--color-halo),
    inset 0 1px 0 rgb(255 250 230 / 0.8),
    0 18px 50px -10px rgb(255 190 60 / 0.85),
    0 4px 16px -4px rgb(255 201 77 / 0.6);
}
.download:active {
  translate: 0 1px;
}
</style>
