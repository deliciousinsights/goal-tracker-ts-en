// Store-level (reducer spec)
// ==========================

import { subDays } from 'date-fns'

import { closeDay } from './closeDay'
import { isoDate } from '../lib/helpers'
import { mockGoal } from '../testHelpers'
import reducer from './index'
import type { RootState } from '../store'

// The reducer should…
describe('Store-level reducer', () => {
  // …correctly delegate its default state
  // -------------------------------------
  //
  // We verify that it does delegate to its combined slice reducers for their
  // own default state definitions (at least we assume that's how it got its
  // default state).
  it('should properly accrue its initial state', () => {
    const initialState = undefined
    const expectedState = {
      config: {
        canNotify: false,
        canPromptForNotify: false,
        rehydrated: false,
      },
      currentUser: { loginState: 'logged-out' },
      goals: [],
      history: [],
      today: isoDate(new Date()),
      todaysProgress: {},
    }

    expect(reducer(initialState, { type: 'unknown' })).toEqual(expectedState)
  })

  it('should handle day closing', () => {
    const initialState: RootState = {
      config: {
        canNotify: false,
        canPromptForNotify: false,
        rehydrated: false,
      },
      currentUser: { loginState: 'logged-out' },
      goals: [
        mockGoal({ id: '1', target: 42 }),
        mockGoal({ id: '2', target: 21 }),
      ],
      history: [
        {
          date: isoDate(subDays(new Date(), 2)),
          progresses: { 1: [15, 42] },
        },
      ],
      today: isoDate(subDays(new Date(), 1)),
      todaysProgress: { 1: 10 },
    }
    const expectedState = {
      config: {
        canNotify: false,
        canPromptForNotify: false,
        rehydrated: false,
      },
      currentUser: initialState.currentUser,
      goals: initialState.goals,
      history: [
        { date: initialState.today, progresses: { 1: [10, 42] } },
        ...initialState.history,
      ],
      today: isoDate(new Date()),
      todaysProgress: {},
    }

    expect(reducer(initialState, closeDay())).toEqual(expectedState)
  })
})
