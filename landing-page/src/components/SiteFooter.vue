<script setup lang="ts">
import DownloadButton from '@/components/DownloadButton.vue'
import { RELEASE_REPO, changelogUrl } from '@/data/release'
</script>

<template>
  <footer>
    <div class="page-x grid gap-10 py-24 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:py-32">
      <div>
        <p class="font-display text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.1] text-white">讓配額留在視線邊緣.</p>
        <p class="mt-4 text-mist">
          每個版本的變更寫在
          <a :href="changelogUrl" class="text-ink underline hover:text-white">GitHub 上的更新紀錄</a>.
          已安裝的 app 會自動提示新版.
        </p>
      </div>
      <DownloadButton size="lg" />
    </div>
    <div class="border-t border-grid">
      <div class="page-x flex flex-col gap-3 py-8 text-sm text-mist md:flex-row md:items-center md:justify-between">
        <p>以 MIT 授權發布. 用量解析使用 tokscale (MIT). Claude 與 Codex 的名稱與圖示屬於各自的公司.</p>
        <a :href="RELEASE_REPO" class="text-ink underline hover:text-white">github.com/seanmars/stygiomedusa-release</a>
      </div>
    </div>
  </footer>
</template>
