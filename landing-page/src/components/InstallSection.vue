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
  <section class="page-x py-28 lg:py-36">
    <SectionHead id="install" title="安裝">
      <p>安裝後 app 常駐在系統匣. 開機自動啟動可以在設定頁開關.</p>
    </SectionHead>

    <div class="mt-16 grid grid-cols-[minmax(0,1fr)] gap-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <!-- 步驟有先後, 編號是必要的資訊 -->
      <ol class="flex flex-col gap-10">
        <li class="grid grid-cols-[3.5rem_1fr]">
          <span class="font-wide text-3xl leading-none font-extralight text-core/85">1</span>
          <div>
            <p class="text-lg text-core">下載安裝檔</p>
            <p class="mt-1 max-w-[60ch] text-haze">在 GitHub 的最新版頁面, 下載 <code>stygiomedusa_版本_x64-setup.exe</code>.</p>
            <div class="mt-6"><DownloadButton /></div>
          </div>
        </li>
        <li class="grid grid-cols-[3.5rem_1fr]">
          <span class="font-wide text-3xl leading-none font-extralight text-core/85">2</span>
          <div>
            <p class="text-lg text-core">略過 SmartScreen 警告</p>
            <p class="mt-1 max-w-[60ch] text-haze">
              安裝檔沒有 Authenticode 簽章, 第一次執行時 Windows 會顯示 "Windows 已保護您的電腦". 點 "其他資訊", 再點 "仍要執行".
            </p>
          </div>
        </li>
        <li class="grid grid-cols-[3.5rem_1fr]">
          <span class="font-wide text-3xl leading-none font-extralight text-core/85">3</span>
          <div>
            <p class="text-lg text-core">從系統匣開始</p>
            <p class="mt-1 max-w-[60ch] text-haze">
              左鍵點圖示開關 popup. 右鍵選單有 "立即更新", "設定" 與 "結束". token 過期時卡片顯示 "過期", 重新使用對應的 CLI 後就會恢復.
            </p>
          </div>
        </li>
      </ol>

      <dl class="flex flex-col gap-5 self-start">
        <div v-for="item in REQUIREMENTS" :key="item.label" class="grid grid-cols-[3.5rem_1fr] gap-4">
          <dt class="text-haze">{{ item.label }}</dt>
          <dd class="text-lumen">{{ item.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
