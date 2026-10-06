# Stygiomedusa

## [0.7.0] - 2026-10-06

### 新增

- 設定頁的 "工作列 widget" 分組新增 "顯示工作列 widget" 開關, 預設開啟. 關閉時所有螢幕的 widget 移除, 其他 widget 設定保持顯示但無法修改, 值保留; 關閉期間螢幕插拔或 Explorer 重新啟動也不會讓 widget 重新出現.
- 設定頁新增 "Popup" 分組, 可以設定 popup 配額 bar 的顯示模式 (已用或剩餘), 不受 widget 開關影響.
- 實驗分頁的 "史萊姆" 分組新增要顯示的 agent, Claude profile (單一 profile 或 "全部 (並列)") 與顯示模式. 史萊姆的 callout 也依它自己的顯示模式.

### 變更

- Popup, 工作列 widget 與史萊姆的顯示模式各自獨立; 史萊姆要顯示的來源不再跟著 widget. 顏色門檻仍由三者共用.
- 升級時 popup 與史萊姆沿用原本 widget 的顯示模式, 史萊姆沿用 widget 的 agent 與 Claude profile, 升級後畫面與升級前相同.

## [0.6.1] - 2026-10-06

### 新增

- Popup 每張配額卡右上方新增更新鈕, 只更新該卡的來源. 同一來源 30 秒內 (或 429 退避期間) 按鈕停用.

### 變更

- 按下更新鈕時, 若 access token 已過期或被拒, 會以 refresh token 換新並寫回 CLI 的 `.credentials.json` / `auth.json` (只改 token 欄位, 其他欄位保留; CLI 在期間已自行更新時以 CLI 為準), 不必重新開啟 CLI 就能從 "過期" 恢復. 定時更新與開啟 popup 時的更新仍維持只讀, 不會 refresh token.

## [0.6.0] - 2026-10-03

### 新增

- 實驗功能 "史萊姆": 貼在螢幕邊緣的果凍質感浮動元件, 不必開啟 popup 就能看到勾選 agent 的 5h/7d 配額. 在新增的 "實驗" 分頁開啟, 預設關閉.
  - 每個來源一顆珠子 (來源與工作列 widget 相同), 中間是 agent 圖示, 左右兩條弧分別是 5h 與 7d, 下方顯示 5h 百分比 (沒有 5h 時改顯示 7d); 弧的長度依顯示模式, 顏色依門檻.
  - 游標停留時長出齒輪與 callout, callout 列出每顆珠子的 5h/7d bar, 百分比與重置時間. 左鍵點擊開關 popup, 點擊齒輪開啟設定分頁, 右鍵選單與工作列 widget 相同.
  - 按住 Ctrl 以左鍵拖曳, 可沿所在螢幕工作區的四邊滑動並停在角落, 位置在重新啟動後還原. 所在螢幕未連接時暫時顯示在主螢幕.
  - 可設定置頂 (所在螢幕有全螢幕 app 時退到它的下方), 所在螢幕, 色調 (顏色與不透明度, 預設黑色 100%), 文字大小 (80% 到 200%) 與文字描邊.
  - Windows 關閉 "動畫效果" 時不做彈跳, 蠕動與滴落等動態, 只以淡入淡出呈現.

### 變更

- 統一 UI 用詞與格式: 視窗標籤一律為 5h/7d, reset 一律稱為 "重置"; 時間長度寫成 "x 小時 y 分", "x 天 y 小時"; 日期月日補零並寫成 "週五"; 已用/剩餘與重置倒數分欄對齊.
- Popup, callout 與工作列 widget tooltip 的狀態文字統一為 "過期", "暫時失敗", "配額暫不可用".
- 設定頁用詞改為 "配額", "Claude 資料夾", "置頂", "全部 (並列)" 等, 與其他畫面一致.
- Popup 的更新提示只顯示新版本號與 "安裝" 按鈕, 不再顯示 release notes, popup 不會因 release notes 過長而變高.

### 修正

- Popup 配額卡的 bar 改為依顯示模式代表已用或剩餘, 與工作列 widget 一致; 先前一律以已用填滿.
- 百分比一律四捨五入; 先前工作列 widget 在 x.5 時可能與 popup 差 1.

### 效能

- 用量, 活動與 Claude profile 等 SQLite 查詢改在背景執行緒執行, 不再阻塞主執行緒.

### 內部調整

- 移除未使用的 opener, process 與前端 updater plugin, 以及對應的權限.
- 重構設定變更監聽, tray 與史萊姆的選單, popup 分頁與設定表單等共用邏輯.

## [0.5.0] - 2026-10-01

