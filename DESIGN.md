---
name: Stygiomedusa
description: 不開視窗, 也看得到配額. Claude Code 與 Codex 配額的 Windows 11 工作列與螢幕邊緣讀數.
colors:
  harbor: "#0a1a33"
  harbor-deep: "#071327"
  chart: "#13355c"
  grid: "#2a4a70"
  ink: "#dceaf4"
  mist: "#9db6cc"
  heading-white: "#ffffff"
  note: "#e0559b"
  tone-normal: "#4cc2ff"
  tone-warning: "#fce100"
  tone-danger: "#ff5f5f"
  tone-stale: "#ffb900"
  tone-normal-on-light: "#0078d4"
  tone-warning-on-light: "#a37a00"
  tone-danger-on-light: "#c42b1c"
  tone-stale-on-light: "#b86e00"
  agent-claude: "#e0896a"
  agent-codex: "#3dd6b5"
  win-bg: "#202020"
  win-card: "#2b2b2b"
  win-line: "#3a3a3a"
  win-text: "#f5f5f5"
  win-accent: "#4cc2ff"
  slime-black: "#000000"
  slime-white: "#f3f3f3"
typography:
  display:
    fontFamily: "'Cactus Classical Serif', 'Noto Sans TC Variable', serif"
    fontSize: "clamp(2.2rem, 4.6vw, 4.1rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "0.01em"
  headline:
    fontFamily: "'Cactus Classical Serif', 'Noto Sans TC Variable', serif"
    fontSize: "clamp(2rem, 3.4vw, 3.1rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "0.01em"
  title:
    fontFamily: "'Cactus Classical Serif', 'Noto Sans TC Variable', serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.33
  title-sm:
    fontFamily: "'Cactus Classical Serif', 'Noto Sans TC Variable', serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.4
  lede:
    fontFamily: "'Noto Sans TC Variable', 'Segoe UI Variable Text', 'Microsoft JhengHei UI', sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.7
  body:
    fontFamily: "'Noto Sans TC Variable', 'Segoe UI Variable Text', 'Microsoft JhengHei UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
    fontFeature: "\"tnum\" 1"
  label:
    fontFamily: "'Noto Sans TC Variable', 'Segoe UI Variable Text', 'Microsoft JhengHei UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  readout:
    fontFamily: "'Azeret Mono Variable', ui-monospace, monospace"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.7
  win-ui:
    fontFamily: "'Segoe UI Variable Text', 'Segoe UI', 'Noto Sans TC Variable', sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  hair: "2px"
  chart: "3px"
  win-sm: "4px"
  win-button: "5px"
  screen: "6px"
  win-card: "8px"
  callout: "26px"
  pill: "9999px"
spacing:
  stage-gap: "12px"
  row: "16px"
  gutter-mobile: "24px"
  row-loose: "28px"
  gutter: "40px"
  head-to-content: "56px"
  section: "96px"
  section-lg: "128px"
components:
  button-download:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.harbor}"
    rounded: "{rounded.chart}"
    padding: "0 24px"
    height: "52px"
  button-download-lg:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.harbor}"
    rounded: "{rounded.chart}"
    padding: "0 32px"
    height: "64px"
  button-download-hover:
    backgroundColor: "{colors.heading-white}"
    textColor: "{colors.harbor}"
  segmented-toggle:
    textColor: "{colors.mist}"
    rounded: "{rounded.chart}"
    padding: "2px"
  segmented-toggle-active:
    backgroundColor: "{colors.chart}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hair}"
    padding: "4px 12px"
  code-inline:
    backgroundColor: "{colors.chart}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chart}"
    padding: "0.05em 0.35em"
  nav-link:
    textColor: "{colors.mist}"
    typography: "{typography.body}"
  nav-link-hover:
    textColor: "{colors.ink}"
  status-line:
    textColor: "{colors.mist}"
    typography: "{typography.label}"
  fact-row:
    textColor: "{colors.mist}"
    padding: "16px 0"
  demo-screen:
    backgroundColor: "{colors.harbor-deep}"
    rounded: "{rounded.screen}"
  demo-screen-on-deep:
    backgroundColor: "{colors.harbor}"
    rounded: "{rounded.screen}"
  win-taskbar:
    backgroundColor: "{colors.win-bg}"
    textColor: "{colors.win-text}"
    height: "60px"
  win-popup:
    backgroundColor: "{colors.win-bg}"
    textColor: "{colors.win-text}"
    rounded: "{rounded.win-card}"
    padding: "12px"
    width: "720px"
  win-quota-card:
    backgroundColor: "{colors.win-card}"
    textColor: "{colors.win-text}"
    rounded: "{rounded.win-card}"
    padding: "16px"
  win-tooltip:
    backgroundColor: "{colors.win-card}"
    textColor: "{colors.win-text}"
    typography: "{typography.win-ui}"
    rounded: "{rounded.screen}"
    padding: "6px 10px"
  slime-callout:
    backgroundColor: "{colors.slime-black}"
    textColor: "{colors.heading-white}"
    rounded: "{rounded.callout}"
    padding: "12px 14px"
