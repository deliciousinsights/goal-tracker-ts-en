// History (reducer spec)
// ======================

import type { HistoryEntry } from './history'
import { isoDate } from '../lib/helpers'
import reducer, { clearHistory } from './history'

// The reducer should…
describe('History reducer', () => {
  // …provide its default state
  // --------------------------
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState: HistoryEntry[] = []

    // We always verify that the default state is correctly provided.  The
    // simplest way to do this is to call it with an `undefined` initial state
    // and an unknown-type action, then verify the result (here, an empty
    // history).
    expect(reducer(initialState, { type: 'unknown' })).toEqual(expectedState)
  })

  // …handle clearing
  // ----------------
  it('should handle clearing', () => {
    const initialState = [
      mockHistoryEntry({ date: '2022-10-04' }),
      mockHistoryEntry({ date: '2022-10-03' }),
      mockHistoryEntry({ date: '2022-10-02' }),
    ]
    const expectedState: HistoryEntry[] = []

    expect(reducer(initialState, clearHistory())).toEqual(expectedState)
  })
})

// Internal helpers
// ----------------

function mockHistoryEntry(data: Partial<HistoryEntry>): HistoryEntry {
  return {
    date: isoDate(new Date()),
    progresses: { '0': [1, 1] },
    ...data,
  }
}
