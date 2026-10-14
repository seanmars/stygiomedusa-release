<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId } from 'vue'

import claudeUrl from '@/assets/agents/claude.svg'
import codexUrl from '@/assets/agents/codex.svg'
import { formatDuration, type AgentReading, type Tone } from '@/data/tide'
import { useTideStore } from '@/stores/tide'

// 重現 app 的史萊姆: 貼在螢幕邊緣的果凍, 每個來源一顆珠子. 珠子中間是 agent 圖示,
// 左弧是 5h, 右弧是 7d, 下方是 5h 百分比 ("剩餘" 顯示模式). 幾何與 goo filter 取自 app 的 BubbleWindow.vue.
//
// 放在任何有定位的容器裡, 容器就是 "螢幕". 拖曳時吸附到最近的一邊並沿邊滑動.
// 形狀以 "右緣" 的版面繪製, 其他邊整體旋轉 (下 90°, 左 180°, 上 270°), 內容再反向旋轉保持直立;
// 旋轉後珠子沿周長順時針排列, 與 app 相同.
import type { Edge, Tint } from '@/data/slime'

const props = withDefaults(
  defineProps<{
    initialEdge?: Edge
    /** 沿邊的位置, 0 到 1. */
    initialAt?: number
    tint?: Tint
    /** 示範畫面較小時縮小史萊姆, 以貼邊的中點為原點, 縮放後仍貼著邊. */
    scale?: number
    /** 有傳入時, 點擊 (未拖曳) 呼叫它, 例如開關 popup; 沒有時點擊開關 callout. */
    onActivate?: () => void
  }>(),
  { initialEdge: 'right', initialAt: 0.35, tint: 'black', scale: 1, onActivate: undefined },
)

const tide = useTideStore()
const uid = useId()

const R = 42
const SPACING = 100
const W = 150
const CX = W - 10 - R
const TOP = 58
const GEAR_R = 24
/** 珠子從螢幕邊緣往內的深度, callout 從這裡再往內留空. */
const DEPTH = 104

const ICONS = { claude: claudeUrl, codex: codexUrl }
const ANGLE: Record<Edge, number> = { right: 0, bottom: 90, left: 180, top: 270 }

const TINTS: Record<Tint, { fill: string; ink: string; muted: string; track: string; tone: Record<Tone, string> }> = {
  black: {
    fill: '#000',
    ink: '#fff',
    muted: 'rgb(255 255 255 / 0.8)',
    track: 'rgb(255 255 255 / 0.18)',
    tone: { normal: 'var(--color-tone-normal)', warning: 'var(--color-tone-warning)', danger: 'var(--color-tone-danger)' },
  },
  white: {
    fill: '#f3f3f3',
    ink: '#000',
    muted: 'rgb(0 0 0 / 0.8)',
    track: 'rgb(0 0 0 / 0.18)',
    tone: { normal: 'var(--color-tone-normal-on-light)', warning: 'var(--color-tone-warning-on-light)', danger: 'var(--color-tone-danger-on-light)' },
  },
}
const palette = computed(() => TINTS[props.tint])

/** 每個珠子周圍 6 個隆起. 外緣約在 0.96r 到 1.05r, 只比本體 (0.92r) 略微突出. */
const LOBES = [
  { a: 8, d: 0.48, s: 1.0 },
  { a: 66, d: 0.44, s: 0.94 },
  { a: 131, d: 0.5, s: 0.98 },
  { a: 185, d: 0.46, s: 0.92 },
  { a: 247, d: 0.49, s: 0.96 },
  { a: 302, d: 0.45, s: 0.9 },
]

const beads = computed(() => tide.agents.map((reading, i) => ({ reading, cy: TOP + i * SPACING })))
const height = computed(() => TOP + (beads.value.length - 1) * SPACING + 110 + GEAR_R + 20)
const gearCy = computed(() => TOP + (beads.value.length - 1) * SPACING + 110)

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)] as const
}

