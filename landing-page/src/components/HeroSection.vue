<script setup lang="ts">
import DesktopStage from '@/components/DesktopStage.vue'
import DownloadButton from '@/components/DownloadButton.vue'
import HeroAbyss from '@/components/HeroAbyss.vue'
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
  <section class="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden" aria-labelledby="hero-title">
    <div class="absolute inset-0 -z-10" aria-hidden="true">
      <HeroAbyss />
      <!-- 標題區壓暗: 光在文字後方, 不與文字搶對比 -->
      <div class="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-void via-void/75 to-transparent md:h-[42%]" />
      <!-- 底部淡回虛空: 操作說明可讀, 與下一段之間沒有硬邊 -->
      <div class="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-void via-void/70 to-transparent md:h-28" />
    </div>

    <div class="page-x flex flex-1 flex-col pb-6">
      <div class="grid grid-cols-[minmax(0,1fr)] gap-x-14 gap-y-6 pt-6 pb-8 md:pt-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <!-- 換行只發生在逗號後 -->
          <h1 id="hero-title" class="display-thin text-[clamp(2.3rem,4.9vw,4.5rem)] leading-[1.12]">
            <span class="inline-block">不開視窗,&nbsp;</span><span class="inline-block">也看得到配額.</span>
          </h1>
          <p class="mt-4 max-w-[58ch] text-[1.05rem] text-haze">
            Stygiomedusa 把 Claude Code 與 Codex 的 5h/7d 配額放在 Windows 11 工作列與螢幕邊緣. 還剩多少, 何時重置, 照目前速度會不會提早用完, 一眼就知道.
          </p>
        </div>
        <DownloadButton />
      </div>

      <DesktopStage />

      <!-- 桌面下方一行: 左側是讀數的文字狀態 (狀態不只靠顏色), 右側是操作說明. 這裡有桌面的光池, 用較亮的 lumen 維持對比 -->
      <div class="mt-4 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 text-sm text-lumen">
        <p class="flex flex-wrap items-baseline gap-x-1.5">
          <span class="pulse relative top-[-1px] mr-1 inline-block size-1.5 self-center" :class="{ live: tide.playing && !tide.held }" aria-hidden="true">
            <span class="dot absolute inset-0 rounded-full bg-core" />
            <span class="ring absolute inset-0 rounded-full" />
          </span>
          示意<template v-for="reading in tide.agents" :key="reading.agent">
            · <span class="whitespace-nowrap">{{ reading.name }} 5h 剩餘 <span class="font-mono text-core">{{ reading.fiveHour.remaining }}%</span>&nbsp;
            <span :class="TONE_TEXT[reading.fiveHour.tone]">{{ TONE_LABEL[reading.fiveHour.tone] }}</span></span>
          </template>
        </p>
        <p class="hidden md:block">
          {{ tide.playing ? '游標移入時, 時間暫停.' : '依系統的減少動態設定, 不自動播放.' }}
          點系統匣圖示或史萊姆開關 popup, 史萊姆可以拖到任一邊.
        </p>
        <!-- 窄螢幕的 popup 只顯示上半部, 連到完整內容 -->
        <p class="md:hidden">
          Popup 只顯示上半部.
          <a href="#popup" class="link">看完整的 Claude 與 Codex 配額卡</a>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
 * 示意時間在走時, 狀態點隨之呼吸: 點變暗, 外圈亮起. 外圈是靜止的 box-shadow, 只動 opacity, 不重畫.
 * 點與外圈是兄弟元素: 巢狀的兩個 opacity 動畫會讓瀏覽器每一幀都重算樣式.
 */
.ring {
  box-shadow: 0 0 0 4px rgb(238 234 255 / 0.07);
  opacity: 0;
}
.pulse.live .dot {
  animation: pulse 2.4s ease-in-out infinite;
}
.pulse.live .ring {
  animation: ring 2.4s ease-in-out infinite;
}

@keyframes pulse {
  50% {
    opacity: 0.55;
  }
}

@keyframes ring {
  50% {
    opacity: 1;
  }
}
</style>
