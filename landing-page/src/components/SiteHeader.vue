<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { RELEASE_REPO, changelogUrl } from '@/data/release'

// 順序與 App.vue 裡 section 由上到下的順序相同
const LINKS = [
  { href: '#widget', label: '工作列' },
  { href: '#slime', label: '史萊姆' },
  { href: '#popup', label: 'Popup' },
  { href: '#pace', label: '速度' },
  { href: '#usage', label: '用量' },
  { href: '#profiles', label: '多帳號' },
  { href: '#privacy', label: '隱私' },
  { href: '#install', label: '安裝' },
]
const iconUrl = `${import.meta.env.BASE_URL}icon-256.png`

// 目前所在的段落: 段落跨過視窗中線時, 它的連結亮起金點.
const active = ref<string | null>(null)
let observer: IntersectionObserver | undefined

// 寬度不足 xl 時, 段落連結收進 "段落" 選單.
const menuOpen = ref(false)
const menu = ref<HTMLElement>()

function closeOnOutside(event: PointerEvent) {
  if (menuOpen.value && menu.value && !menu.value.contains(event.target as Node)) menuOpen.value = false
}

function closeOnEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') menuOpen.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', closeOnOutside)
  document.addEventListener('keydown', closeOnEscape)
  if (typeof IntersectionObserver !== 'function') return
  const sections = new Map<Element, string>()
  for (const link of LINKS) {
    const section = document.querySelector(link.href)?.closest('section')
    if (section) sections.set(section, link.href)
  }
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const href = sections.get(entry.target)
        if (entry.isIntersecting) active.value = href ?? null
        else if (active.value === href) active.value = null
      }
    },
    { rootMargin: '-50% 0px -50% 0px' },
  )
  for (const section of sections.keys()) observer.observe(section)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  document.removeEventListener('pointerdown', closeOnOutside)
  document.removeEventListener('keydown', closeOnEscape)
})
</script>

<template>
  <header class="sticky top-0 z-40 bg-void/75 backdrop-blur-md">
    <div class="page-x flex h-16 items-center gap-4 sm:gap-8">
      <a href="#top" class="flex shrink-0 items-center gap-3 no-underline">
        <img :src="iconUrl" width="30" height="30" alt="" class="rounded-[7px]" />
        <span class="font-wide text-[0.78rem] font-light tracking-[0.2em] text-core uppercase sm:text-[0.85rem] sm:tracking-[0.32em]">Stygiomedusa</span>
      </a>
      <nav class="ml-auto flex items-center gap-4 text-[0.92rem] tracking-[0.04em] whitespace-nowrap sm:gap-6" aria-label="主要">
        <a
          v-for="link in LINKS"
          :key="link.href"
          :href="link.href"
          class="relative hidden no-underline transition-colors duration-200 hover:text-core xl:inline"
          :class="active === link.href ? 'text-core' : 'text-haze'"
          :aria-current="active === link.href ? 'location' : undefined"
        >
          {{ link.label }}
          <span
            class="absolute -bottom-2 left-1/2 size-1 -translate-x-1/2 rounded-full bg-halo shadow-[0_0_8px_rgb(255_201_77/0.9)] transition-opacity duration-300"
            :class="active === link.href ? 'opacity-100' : 'opacity-0'"
            aria-hidden="true"
          />
        </a>

        <div ref="menu" class="relative xl:hidden">
          <button
            type="button"
            class="flex items-center gap-1.5 text-haze transition-colors hover:text-core"
            :class="{ 'text-core': menuOpen }"
            aria-controls="section-menu"
            :aria-expanded="menuOpen"
            @click="menuOpen = !menuOpen"
          >
            段落
            <svg viewBox="0 0 16 16" class="size-3.5 transition-transform duration-200" :class="{ 'rotate-180': menuOpen }" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="m4 6 4 4 4-4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <ul
            v-show="menuOpen"
            id="section-menu"
            class="absolute top-[calc(100%+0.9rem)] right-0 flex w-44 flex-col rounded-[12px] border border-edge bg-depth/95 p-1.5 shadow-[0_24px_60px_-20px_rgb(27_31_168/0.95)] backdrop-blur-md"
          >
            <li v-for="link in LINKS" :key="link.href">
              <a
                :href="link.href"
                class="flex items-center gap-3 rounded-[8px] px-3 py-2 no-underline transition-colors hover:bg-core/6 hover:text-core"
                :class="active === link.href ? 'text-core' : 'text-haze'"
                :aria-current="active === link.href ? 'location' : undefined"
                @click="menuOpen = false"
              >
                <span
                  class="size-1 rounded-full bg-halo shadow-[0_0_8px_rgb(255_201_77/0.9)] transition-opacity"
                  :class="active === link.href ? 'opacity-100' : 'opacity-0'"
                  aria-hidden="true"
                />
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <a :href="changelogUrl" class="hidden text-haze no-underline transition-colors hover:text-core sm:inline">更新紀錄</a>
        <a :href="RELEASE_REPO" class="text-haze no-underline transition-colors hover:text-core">GitHub</a>
      </nav>
    </div>
  </header>
</template>