---

# Design System: Stygiomedusa

## Overview

**Creative North Star: "配額潮位表" (The Quota Tide Table)**

外層是一張潮汐預報表. 深港灣藍鋪滿全頁, 海圖白是墨色, 灰藍是次要文字與格線. 結構靠 2px 白色標題底線, 1px 格線與嚴格的數字欄建立, 不靠卡片與陰影.

首屏把這張表放進一張 Windows 桌面. 標題區之下是一個填滿剩餘高度的示範螢幕: 底部是 Windows 工作列與配額 widget, 系統匣上方是預設打開的 popup, 上緣貼著史萊姆. 三者讀同一個示意時間, 時間自動快轉, 讀數一起漲退並換狀態色. 首屏之後, 每個段落示範一個位置 (工作列 widget, 史萊姆, popup), 再接 pace, 用量, 多個 Claude 資料夾, 隱私與安裝.

頁面上有兩個世界. 外層是港灣海圖 (harbor, chart, ink, mist, 明體與黑體). 內層是以程式重現的 Windows 11 深色介面 (win-*, Segoe UI, 較大的圓角, 陰影). 內層照 app 原樣重現, 不套用外層規則; 外層也不借用內層的圓角與陰影. 兩個世界的交界是 "示範螢幕": 一個 6px 圓角, 1px grid 外框, 底色與所在段落相反的方框.

**Key Characteristics:**
- 深港灣藍單色底, 以 harbor 與 harbor-deep 兩階交替分段.
- 明體標題, 黑體內文, 等寬讀數.
- 2px 白色底線結束每個標題區; 1px 格線分隔每一列.
- 首屏是一張可操作的示範桌面, 不是截圖.
- 所有示範共用一個自動快轉的示意時間; 游標移入任何示範時暫停.
- 狀態以文字寫出 (正常, 警告, 危險), 顏色只是第二層.
- 外層沒有陰影; 陰影只屬於重現的 Windows 介面.

## Colors

深夜海圖: 冷藍的單色結構, 加上只在讀數裡出現的高彩度狀態色.

### Primary
- **海圖白 Chart Ink** (ink): 內文墨色, 下載鈕底色, 標題區下方 2px 底線, 事實清單上方 2px 線, pace 尺的 2px 縱線. 頁面唯一的主色: 主要動作以亮色塊表達, 不用彩色.
- **標題白 Heading White** (heading-white): H1, H2, h3, 定義清單的 dt, 安裝步驟標題. 也是 hover 的提亮色 (下載鈕, 內文連結, 被點亮的引線說明).

### Secondary
- **海圖洋紅 Chart Magenta** (note): 只用在 popup 配額卡引線圖中被 hover 的那一條引線與端點, 以及 `::selection` 底色.

### Tertiary (讀數專用)
- **正常藍 Tone Normal**, **警告黃 Tone Warning**, **危險紅 Tone Danger** (tone-normal, tone-warning, tone-danger): 與 app 深色主題相同的狀態色. 出現在 widget 與配額卡的 bar, 配額卡的用量曲線, 史萊姆的弧與 callout bar, 以及首屏狀態列的狀態文字.
- **過期琥珀 Tone Stale** (tone-stale): 只用在 widget 圖示右下角 7.5px 的過期圓點.
- **淺底狀態色** (tone-*-on-light): 與 app 淺色主題相同. 只用在白色史萊姆 (slime-white) 上的弧與 bar.
- **Claude 赭橘 Agent Claude** (agent-claude) 與 **Codex 青綠 Agent Codex** (agent-codex): agent 識別色. 只用在配額卡標題與用量表的 Client 欄文字, 不用在 bar 或曲線.

