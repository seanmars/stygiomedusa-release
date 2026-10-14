<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import QuotaCardDemo from '@/components/QuotaCardDemo.vue'
import { useTideStore } from '@/stores/tide'

// 配額卡放大置中, 說明以引線釘在卡片的實際部位上.
// 寬版: 每則說明放在與錨點同高的位置, 重疊時才往下推, 引線保持短而接近水平. 窄版: 說明列在卡片下方.
const tide = useTideStore()

interface Note {
  id: string
  side: 'left' | 'right'
  title: string
  body: string
}

const NOTES: Note[] = [
  { id: 'title', side: 'left', title: 'Agent 識別色', body: 'Claude 赭橘, Codex 青綠, 只用在標題, 不會和警告混淆.' },
  { id: 'bar', side: 'left', title: '門檻色', body: '剩餘 25% 以下警告, 10% 以下危險. 門檻可在設定頁調整.' },
  { id: 'curve', side: 'left', title: '用量曲線', body: '目前週期的已用 %, 跨過門檻的那段換色.' },
  { id: 'pace', side: 'left', title: 'Pace', body: '照目前速度會在重置前用完時, 顯示預估耗盡時間.' },
  { id: 'refresh', side: 'right', title: '更新鈕', body: '只更新這張卡. 同一來源 30 秒內只能更新一次.' },
  { id: 'numbers', side: 'right', title: '已用與剩餘', body: '兩個數字同時顯示, 欄寬固定.' },
  { id: 'reset', side: 'right', title: '重置倒數', body: '數字與單位分欄對齊, 寫成 "x 小時 y 分".' },
]

/** 說明標題列的半高, 引線從這裡接出. */
const TITLE_MID = 12
const NOTE_GAP = 14

const figure = ref<HTMLElement>()
const card = ref<HTMLElement>()
const notes = ref<Record<string, HTMLElement>>({})
const tops = ref<Record<string, number>>({})
const columnHeight = ref(0)
const leaders = ref(false)
const paths = ref<{ id: string; d: string; dot: [number, number] }[]>([])
const lit = ref<string | null>(null)

function setNote(id: string, el: unknown) {
  if (el instanceof HTMLElement) notes.value[id] = el
}

function anchorOf(id: string) {
  return card.value?.querySelector<HTMLElement>(`[data-anchor="${id}"]`) ?? null
}

async function measure() {
  const root = figure.value
  if (!root || !card.value) return
  leaders.value = getComputedStyle(root).getPropertyValue('--leaders').trim() === '1'
  if (!leaders.value) {
    paths.value = []
    tops.value = {}
    columnHeight.value = 0
    return
  }

  // 1. 依錨點高度放置說明, 同側重疊時往下推.
  const base = root.getBoundingClientRect()
  const nextTops: Record<string, number> = {}
  // 每則說明的轉折車道: 同側由上而下排序, 越上方的在越外側轉彎, 引線不共用垂直段也不交叉.
  const lanes: Record<string, number> = {}
  let tallest = card.value.getBoundingClientRect().height
  for (const side of ['left', 'right'] as const) {
    const items = NOTES.filter((n) => n.side === side)
      .map((n) => {
        const t = anchorOf(n.id)?.getBoundingClientRect()
        return { note: n, y: t ? t.top - base.top + t.height / 2 : 0 }
      })
      .sort((a, b) => a.y - b.y)
    let cursor = 0
    for (const [k, { note, y }] of items.entries()) {
      const top = Math.max(y - TITLE_MID, cursor)
      nextTops[note.id] = top
      lanes[note.id] = items.length - 1 - k
      cursor = top + (notes.value[note.id]?.offsetHeight ?? 60) + NOTE_GAP
    }
    tallest = Math.max(tallest, cursor)
  }
  tops.value = nextTops
  columnHeight.value = tallest
  await nextTick()

  // 2. 從說明標題列接出引線: 水平, 垂直 (只有被推下的說明才有), 再水平到錨點.
  const box = root.getBoundingClientRect()
  const cardBox = card.value.getBoundingClientRect()
  const next: typeof paths.value = []
  for (const note of NOTES) {
    const el = notes.value[note.id]
    const t = anchorOf(note.id)?.getBoundingClientRect()
    if (!el || !t) continue
    const n = el.getBoundingClientRect()
    const ny = n.top - box.top + TITLE_MID
    const ty = t.top - box.top + t.height / 2
    const lane = (lanes[note.id] ?? 0) * 12
    if (note.side === 'left') {
      const x0 = n.right - box.left + 10
      const xMid = cardBox.left - box.left - 14 - lane
      const x1 = t.left - box.left - 6
      next.push({ id: note.id, d: `M${x0} ${ny} H${xMid} V${ty} H${x1}`, dot: [x1, ty] })
    } else {
      const x0 = n.left - box.left - 10
      const xMid = cardBox.right - box.left + 14 + lane
      const x1 = t.right - box.left + 6
      next.push({ id: note.id, d: `M${x0} ${ny} H${xMid} V${ty} H${x1}`, dot: [x1, ty] })
    }
  }
  paths.value = next
}

