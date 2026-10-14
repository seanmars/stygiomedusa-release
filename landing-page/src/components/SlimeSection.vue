<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'

import FactList from '@/components/FactList.vue'
import SectionHead from '@/components/SectionHead.vue'
import SlimeDemo from '@/components/SlimeDemo.vue'
import TerminalDemo from '@/components/TerminalDemo.vue'
import WinTaskbar from '@/components/WinTaskbar.vue'
import { useWebGPU } from '@/composables/useWebGPU'
import type { Tint } from '@/data/slime'
import { useTideStore } from '@/stores/tide'

const ScreenAbyss = defineAsyncComponent(() => import('@/components/ScreenAbyss.vue'))

const tide = useTideStore()
const webgpu = useWebGPU()
const tint = ref<Tint>('black')

const FACTS = [
  { label: '拖曳', body: '按住 Ctrl 以左鍵拖曳, 沿所在螢幕工作區的四邊滑動, 也可以停在角落. 位置在重新啟動後還原.' },
  { label: '點擊', body: '左鍵開關 popup, 點齒輪開啟設定分頁. 右鍵選單與工作列 widget 相同.' },
  { label: '外觀', body: '色調 (顏色與不透明度, 預設黑色 100%), 文字大小 80% 到 200%, 文字描邊.' },
  { label: '置頂', body: '可以設定置頂. 所在螢幕有全螢幕 app 時, 退到它的下方.' },
  { label: '來源', body: '要顯示的 agent, Claude 資料夾與顯示模式, 都與 widget 分開設定.' },
  { label: '動畫', body: 'Windows 關閉 "動畫效果" 時, 不做彈跳, 蠕動與滴落, 只淡入淡出.' },
]
</script>

<template>
  <section class="room-deep">
    <div class="page-x py-28 lg:py-36">
      <SectionHead id="slime" title="史萊姆">
        <p>貼在螢幕邊緣的果凍. 每個來源一顆珠子: 左弧是 5h, 右弧是 7d, 下方是 5h 剩餘. 不想佔用工作列時, 可以用它取代 widget.</p>
      </SectionHead>

      <div class="mt-16 grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <FactList :items="FACTS" class="max-lg:order-2" />

        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <p class="text-sm text-haze">示意 · 拖曳珠子, 史萊姆會貼著工作區最近的邊. 游標停留長出 callout.</p>
            <div class="flex items-center gap-2 text-sm text-haze" role="group" aria-label="色調">
              色調
              <button
                v-for="option in ([['black', '黑'], ['white', '白']] as const)"
                :key="option[0]"
                type="button"
                class="toggle-option flex items-center gap-1.5 px-2.5 py-1 aria-[pressed=false]:shadow-[inset_0_0_0_1px_var(--color-edge)]"
                :aria-pressed="tint === option[0]"
                @click="tint = option[0]"
              >
                <span class="size-3 rounded-full border border-haze/60" :class="option[0] === 'black' ? 'bg-black' : 'bg-[#f3f3f3]'" />
                {{ option[1] }}
              </button>
            </div>
          </div>
          <!-- 這個方框代表一個螢幕: 正在跑 Claude Code 的 terminal, 史萊姆貼在邊緣, 工作列沒有 widget -->
          <div
            class="screen object object-glass h-[28rem] overflow-hidden"
            @pointerenter="tide.hold()"
            @pointerleave="tide.release()"
          >
            <!-- 螢幕裡的深淵, 在所有視窗後方 -->
            <div class="absolute inset-0" aria-hidden="true">
              <ScreenAbyss v-if="webgpu" />
            </div>
            <!-- 工作區: 工作列上方. 史萊姆只沿著工作區的四邊滑動, 與 app 相同 -->
            <div class="absolute inset-x-0 top-0 bottom-[60px]">
              <TerminalDemo class="absolute top-[8%] left-[5%] h-[80%] w-[80%] sm:w-[66%]" />
              <SlimeDemo initial-edge="right" :initial-at="0.42" :tint="tint" />
            </div>
            <WinTaskbar class="absolute inset-x-0 bottom-0" :widget="false" :tray="false" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

