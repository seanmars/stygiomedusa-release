<script setup lang="ts">
import SectionHead from '@/components/SectionHead.vue'
</script>

<template>
  <section class="room-deep">
    <div class="page-x py-28 lg:py-36">
      <SectionHead id="privacy" title="資料只留在本機">
        <p>Stygiomedusa 沒有自己的伺服器. 下面列出它讀取, 連線與寫入的全部項目, 包括唯一會改寫憑證檔的情況.</p>
      </SectionHead>

      <dl class="mt-14 flex flex-col gap-9">
        <div class="grid gap-x-12 gap-y-2 md:grid-cols-[10rem_1fr]">
          <dt class="text-xl font-light tracking-[0.04em] text-core">讀取</dt>
          <dd class="max-w-[68ch] text-lumen">
            各 Claude 資料夾的 <code>.credentials.json</code>, <code>~/.codex/auth.json</code> (或 <code>CODEX_HOME/auth.json</code>), 以及各 Claude 資料夾與 <code>~/.codex</code> 底下的 JSONL.
          </dd>
        </div>
        <div class="grid gap-x-12 gap-y-2 md:grid-cols-[10rem_1fr]">
          <dt class="text-xl font-light tracking-[0.04em] text-core">連線</dt>
          <dd class="max-w-[68ch] text-lumen">向 Claude 與 Codex 的服務查詢配額, 同一個來源至少間隔 30 秒. 從 GitHub 檢查新版本.</dd>
        </div>
        <div class="grid gap-x-12 gap-y-2 md:grid-cols-[10rem_1fr]">
          <dt class="text-xl font-light tracking-[0.04em] text-core">寫入</dt>
          <dd class="max-w-[68ch] text-lumen">配額讀數, 用量與活動紀錄存在 app data 目錄的 SQLite.</dd>
        </div>
        <div class="grid gap-x-12 gap-y-2 md:grid-cols-[10rem_1fr]">
          <dt class="text-xl font-light tracking-[0.04em] text-core">不保存</dt>
          <dd class="max-w-[68ch] text-lumen">Tool 的輸入與輸出, 以及指令的參數. 活動紀錄只有名稱, 時間, session 與 project.</dd>
        </div>
        <div class="grid gap-x-12 gap-y-2 md:grid-cols-[10rem_1fr]">
          <dt class="text-xl font-light tracking-[0.04em] text-core">例外</dt>
          <dd class="max-w-[68ch] text-lumen">
            只有在你按下配額卡的更新鈕, 而且 access token 已過期或被拒時, 才會用 refresh token 換新, 並寫回憑證檔. 只改 token 欄位, 其他欄位保留. 定時更新與開啟 popup 時只讀不寫.
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
