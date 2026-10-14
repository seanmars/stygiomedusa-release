import { describe, it, expect } from 'vitest'

import { changelogUrl, latestReleaseUrl, releasesUrl } from '../data/release'

describe('release 連結', () => {
  it('下載固定指向最新 release, 更新紀錄指向 repo 首頁', () => {
    expect(latestReleaseUrl).toBe('https://github.com/seanmars/stygiomedusa-release/releases/latest')
    expect(releasesUrl).toBe('https://github.com/seanmars/stygiomedusa-release/releases')
    expect(changelogUrl).toBe('https://github.com/seanmars/stygiomedusa-release#readme')
  })
})
