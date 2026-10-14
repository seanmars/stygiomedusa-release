<script setup lang="ts">
import { ref } from 'vue'

import FactList from '@/components/FactList.vue'
import SectionHead from '@/components/SectionHead.vue'
import TaskbarWidget from '@/components/TaskbarWidget.vue'
import WinTaskbar from '@/components/WinTaskbar.vue'
import { useTideStore } from '@/stores/tide'

const tide = useTideStore()
const mode = ref<'remaining' | 'used'>('remaining')

const FACTS = [
  { label: '顯示模式', body: 'bar 與百分比顯示已用或剩餘, 與 popup, 史萊姆分開設定.' },
  { label: '多螢幕', body: '可以勾選多個螢幕, 每條工作列各顯示一個, 並依該螢幕的縮放排版. 勾選的螢幕都未連接時, 改顯示在主螢幕.' },
  { label: '直式工作列', body: '例如 ExplorerPatcher. 改為縱向排列, 不顯示百分比.' },
  { label: '位置', body: '工作列的左, 中, 右, 也可以手動偏移.' },
  { label: '過期', body: 'token 過期時, 圖示右下角出現琥珀色圓點, bar 仍維持門檻色. 重新使用對應的 CLI 後恢復.' },
  { label: '關閉', body: '設定頁可以關閉 widget, 其他 widget 設定保留.' },
]
</script>

<template>
  <section class="page-x py-24 lg:py-32">
    <SectionHead id="widget" title="工作列 widget">
      <p>每個來源一組 mini bar: 上排 5h, 下排 7d, 右側是百分比. 游標停在上面時, 顯示已用, 剩餘, 重置時間與 pace.</p>
    </SectionHead>

    <div class="mt-14 grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <div
        class="flex flex-col gap-8 self-start rounded-[6px] border border-grid bg-harbor-deep p-5 sm:p-8"
        @pointerenter="tide.hold()"
        @pointerleave="tide.release()"
      >
        <div class="flex flex-wrap items-center justify-between gap-4">
          <p class="text-sm text-mist">讀數為示意 · 游標移到 widget 上看 tooltip</p>
          <div class="flex rounded-[3px] border border-grid p-0.5 text-sm" role="group" aria-label="顯示模式">
            <button
              v-for="option in ([['remaining', '剩餘'], ['used', '已用']] as const)"
              :key="option[0]"
              type="button"
              class="rounded-[2px] px-3 py-1 transition-colors duration-150"
              :class="mode === option[0] ? 'bg-chart text-ink' : 'text-mist hover:text-ink'"
              :aria-pressed="mode === option[0]"
              @click="mode = option[0]"
            >{{ option[1] }}</button>
          </div>
        </div>

        <!-- 放在真正的 Windows 工作列上 -->
        <WinTaskbar :mode="mode" :tray="false" :apps="false" class="rounded-[4px]" />

        <div class="grid grid-cols-[auto_minmax(0,1fr)] gap-8">
          <figure class="flex flex-col items-start gap-3">
            <div class="rounded-[4px] bg-win-bg">
              <TaskbarWidget :mode="mode" vertical />
            </div>
            <figcaption class="text-sm text-mist">直式工作列</figcaption>
          </figure>
          <figure class="flex flex-col items-start gap-3">
            <div class="flex h-[60px] items-center rounded-[4px] bg-win-bg">
              <TaskbarWidget :mode="mode" stale="claude" />
            </div>
            <figcaption class="text-sm text-mist">Claude 的 token 過期</figcaption>
          </figure>
        </div>
      </div>

      <FactList :items="FACTS" />
    </div>
  </section>
</template>
