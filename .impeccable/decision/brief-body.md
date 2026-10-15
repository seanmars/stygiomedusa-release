## Scope

Stygiomedusa 介紹與下載頁 (`landing-page/`, Vite + Vue + TypeScript + Tailwind v4, GitHub Pages). Mode: Persuade.

## Audience and action

- 訪客: Windows 上使用 Claude Code 或 Codex 訂閱的開發者.
- 行動: 前往 GitHub 最新 release 頁面下載安裝檔.
- 首屏證明: 不開視窗就看到配額.
- 證據: 以程式重現的工作列 widget, 史萊姆, popup (讀數標示為示意). 使用者之後會提供截圖, 放在次要段落.
- 避免: 一般 SaaS 行銷頁, 裝飾蓋過資訊, 誇大語氣, 與 app 實際功能無關的示意圖.
- 不顯示版本號與更新紀錄; 更新紀錄連到 GitHub repo 的 README. 發布新版不需要重新 build 網站.

## Direction contract

THESIS: 這一頁就是一張 Windows 桌面: 配額在工作列, 螢幕邊緣與 popup 上被看見, 不必開任何視窗. 拒絕 "標題 + 截圖 + 一排同尺寸功能卡" 的開發工具排法, 也拒絕 app 沒有的示意圖.

OWN-WORLD: 深港灣藍鋪滿全頁, 海圖白是墨色, 灰藍是次要文字與格線, 海圖洋紅只用在被點亮的引線. 緊密的表格數字欄, 白色標題底線, 沒有卡片陰影. 明體標題, 黑體內文, 等寬讀數. 狀態色只出現在重現的讀數裡, 各狀態另有線型或標記. 重現的 Windows 介面使用它自己的中性色.

STORY: 訪客先在首屏的桌面上同時看到工作列 widget, 史萊姆與 popup 隨時間變化, 明白不用開視窗. 往下三段各示範一個位置: 工作列 widget, 史萊姆, popup. 接著是 pace, 用量分析, 多個 Claude 資料夾, 本機隱私, 安裝, 最後下載.

FIRST VIEWPORT: 上方標題列, 左側明體 H1 與一行說明, 右側 "下載最新版" (連到 GitHub 最新 release 頁面), 下方白色底線. 其下是一張填滿剩餘高度的桌面: 底部全寬 Windows 工作列, 左側是配額 widget, 系統匣有 app 圖示; popup 預設打開, 貼在系統匣上方; 史萊姆貼在桌面的上緣. 簽名互動: 示意時間自動快轉, 三處讀數同步漲退並換狀態色; 游標進入桌面時暫停. 史萊姆可以拖到任一邊, 點系統匣圖示或史萊姆開關 popup.

FORM: 潮汐預報表 (中央氣象署潮汐預報表與港口潮位看板) 的視覺系統, 首屏依使用者指示改為桌面示範. 排序第 5, seed key 5ee986a0 (re-roll 1). Raises: 數字放在嚴格欄位 (Ikeda), 狀態不只靠顏色 (accretion), 功能說明用引線釘在元件上 (tensegrity), hover 時只有該引線亮起 (Kraftwerk), 主要 % 數字在手機上不縮小 (TDR).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- 使用者截圖尚未提供; 次要段落保留位置.
- GitHub Pages 尚未在 repo 設定中啟用 (Source: GitHub Actions).
