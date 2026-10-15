---
name: Stygiomedusa
description: 不開視窗, 也看得到配額. Claude Code 與 Codex 配額的 Windows 工作列與螢幕邊緣讀數.
colors:
  void: "#03051a"
  abyss: "#070a29"
  depth: "#10165a"
  cobalt: "#1b1fa8"
  cobalt-bright: "#4650ff"
  violet: "#a78bfa"
  core: "#eeeaff"
  lumen: "#c9cbef"
  haze: "#9ba1d6"
  edge: "rgb(233 228 255 / 0.14)"
  seam: "rgb(233 228 255 / 0.07)"
  halo: "#ffc94d"
  halo-soft: "#ffd978"
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
  heat-1: "#8b5cf6"
  heat-2: "#a78bfa"
  heat-3: "#c4b5fd"
  heat-4: "#ddd6fe"
  heat-5: "#f5f3ff"
  win-bg: "#202020"
  win-card: "#2b2b2b"
  win-line: "#3a3a3a"
  win-text: "#f5f5f5"
  win-accent: "#4cc2ff"
  slime-black: "#000000"
  slime-white: "#f3f3f3"
typography:
  display:
    fontFamily: "'Noto Sans TC Variable', 'Segoe UI Variable Text', 'Microsoft JhengHei UI', sans-serif"
    fontSize: "clamp(2.3rem, 4.9vw, 4.5rem)"
    fontWeight: 220
    lineHeight: 1.12
    letterSpacing: "0.04em"
  headline:
    fontFamily: "'Noto Sans TC Variable', 'Segoe UI Variable Text', 'Microsoft JhengHei UI', sans-serif"
    fontSize: "clamp(2.1rem, 3.6vw, 3.4rem)"
    fontWeight: 220
    lineHeight: 1.18
    letterSpacing: "0.04em"
  title:
    fontFamily: "'Noto Sans TC Variable', 'Segoe UI Variable Text', 'Microsoft JhengHei UI', sans-serif"
    fontSize: "1.6rem"
    fontWeight: 300
    letterSpacing: "0.04em"
  title-sm:
    fontFamily: "'Noto Sans TC Variable', 'Segoe UI Variable Text', 'Microsoft JhengHei UI', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 300
    letterSpacing: "0.04em"
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
  nav:
    fontFamily: "'Noto Sans TC Variable', 'Segoe UI Variable Text', 'Microsoft JhengHei UI', sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    letterSpacing: "0.04em"
  label:
    fontFamily: "'Noto Sans TC Variable', 'Segoe UI Variable Text', 'Microsoft JhengHei UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  wordmark:
    fontFamily: "'Lexend Exa Variable', 'Noto Sans TC Variable', sans-serif"
    fontSize: "0.85rem"
    fontWeight: 300
    letterSpacing: "0.32em"
  numeral:
    fontFamily: "'Lexend Exa Variable', 'Noto Sans TC Variable', sans-serif"
    fontSize: "1.875rem"
    fontWeight: 200
    lineHeight: 1
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
  sm: "4px"
  toggle: "6px"
  control: "8px"
  object: "12px"
  callout: "26px"
  pill: "9999px"
spacing:
  stage-gap: "12px"
  row: "24px"
  gutter-mobile: "24px"
  gutter: "40px"
  head-to-content: "64px"
  section: "112px"
  section-lg: "144px"