let observer: ResizeObserver | undefined

onMounted(async () => {
  await nextTick()
  await measure()
  if (typeof ResizeObserver === 'function' && figure.value) {
    observer = new ResizeObserver(() => void measure())
    observer.observe(figure.value)
  }
  document.fonts?.ready.then(() => measure())
})

onBeforeUnmount(() => observer?.disconnect())

function noteStyle(id: string) {
  return leaders.value ? { position: 'absolute' as const, left: '0', right: '0', top: `${tops.value[id] ?? 0}px` } : undefined
}
</script>

<template>
  <div
    ref="figure"
    class="popup-figure relative grid gap-10"
    @pointerenter="tide.hold()"
    @pointerleave="tide.release()"
  >
    <svg v-if="paths.length" class="pointer-events-none absolute inset-0 size-full overflow-visible" aria-hidden="true">
      <g v-for="p in paths" :key="p.id" :class="lit === p.id ? 'text-note' : 'text-grid'" class="transition-colors duration-200">
        <path :d="p.d" fill="none" stroke="currentColor" :stroke-width="lit === p.id ? 2 : 1.25" />
        <circle :cx="p.dot[0]" :cy="p.dot[1]" r="3.5" fill="currentColor" />
      </g>
    </svg>

    <template v-for="side in (['left', 'right'] as const)" :key="side">
      <ul
        class="flex flex-col gap-6"
        :class="[side === 'left' ? 'notes-left' : 'notes-right', leaders ? 'relative' : '']"
        :style="leaders ? { minHeight: `${columnHeight}px` } : undefined"
      >
        <li
          v-for="note in NOTES.filter((n) => n.side === side)"
          :key="note.id"
          :ref="(el) => setNote(note.id, el)"
          :style="noteStyle(note.id)"
          @pointerenter="lit = note.id"
          @pointerleave="lit = null"
        >
          <p class="leading-6 font-medium transition-colors duration-200" :class="lit === note.id ? 'text-white' : 'text-ink'">{{ note.title }}</p>
          <p class="mt-0.5 text-sm leading-relaxed text-mist">{{ note.body }}</p>
        </li>
      </ul>
    </template>

    <div class="card-slot w-full max-w-[460px] justify-self-center">
      <div ref="card" class="card-zoom"><QuotaCardDemo :reading="tide.claude" plan="Max" /></div>
      <p class="mt-3 text-sm text-mist">讀數為示意, 跟著首屏的示範變化.</p>
    </div>
  </div>
</template>

<style scoped>
.popup-figure {
  --leaders: 0;
  grid-template-columns: 1fr;
}
.card-slot {
  order: -1;
}

@media (min-width: 1100px) {
  .popup-figure {
    --leaders: 1;
    grid-template-columns: minmax(0, 1fr) 460px minmax(0, 1fr);
    column-gap: 64px;
    align-items: start;
  }
  .notes-left {
    order: 0;
  }
  .card-slot {
    order: 1;
  }
  .notes-right {
    order: 2;
  }
  .card-zoom {
    zoom: 1.12;
    width: calc(100% / 1.12);
  }
}
</style>
