# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + Vue 3 + TypeScript, 部署到 GitHub Pages (由本 repo 的 GitHub Actions build 後發布, 網址為 `https://stygiomedusa.seanmars.dev` (自訂網域)). 與 app repo (`stygiomedusa`) 的前端技術一致. 本 repo 目前尚未建立 scaffold.

## Users

公開給所有在 Windows 上使用 Claude Code 或 Codex 訂閱的開發者. 他們在寫程式時需要隨時知道 5h 與 7d 配額還剩多少, 何時重置, 以及照目前速度會不會提早用完. 本 repo 的對外內容 (README, 介紹/下載頁) 是他們決定是否安裝, 以及取得安裝檔與更新紀錄的地方.

## Product Purpose

Stygiomedusa 是 Windows 系統匣常駐小工具, 監控 Claude Code 與 Codex 訂閱的 5h/7d quota, 並分析本機用量與活動.

本 repo (`stygiomedusa-release`) 是 app 的公開發布點: GitHub Releases 放 NSIS 安裝檔與 updater 的 `latest.json`, README 放 changelog. 原始碼在另一個 repo (`stygiomedusa`), 發布由該 repo 推送 `v*` tag 時的 GitHub Actions 自動完成.

## Positioning

以下四點都是對外優先強調的核心差異, 由使用者確認:

1. **不開視窗就看到配額**: 工作列 widget (原生 Win32/Direct2D 繪製) 與貼在螢幕邊緣的 "史萊姆" 浮動元件, 隨時顯示 5h/7d 配額與重置時間.
2. **Claude + Codex 同時監控**: 兩個 agent 並列, 並支援多個 Claude 資料夾 (`CLAUDE_CONFIG_DIR`, 例如不同帳號), 每個資料夾是一個 profile.
3. **完全本機, 重視隱私**: 用量與活動資料只存在本機 SQLite; 活動統計只保存名稱, 時間, session 與 project, 不保存 tool 的輸入, 輸出或指令參數.
4. **用量分析與 pace 預測**: 用量/活動分頁, 分析視窗的時間軸與熱力圖, 以及依自己的歷史用量曲線預測何時用完 (Historical pace).

## Operating Context

- 使用情境: 開發者在 Windows 上同時開著 Claude Code 或 Codex CLI 工作, 配額資訊顯示在工作列, 系統匣 popup 或螢幕邊緣.
- 安裝: 從 GitHub Releases 下載 NSIS 安裝檔. 安裝檔沒有 Authenticode 簽章, 首次安裝會出現 SmartScreen 警告.
- 更新: app 內建 updater, 啟動時與依設定頻率 (15 分鐘到 12 小時, 預設 6 小時) 檢查新版, 使用者按 "安裝" 才下載, 驗證簽章後安裝並重新啟動.
- 發布節奏: 版本號遵循 Semantic Versioning, changelog 格式參考 Keep a Changelog.

## Capabilities and Constraints

- 系統匣 popup (720px 寬, 兩欄): 每個來源一張配額卡, 顯示已用/剩餘, 重置時間, pace, ETA 與目前週期用量曲線; 分頁有用量, 活動, 史萊姆, 設定.
- 工作列 widget: 支援多螢幕, 直式工作列, 可關閉.
- 史萊姆: 果凍質感浮動元件, 每個來源一顆珠子, hover 長出 callout 與齒輪; 可沿螢幕邊緣拖曳.
- 分析視窗: 依 model 堆疊的時間軸 (API 等價金額或 token), 星期 x 小時熱力圖.
- 讀取 Claude 資料夾的 `.credentials.json` 與 `~/.codex/auth.json`. 定時更新只讀; 只有使用者按下配額卡的更新鈕且 token 過期時, 才會 refresh token 並寫回 token 欄位.
- 本機 JSONL 由 tokscale (MIT, submodule) 解析.
- 只支援 Windows. 不支援 macOS 或 Linux.
- 授權: MIT.

### 用詞

對外內容沿用 app 的固定用詞: "配額", "5h" / "7d", "重置", "過期", "暫時失敗", "配額暫不可用", "Claude 資料夾", "全部 (並列)", "史萊姆", "工作列 widget", "popup". 時間長度寫成 "x 小時 y 分", "x 天 y 小時".

## Brand Commitments

- 名稱: Stygiomedusa (巨型幽靈水母的屬名). App 的 "史萊姆" 元件採果凍/液體質感.
- App 圖示: app repo 的 `res/icon.png`.
- 語言: 對外內容只用台灣正體中文, 技術詞彙保留英文.
- App 內狀態色有既定語意 (正常, 警告, 危險, 過期), Claude 與 Codex 各有識別色; 定義在 app repo 的 `src/style.css` 與 `tospec/decisions/20260925_124505-popup-high-contrast-theme.md`. 對外內容引用狀態時不可改變這組語意.

## Evidence on Hand

- App 圖示: `stygiomedusa/res/icon.png`.
- 完整版本紀錄: 本 repo `README.md` (0.1.1 到 0.8.0).
- GitHub Releases: 每個版本的 NSIS 安裝檔與 `latest.json`.
- 截圖與錄影: 使用者會提供 popup, widget, 史萊姆等實際畫面; 在提供之前保留位置, 不可用合成或虛構的畫面代替.
- 不存在: 使用者見證, 下載數, 媒體報導, benchmark. 不可虛構.

## Product Principles

1. **一眼就讀懂**: 配額資訊要在最短時間內被理解; 顏色只用來表達狀態.
2. **資料留在本機**: 任何對外說法都不可暗示資料會上傳; 對隱私的描述要精確, 包含手動更新鈕會寫回 token 這個例外.
3. **誠實描述限制**: 明確說明只支援 Windows, 安裝檔未簽章會出現 SmartScreen 警告.
4. **與 Windows 一致**: App 以 Windows 原生質感為基準, 並尊重系統的深淺色與 "動畫效果" 設定.

## Accessibility & Inclusion

- App 既有標準: 所有文字對比 ≥ 4.5:1, 主要數字 ≥ 7:1, 深淺色主題各自檢查.
- App 在 Windows 關閉 "動畫效果" 時不做彈跳, 蠕動與滴落, 只保留淡入淡出. 對外內容的動態同樣要尊重 `prefers-reduced-motion`.