components:
  button-download:
    textColor: "#fff4d6"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "52px"
  button-download-lg:
    textColor: "#fff4d6"
    rounded: "{rounded.control}"
    padding: "0 32px"
    height: "64px"
  button-download-hover:
    backgroundColor: "{colors.halo}"
    textColor: "{colors.void}"
  object:
    rounded: "{rounded.object}"
  toggle-option:
    textColor: "{colors.haze}"
    rounded: "{rounded.toggle}"
    padding: "4px 12px"
  toggle-option-pressed:
    textColor: "{colors.halo-soft}"
    rounded: "{rounded.toggle}"
    padding: "4px 12px"
  link:
    textColor: "{colors.core}"
  link-hover:
    textColor: "#ffffff"
  nav-link:
    textColor: "{colors.haze}"
    typography: "{typography.nav}"
  nav-link-active:
    textColor: "{colors.core}"
    typography: "{typography.nav}"
  section-menu:
    backgroundColor: "{colors.depth}"
    rounded: "{rounded.object}"
    padding: "6px"
    width: "176px"
  back-to-top:
    backgroundColor: "{colors.depth}"
    textColor: "{colors.core}"
    rounded: "{rounded.pill}"
    size: "44px"
  code-inline:
    textColor: "{colors.core}"
    rounded: "{rounded.sm}"
    padding: "0.05em 0.4em"
  data-row:
    textColor: "{colors.lumen}"
    typography: "{typography.readout}"
    padding: "12px 0"
  win-taskbar:
    backgroundColor: "{colors.win-bg}"
    textColor: "{colors.win-text}"
    height: "60px"
  win-popup:
    backgroundColor: "{colors.win-bg}"
    textColor: "{colors.win-text}"
    rounded: "{rounded.control}"
    padding: "12px"
    width: "720px"
  win-quota-card:
    backgroundColor: "{colors.win-card}"
    textColor: "{colors.win-text}"
    rounded: "{rounded.control}"
    padding: "16px"
  win-tooltip:
    backgroundColor: "{colors.win-card}"
    textColor: "{colors.win-text}"
    typography: "{typography.win-ui}"
    rounded: "{rounded.toggle}"
    padding: "6px 10px"
  slime-callout:
    backgroundColor: "{colors.slime-black}"
    textColor: "#ffffff"
    rounded: "{rounded.callout}"
    padding: "12px 14px"
---

# Design System: Stygiomedusa

## Overview

**Creative North Star: "深淵系統選單" (The Abyss System Menu)**

外層是第六代遊戲主機的系統選單. 黑藍虛空鋪滿全頁, 光從下方的鈷藍升起. 霧, 水母觸手光與下沉的海雪在虛空裡漂移. 每個示範是一個自己發光的半透明物件: 1px 光邊, 由內往外的光, 腳下一片鈷藍光池. 結構靠留白與景深, 不靠分隔線, 面板或卡片格.

光環金是選取的顏色. 它只出現在被選取的東西上: 主要動作, 目前段落, 按下的切換, 游標所在的物件. 首屏是一張浮在深淵裡的示範桌面. 桌面是透明的螢幕, 深淵的光透過玻璃可見. 往下每段是一個房間, 房間以比虛空亮一階的深淵交替, 上下淡入, 沒有硬邊.

頁面上有兩個世界. 外層是深淵 (void, abyss, cobalt, core, 細黑體, 寬字距字標). 內層是以程式重現的 Windows 深色介面與史萊姆 (win-*, slime-*, Segoe UI). 內層照 app 原樣重現, 不套用外層規則; 外層也不借用內層的色票. 兩個世界的交界是 "物件": 內層的介面放在外層發光的物件裡.

**Key Characteristics:**
- 黑藍虛空單色底, 光從下方的鈷藍升起; 房間以 abyss 一階交替, 上下 10rem 淡入.
- 細黑體標題 (字重 220, 字距 0.04em), 寬字距 Lexend Exa 字標, Azeret Mono 讀數.
- 示範是內部發光的半透明物件, 不是平面方框, 也不是截圖.
- 光環金只標示被選取的東西.
- 所有示範共用一個自動快轉的示意時間; 游標進入任何物件時, 時間停住, 深淵的光繼續漂移.
- 狀態以文字寫出 (正常, 警告, 危險), 顏色只是第二層.
- 深淵的光只畫在四個地方: 首屏, 史萊姆螢幕, pace 光塔, 頁尾極光. 全部是 CSS 漸層與靜態 SVG 圖塊, 動畫只動 transform 與 opacity.

## Colors

深夜的鈷藍深淵: 冷藍紫的單色光, 一個暖金的選取色, 加上只在讀數裡出現的狀態色.

