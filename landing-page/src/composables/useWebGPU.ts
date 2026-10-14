import { onMounted, ref } from 'vue'

/**
 * 瀏覽器有 WebGPU 時才掛載 shader 場景. 沒有 WebGPU 時 shader 的 canvas 只會保持透明,
 * 不如不載入那段程式碼; 畫面由外層的 CSS 漸層代替.
 */
export function useWebGPU() {
  const supported = ref(false)
  onMounted(() => {
    supported.value = typeof navigator !== 'undefined' && 'gpu' in navigator
  })
  return supported
}
