// Today's progress (reducer)
// ==========================

import { createAction, createReducer } from '@reduxjs/toolkit'

// *([Ducks file structure](https://github.com/erikras/ducks-modular-redux))*

export type TodaysProgress = {
  [goalId: string]: number
}

// Action Creators
// ---------------

type POGPayload = { goalId: string; increment?: number }

export const progressOnGoal = createAction(
  'goal-tracker/todaysProgress/progressOnGoal',
  // For once, we define our own action construction, to enable argument default
  // value and cleanup.
  ({ goalId, increment = 1 }: POGPayload) => ({
    payload: { goalId, increment: Number(increment) || 0 },
  })
)

// Reducer
// -------

// By default, `todaysProgress` is `{}` (keys are goal IDs, values today's
// progress; we start with no progress, no need for key-value pairs then).
export default createReducer<TodaysProgress>({}, (builder) => {
  builder.addCase(
    progressOnGoal,
    (state, { payload: { goalId, increment } }) => {
      // We use `|| 0` for `undefined` / invalid existing values (e.g. no
      // progress set yet or `NaN`).
      const previous = state[goalId] || 0
      state[goalId] = previous + increment
    }
  )
})
