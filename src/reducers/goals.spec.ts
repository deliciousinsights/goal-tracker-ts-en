import type { Goal } from './goals'
import { mockGoal } from '../testHelpers'
import reducer, { addGoal, removeGoal, updateGoal } from './goals'

describe('Goals reducer', () => {
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState: Goal[] = []

    expect(reducer(initialState, { type: 'unknown' })).toEqual(expectedState)
  })

  it('should handle goal addition', () => {
    const newGoal = {
      name: 'Test reducers',
      target: 42,
      units: 'tests',
    }
    const initialState = undefined
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

  it('should handle goal removal', () => {
    const initialState = [
      mockGoal({ id: '0' }),
      mockGoal({ id: '1' }),
      mockGoal({ id: '2' }),
    ]
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

  it('should handle goal update (when in goals)', () => {
    const goalUpdate = {
      id: '0',
      name: 'Test reducer 3',
      target: 42,
      units: 'wombats',
    }
    const initialState = [
      { id: '0', name: 'Test reducer 1', target: 10, units: 'tests' },
      { id: '1', name: 'Test reducer 2', target: 5, units: 'tests' },
    ]
    const expectedState = [goalUpdate, initialState[1]]

    expect(reducer(initialState, updateGoal(goalUpdate))).toEqual(expectedState)
  })
})