### Primary
- **光環金 Halo** (halo): 選取色. 下載鈕的光邊與 hover 底色, 目前段落下方的金點, pace 目前等級的刻度與光暈, 被點亮的引線, 物件 hover 與 focus 時的光邊與內部暖光, focus outline, 文字選取底色, 輸入游標, 內文連結底線 (45% 透明度, hover 時全亮).
- **淡光環金 Halo Soft** (halo-soft): 選取狀態的文字. 按下的切換選項, "預設" 註記, 被點亮的引線說明標題, 回到頂端鈕 hover 時的圖示.

### Secondary
- **鈷藍 Cobalt** (cobalt) 與 **亮鈷藍 Cobalt Bright** (cobalt-bright): 深淵的光源. 物件腳下的光池與內部下緣的光, 房間上方的光暈, 選單與截圖的投影光, pace 光塔的光柱.
- **紫光 Violet** (violet): 次要的冷光. 用量表的比例條 (80% 透明度加光暈), 房間右下角的微光, 觸手與極光的色階.

### Tertiary (讀數專用)
- **正常藍 Tone Normal**, **警告黃 Tone Warning**, **危險紅 Tone Danger** (tone-normal, tone-warning, tone-danger): 與 app 深色主題相同的狀態色. 出現在 widget 與配額卡的 bar, 配額卡的用量曲線, 史萊姆的弧與 callout bar, 以及首屏狀態列的狀態文字.
- **過期琥珀 Tone Stale** (tone-stale): 只用在 widget 圖示右下角的過期圓點.
- **淺底狀態色** (tone-*-on-light): 與 app 淺色主題相同. 只用在白色史萊姆 (slime-white) 上的弧與 bar.
- **Claude 赭橘 Agent Claude** (agent-claude) 與 **Codex 青綠 Agent Codex** (agent-codex): agent 識別色. 只用在配額卡標題與用量表的 Client 欄文字, 不用在 bar 或曲線.
- **熱力紫階** (heat-1 到 heat-5): 與 app 深色主題相同的熱力圖色階, 越常用越亮; 沒有用量的格子是 core 6% 透明度.

### Neutral
- **虛空 Void** (void): 全頁底色, `theme-color`, 捲軸軌道, 頁首底色 (75% 加 backdrop blur), 首屏上下壓暗漸層, 下載鈕 hover 時的文字色.
- **深淵 Abyss** (abyss): 交替房間 (史萊姆, pace, 隱私) 的底色.
- **深藍 Depth** (depth): 浮在頁面上的控制項底色: 段落選單 (95%), 回到頂端鈕 (80%).
- **核心白 Core** (core): 標題, 目前的導覽連結, 事實清單的 dt, 內文連結, 讀數中的重點數字, 行內 `code`.
- **流明 Lumen** (lumen): 全頁預設文字色. 表格的資料, 隱私清單的說明, 以及首屏桌面下方的狀態列 (它在桌面的光池裡, 需要較亮的文字).
- **薄霧 Haze** (haze): 次要文字, lede, 表頭, 圖說, 未選取的導覽與切換選項.
- **光邊 Edge** (edge): 物件, 選單, 截圖與回到頂端鈕的 1px 光邊, 行內 `code` 與切換群組的內框.
- **列縫 Seam** (seam): 只用在資料表的列分隔線, 比光邊更淡, 只為了掃讀.

### Windows 重現子色盤
- **win-bg, win-card, win-line, win-text, win-accent**: 只用在重現的 Windows 介面: 工作列, popup, 配額卡, widget tooltip. 內部次要文字與軌道使用 `white` 加透明度, 與 app 相同.
- **slime-black, slime-white**: 史萊姆的兩種色調, 也是 callout 底色.

### Named Rules
**The Selected Gold Rule.** 光環金只標示 "被選取". 下載鈕是預設被選取的動作, 所以一直亮著; 其他元素只在目前, 按下, hover 或 focus 時才變金. 標題, 文案與裝飾不使用金色.

**The Readout-Only Tone Rule.** 狀態色只出現在重現的讀數與讀數的狀態文字裡. 標題, 文案, 按鈕, 段落裝飾不使用狀態色.

**The Light Ground Tone Rule.** 狀態色畫在淺色底上時, 一律換成 -on-light 版本.

**The Two Worlds Rule.** win-* 與 slime-* 色票只屬於重現的介面; 深淵系色票不進入重現的介面.

