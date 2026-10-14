<script setup lang="ts">
// 重現 Windows Terminal (預設 Campbell 配色) 裡正在執行的 Claude Code. 內容是示意, 不是真實的 session.
// 每一行不換行, 寬度不足時以刪節號截斷, 窄螢幕也維持終端機的樣子.
type Tone = 'text' | 'dim' | 'ok' | 'command'

const LINES: { prefix?: { text: string; tone: Tone }; text: string; tone: Tone }[] = [
  { prefix: { text: 'PS C:\\work\\api> ', tone: 'text' }, text: 'claude', tone: 'command' },
  { text: '', tone: 'text' },
  { prefix: { text: '> ', tone: 'dim' }, text: '把設定頁的表單拆成元件', tone: 'text' },
  { text: '', tone: 'text' },
  { prefix: { text: '● ', tone: 'ok' }, text: 'Read(src/settings.ts)', tone: 'text' },
  { text: '  ⎿  讀取 182 行', tone: 'dim' },
  { prefix: { text: '● ', tone: 'ok' }, text: 'Edit(src/components/SettingsForm.vue)', tone: 'text' },
  { text: '  ⎿  新增 64 行, 刪除 21 行', tone: 'dim' },
  { prefix: { text: '● ', tone: 'text' }, text: '表單已拆成 SettingsForm 與 ProfileFields 兩個元件.', tone: 'text' },
  { text: '', tone: 'text' },
]

const TONE: Record<Tone, string> = {
  text: 'text-[#cccccc]',
  dim: 'text-[#8a8a8a]',
  ok: 'text-[#16c60c]',
  command: 'text-[#f9f1a5]',
}
</script>

<template>
  <div class="flex flex-col overflow-hidden rounded-[8px] border border-win-line bg-[#0c0c0c] font-win shadow-[0_16px_40px_rgb(0_0_0/0.5)] select-none" aria-hidden="true">
    <!-- 標題列: 分頁, 新增分頁與視窗按鈕 -->
    <div class="flex h-9 shrink-0 items-end bg-win-bg pl-2 text-[12px] text-white/90">
      <span class="flex h-[30px] items-center gap-2 rounded-t-[6px] bg-[#0c0c0c] pr-2 pl-3">
        <svg viewBox="0 0 16 16" class="size-3.5"><rect width="16" height="16" rx="2.5" fill="#2671be" /><path d="m4 5 3 3-3 3M8.5 11.5H12" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
        PowerShell
        <svg viewBox="0 0 16 16" class="ml-2 size-3 text-white/60" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="m4 4 8 8M12 4l-8 8" /></svg>
      </span>
      <span class="grid h-[30px] w-8 place-items-center text-white/70">
        <svg viewBox="0 0 16 16" class="size-3" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M8 3v10M3 8h10" /></svg>
      </span>
      <span class="ml-auto flex h-full text-white/80">
        <span class="grid h-full w-10 place-items-center">
          <svg viewBox="0 0 16 16" class="size-3" fill="none" stroke="currentColor" stroke-width="1.1"><path d="M3 8h10" /></svg>
        </span>
        <span class="grid h-full w-10 place-items-center">
          <svg viewBox="0 0 16 16" class="size-3" fill="none" stroke="currentColor" stroke-width="1.1"><rect x="3.5" y="3.5" width="9" height="9" rx="1.5" /></svg>
        </span>
        <span class="grid h-full w-10 place-items-center">
          <svg viewBox="0 0 16 16" class="size-3" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"><path d="m4 4 8 8M12 4l-8 8" /></svg>
        </span>
      </span>
    </div>

    <div class="terminal min-h-0 flex-1 overflow-hidden px-3 py-2.5 text-[12.5px] leading-[1.6]">
      <div v-for="(line, i) in LINES" :key="i" class="min-h-[1.6em] overflow-hidden text-ellipsis whitespace-pre" :class="TONE[line.tone]">
        <span v-if="line.prefix" :class="TONE[line.prefix.tone]">{{ line.prefix.text }}</span>{{ line.text }}
      </div>
      <div class="text-[#cccccc]"><span class="text-[#8a8a8a]">&gt; </span><span class="cursor" /></div>
    </div>
  </div>
</template>

<style scoped>
.terminal {
  font-family: 'Cascadia Mono', 'Cascadia Code', Consolas, var(--font-mono);
}

/* 閃爍的方塊游標 */
.cursor {
  display: inline-block;
  width: 0.6em;
  height: 1.15em;
  vertical-align: -0.2em;
  background: #cccccc;
  animation: blink 1.06s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
