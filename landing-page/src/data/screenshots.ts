// app 的實際截圖. 把圖片放到 landing-page/public/screenshots/, 再在這裡加一筆;
// 清單是空的時, 頁面不顯示 "實際畫面" 區塊.
export interface Screenshot {
  /** public/ 底下的路徑, 例如 'screenshots/popup.png'. */
  file: string
  width: number
  height: number
  caption: string
}

export const screenshots: Screenshot[] = []