### Neutral
- **深港灣藍 Harbor** (harbor): 全頁底色, `theme-color`, 下載鈕文字色, 也是 harbor-deep 段落中示範螢幕的底色.
- **深港灣 Harbor Deep** (harbor-deep): 交替段落 (史萊姆, pace, 隱私) 的底色, 以及 harbor 段落中示範螢幕的底色; 也是捲軸軌道色.
- **海圖藍 Chart** (chart): 分段切換的選取底色與行內 `code` 底色.
- **格線藍 Grid** (grid): 表格與清單的列分隔線, 段落上下邊線, 示範螢幕外框, 未點亮的引線, 捲軸滑塊.
- **灰藍 Mist** (mist): 次要文字, lede, 表頭, 圖說, 狀態列, 用量比例條 (70% 透明度).

### Windows 重現子色盤
- **win-bg, win-card, win-line, win-text**: 只用在重現的 Windows 11 介面: 工作列, popup, 配額卡, widget tooltip. 內部次要文字與軌道使用 `white` 加透明度 (white/90, white/85, white/80, white/20, white/15, white/10), 與 app 相同.
- **slime-black, slime-white**: 史萊姆的兩種色調, 也是 callout 底色. 黑色調上的文字是白色, 次要文字 white/80, 軌道 white/18; 白色調反之.

### Named Rules
**The Readout-Only Tone Rule.** 狀態色只出現在重現的讀數與讀數的狀態文字裡. 標題, 文案, 按鈕, 段落裝飾不使用狀態色.

**The Light Ground Tone Rule.** 狀態色畫在淺色底上時, 一律換成 -on-light 版本.

**The One Lit Leader Rule.** 海圖洋紅一次只點亮一條引線. 除了文字選取, 沒有 hover 時頁面上不出現洋紅.

**The Two Worlds Rule.** win-* 與 slime-* 色票只屬於重現的介面; harbor 系色票不進入重現的介面.

## Typography

**Display Font:** Cactus Classical Serif 400 (Fontsource 自架; 後備 Noto Sans TC Variable, serif)
**Body Font:** Noto Sans TC Variable (Fontsource 自架; 後備 Segoe UI Variable Text, Microsoft JhengHei UI)
**Mono Font:** Azeret Mono Variable (Fontsource 自架; 後備 ui-monospace)
**Reproduction Font:** Segoe UI Variable Text (系統字, 只用在重現的 Windows 介面與史萊姆)

**Character:** 明體標題像潮汐表的刊頭, 黑體內文清楚中性, 等寬字讓讀數像港口看板的數字欄.

### Hierarchy
- **Display** (400, clamp(2.2rem, 4.6vw, 4.1rem), 1.08): 只有首屏 H1, heading-white.
- **Headline** (400, clamp(2rem, 3.4vw, 3.1rem), 1.15): 段落 H2, 一律放在 Section Head 內.
- **Title** (400, 1.5rem): 段落內的小標 (h3, figcaption), 與 pace 尺上目前的等級.
- **Title Small** (400, 1.25rem): 隱私定義清單的 dt, 頁首品牌字 (加 0.02em 字距).
- **Lede** (400, 1.05rem, mist): 標題旁與 H1 下方的說明段, 最大寬度 62ch.
- **Body** (400, 1rem, 1.7): 內文. 全頁啟用 tabular-nums. 長段落限制在 52 到 68ch.
- **Label** (400, 0.875rem, mist): 表頭, 圖說, 狀態列, "讀數為示意" 註記, 下載鈕下方的註記. 不使用大寫轉換, 不加大字距.
- **Readout** (Azeret Mono 400, 0.92rem): 表格中的數量與金額, model 與 tool 名稱, 資料夾路徑 (0.9rem), pace 模式名稱, 安裝步驟編號, 狀態列中的 %, 工作列時鐘 (12.5px), 熱力圖時刻 (0.7rem), 行內 `code` (0.875em).
- **Windows UI** (Segoe UI 400, 13px, 1.45): 重現介面的文字. widget 百分比 13.5px, 配額卡標題 1.125rem 600, 史萊姆 callout 11.5px 到 12.5px.