/** 弧從下方往上長; 左弧角度遞增 (順時針), 右弧角度遞減. */
function arc(cx: number, cy: number, from: number, span: number, clockwise: boolean) {
  const r = 0.46 * R
  const to = clockwise ? from + span : from - span
  const [x1, y1] = polar(cx, cy, r, from)
  const [x2, y2] = polar(cx, cy, r, to)
  return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 0 ${clockwise ? 1 : 0} ${x2.toFixed(2)} ${y2.toFixed(2)}`
}

function arcs(reading: AgentReading, cy: number) {
  const iconCy = cy - 0.12 * R
  const five = Math.max(0.5, (reading.fiveHour.remaining / 100) * 140)
  const seven = Math.max(0.5, (reading.sevenDay.remaining / 100) * 140)
  return {
    iconCy,
    leftTrack: arc(CX, iconCy, 110, 140, true),
    leftFill: arc(CX, iconCy, 110, five, true),
    rightTrack: arc(CX, iconCy, 70, 140, false),
    rightFill: arc(CX, iconCy, 70, seven, false),
  }
}

// ---- 位置: 吸附的邊與沿邊位置 ----
const screen = ref<HTMLElement>()
const size = ref({ w: 0, h: 0 })
const edge = ref<Edge>(props.initialEdge)
const at = ref(props.initialAt)

const edgeLength = computed(() => (edge.value === 'left' || edge.value === 'right' ? size.value.h : size.value.w))

/** 沿邊的中心座標 (px), 讓整條鏈留在邊上. */
const along = computed(() => {
  const len = edgeLength.value
  const span = height.value * props.scale
  if (len <= span) return len / 2
  return Math.min(len - span / 2, Math.max(span / 2, at.value * len))
})

/**
 * 外框以 "右緣版面" 的右側中點為旋轉與縮放原點; 把這個點放在容器的邊上,
 * 旋轉 (換邊) 與縮放後它都留在原位, 史萊姆一直貼著邊.
 */
const boxStyle = computed(() => {
  const { w, h } = size.value
  const u = along.value
  const anchors: Record<Edge, [number, number]> = {
    right: [w, u],
    bottom: [u, h],
    left: [0, u],
    top: [u, 0],
  }
  const [ax, ay] = anchors[edge.value]
  return {
    width: `${W}px`,
    height: `${height.value}px`,
    left: `${ax - W}px`,
    top: `${ay - height.value / 2}px`,
    transform: `rotate(${ANGLE[edge.value]}deg) scale(${props.scale})`,
  }
})

// ---- callout ----
const callout = ref<HTMLElement>()
const calloutStyle = computed(() => {
  const { w, h } = size.value
  const cw = callout.value?.offsetWidth ?? 284
  const ch = callout.value?.offsetHeight ?? 180
  const u = along.value
  const clamp = (value: number, max: number) => Math.max(8, Math.min(max - 8, value))
  const style: Record<string, string> = { background: palette.value.fill, color: palette.value.ink }
  const inset = `${DEPTH * props.scale + 12}px`
  if (edge.value === 'right' || edge.value === 'left') {
    style[edge.value] = inset
    style.top = `${clamp(u - ch / 2, h - ch)}px`
    style.transformOrigin = `${edge.value} center`
  } else {
    style[edge.value] = inset
    style.left = `${clamp(u - cw / 2, w - cw)}px`
    style.transformOrigin = `center ${edge.value}`
  }
  return style
})

// 游標停留 300ms 後顯示 callout, 離開後保留 250ms (與 app 相同).
const hovered = ref(false)
const calloutOpen = ref(false)
const dragging = ref(false)
let showTimer: ReturnType<typeof setTimeout> | undefined
let hideTimer: ReturnType<typeof setTimeout> | undefined

function enter() {
  clearTimeout(hideTimer)
  if (dragging.value) return
  hovered.value = true
  if (!calloutOpen.value) showTimer = setTimeout(() => (calloutOpen.value = true), 300)
}

function leave() {
  clearTimeout(showTimer)
  hideTimer = setTimeout(() => {
    hovered.value = false
    calloutOpen.value = false
  }, 250)
}

function activate() {
  if (props.onActivate) {
    props.onActivate()
    return
  }
  clearTimeout(showTimer)
  calloutOpen.value = !calloutOpen.value
  hovered.value = calloutOpen.value
}

// ---- 拖曳: 移動超過 5px 才算拖曳, 否則視為點擊 ----
let start: { x: number; y: number } | null = null

function onPointerDown(event: PointerEvent) {
  if (event.button !== 0) return
  start = { x: event.clientX, y: event.clientY }
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}

function onPointerMove(event: PointerEvent) {
  if (!start || !screen.value) return
  if (!dragging.value && Math.hypot(event.clientX - start.x, event.clientY - start.y) < 5) return
  if (!dragging.value) {
    dragging.value = true
    hovered.value = false
    calloutOpen.value = false
    clearTimeout(showTimer)
  }
  const box = screen.value.getBoundingClientRect()
  const x = event.clientX - box.left
  const y = event.clientY - box.top
  const distances: [Edge, number][] = [
    ['left', x],
    ['right', box.width - x],
    ['top', y],
    ['bottom', box.height - y],
  ]
  distances.sort((a, b) => a[1] - b[1])
  const nearest = distances[0]![0]
  edge.value = nearest
  at.value = nearest === 'left' || nearest === 'right' ? y / box.height : x / box.width
}

function onPointerUp() {
  if (start && !dragging.value) activate()
  start = null
  dragging.value = false
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    activate()
  }
}

let observer: ResizeObserver | undefined

onMounted(() => {
  const el = screen.value
  if (!el) return
  const measure = () => (size.value = { w: el.clientWidth, h: el.clientHeight })
  measure()
  if (typeof ResizeObserver === 'function') {
    observer = new ResizeObserver(measure)
    observer.observe(el)
  }
})

onBeforeUnmount(() => {
  clearTimeout(showTimer)
  clearTimeout(hideTimer)
  observer?.disconnect()
})

const summary = computed(() =>
  tide.agents.map((r) => `${r.name} 5h 剩餘 ${r.fiveHour.remaining}%, 7d 剩餘 ${r.sevenDay.remaining}%`).join('; '),
)
</script>

<template>
  <div ref="screen" class="pointer-events-none absolute inset-0 z-20">
    <div
      class="slime-box pointer-events-auto absolute touch-none outline-none select-none"
      :class="dragging ? 'cursor-grabbing' : 'cursor-grab'"
      :style="boxStyle"
      tabindex="0"
      role="button"
      :aria-label="`史萊姆示範, 可拖曳到任一邊: ${summary}`"
      @pointerenter="enter"
      @pointerleave="leave"
      @focus="enter"
      @blur="leave"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @keydown="onKey"
    >
      <svg :width="W" :height="height" :viewBox="`0 0 ${W} ${height}`" class="overflow-visible" aria-hidden="true">
        <defs>
          <filter :id="`goo-${uid}`" x="-40%" y="-20%" width="180%" height="140%" color-interpolation-filters="sRGB">
            <feGaussianBlur stdDeviation="10" />
            <feColorMatrix mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11" />
          </filter>
          <clipPath v-for="bead in beads" :id="`dial-${uid}-${bead.reading.agent}`" :key="bead.reading.agent">
            <circle :cx="CX" :cy="bead.cy - 0.12 * R" :r="0.34 * R" />
          </clipPath>
        </defs>

        <!-- 形狀層: 珠子, 隆起, 貼邊的條帶與齒輪, 以 goo filter 融合 -->
        <g :filter="`url(#goo-${uid})`" :fill="palette.fill">
          <rect :x="W - 10" :y="TOP - 2.4 * R" width="14" :height="(beads.length - 1) * SPACING + 4.8 * R" />
          <g
            v-for="(bead, i) in beads"
            :key="bead.reading.agent"
            class="bead"
            :class="{ grown: hovered }"
            :style="{ transformOrigin: `${CX}px ${bead.cy}px` }"
          >
            <circle :cx="CX" :cy="bead.cy" :r="R * 0.92" />
            <circle
              v-for="(lobe, j) in LOBES"
              :key="j"
              class="lobe"
              :style="{ animationDelay: `${-(i * 1.7 + j * 0.9)}s` }"
              :cx="CX + Math.cos((lobe.a * Math.PI) / 180) * lobe.d * R"
              :cy="bead.cy + Math.sin((lobe.a * Math.PI) / 180) * lobe.d * R"
              :r="0.55 * R * lobe.s"
            />
          </g>
          <g class="gear-blob" :class="{ shown: hovered }" :style="{ transformOrigin: `${CX}px ${gearCy - 60}px` }">
            <rect :x="CX - 7" :y="gearCy - 64" width="14" height="44" rx="7" />
            <circle :cx="CX" :cy="gearCy" :r="GEAR_R + 6" />
          </g>
        </g>

        <!-- 內容層: 不套 filter, 反向旋轉保持直立 -->
        <g v-for="bead in beads" :key="`dial-${bead.reading.agent}`" :transform="`rotate(${-ANGLE[edge]} ${CX} ${bead.cy})`">
          <g class="bead" :class="{ grown: hovered }" :style="{ transformOrigin: `${CX}px ${bead.cy}px` }">
            <template v-for="geo in [arcs(bead.reading, bead.cy)]" :key="geo.iconCy">
              <circle :cx="CX" :cy="geo.iconCy" :r="0.34 * R" :fill="palette.track" />
              <image
                :href="ICONS[bead.reading.agent]"
                :x="CX - 0.255 * R"
                :y="geo.iconCy - 0.255 * R"
                :width="0.51 * R"
                :height="0.51 * R"
                :clip-path="`url(#dial-${uid}-${bead.reading.agent})`"
              />
              <path :d="geo.leftTrack" fill="none" :stroke="palette.track" :stroke-width="0.11 * R" stroke-linecap="round" />
              <path :d="geo.rightTrack" fill="none" :stroke="palette.track" :stroke-width="0.11 * R" stroke-linecap="round" />
              <path :d="geo.leftFill" fill="none" :style="{ stroke: palette.tone[bead.reading.fiveHour.tone] }" :stroke-width="0.11 * R" stroke-linecap="round" />
              <path :d="geo.rightFill" fill="none" :style="{ stroke: palette.tone[bead.reading.sevenDay.tone] }" :stroke-width="0.11 * R" stroke-linecap="round" />
              <text
                :x="CX"
                :y="bead.cy + 0.62 * R"
                text-anchor="middle"
                dominant-baseline="middle"
                :fill="palette.ink"
                font-weight="600"
                :font-size="(0.3 * R) / scale"
                class="font-win tabular-nums"
              >{{ bead.reading.fiveHour.remaining }}%</text>
            </template>
          </g>
        </g>

        <!-- 齒輪 -->
        <g class="gear" :class="{ shown: hovered }" :style="{ transformOrigin: `${CX}px ${gearCy}px` }" fill="none" :stroke="palette.ink">
          <circle :cx="CX" :cy="gearCy" :r="0.5 * GEAR_R" :stroke-width="0.3 * GEAR_R" :stroke-dasharray="`${(Math.PI * GEAR_R) / 16} ${(Math.PI * GEAR_R) / 16}`" />
          <circle :cx="CX" :cy="gearCy" :r="0.32 * GEAR_R" :stroke-width="0.16 * GEAR_R" />
        </g>
      </svg>
    </div>

    <!-- Callout: 在容器座標中, 位於史萊姆朝內的一側 -->
    <div
      ref="callout"
      class="callout absolute w-[min(284px,calc(100%-2rem))] rounded-[26px] px-3.5 py-3 font-win text-[11.5px] leading-none"
      :class="{ shown: calloutOpen }"
      :style="calloutStyle"
      :aria-hidden="!calloutOpen"
    >
      <div v-for="bead in beads" :key="`row-${bead.reading.agent}`" class="flex flex-col gap-[5px] py-1.5">
        <div class="flex h-[18px] items-center gap-1.5">
          <img :src="ICONS[bead.reading.agent]" width="14" height="14" alt="" />
          <span class="text-[12.5px] font-semibold">{{ bead.reading.name }}</span>
        </div>
        <template v-for="w in [{ key: '5h', r: bead.reading.fiveHour }, { key: '7d', r: bead.reading.sevenDay }]" :key="w.key">
          <div class="flex h-3 items-center gap-2">
            <span class="w-[18px]" :style="{ color: palette.muted }">{{ w.key }}</span>
            <span class="h-1.5 flex-1 overflow-hidden rounded-full" :style="{ background: palette.track }">
              <span class="block h-full rounded-full transition-[width] duration-300" :style="{ width: `${w.r.remaining}%`, background: palette.tone[w.r.tone] }" />
            </span>
          </div>
          <div class="flex h-3.5 items-center gap-1.5 pl-[26px] tabular-nums" :style="{ color: palette.muted }">
            <span>已用 {{ String(w.r.used).padStart(3, ' ') }}%</span>
            <span>剩餘 {{ String(w.r.remaining).padStart(3, ' ') }}%</span>
            <span v-if="w.key === '5h'" class="ml-auto">{{ formatDuration(bead.reading.resetIn) }}後重置</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slime-box {
  transform-origin: right center;
}

.bead {
  transition: transform 520ms var(--ease-jelly);
}
.bead.grown {
  transform: scale(1.1);
}

.lobe {
  transform-box: fill-box;
  transform-origin: center;
  animation: breathe 5.5s ease-in-out infinite alternate;
}

@keyframes breathe {
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1.08);
  }
}

.gear-blob,
.gear {
  transform: scale(0);
  opacity: 0;
  transition:
    transform 600ms var(--ease-jelly),
    opacity 200ms ease-out;
}
.gear-blob.shown,
.gear.shown {
  transform: scale(1);
  opacity: 1;
}
.gear.shown {
  transform: scale(1) rotate(180deg);
  transition-duration: 900ms, 200ms;
}

.callout {
  transform: scale(0.2, 0.35);
  opacity: 0;
  pointer-events: none;
  transition:
    transform 260ms var(--ease-out-expo),
    opacity 150ms ease-in;
}
.callout.shown {
  transform: scale(1);
  opacity: 1;
  pointer-events: auto;
  transition:
    transform 560ms var(--ease-jelly),
    opacity 200ms ease-out;
}
</style>
