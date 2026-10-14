<script setup lang="ts">
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
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-grid bg-harbor/90 backdrop-blur-md">
    <div class="page-x flex h-16 items-center gap-8">
      <a href="#top" class="flex items-center gap-3 text-ink no-underline">
        <img :src="iconUrl" width="30" height="30" alt="" class="rounded-[7px]" />
        <span class="font-display text-xl tracking-[0.02em]">Stygiomedusa</span>
      </a>
      <nav class="ml-auto flex items-center gap-5 text-[0.95rem]" aria-label="主要">
        <a v-for="link in LINKS" :key="link.href" :href="link.href" class="hidden text-mist no-underline transition-colors hover:text-ink lg:inline">{{ link.label }}</a>
        <span class="hidden h-4 w-px bg-grid lg:inline-block" aria-hidden="true"></span>
        <a :href="changelogUrl" class="hidden text-mist no-underline transition-colors hover:text-ink sm:inline">更新紀錄</a>
        <a :href="RELEASE_REPO" class="text-mist no-underline transition-colors hover:text-ink">GitHub</a>
      </nav>
    </div>
  </header>
</template>