### Named Rules
**The Machine Text Rule.** 外層的等寬字只用在讀數與機器文字 (數字, 時刻, model 與 tool 名稱, 路徑, 檔名). 中文說明一律用黑體. 重現介面裡的數字照 app 使用 Segoe UI.

**The Comma Break Rule.** 明體標題只在逗號後換行; 每段以 inline-block 包住, 逗號後用不換行空格.

## Layout

內容欄最大寬度 1180px, 置中. 左右內距手機 1.5rem, 48rem 以上 2.5rem.

首屏高度為 100svh 減去頁首 4rem, 是一個縱向的 flex 欄. 上方標題區在 lg (64rem) 以上為 "1fr : auto" 兩欄, 底部對齊: 左側 H1 與 lede, 右側下載鈕; 下方 2px ink 底線. 底線之下是一行狀態列, 再下面是示範桌面, 以 flex-1 填滿剩餘高度 (最小 20rem, md 以上 24rem). 桌面下方一行 mist 操作說明.

示範桌面內部: 工作列 60px 貼在底部; popup 貼在右下, 距工作列與右緣 12px. 桌面寬度 560px 以上時, popup 是 720px 兩欄, 以 transform scale 等比縮小到能放進 "高度扣掉工作列, 間距與史萊姆深度" 與 "寬度扣掉兩側間距" 的空間 (最小 0.3). 桌面寬度不到 560px 時, popup 改為單欄, 最寬 360px, 文字不縮小, 超出可用高度的部分裁掉, 底部以 28px 的短漸層淡出; 史萊姆縮到 0.72 讓出空間.

內容段落: SectionHead 在 lg 以上為 6fr : 5fr (標題 : 說明), 底部對齊. 標題區到內容 3.5rem. 內容常用 7fr : 5fr 或 5fr : 7fr (示範 : 事實清單). lg 以下全部改為單欄. 段落上下內距 6rem, lg 以上 8rem. 段落以 harbor 與 harbor-deep 交替, harbor-deep 段落上下加 1px grid 邊線.

Popup 段落的完整 popup 置中, 寬度不足 720px 時以 zoom 縮小, 不足 560px 時改單欄. 引線圖在 1100px 以上為 "1fr : 460px : 1fr" 三欄, 以下改單欄並且不畫引線. 寬表格在窄螢幕隱藏比例欄, 以 overflow-x 收在容器內.

### Named Rules
**The Opposite Step Rule.** 示範螢幕的底色與所在段落相反: harbor 段落用 harbor-deep, harbor-deep 段落用 harbor. 螢幕因此不需要陰影就能從段落中分出來.

## Elevation & Depth

外層完全平面. 深度只靠色階與線條: harbor-deep 比 harbor 深一階, chart 比 harbor 亮一階 (選取的切換鈕, 行內 code). 2px ink 線結束一個標題區或開始一份事實清單, 1px grid 線分隔列與框住示範螢幕.

重現的 Windows 介面照 app 原樣使用陰影.

### Shadow Vocabulary
- **Windows tooltip** (`box-shadow: 0 6px 18px rgb(0 0 0 / 0.45)`): 只用在重現的工作列 widget tooltip.
- **Windows popup** (`box-shadow: 0 16px 40px rgb(0 0 0 / 0.5)`): 只用在重現的 popup 外框.

### Named Rules
**The Flat Chart Rule.** 外層沒有任何陰影. 外層元件需要分出層次時, 改用色階或線條.

## Shapes

外層幾乎是直角: 按鈕, 切換鈕與截圖為 3px, 內層小元件為 2px (切換選項, 熱力圖格子, focus outline). 示範螢幕是外層唯一較圓的容器 (6px), 代表一塊 "螢幕".

重現的 Windows 介面照 app 原樣: popup 與配額卡 8px, tooltip 與更新鈕 6px, 工作列按鈕與 popup 分頁 5px, widget 項目與用量曲線底 4px, bar 與方案標籤為膠囊形, 史萊姆 callout 26px. 史萊姆本身是以 SVG goo filter 融合的有機形狀.