## Typography

**Display Font:** Noto Sans TC Variable, 細字重 (Fontsource 自架; 後備 Segoe UI Variable Text, Microsoft JhengHei UI)
**Body Font:** Noto Sans TC Variable
**Wordmark Font:** Lexend Exa Variable (Fontsource 自架), 只用在字標與安裝步驟編號
**Mono Font:** Azeret Mono Variable (Fontsource 自架; 後備 ui-monospace)
**Reproduction Font:** Segoe UI Variable Text (系統字, 只用在重現的 Windows 介面與史萊姆)

**Character:** 細黑體標題像浮在虛空裡的系統選單標示, 寬字距字標像主機開機畫面的品牌字, 等寬字讓讀數像機器的數字欄.

### Hierarchy
- **Display** (220, clamp(2.3rem, 4.9vw, 4.5rem), 1.12): 首屏 H1 與頁尾結語 (clamp 上限 4.3rem), core 色.
- **Headline** (220, clamp(2.1rem, 3.6vw, 3.4rem), 1.18): 段落 H2, 放在 Section Head 內. 多帳號段落接在用量之後, 用較小的 clamp(1.8rem, 2.8vw, 2.6rem).
- **Title** (300, 1.6rem, 字距 0.04em): 段落內的小標 (h3, figcaption). Pace 目前等級使用相近的 1.5rem 300.
- **Title Small** (300, 1.25rem): 隱私定義清單的 dt.
- **Lede** (400, 1.05rem, haze): 標題旁與 H1 下方的說明段, 最大寬度 58 到 60ch.
- **Body** (400, 1rem, 1.7): 內文. 全頁啟用 tabular-nums. 長段落限制在 52 到 68ch.
- **Nav** (400, 0.92rem, 字距 0.04em): 頁首連結.
- **Label** (400, 0.875rem, haze): 表頭, 圖說, 狀態列, "讀數為示意" 註記, 下載鈕下方的註記. 不使用大寫轉換, 不加大字距.
- **Wordmark** (Lexend Exa 300, 0.85rem, 字距 0.32em, 大寫): 頁首品牌字. sm 以下 0.78rem, 字距 0.2em.
- **Numeral** (Lexend Exa 200, 1.875rem, 1): 安裝步驟編號, core 85%.
- **Readout** (Azeret Mono 400, 0.92rem): 表格中的數量與金額, model 與 tool 名稱, 資料夾路徑 (0.9rem), pace 模式名稱, 狀態列中的 %, 熱力圖時刻 (0.7rem), 行內 `code` (0.875em). 窄螢幕的用量表縮到 0.8rem.
- **Windows UI** (Segoe UI 400, 13px, 1.45): 重現介面的文字, 尺寸照 app.

### Named Rules
**The Thin Display Rule.** 標題一律是細字重 (220 到 300) 加 0.04em 字距. 不用粗體建立層級; 層級靠字級與亮度 (core 對 haze).

**The Machine Text Rule.** 外層的等寬字只用在讀數與機器文字 (數字, 時刻, model 與 tool 名稱, 路徑, 檔名). 中文說明一律用黑體. 重現介面裡的數字照 app 使用 Segoe UI.

**The Comma Break Rule.** 標題只在逗號後換行; 每段以 inline-block 包住, 逗號後用不換行空格.

## Layout

內容欄最大寬度 1240px, 置中. 左右內距手機 1.5rem, 48rem 以上 2.5rem. 頁首 sticky, 高 4rem; 錨點捲動留 5rem 上方空間.

首屏高度為 100svh 減去頁首, 是一個縱向的 flex 欄. 標題區在 lg (64rem) 以上為 "1fr : auto" 兩欄, 底部對齊: 左側 H1 與 lede, 右側下載鈕. 標題區之下是示範桌面, 以 flex-1 填滿剩餘高度 (最小 20rem, md 以上 24rem). 桌面下方一行狀態列與操作說明, 在 md 以下換成 "Popup 只顯示上半部" 與連到 popup 段落的連結.

