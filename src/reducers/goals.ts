import { createAction, createReducer } from '@reduxjs/toolkit'

export type Goal = {
  id: string
  name: string
  target: number
  units: string
}

// Action Creators
// ---------------

export const addGoal = createAction<Omit<Goal, 'id'>>(
  'goal-tracker/goals/addGoal'
)

export const removeGoal = createAction<Pick<Goal, 'id'>>(
  'goal-tracker/goals/removeGoal'
)

export const updateGoal = createAction<Goal>('goal-tracker/goals/updateGoal')

// Reducer
// -------

export default createReducer<Goal[]>([], (builder) => {
  builder
    .addCase(addGoal, (state, { payload }) => {
      // FIXME
    })
    .addCase(removeGoal, (state, { payload }) => {
      // FIXME
    })
    .addCase(updateGoal, (state, { payload }) => {
      // FIXME
    })
})