線條是外層主要的形狀語言. 引線為直角折線, 同側引線在不同的外側位置轉彎 (間隔 12px), 不交叉, 端點是 3.5 半徑的圓點. Pace 尺的刻度是 1px ink 短橫線, 目前等級的刻度由 10px 伸長到 20px.

## Components

### Buttons
樸素而確定: 一個亮色塊, 沒有漸層, 沒有陰影.
- **Shape:** 近直角 (3px).
- **Primary (下載最新版):** ink 底, harbor 字, 600 字重, 前方 20px 下載圖示 (2px stroke SVG). 一般尺寸高 52px, 字級 1.125rem; 大尺寸 (頁尾) 高 64px, 字級 1.25rem. 連到 GitHub releases/latest. 下方一行 label 註記: "Windows 11 x64 · MIT 授權 · 所有版本". 不顯示版本號.
- **Hover / Active:** 底色換成 heading-white (200ms); active 時下移 1px.
- **Focus:** 全域 2px ink outline, offset 3px, 2px 圓角.

### Segmented Toggle
- **Style:** 1px grid 外框, 3px 圓角, 2px 內距, 0.875rem 文字.
- **State:** 選取時 chart 底 ink 字; 未選取時 mist 字, hover 變 ink (150ms). 使用 aria-pressed.
- **色調變體 (史萊姆):** 每個選項各有 1px 外框與 3px 圓角, 前方 12px 色調圓點; 選取時外框與文字變 ink, 未選取時外框 grid.

### Fact List
示範旁的功能說明. 上方 2px ink 線, 每列 "5.5rem 標籤欄 : 說明" 兩欄, 下方 1px grid 線, 上下內距 16px. 標籤 heading-white, 說明 mist. 安裝需求清單使用相同形式 (4.5rem 標籤欄, 標籤 mist, 說明 ink).

### Section Head
H2 (Headline) 與 lede 說明並排, 底部對齊, 下方 2px ink 底線與 1.5rem 下內距. 每個主要段落都以它開頭.

### Navigation
頁首高 64px, 不固定. 左側 30px app 圖示 (7px 圓角) 加明體品牌字. 右側連結 0.95rem, mist 色, hover 變 ink, 無底線. 段落連結只在 lg 以上顯示; "更新紀錄" (連到 GitHub README) 在 sm 以上顯示; GitHub 連結一律顯示.

### Live Status Line (首屏)
標題區底線下方的一行 label 文字: "示意 · Claude 5h 剩餘 48% 正常 · Codex 5h 剩餘 76% 正常". % 為等寬 ink, 狀態以文字寫出並使用對應的 tone 色. 右側在 sm 以上說明播放狀態 ("時間自動快轉, 游標移入時暫停" 或減少動態時的說明).

### Desktop Stage (簽名元件)
首屏的示範桌面. 6px 圓角, 1px grid 外框, harbor-deep 底, 填滿首屏剩餘高度.
- **工作列:** 60px win-bg, 上緣 1px white/10. 左側配額 widget; 中間開始鈕與 app 圖示 (md 以上); 右側 Stygiomedusa 系統匣圖示, 網路與音量圖示 (sm 以上), 等寬時鐘與日期.
- **Popup:** 預設打開, 原點在右下角. 打開時 320ms ease-out-expo 放大並淡入, 關閉時 220ms 縮到 0.96 並下移 16px. 點系統匣圖示 (aria-pressed) 或點史萊姆開關.
- **史萊姆:** 起始貼在上緣 24% 處. 可以拖到任一邊.
- **時間:** 游標進入桌面時暫停自動快轉, 離開時繼續.

### Windows Reproductions
工作列 widget, tooltip, popup, 配額卡與史萊姆都是 app 的程式重現, 使用 win-* 子色盤與 Segoe UI, 尺寸與互動時間照 app. 每個示範旁有一行 "讀數為示意" 註記.
- **Widget:** 每個來源一組: 20px agent 圖示, 兩條 7px 膠囊 bar (上 5h, 下 7d, 寬 40px), 右側兩行百分比. 有 "剩餘" 與 "已用" 兩種模式. 直式變體縱向排列, 不顯示百分比. hover 或 focus 時顯示 Windows tooltip (多行預格式文字).
- **Popup:** win-bg, 8px 圓角, 12px 內距. 上方是 app 圖示與五個分頁, 目前分頁 win-card 底. 寬版 720px 兩欄配額卡, 窄版單欄堆疊.
- **配額卡:** win-card, 8px 圓角, 16px 內距, 1px win-line 外框. agent 識別色標題, 膠囊方案標籤, 更新鈕; 每個視窗一列 "已用 / 剩餘" (tabular-nums, 補齊到三位), 8px bar, 5h 的用量曲線 (48px 高, 3px 線寬, 跨過門檻的段落換色), pace 與以欄位對齊的重置倒數.

