<script setup lang="ts">
import claudeUrl from '@/assets/agents/claude.svg'
import codexUrl from '@/assets/agents/codex.svg'
import type { AgentId } from '@/data/tide'

defineProps<{ agent: AgentId; size?: number }>()

const URLS: Record<AgentId, string> = { claude: claudeUrl, codex: codexUrl }
</script>

<template>
  <img :src="URLS[agent]" :width="size ?? 16" :height="size ?? 16" alt="" class="shrink-0" />
</template>
