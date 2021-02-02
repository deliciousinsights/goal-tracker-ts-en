// Goals (reducer)
// ===============

import { createAction, createReducer } from '@reduxjs/toolkit'
import ObjectID from 'bson-objectid'

// *([Ducks file structure](https://github.com/erikras/ducks-modular-redux))*

export type Goal = {
  id: string
  name: string
  target: number
  units: string
}

// Action Creators
// ---------------

export const addGoal = createAction(
  'goal-tracker/goals/addGoal',
  // We define our own action construction to provide “non-pure” data
  // initialization (here Object IDs) so reducers stay pure and replay in the
  // Dev Tools keeps working as expected.
  (payload: Omit<Goal, 'id'>) => ({
    payload: { ...payload, id: ObjectID().toHexString() },
  })
)

export const removeGoal = createAction<Pick<Goal, 'id'>>(
  'goal-tracker/goals/removeGoal'
)

export const updateGoal = createAction<Goal>('goal-tracker/goals/updateGoal')

// Reducer
// -------

// By default, `goals` is `[]` (no defined goals)
export default createReducer<Goal[]>([], (builder) => {
  builder
    .addCase(addGoal, (state, { payload }) => {
      // See how, thanks to our reducers being auto-wrapped by Immer, we can
      // afford the luxury of using mutative APIs without losing actual
      // immutability!
      state.push(payload)
    })
    .addCase(removeGoal, (state, { payload }) => {
      // Here however, the immutable approach using `filter` and `map` is
      // actually more concise and readable than the mutative one, so why not
      // use it?
      return state.filter(({ id }) => id !== payload.id)
    })
    .addCase(updateGoal, (state, action) => {
      return state.map((goal) =>
        goal.id === action.payload.id ? action.payload : goal
      )
    })
})
