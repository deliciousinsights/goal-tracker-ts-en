// Today's progress (reducer spec)
// ===============================

import reducer, { progressOnGoal } from './todaysProgress'

// The reducer should…
describe('Today’s Progress reducer', () => {
  // …provide its default state
  // --------------------------
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState = {}

    expect(reducer(initialState, { type: 'unknown' })).toEqual(expectedState)
  })

  // …handle progress requests
  // -------------------------
  it('should handle goal progression', () => {
    let initialState = {}

    // 1. Explicit increment over an empty start
    let expectedState: Record<string, number> = { 1: 2 }
    expect(
      reducer(initialState, progressOnGoal({ goalId: '1', increment: 2 }))
    ).toEqual(expectedState)

    // 2. Implicit increment over an empty start
    expectedState = { 1: 1 }
    expect(reducer(initialState, progressOnGoal({ goalId: '1' }))).toEqual(
      expectedState
    )

    // 3. Implicit increment over an existing progression
    initialState = { 1: 1 }
    expectedState = { 1: 2 }
    expect(reducer(initialState, progressOnGoal({ goalId: '1' }))).toEqual(
      expectedState
    )

    // 4. Implicit increment over other progressions
    initialState = { 1: 2 }
    expectedState = { 1: 2, 2: 1 }
    expect(reducer(initialState, progressOnGoal({ goalId: '2' }))).toEqual(
      expectedState
    )
  })
})
