import { describe, it, expect, vi, afterEach } from 'vitest'
import { getWordOfTheDay } from '../src/words'

afterEach(() => {
  // reset timers and URL after each test
  vi.useRealTimers()
  history.pushState({}, '', '/')
})

describe('getWordOfTheDay', () => {
  it('returns the first answer for 2021-12-31 (start day)', () => {
    vi.useFakeTimers()
    // December 31, 2021 (matches start = new Date(2022, 0, 0))
    vi.setSystemTime(new Date(2021, 11, 31))
    history.pushState({}, '', '/')
    expect(getWordOfTheDay()).toBe('cigar')
  })

  it('decodes base64 from the query parameter when present', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2021, 11, 31))
    // base64 for 'cigar' => 'Y2lnYXI='
    history.pushState({}, '', '/?Y2lnYXI=')
    expect(getWordOfTheDay()).toBe('cigar')
  })
})
