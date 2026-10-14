<script setup lang="ts">
import { RELEASE_REPO, changelogUrl } from '@/data/release'

const LINKS = [
  { href: '#widget', label: '工作列' },
  { href: '#slime', label: '史萊姆' },
  { href: '#popup', label: 'Popup' },
  { href: '#privacy', label: '隱私' },
  { href: '#install', label: '安裝' },
]
const iconUrl = `${import.meta.env.BASE_URL}icon-256.png`
</script>

<template>
  <div class="page-x flex h-16 items-center gap-8">
    <a href="#top" class="flex items-center gap-3 text-ink no-underline">
      <img :src="iconUrl" width="30" height="30" alt="" class="rounded-[7px]" />
      <span class="font-display text-xl tracking-[0.02em]">Stygiomedusa</span>
    </a>
    <nav class="ml-auto flex items-center gap-6 text-[0.95rem]" aria-label="主要">
      <a v-for="link in LINKS" :key="link.href" :href="link.href" class="hidden text-mist no-underline transition-colors hover:text-ink lg:inline">{{ link.label }}</a>
      <a :href="changelogUrl" class="hidden text-mist no-underline transition-colors hover:text-ink sm:inline">更新紀錄</a>
      <a :href="RELEASE_REPO" class="text-mist no-underline transition-colors hover:text-ink">GitHub</a>
    </nav>
  </div>
</template>