### Slime
重現 app 的史萊姆. 每個來源一顆珠子: 中間是 agent 圖示, 左弧 5h, 右弧 7d, 下方是 5h 剩餘 %. 形狀以 "右緣" 版面繪製, 換邊時整體旋轉 (下 90°, 左 180°, 上 270°), 內容反向旋轉保持直立. 可以依示範螢幕的大小縮放, 縮放原點在貼邊的中點, 縮放後仍貼著邊.
- **拖曳:** 移動超過 5px 才算拖曳; 吸附到最近的一邊並沿邊滑動. 沒拖曳時視為點擊.
- **Hover:** 停留 300ms 後 callout 以 560ms ease-jelly 彈出, 離開 250ms 後以 260ms ease-out-expo 收回. 珠子放大 1.1 倍 (520ms, ease-jelly), 齒輪長出並旋轉 180°.
- **呼吸:** 每顆珠子周圍 6 個隆起以 5.5s 交替縮放 (0.9 到 1.08).
- **Callout:** slime 色調底, 26px 圓角, 寬 284px, 位於史萊姆朝內的一側, 夾在螢幕內 8px.

### Leader Figure
放大 1.12 倍的配額卡置中 (460px), 說明分列兩側, 與錨點同高, 重疊時往下推, 以直角引線連到卡片的實際部位. 預設引線 1.25px grid; hover 一則說明時, 該引線變 2px note, 說明標題變 heading-white (200ms).

### Shared Simulated Time
所有示範讀同一個示意時間. 時間每秒前進 9 分鐘, 在 "視窗開始後 30 分" 到 "重置後 50 分" 之間循環, 會經過正常, 警告, 危險與重置. 游標停在任何示範上, 或分頁不在前景時, 時間暫停. 系統要求減少動態時不自動播放, 停在固定時間點.

### Named Rules
**The Status In Words Rule.** 會變化的狀態一律以文字寫出 (正常, 警告, 危險, 過期), 顏色只是第二層.

**The One Clock Rule.** 頁面上所有重現的讀數讀同一個時間. 新的示範不得自己產生數字.

## Do's and Don'ts

### Do:
- **Do** 用 2px ink 底線結束每個標題區, 用 1px grid 線分隔每一列.
- **Do** 把外層的數字放在固定欄位: 右對齊, tabular-nums, 等寬字.
- **Do** 把狀態寫成文字, 放在對應的數字旁, 再加上 tone 色.
- **Do** 在每個重現的讀數旁標示 "示意".
- **Do** 把示範放在 6px 圓角, 1px grid 外框, 底色與段落相反的示範螢幕裡.
- **Do** 讓游標進入示範時暫停共用時間, 離開時繼續.
- **Do** 主要動作使用 ink 底 harbor 字的近直角色塊, hover 提亮到白色.
- **Do** 讓明體標題只在逗號後換行.
- **Do** 遵守 prefers-reduced-motion: 不自動播放, 所有動畫與轉場縮到 0.01ms.

### Don't:
- **Don't** 在文案, 標題, 按鈕或裝飾上使用 tone 色或 agent 色.
- **Don't** 在淺色底上使用深色主題的 tone 色.
- **Don't** 在外層元件加陰影或超過 6px 的圓角; 陰影與較大圓角只屬於重現的 Windows 介面.
- **Don't** 把海圖洋紅用在被點亮的引線與文字選取以外的地方.
- **Don't** 把功能說明排成一排同尺寸的卡片; 用事實清單, 表格或引線圖.
- **Don't** 把 ease-jelly 用在史萊姆以外的元素.
- **Don't** 在窄螢幕縮小 popup 的文字; 改為單欄, 並裁掉超出的部分.
