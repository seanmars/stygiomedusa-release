<script setup lang="ts">
import QuotaCardDemo from '@/components/QuotaCardDemo.vue'
import { useTideStore } from '@/stores/tide'

// 重現 app 的 popup: 上方分頁列, 配額分頁每個來源一張配額卡. 一般為 720px 兩欄;
// 窄版改為單欄堆疊, 不縮小文字. 高度受限時 (clipped) 不做巢狀捲動, 底部以短漸層淡出.
withDefaults(defineProps<{ narrow?: boolean; clipped?: boolean }>(), { narrow: false, clipped: false })

const tide = useTideStore()
const iconUrl = `${import.meta.env.BASE_URL}icon-256.png`
const TABS = ['配額', '用量', '活動', '史萊姆', '設定']
</script>

<template>
  <div
    class="relative flex flex-col rounded-[8px] border border-win-line bg-win-bg p-3 font-win text-win-text shadow-[0_16px_40px_rgb(0_0_0/0.5)]"
    :class="[narrow ? 'w-full' : 'w-[720px]', clipped ? 'overflow-hidden' : '']"
  >
    <div class="mb-3 flex shrink-0 items-center gap-1 overflow-hidden" aria-hidden="true">
      <img :src="iconUrl" width="18" height="18" alt="" class="mr-1.5 ml-1 rounded-[4px]" />
      <span
        v-for="(tab, i) in TABS"
        :key="tab"
        class="shrink-0 rounded-[5px] py-1 text-sm"
        :class="[i === 0 ? 'bg-win-card text-white' : 'text-white/70', narrow ? 'px-2' : 'px-3']"
      >{{ tab }}</span>
    </div>
    <div class="min-h-0 gap-3" :class="narrow ? 'flex flex-col' : 'grid grid-cols-2'">
      <QuotaCardDemo :reading="tide.claude" plan="Max" />
      <QuotaCardDemo :reading="tide.codex" plan="Plus" />
    </div>

    <!-- 高度受限時只在底部淡出, 不蓋住讀數; 完整內容的連結放在示範桌面外 -->
    <div v-if="clipped" class="pointer-events-none absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t from-win-bg to-transparent" />

  </div>
</template>
