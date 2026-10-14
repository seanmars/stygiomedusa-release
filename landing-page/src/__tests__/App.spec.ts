import { describe, it, expect } from 'vitest'
import { createPinia } from 'pinia'
import { mount } from '@vue/test-utils'

import App from '../App.vue'
import { changelogUrl, latestReleaseUrl } from '../data/release'

describe('App', () => {
  it('顯示標題, 最新版下載連結與更新紀錄連結, 不顯示版本號', () => {
    const wrapper = mount(App, { global: { plugins: [createPinia()] } })
    expect(wrapper.find('h1').text().replace(/\s/g, '')).toBe('不開視窗,也看得到配額.')
    const downloads = wrapper.findAll('a').filter((a) => a.attributes('href') === latestReleaseUrl)
    expect(downloads.length).toBeGreaterThan(0)
    expect(downloads[0]!.text()).toContain('下載最新版')
    expect(wrapper.findAll('a').some((a) => a.attributes('href') === changelogUrl)).toBe(true)
    expect(wrapper.text()).not.toMatch(/v\d+\.\d+\.\d+/)
    wrapper.unmount()
  })

  it('popup 預設打開, 點系統匣圖示可以關閉', async () => {
    const wrapper = mount(App, { global: { plugins: [createPinia()] } })
    const tray = wrapper.find('button[aria-label^="Stygiomedusa 系統匣圖示"]')
    expect(tray.attributes('aria-pressed')).toBe('true')
    await tray.trigger('click')
    expect(tray.attributes('aria-pressed')).toBe('false')
    wrapper.unmount()
  })
})
