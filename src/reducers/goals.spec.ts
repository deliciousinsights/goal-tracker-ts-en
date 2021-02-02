// Goals (reducer spec)
// ====================

import type { Goal } from './goals'
import { mockGoal } from '../testHelpers'
import reducer, { addGoal, removeGoal, updateGoal } from './goals'

// The reducer should…
describe('Goals reducer', () => {
  // …provide its default state
  // --------------------------
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState: Goal[] = []

    // We always verify that the default state is correctly provided.  The
    // simplest way to do this is to call it with an `undefined` initial state
    // and an unknown-type action, then verify the result (here, an empty
    // goal set).
    expect(reducer(initialState, { type: 'unknown' })).toEqual(expectedState)
  })

  // …handle goal addition
  // ---------------------
  it('should handle goal addition', () => {
    const newGoal = {
      name: 'Test reducers',
      target: 42,
      units: 'tests',
    }
    const initialState = undefined
    // First, check an initial add (first item)
    const goals = reducer(initialState, addGoal(newGoal))

    const REGEX_BSONID = /^[0-9a-f]{24}$/

    // Is it here?
    expect(goals).toHaveLength(1)
    // Does it look good?
    expect(goals[0]).toEqual({
      ...newGoal,
      id: expect.stringMatching(REGEX_BSONID),
    })

    // Does adding another goal preserve existing ones?
    const nextGoals = reducer(goals, addGoal(newGoal))

    expect(nextGoals).toHaveLength(2)
    expect(nextGoals[0]).toEqual(goals[0])

    // Are goal IDs indeed unique?
    expect(nextGoals[1]).toHaveProperty(
      'id',
      expect.stringMatching(REGEX_BSONID)
    )
    expect(nextGoals[1].id).not.toBe(nextGoals[0].id)
  })

  // …handle goal removal
  // --------------------
  it('should handle goal removal', () => {
    // Let's start with 3+ items, to make sure removal keeps surrounding
    // elements intact.
    const initialState = [
      mockGoal({ id: '0' }),
      mockGoal({ id: '1' }),
      mockGoal({ id: '2' }),
    ]
    // The expectation is: the removed item shouldn't be there anymore.
    const expectedState = [mockGoal({ id: '0' }), mockGoal({ id: '2' })]

    // Does removing an existing goal work?
    expect(reducer(initialState, removeGoal({ id: '1' }))).toEqual(
      expectedState
    )

    // Does removing a missing goal leave the state untouched?
    expect(reducer(initialState, removeGoal({ id: '42' }))).toEqual(
      initialState
    )
  })

  // …handle existing-goal update
  // ----------------------------
  it('should handle goal update (when in goals)', () => {
    const goalUpdate = {
      id: '0',
      name: 'Test reducer 3',
      target: 42,
      units: 'wombats',
    }
    // Let's start from 2+ items, to make sure other items are untouched.
    const initialState = [
      { id: '0', name: 'Test reducer 1', target: 10, units: 'tests' },
      { id: '1', name: 'Test reducer 2', target: 5, units: 'tests' },
    ]
    // The expectation is: the targeted item was thoroughly updated.
    const expectedState = [goalUpdate, initialState[1]]

    // We're just comparing array contents here!
    expect(reducer(initialState, updateGoal(goalUpdate))).toEqual(expectedState)
  })
})
