---
version: 1
slug: "landing-page-index-html"
primary_target: "landing-page/index.html"
related_targets: []
---

## Scope

Stygiomedusa 介紹與下載頁 (`landing-page/`, Vite + Vue + TypeScript + Tailwind v4, GitHub Pages). Mode: Persuade. 2026-10-14 重新設計: 使用者要求配色貼近 app 圖示, 更絢麗明亮, 並使用 shaders (shaders.com, WebGPU); 允許重排版面.

## Audience and action

- 訪客: Windows 11 上使用 Claude Code 或 Codex 訂閱的開發者.
- 行動: 前往 GitHub 最新 release 頁面下載安裝檔.
- 首屏證明: 不開視窗就看到配額.
- 證據: 以程式重現的工作列 widget, 史萊姆, popup (讀數標示為示意). 使用者之後會提供截圖, 放在次要段落.
- 避免: 一般 SaaS 行銷頁, 裝飾蓋過資訊, 誇大語氣, 與 app 實際功能無關的示意圖.
- 不顯示版本號與更新紀錄; 更新紀錄連到 GitHub repo 的 README. 發布新版不需要重新 build 網站.
- 使用者指定: 深底 + 螢光發亮 (app 圖示的鈷藍, 螢光白紫, 光環金); shaders 用在首屏, 頁尾與少數重點段落.

## Direction contract

THESIS: 這一頁是一片鈷藍深淵, 每個功能是一個自己發光的物件; 配額在工作列, 螢幕邊緣與 popup 上被看見, 不必開任何視窗. 拒絕 "深色底 + 霓虹漸層 + 一排玻璃功能卡" 的開發工具頁, 也拒絕用截圖代替示範.

OWN-WORLD: 黑藍虛空 (#03051a) 由下方鈷藍 (#1b1fa8) 照亮, 霧, 水母觸手光與海雪光塵以 WebGPU 漂移. 示範是內部發光的半透明物件: 1px 光邊, 由內往外的鈷藍光, 腳下光池. 光環金 (#ffc94d) 只標示被選取的東西: 主要動作, 目前段落, 選取的切換, 游標所在的物件. 細黑體標題 (Noto Sans TC 200 到 300), 寬字距 Lexend Exa 字標, Azeret Mono 讀數. 沒有分隔線與面板, 以留白與景深分組. 狀態色與 Windows 重現介面照 app 原樣.

STORY: 首屏看到發光的桌面浮在深淵裡, 三處讀數隨時間漲退, 明白不用開視窗. 往下每段是一個房間: 工作列 widget, 史萊姆, popup, pace 光塔, 用量, 多帳號, 隱私, 安裝; 最後在極光下下載.

FIRST VIEWPORT: 頁首: 圖示與寬字距字標, 段落連結 (目前段落下方金點), GitHub. 標題區: 左側細體 H1 "不開視窗, 也看得到配額." 與一行說明, 右側唯一的金色物件 "下載最新版". 其下是填滿剩餘高度的示範桌面, 一塊半透明發光螢幕: 深淵的霧, 觸手光與光塵透過螢幕玻璃可見; 底部工作列與 widget, popup 預設打開, 史萊姆貼上緣. 桌面下方一行讀數狀態列. 簽名互動: 游標進入任何示範物件時, 物件浮起並亮出金邊, 示意時間停住讓讀數可讀; 深淵的光持續漂移 (2026-10-14 使用者回報整片停住像卡住).

FORM: 第六代遊戲主機系統選單 (黑藍虛空, 內部發光物件, 漂浮光塵). 使用者在決策輪選定挑戰者 digital-design-canon-console-dashboard-atmosphere (兩軸勝出); 指派方向是清單第 7 名 "鈷藍玫瑰窗". seed key aeaa65ad. Code-led (沒有圖片生成).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- 使用者截圖尚未提供; 次要段落保留位置.
- GitHub Pages 尚未在 repo 設定中啟用 (Source: GitHub Actions).
- 不支援 WebGPU 的瀏覽器只看到 CSS 漸層的深淵, 沒有動態光.
