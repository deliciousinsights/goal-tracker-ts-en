import { createAction, createReducer } from '@reduxjs/toolkit'

import type { RootState } from '../store'

// Action Creators
// ---------------

export const closeDay = createAction(
  'goal-tracker/closeDay/closeDay',
  ({ date = new Date() } = {}) => ({
    payload: { date },
  })
)

// Reducer
// -------

export default createReducer<RootState>({} as RootState, (builder) => {
  builder.addCase(closeDay, (state, action) => {
    // FIXME
  })
})