### 新增

- 設定頁的 "更新" 區塊新增 "自動檢查頻率", 可選 15 分鐘, 30 分鐘, 1 小時, 3 小時, 6 小時或 12 小時, 預設 6 小時.

### 變更

- 自動檢查更新由固定每 24 小時一次改為依設定的頻率執行. 調短頻率後一分鐘內生效, 手動檢查也會計入上次檢查時間. 啟動時檢查一次的行為不變.
- 讀到不合法的檢查頻率 (例如降版後) 時改用預設值, 不影響其他設定.

## [0.4.0] - 2026-09-29

### 新增

- 支援多個 Claude 設定目錄 (對應 `CLAUDE_CONFIG_DIR`, 例如不同帳號). 在設定頁的 "設定 Claude 資料夾" 以資料夾選擇器加入, 每個目錄是一個 profile, 以目錄名稱顯示, 名稱重複時加上 `-2`, `-3` 後綴. 首次啟動時自動加入當下的 `CLAUDE_CONFIG_DIR` (未設定時為 `~/.claude`).
- 每個 profile 各自讀取 `.credentials.json` 擷取 quota, 狀態, 請求間隔與重試退避都分開計算. Popup 每個 profile 一張 quota 卡; 工作列 widget 可以只顯示其中一個 profile, 或選 "全部 (並列)" 並列全部.
- 用量, 時間軸, 熱力圖與活動統計新增 Claude profile 篩選, 只篩選 Claude 的資料, Codex 不受影響. 分析視窗會帶入並還原這個篩選.

### 變更

- tokscale 改為逐一掃描各個 Claude 目錄, 用量與活動紀錄會記下所屬的 profile. 升級前的資料在下次重新掃描時補上 profile, 來源檔已被清除的資料歸為 "未分類".
- 移除的 Claude 目錄只停止讀取, 已保存的資料仍可篩選.
- 升級前的 quota 樣本移到預設 profile.

### 修正

- Popup 開啟自己的對話方塊 (例如資料夾選擇器) 時, 不再因失去焦點而關閉.
- 分析視窗的時間軸明確標示合併後的 "其他" 系列; model 數量超過調色盤時改為顯示錯誤訊息, 不再讓不同 model 共用顏色或讓圖表直接消失.
- Popup 與分析視窗初始化時, 每個事件監聽建立後立刻登記, 後續步驟失敗時已建立的監聽仍會正確取消.

### 效能

- 匯入本機用量時略過內容沒有變動的 message, 不再重複寫入 SQLite.

### 內部調整

- 重構用量, 工作列 widget, app core 與前端, 抽出共用的日期, 時間戳記, key, 憑證檢查, 視窗與查詢 helper, 並移除執行不到的分支.

## [0.3.1] - 2026-09-28

### 新增

- Popup 分頁列左側顯示 app 圖示.

## [0.3.0] - 2026-09-28

### 新增

- 設定頁新增 "視窗外觀", 可分別調整 "背景" 與 "卡片" 兩層的顏色與不透明度. 顏色以圓形色輪搭配亮度滑桿選取, 拖曳時即時預覽, 放開後才儲存; 未自訂顏色時跟隨主題, 兩層預設不透明度都是 80%.

### 變更

- Popup 與分析視窗改為真正透明的視窗, 不套用 DWM 材質效果, 也不受系統 "透明效果" 開關影響. 兩個視窗與深淺色主題共用同一組外觀設定.

## [0.2.0] - 2026-09-25

### 新增

- 分析視窗: 從 popup 用量或活動分頁的 "開啟分析" 開啟, 並帶入目前的篩選.
  - 用量頁新增時間軸, 依 model 分系列堆疊 (前 6 名各自一個系列, 其餘合併為 "其他"), 預設以 API 等價金額呈現, 可切換為 token.
  - 本週, 本月與全部區間另外顯示星期 x 小時的使用時段熱力圖.
  - 頁面與篩選在視窗關閉或 app 重新啟動後保留.
- 用量與活動新增 "全部" 區間.
- Quota bar 與用量曲線依警告/危險門檻上色 (與工作列 widget 相同); 滑鼠停留在曲線上時顯示該點的時間與已用百分比.
- 排行預設只顯示前 10 名, 可切換 "顯示全部"; 切換分頁時保留篩選.

### 變更

- Popup 改用跟隨系統深淺色的自訂高對比主題, Claude 與 Codex 各有識別色.
- Popup 寬度由 360 加寬為 720, 設定頁改為兩欄版面.
- Popup 高度依內容調整 (取各分頁中最高者), 開啟期間只增不減, 上限為所在螢幕的工作區; 並依目標螢幕的 DPI 縮放定位.
- 更新 app 圖示.

