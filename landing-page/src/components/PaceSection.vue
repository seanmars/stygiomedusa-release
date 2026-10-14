<script setup lang="ts">
import SectionHead from '@/components/SectionHead.vue'
import { useTideStore } from '@/stores/tide'

const tide = useTideStore()

// 由上到下: 用得越快越上面, 像一根潮位尺.
const BANDS = ['大幅超前均速', '超前均速', '略超前均速', '符合均速', '略低於均速', '低於均速', '大幅低於均速']

const MODES = [
  { name: 'Historical', note: '預設', body: '依你自己的歷史用量曲線預測. 資料不足時暫時改用 Linear.' },
  { name: 'Linear', note: '', body: '假設整個週期平均使用.' },
  { name: 'Off', note: '', body: '不顯示 pace.' },
]
</script>

<template>
  <section class="border-y border-grid bg-harbor-deep">
    <div class="page-x py-24 lg:py-32">
      <SectionHead id="pace" title="照目前速度, 會不會提早用完">
        <p>Pace 比較你的用量和此時的預期用量. 如果照目前速度會在重置前用完, popup, widget tooltip 與 callout 會顯示預估耗盡時間.</p>
      </SectionHead>

      <div class="mt-14 grid grid-cols-[minmax(0,1fr)] gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div>
          <p class="text-sm text-mist">Claude 5h · 跟著首屏的示範 · 示意</p>
          <ol class="mt-4 border-l-2 border-ink" aria-label="Pace 等級">
            <li
              v-for="band in BANDS"
              :key="band"
              class="relative flex h-12 items-center gap-4 pl-6 transition-colors duration-300"
              :class="tide.claude.pace.band === band ? 'text-white' : 'text-mist'"
              :aria-current="tide.claude.pace.band === band ? 'true' : undefined"
            >
              <span class="absolute left-0 h-px bg-ink transition-[width] duration-300" :class="tide.claude.pace.band === band ? 'w-5' : 'w-2.5'" />
              <span :class="tide.claude.pace.band === band ? 'font-display text-2xl' : 'text-base'">{{ band }}</span>
            </li>
          </ol>
          <p class="mt-6 min-h-[1.7em] text-ink">
            <template v-if="tide.claude.pace.exhaustIn !== null">{{ tide.claude.pace.text }}</template>
            <template v-else>重置前不會用完</template>
          </p>
        </div>

        <div>
          <h3 class="font-display text-2xl text-white">預測模式</h3>
          <dl class="mt-6">
            <div v-for="mode in MODES" :key="mode.name" class="grid grid-cols-[9rem_1fr] gap-6 border-t border-grid py-5">
              <dt class="font-mono text-ink">
                {{ mode.name }}
                <span v-if="mode.note" class="mt-1 block font-sans text-sm text-mist">{{ mode.note }}</span>
              </dt>
              <dd class="text-mist">{{ mode.body }}</dd>
            </div>
          </dl>
          <p class="mt-4 border-t border-grid pt-5 text-mist">
            每次成功的讀數都存到本機 SQLite, 用來畫曲線, 也是 Historical 預測的依據.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