首屏的深淵在文字後方, 由兩層 CSS 漸層控制對比: 上方 42% (md 以下 60%) 由 void 淡到透明, 讓標題區在光的前面; 底部 7rem (md 以下 15rem) 由 void 淡入, 讓狀態列可讀, 也讓首屏與下一段之間沒有硬邊.

示範桌面內部: 工作列 60px 貼在底部; popup 貼在右下, 距工作列與右緣 12px. 桌面寬度 560px 以上時, popup 是 720px 兩欄, 以 transform scale 等比縮小到可用空間 (最小 0.3). 桌面寬度不到 560px 時, popup 改為單欄, 最寬 360px, 文字不縮小, 超出可用高度的部分裁掉並在底部淡出; 史萊姆縮到 0.72.

內容段落: 每段是一個房間, 上下內距 7rem, lg 以上 9rem. SectionHead 在 lg 以上為 6fr : 5fr (標題 : 說明), 底部對齊, 欄距 4rem. 標題區到內容 4rem. 內容常用 7fr : 5fr 或 5fr : 7fr (示範 : 說明). lg 以下全部改為單欄. 房間交替: 工作列, popup, 用量與多帳號, 安裝在 void 上; 史萊姆, pace, 隱私在 room-deep 上. 頁尾上方 10rem 到 14rem 的留白讓極光展開.

Popup 段落的引線圖在 1100px 以上為 "1fr : 460px : 1fr" 三欄, 以下改單欄並且不畫引線. 頁首的段落連結在 xl (80rem) 以上直接顯示, 以下收進 "段落" 選單. 寬表格在窄螢幕隱藏比例欄, 以 overflow-x 收在容器內.

### Named Rules
**The Space Not Lines Rule.** 分組靠留白與景深. 事實清單, 定義清單, 安裝步驟與標題區都不畫線. 唯一的線是資料表的 seam 列縫, 它只為了掃讀.

## Elevation & Depth

外層用光建立深度, 不用平面色塊. 三個深度: 虛空 (void), 房間 (abyss 加上方鈷藍光暈, 上下淡入), 物件 (半透明乳白體, 浮在房間前). 物件的陰影都是光: 內部上緣的高光, 內部下緣的鈷藍光, 腳下大而柔的鈷藍光池. 沒有黑色投影, 也沒有硬邊陰影.

物件內部只用漸層 (乳白放射光加下緣鈷藍光), 不畫光點. 透明螢幕 (object-glass) 的光由後方的深淵場景提供.

首屏, 史萊姆螢幕, pace 光塔與頁尾畫深淵的光 (`data/abyss.ts` 與 `Abyss*` 元件): 霧, 光幕, 七條觸手光絲 (只在 md 以上), 兩層下沉的海雪, 光柱與極光. 史萊姆螢幕只有鈷藍光與霧, 不畫海雪. 霧, 光幕的光束與海雪是靜態 SVG 圖塊 (feTurbulence 雜訊與隨機光點), 瀏覽器只點陣化一次; 動態是整層的 transform 與 opacity 動畫, 由合成器執行, 不佔主執行緒. 不用 WebGPU, 也不在大面積上用 blur 濾鏡或 mix-blend-mode.

重現的 Windows 介面照 app 原樣使用黑色陰影.

### Shadow Vocabulary
- **物件光池** (`box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.09), inset 0 -48px 90px -48px rgb(70 80 255 / 0.35), 0 34px 80px -34px rgb(27 31 168 / 0.95)`): 所有示範物件的靜止狀態.
- **物件選取** (`box-shadow: inset 0 1px 0 rgb(255 232 170 / 0.3), inset 0 0 70px -20px rgb(255 201 77 / 0.16), inset 0 -48px 90px -48px rgb(70 80 255 / 0.4), 0 40px 90px -34px rgb(27 31 168 / 1), 0 16px 48px -18px rgb(255 201 77 / 0.45)`): 物件 hover 或 focus-within, 加上 4px 上浮與金色光邊.
- **浮動控制項光** (`box-shadow: 0 24px 60px -20px rgb(27 31 168 / 0.95)`): 段落選單; 回到頂端鈕使用較小的 `0 10px 30px -8px rgb(27 31 168 / 0.9)`.
- **金點光** (`box-shadow: 0 0 8px rgb(255 201 77 / 0.9)`): 目前段落的金點與 pace 目前等級的刻度.
- **Windows tooltip** (`box-shadow: 0 6px 18px rgb(0 0 0 / 0.45)`): 只用在重現的工作列 widget tooltip.
- **Windows popup** (`box-shadow: 0 16px 40px rgb(0 0 0 / 0.5)`): 只用在重現的 popup 外框.

