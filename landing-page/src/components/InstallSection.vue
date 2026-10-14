<script setup lang="ts">
import DownloadButton from '@/components/DownloadButton.vue'
import SectionHead from '@/components/SectionHead.vue'

const REQUIREMENTS = [
  { label: '系統', value: 'Windows 11, x64' },
  { label: '帳號', value: 'Claude Code 或 Codex 訂閱, 並在這台電腦登入過 CLI' },
  { label: '更新', value: 'App 內建. 有新版時在 popup 上方提示, 按 "安裝" 才下載, 驗證簽章後安裝' },
  { label: '授權', value: 'MIT' },
]
</script>

<template>
  <section class="page-x py-24 lg:py-32">
    <SectionHead id="install" title="安裝">
      <p>安裝後 app 常駐在系統匣. 開機自動啟動可以在設定頁開關.</p>
    </SectionHead>

    <div class="mt-14 grid grid-cols-[minmax(0,1fr)] gap-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <ol class="flex flex-col">
        <li class="grid grid-cols-[2.5rem_1fr] border-t border-grid py-6">
          <span class="font-mono text-mist">1</span>
          <div>
            <p class="text-white">下載安裝檔</p>
            <p class="mt-1 max-w-[60ch] text-mist">在 GitHub 的最新版頁面, 下載 <code>stygiomedusa_版本_x64-setup.exe</code>.</p>
            <div class="mt-5"><DownloadButton /></div>
          </div>
        </li>
        <li class="grid grid-cols-[2.5rem_1fr] border-t border-grid py-6">
          <span class="font-mono text-mist">2</span>
          <div>
            <p class="text-white">略過 SmartScreen 警告</p>
            <p class="mt-1 max-w-[60ch] text-mist">
              安裝檔沒有 Authenticode 簽章, 第一次執行時 Windows 會顯示 "Windows 已保護您的電腦". 點 "其他資訊", 再點 "仍要執行".
            </p>
          </div>
        </li>
        <li class="grid grid-cols-[2.5rem_1fr] border-t border-grid py-6">
          <span class="font-mono text-mist">3</span>
          <div>
            <p class="text-white">從系統匣開始</p>
            <p class="mt-1 max-w-[60ch] text-mist">
              左鍵點圖示開關 popup. 右鍵選單有 "立即更新", "設定" 與 "結束". token 過期時卡片顯示 "過期", 重新使用對應的 CLI 後就會恢復.
            </p>
          </div>
        </li>
      </ol>

      <dl class="self-start border-t-2 border-ink">
        <div v-for="item in REQUIREMENTS" :key="item.label" class="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-grid py-4">
          <dt class="text-mist">{{ item.label }}</dt>
          <dd class="text-ink">{{ item.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