## [0.1.1] - 2026-09-25

首次公開發布.

### 新增

- 系統匣常駐: 左鍵開關 popup, 右鍵選單有 "立即更新", "設定" 與 "結束"; 同時只允許執行一個 app.
- Claude Code 與 Codex 訂閱的 5h 與 7d quota 監控.
  - 只讀取 `~/.claude/.credentials.json` 與 `~/.codex/auth.json` (或 `CODEX_HOME/auth.json`), 不會寫入或 refresh token; token 過期時顯示 "過期", 重新使用對應的 CLI 後就會恢復.
  - 同一個 agent 的 usage 請求至少間隔 30 秒.
  - 每次成功讀數都保存到 app data 目錄的 SQLite.
- Popup quota 卡: 顯示已用/剩餘百分比, 重置時間, pace 與 ETA, 以及目前週期的用量曲線.
- Pace 預測, 套用在 popup 與工作列 widget 的 tooltip:
  - Historical: 依自己的歷史用量曲線預測, 資料不足時暫用 Linear (預設).
  - Linear: 假設整個週期平均使用.
  - Off: 不顯示.
- 工作列 widget: 以原生 Win32 繪製, 在工作列上以 mini bar 顯示各 agent 的 5h/7d quota, 滑鼠停留時顯示百分比, 重置時間與 pace.
  - 可設定顯示的 agent, 顯示已用或剩餘, 位置 (左, 中, 右) 與手動偏移.
  - 可勾選多個螢幕, 每條工作列各顯示一個並依該螢幕的縮放排版; 勾選的螢幕都未連接時改顯示在主螢幕.
  - 支援直式工作列 (例如 ExplorerPatcher), 改用縱向排列且不顯示百分比文字.
- 用量分頁: 以 tokscale 解析 `~/.claude` 與 `~/.codex` 的本機 JSONL, 逐筆保存到 SQLite (來源檔被清除後仍保留), 可依區間, client, project, model 查看 token 與 API 等價估算金額. 以 file watcher 監看變動, 並每 30 分鐘重新掃描一次.
- 活動分頁: 從同一批 JSONL 統計 skill, slash command, subagent, tool 與 MCP 的呼叫次數, 可依區間, client, project 篩選.
  - Codex 模型自行讀取 `SKILL.md` 的使用標示為 "推測", 同一個 turn 中同名 skill 只算一次.
  - Claude Code 內建的指令 (例如 `/clear`, `/model`) 不列入.
  - 只保存名稱, 時間, session 與 project, 不保存 tool 的輸入, 輸出或指令參數; 所有資料都只存在本機.
- 設定頁: 工作列 widget 選項, 顏色門檻 (剩餘 %, 預設警告 25%, 危險 10%), pace 模式, 配額更新頻率 (popup 收合與展開時分別設定, 最小 60 秒) 與開機時自動啟動.
- App 內更新: 啟動時與每 24 小時檢查一次新版, 有新版時在 popup 上方顯示版本與 release notes, 按 "安裝" 才會下載, 驗證簽章後安裝並重新啟動. 設定頁可以手動檢查.
- 推送 `v*` tag 時由 GitHub Actions 建置 NSIS 安裝檔, 以 updater 金鑰簽章後連同 `latest.json` 發布到 [stygiomedusa-release](https://github.com/seanmars/stygiomedusa-release).

### 修正

- 修正啟動後第一次開啟 popup 時立刻關閉的問題.
- Tray 圖示收在溢位區時, 從右鍵選單開啟設定改以游標位置定位 popup.

[0.7.0]: https://github.com/seanmars/stygiomedusa-release/releases/tag/v0.7.0
[0.6.1]: https://github.com/seanmars/stygiomedusa-release/releases/tag/v0.6.1
[0.6.0]: https://github.com/seanmars/stygiomedusa-release/releases/tag/v0.6.0
[0.5.0]: https://github.com/seanmars/stygiomedusa-release/releases/tag/v0.5.0
[0.4.0]: https://github.com/seanmars/stygiomedusa-release/releases/tag/v0.4.0
[0.3.1]: https://github.com/seanmars/stygiomedusa-release/releases/tag/v0.3.1
[0.3.0]: https://github.com/seanmars/stygiomedusa-release/releases/tag/v0.3.0
[0.2.0]: https://github.com/seanmars/stygiomedusa-release/releases/tag/v0.2.0
[0.1.1]: https://github.com/seanmars/stygiomedusa-release/releases/tag/v0.1.1
