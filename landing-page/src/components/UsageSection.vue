<script setup lang="ts">
import SectionHead from '@/components/SectionHead.vue'

// 用量分頁與分析視窗的示意資料, 不是任何人的真實用量.
const MODELS = [
  { model: 'claude-sonnet-4-5', client: 'Claude', tokens: 71.9, cost: 203.15 },
  { model: 'claude-opus-4-1', client: 'Claude', tokens: 48.2, cost: 612.4 },
  { model: 'gpt-5-codex', client: 'Codex', tokens: 39.4, cost: 118.27 },
  { model: 'claude-haiku-4-5', client: 'Claude', tokens: 12.6, cost: 9.84 },
  { model: 'gpt-5', client: 'Codex', tokens: 6.1, cost: 14.02 },
]
const maxTokens = Math.max(...MODELS.map((m) => m.tokens))

const ACTIVITY = [
  { kind: 'Tool', name: 'Read', count: 1284 },
  { kind: 'Tool', name: 'Edit', count: 932 },
  { kind: 'Tool', name: 'Bash', count: 611 },
  { kind: 'Subagent', name: 'code-reviewer', count: 31 },
  { kind: 'Slash command', name: '/review', count: 48 },
  { kind: 'Skill', name: 'group-commit', count: 19 },
  { kind: 'MCP', name: 'github · get_pull_request', count: 22 },
]

const DAYS = ['一', '二', '三', '四', '五', '六', '日']

/** 平日上班時段較多, 晚上與週末零星. 用固定的公式產生, 每次相同. */
function level(day: number, hour: number): number {
  const weekday = day < 5
  const work = hour >= 10 && hour <= 18 && hour !== 12
  const night = hour >= 21 && hour <= 23
  const noise = ((day * 31 + hour * 17) % 7) / 7
  let base = 0
  if (weekday && work) base = 2.6 + noise * 2.4
  else if (weekday && night) base = 1 + noise * 2
  else if (!weekday && hour >= 14 && hour <= 22) base = noise * 2.2
  else if (hour >= 8 && hour <= 20) base = noise * 1.2
  return Math.min(5, Math.round(base))
}

const HEAT = ['bg-ink/5', 'bg-ink/15', 'bg-ink/30', 'bg-ink/50', 'bg-ink/72', 'bg-ink']
</script>

<template>
  <section class="page-x py-24 lg:py-32">
    <SectionHead id="usage" title="用了多少, 用在哪裡">
      <p>
        以 tokscale 解析本機的 JSONL, 逐筆存到 SQLite; 來源檔被清除後資料仍在. 可以依區間, client, Claude 資料夾, project 與 model 篩選, 看 token 與 API 等價估算金額.
      </p>
    </SectionHead>

    <p class="mt-10 text-sm text-mist">以下皆為示意資料.</p>

    <div class="relative mt-4 overflow-x-auto">
      <table class="w-full border-collapse font-mono text-[0.8rem] sm:text-[0.92rem]">
        <thead>
          <tr class="text-left font-sans text-sm text-mist">
            <th scope="col" class="py-3 pr-3 font-normal sm:pr-6">Model</th>
            <th scope="col" class="py-3 pr-3 font-normal sm:pr-6">Client</th>
            <th scope="col" class="py-3 pr-3 text-right font-normal sm:pr-6">Token</th>
            <th scope="col" class="py-3 text-right font-normal sm:pr-6">API 等價</th>
            <th scope="col" class="w-[30%] py-3 font-normal max-sm:hidden"><span class="sr-only">比例</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in MODELS" :key="row.model" class="border-t border-grid">
            <td class="py-3 pr-3 text-ink sm:pr-6">{{ row.model }}</td>
            <td class="py-3 pr-3 font-sans sm:pr-6" :class="row.client === 'Claude' ? 'text-agent-claude' : 'text-agent-codex'">{{ row.client }}</td>
            <td class="py-3 pr-3 text-right text-ink sm:pr-6">{{ row.tokens.toFixed(1) }}M</td>
            <td class="py-3 text-right text-ink sm:pr-6">${{ row.cost.toFixed(2) }}</td>
            <td class="py-3 max-sm:hidden">
              <span class="block h-1.5 bg-mist/70" :style="{ width: `${(row.tokens / maxTokens) * 100}%` }" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-20 grid grid-cols-[minmax(0,1fr)] gap-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <figure>
        <figcaption class="font-display text-2xl text-white">使用時段</figcaption>
        <p class="mt-2 text-mist">分析視窗的熱力圖: 星期 x 小時. 本週, 本月與全部區間都有.</p>
        <div class="relative mt-6 overflow-x-auto">
          <div class="grid grid-cols-[1.5rem_repeat(24,minmax(0,1fr))] gap-[3px]" role="img" aria-label="示意: 平日上班時段用量最多, 晚上與週末較少">
            <template v-for="(day, d) in DAYS" :key="day">
              <span class="text-xs leading-none text-mist">{{ day }}</span>
              <span v-for="h in 24" :key="h" class="aspect-square rounded-[2px]" :class="HEAT[level(d, h - 1)]" />
            </template>
            <span />
            <span v-for="h in 24" :key="`h${h}`" class="pt-1 text-center font-mono text-[0.7rem] text-mist">{{ (h - 1) % 6 === 0 ? h - 1 : '' }}</span>
          </div>
        </div>
      </figure>

      <div>
        <h3 class="font-display text-2xl text-white">呼叫次數</h3>
        <p class="mt-2 text-mist">活動分頁統計 skill, slash command, subagent, tool 與 MCP. 只記名稱, 時間, session 與 project.</p>
        <table class="mt-6 w-full border-collapse">
          <tbody>
            <tr v-for="item in ACTIVITY" :key="item.name" class="border-t border-grid">
              <td class="py-2.5 pr-4 text-sm whitespace-nowrap text-mist">{{ item.kind }}</td>
              <td class="py-2.5 pr-4 font-mono text-[0.92rem] [overflow-wrap:anywhere] text-ink">{{ item.name }}</td>
              <td class="py-2.5 text-right font-mono text-[0.92rem] text-ink">{{ item.count.toLocaleString('en-US') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
