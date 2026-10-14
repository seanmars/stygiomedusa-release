<script setup lang="ts">
import DownloadButton from '@/components/DownloadButton.vue'
import FooterAurora from '@/components/FooterAurora.vue'
import { RELEASE_REPO, changelogUrl } from '@/data/release'
</script>

<template>
  <footer class="relative isolate overflow-hidden">
    <div class="absolute inset-0 -z-10" aria-hidden="true">
      <FooterAurora />
      <!-- 上緣淡入: 從上一段的虛空接過來 -->
      <div class="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-void to-transparent" />
    </div>

    <div class="page-x grid gap-12 pt-40 pb-28 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:pt-56 lg:pb-36">
      <div>
        <p class="display-thin text-[clamp(2.3rem,4.8vw,4.3rem)] leading-[1.12]">讓配額留在視線邊緣.</p>
        <p class="mt-5 text-haze">
          每個版本的變更寫在
          <a :href="changelogUrl" class="link">GitHub 上的更新紀錄</a>.
          已安裝的 app 會自動提示新版.
        </p>
      </div>
      <DownloadButton size="lg" />
    </div>
    <div class="page-x flex flex-col gap-3 pt-6 pb-10 text-sm text-haze md:flex-row md:items-center md:justify-between">
      <p>以 MIT 授權發布. 用量解析使用 tokscale (MIT). Claude 與 Codex 的名稱與圖示屬於各自的公司.</p>
      <a :href="RELEASE_REPO" class="link">github.com/seanmars/stygiomedusa-release</a>
    </div>
  </footer>
</template>
