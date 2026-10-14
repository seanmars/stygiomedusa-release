// 下載與更新紀錄都連到 GitHub, 網站不讀取版本資訊. 發布新版時不需要重新 build 網站.
export const RELEASE_REPO = 'https://github.com/seanmars/stygiomedusa-release'

/** GitHub 會把這個網址轉到最新的 release 頁面. */
export const latestReleaseUrl = `${RELEASE_REPO}/releases/latest`
export const releasesUrl = `${RELEASE_REPO}/releases`
/** 更新紀錄就是 repo 首頁的 README, 直接捲到 README 區塊. */
export const changelogUrl = `${RELEASE_REPO}#readme`
