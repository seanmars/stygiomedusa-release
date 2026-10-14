<script setup lang="ts">
const FOLDERS = [
  { path: '~\\.claude', profile: '.claude', note: '首次啟動時自動加入' },
  { path: 'D:\\accounts\\work', profile: 'work', note: '' },
  { path: 'E:\\backup\\work', profile: 'work-2', note: '名稱重複時加上後綴' },
]

/** 路徑切成 "資料夾\" 片段, 窄螢幕只在反斜線後換行, 不切斷資料夾名稱. */
function segments(path: string) {
  return path.split('\\').map((part, i, all) => (i < all.length - 1 ? `${part}\\` : part))
}
</script>

<template>
  <section class="page-x pb-28 lg:pb-36">
    <div class="grid grid-cols-[minmax(0,1fr)] gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div>
        <h2 id="profiles" class="display-thin text-[clamp(1.8rem,2.8vw,2.6rem)] leading-[1.2]">多個 Claude 帳號</h2>
        <p class="mt-5 max-w-[52ch] text-haze">
          每個 Claude 資料夾 (對應 <code>CLAUDE_CONFIG_DIR</code>) 是一個 profile, 各有一張配額卡, 請求間隔與重試分開計算. widget 與史萊姆可以只顯示其中一個, 或選 "全部 (並列)". 移除資料夾只會停止讀取, 已保存的資料仍可篩選.
        </p>
      </div>
      <table class="w-full self-end border-collapse">
        <thead>
          <tr class="text-left text-sm text-haze">
            <th scope="col" class="pb-3 pr-6 font-normal">資料夾</th>
            <th scope="col" class="pb-3 pr-6 font-normal">Profile 名稱</th>
            <th scope="col" class="pb-3 font-normal"><span class="sr-only">說明</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="folder in FOLDERS" :key="folder.path" class="border-t border-seam">
            <td class="py-3 pr-6 font-mono text-[0.9rem] text-lumen">
              <template v-for="(segment, i) in segments(folder.path)" :key="i"><wbr v-if="i > 0" />{{ segment }}</template>
            </td>
            <td class="py-3 pr-6 font-mono text-[0.9rem] text-core">{{ folder.profile }}</td>
            <td class="py-3 text-sm text-haze">{{ folder.note }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
