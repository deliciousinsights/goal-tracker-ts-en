// Today's date (reducer spec)
// ===========================

import { isoDate } from '../lib/helpers'
import reducer from './today'

// The reducer should…
describe('Today’s date reducer', () => {
  // …provide its default state
  // --------------------------
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState = isoDate(new Date())

    // We always verify that the default state is correctly provided.  The
    // simplest way to do this is to call it with an `undefined` initial state
    // and an unknown-type action, then verify the result (here, today's date).
    expect(reducer(initialState, { type: 'unknown' })).toBe(expectedState)
  })
})