### Named Rules
**The Light Not Shadow Rule.** 外層的陰影一律是有顏色的光 (鈷藍光池或金色選取光). 黑色投影只屬於重現的 Windows 介面.

**The Lift On Select Rule.** 物件靜止時停在房間裡. 游標進入或鍵盤焦點落在裡面時, 物件上浮 4px (480ms ease-out-expo), 光邊變金, 內部亮起暖光.

## Shapes

外層的形狀柔和但不圓胖. 物件與段落選單 12px, pace 光塔 14px, 截圖 10px. 控制項 8px (下載鈕, 切換群組, 選單項目). 切換選項 6px. focus outline 與行內 `code` 4px. 熱力圖格子 2px. 圓形只用在金點, 狀態點, 比例條與回到頂端鈕. 頁首 app 圖示 7px.

重現的 Windows 介面照 app 原樣: popup 與配額卡 8px, tooltip 與更新鈕 6px, 工作列按鈕與 popup 分頁 5px, widget 項目與用量曲線底 4px, bar 與方案標籤為膠囊形, 史萊姆 callout 26px. 史萊姆本身是以 SVG goo filter 融合的有機形狀.

引線為直角折線, 同側引線在不同的外側位置轉彎 (間隔 12px), 不交叉, 端點是 3.5 半徑的圓點. Pace 等級的刻度是 1px 短橫線, 目前等級由 10px 伸長到 40px 並變金.

## Components

