<script setup lang="ts">
import DesktopStage from '@/components/DesktopStage.vue'
import DownloadButton from '@/components/DownloadButton.vue'
import { TONE_LABEL } from '@/data/tide'
import { useTideStore } from '@/stores/tide'

const tide = useTideStore()

const TONE_TEXT = {
  normal: 'text-tone-normal',
  warning: 'text-tone-warning',
  danger: 'text-tone-danger',
} as const
</script>

<template>
  <section class="flex min-h-[calc(100svh-4rem)] flex-col" aria-labelledby="hero-title">
    <div class="page-x flex flex-1 flex-col pb-6">
      <div class="grid grid-cols-[minmax(0,1fr)] gap-x-14 gap-y-5 border-b-2 border-ink pt-4 pb-5 md:gap-y-6 md:pt-5 md:pb-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <!-- 換行只發生在逗號後 -->
          <h1 id="hero-title" class="font-display text-[clamp(2.2rem,4.6vw,4.1rem)] leading-[1.08] tracking-[0.01em] text-white">
            <span class="inline-block">不開視窗,&nbsp;</span><span class="inline-block">也看得到配額.</span>
          </h1>
          <p class="mt-3 max-w-[62ch] text-[1.05rem] text-mist">
            Stygiomedusa 把 Claude Code 與 Codex 的 5h/7d 配額放在 Windows 11 工作列與螢幕邊緣. 還剩多少, 何時重置, 照目前速度會不會提早用完, 一眼就知道.
          </p>
        </div>
        <DownloadButton />
      </div>

      <!-- 讀數的文字狀態: 狀態不只靠顏色 -->
      <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-4 pb-3 text-sm text-mist md:pt-5">
        <p>
          示意<template v-for="reading in tide.agents" :key="reading.agent">
            · <span class="whitespace-nowrap">{{ reading.name }} 5h 剩餘 <span class="font-mono text-ink">{{ reading.fiveHour.remaining }}%</span>&nbsp;
            <span :class="TONE_TEXT[reading.fiveHour.tone]">{{ TONE_LABEL[reading.fiveHour.tone] }}</span></span>
          </template>
        </p>
        <p class="hidden sm:block">{{ tide.playing ? '時間自動快轉, 游標移入時暫停' : '依系統的減少動態設定, 不自動播放' }}</p>
      </div>

      <DesktopStage />

      <p class="mt-3 hidden text-sm text-mist md:block">點系統匣圖示或史萊姆, 開關 popup. 史萊姆可以拖到任一邊, 游標停留時長出 callout.</p>
      <!-- 窄螢幕的 popup 只顯示上半部, 連到完整內容 -->
      <p class="mt-3 text-sm text-mist md:hidden">
        Popup 只顯示上半部.
        <a href="#popup" class="text-ink underline hover:text-white">看完整的 Claude 與 Codex 配額卡</a>
      </p>
    </div>
  </section>
</template>
