// Daily reset (reducer)
// =====================

import { createAction, createReducer } from '@reduxjs/toolkit'

import type { HistoryEntry } from './history'
import { isoDate } from '../lib/helpers'
import type { RootState } from '../store'

// *([Ducks file structure](https://github.com/erikras/ducks-modular-redux))*

// Action Creators
// ---------------

export const closeDay = createAction(
  'goal-tracker/closeDay/closeDay',
  // We define our own action construction to provide “non-pure” data
  // initialization (here date) so reducers stay pure and replay in the Dev
  // Tools keeps working as expected.
  ({ date = new Date() } = {}) => ({
    payload: { date },
  })
)

// Reducer
// -------

// The default value is provided by the meta-reducer in `index.ts`
export default createReducer<RootState>({} as RootState, (builder) => {
  builder.addCase(closeDay, (state, { payload }) => {
    state.history = tallyPreviousDay(state)
    state.today = isoDate(payload.date)
    state.todaysProgress = {}
  })
})

// Tallying the history entry
// --------------------------

function tallyPreviousDay({
  goals,
  history,
  today,
  todaysProgress,
}: RootState) {
  const progresses: HistoryEntry['progresses'] = {}
  for (const { id, target } of goals) {
    const progress = todaysProgress[id] || 0
    // We only historize actual progress…
    if (progress > 0) {
      // Let's not forget to denormalize the currently-defined target, lest it
      // be changed later on and prevent contextualization of our progress.
      progresses[id] = [progress, target]
    }
  }

  // No need to create empty history entries (zero progress that day)
  if (Object.keys(progresses).length === 0) {
    return history
  }

  // At this state, `today` wasn't modified yet, it's the last day that was
  // represented in the state.  We can therefore use it for the history entry's
  // date.  Although Immer would let us `unshift` on the state, we might as well
  // be explicitly immutable there and return a derived array.
  return [{ date: today, progresses }, ...history]
}