### Buttons
被點亮的金色物件: 暖光從內部透出, 下方有琥珀光.
- **Shape:** 8px 圓角.
- **Primary (下載最新版):** 深棕底 (rgb(30 22 20)) 上的金色放射漸層, 1px 金色內框, 奶油色文字 (#fff4d6), 500 字重, 字距 0.06em, 前方 20px 下載圖示 (1.75 stroke SVG). 一般尺寸高 52px, 字級 1.125rem; 大尺寸 (頁尾) 高 64px, 字級 1.25rem. 下方一行 label 註記: "Windows x64 · MIT 授權 · 所有版本". 不顯示版本號.
- **Hover / Active:** 底色換成實心金色漸層, 文字變 void, 外光加強 (200 到 300ms); active 時下移 1px.
- **Focus:** 全域 2px halo outline, offset 3px, 4px 圓角.
- **唯一性:** 頁面上只有下載鈕常駐金色. 首屏, 安裝步驟與頁尾各一個.

### Segmented Toggle
- **Style:** 群組 8px 圓角, 2px 內距, 1px edge 內框, 0.875rem 文字. 選項 6px 圓角.
- **State:** 按下時 halo 10% 底, 1px 金色內框, halo-soft 文字; 未按下時 haze 文字, hover 變 core (150ms). 使用 aria-pressed.
- **色調變體 (史萊姆):** 選項各自獨立, 未按下時有 1px edge 內框, 前方 12px 色調圓點.

### Demo Object (簽名元件)
內部發光的半透明物件. 1px edge 光邊, 12px 圓角, 乳白的放射光, 下緣鈷藍光, 腳下光池 (見 Elevation & Depth). 不畫光點.
- **透明螢幕變體 (object-glass):** 首屏桌面與史萊姆螢幕. 底色更透明, 後方的深淵透過玻璃可見. md 以下首屏桌面的光池縮小.
- **選取:** 游標進入或 focus-within 時上浮 4px, 光邊變金, 內部亮起暖光.
- **暫停:** 游標進入首屏桌面, widget 物件, 史萊姆螢幕, pace 光塔或引線圖時, 共用時間暫停 (hold), 離開時恢復. 深淵的光不跟著暫停: 深淵整片停住會被讀成畫面卡住.

### Section Head
H2 (Headline) 與 lede 說明並排, 底部對齊. 不畫底線, 以留白與下方內容分開. 每個主要段落都以它開頭.

### Fact List
示範旁的功能說明. 每列 "5.5rem 標籤欄 : 說明" 兩欄, 列距 24px, 不畫線. 標籤 core, 說明 haze. 安裝需求清單使用相同形式 (3.5rem 標籤欄, 標籤 haze, 說明 lumen).

### Data Table
用量表, 呼叫次數與多帳號資料夾. 表頭 label haze, 資料 readout lumen, 數字右對齊. 每列上方 1px seam 線. 用量比例條是 6px 高的 violet 膠囊加光暈.

### Navigation
頁首 sticky, 高 64px, void 75% 底加 backdrop blur. 左側 30px app 圖示 (7px 圓角) 加 Lexend Exa 寬字距字標. 右側連結 haze, hover 與目前段落變 core, 無底線.
- **目前段落:** 段落跨過視窗中線時, 它的連結變 core, 下方出現 4px 金點 (300ms 淡入), 並設定 `aria-current="location"`.
- **xl 以下:** 段落連結收進 "段落" 按鈕. 按鈕旁的箭頭打開時旋轉 180°. 選單是 176px 寬, depth 95% 底, 1px edge, 12px 圓角, 鈷藍光; 項目前方是同樣的金點. 點外面或按 Escape 關閉.
- "更新紀錄" 在 sm 以上顯示; GitHub 連結一律顯示.

### Back To Top
捲過一個視窗高度後出現 (200ms 上浮淡入). 44px 圓形, depth 80% 底, 1px edge, 鈷藍光. hover 時光邊變金 (60%), 圖示變 halo-soft.

### Live Status Line (首屏)
桌面下方的一行 label 文字, lumen 色: "示意 · Claude 5h 剩餘 48% 正常 · Codex 5h 剩餘 76% 正常". % 為等寬 core, 狀態以文字寫出並使用對應的 tone 色. 前方的狀態點在時間播放時以 2.4s 呼吸.

### Desktop Stage
首屏的示範桌面, 一個透明螢幕物件, 填滿首屏剩餘高度.
- **工作列:** 60px win-bg, 貼在底部. 左側配額 widget, 右側系統匣圖示與時鐘.
- **Popup:** 預設打開, 原點在右下角. 打開時 320ms ease-out-expo 放大並淡入, 關閉時 220ms 縮到 0.96 並下移 16px. 點系統匣圖示 (aria-pressed) 或點史萊姆開關.
- **史萊姆:** 起始貼在上緣 24% 處. 可以拖到任一邊.

### Slime Screen
史萊姆段落的示範螢幕, 一個 28rem 高的透明螢幕物件. 呈現實際的工作情境: 開發者在 terminal 跑 Claude Code, 配額貼在螢幕邊緣.
- **背景:** 鈷藍光與霧, 不畫海雪.
- **Terminal:** 重現 Windows Terminal, 使用預設 Campbell 配色 (底 #0c0c0c, 字 #cccccc, 成功點 #16c60c, 指令 #f9f1a5, 次要字 #8a8a8a) 與 Cascadia Mono. 內容是示意的 Claude Code session, 每行不換行, 寬度不足時以刪節號截斷. 結尾是 1.06s 閃爍的方塊游標. 整個視窗 aria-hidden, 段落說明以 "示意" 開頭.
- **工作列:** 不顯示配額 widget (`widget: false`), 呼應 "可以用史萊姆取代 widget". 也不顯示系統匣圖示 (`tray: false`), 因為這裡沒有 popup 可開. 中間的 terminal 圖示是執行中狀態, 對應畫面上的 terminal 視窗.
- **工作區:** 史萊姆只在工作列上方的區域拖曳與貼邊, 與 app 的 "沿工作區四邊滑動" 相同.

### Pace Light Tower
pace 段落的光塔: 一個 21rem 高的物件, 寬 4.5rem (sm 以上 5.5rem). 鈷藍光柱由塔底升到目前等級, 等級改變時 700ms ease-out 滑過去. 旁邊是七個等級的清單; 目前等級的文字變大變亮 (1.5rem 300, core), 刻度伸長並變金. 模式清單裡的 "預設" 註記用 halo-soft.

### Leader Figure
放大 1.12 倍的配額卡置中 (460px), 說明分列兩側, 與錨點同高, 重疊時往下推, 以直角引線連到卡片的實際部位. 預設引線 1.25px haze 35%; hover 一則說明時, 該引線變 2px halo, 說明標題變 halo-soft (200ms).

### Windows Reproductions
工作列 widget, tooltip, popup, 配額卡與史萊姆都是 app 的程式重現, 使用 win-* 與 slime-* 子色盤與 Segoe UI, 尺寸與互動時間照 app. 史萊姆螢幕裡的 Windows Terminal 也屬於重現的介面, 使用 Windows Terminal 自己的 Campbell 配色. 每個示範旁有一行 "讀數為示意" 註記. 史萊姆的 hover callout 與呼吸使用 ease-jelly.

### Shared Simulated Time
所有示範讀同一個示意時間. 時間每秒前進 9 分鐘, 循環經過正常, 警告, 危險與重置. 游標停在任何示範物件上, 或分頁不在前景時, 時間暫停. 系統要求減少動態時不自動播放, 停在固定時間點; 深淵的動畫停在一個靜止畫面.

### Named Rules
**The Status In Words Rule.** 會變化的狀態一律以文字寫出 (正常, 警告, 危險, 過期), 顏色只是第二層.

**The One Clock Rule.** 頁面上所有重現的讀數讀同一個時間. 新的示範不得自己產生數字.

**The Drifting Abyss Rule.** 游標停在示範上時只停住示意時間, 讓讀數穩定可讀. 深淵的光 (霧, 觸手, 海雪) 持續漂移, 不接 `tide.held`; 整片停住會被讀成畫面卡住. 只有減少動態時, 深淵才停在一個靜止畫面.

## Do's and Don'ts

### Do:
- **Do** 把示範放在內部發光的物件裡: 1px edge 光邊, 12px 圓角, 鈷藍光池.
- **Do** 讓物件在 hover 與 focus-within 時上浮 4px, 光邊變金, 並暫停共用時間.
- **Do** 把光環金留給被選取的東西: 主要動作, 目前段落, 按下的切換, 游標所在的物件, focus.
- **Do** 用留白與景深分組; 資料表才用 seam 列縫.
- **Do** 讓標題使用細字重 (220 到 300) 加 0.04em 字距, 只在逗號後換行.
- **Do** 把外層的數字放在固定欄位: 右對齊, tabular-nums, 等寬字.
- **Do** 把狀態寫成文字, 放在對應的數字旁, 再加上 tone 色.
- **Do** 在每個重現的讀數旁標示 "示意".
- **Do** 文字疊在深淵的光上時, 用 void 漸層壓暗文字後方, 或改用較亮的 lumen 文字.
- **Do** 讓持續播放的動畫只動 transform 與 opacity, 由合成器執行. 會重畫的動畫 (史萊姆隆起的呼吸) 在離開畫面時暫停; 隨示意時間變動的比例條用 translateX, 不用 width.
- **Do** 遵守 prefers-reduced-motion: 不自動播放, 深淵停在靜止畫面, 所有動畫與轉場縮到 0.01ms.

### Don't:
- **Don't** 把金色用在標題, 文案, 裝飾或未被選取的元素上.
- **Don't** 在文案, 標題, 按鈕或裝飾上使用 tone 色或 agent 色.
- **Don't** 在淺色底上使用深色主題的 tone 色.
- **Don't** 在外層使用黑色投影或硬邊陰影; 外層的陰影是鈷藍或金色的光.
- **Don't** 在標題區, 清單或段落之間畫分隔線或面板.
- **Don't** 把功能說明排成一排同尺寸的玻璃卡片; 用事實清單, 表格, 引線圖或單一物件.
- **Don't** 用截圖代替可操作的示範.
- **Don't** 在窄螢幕把觸手光畫在文字後方; 觸手只在 md 以上出現.
- **Don't** 把 ease-jelly 用在史萊姆以外的元素.
- **Don't** 在窄螢幕縮小 popup 的文字; 改為單欄, 並裁掉超出的部分.
