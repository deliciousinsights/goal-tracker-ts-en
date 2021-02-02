// Root reducer
// ============

import { combineReducers } from 'redux'
import type { Reducer } from 'redux'
import reduceReducers from 'reduce-reducers'

import config from './config'
import currentUser from './currentUser'
import goals from './goals'
import history from './history'
import reduceCloseDay from './closeDay'
import today from './today'
import todaysProgress from './todaysProgress'

// Following [Redux best
// practices](https://redux.js.org/usage/structuring-reducers/splitting-reducer-logic),
// we'll use [`combineReducers`](https://redux.js.org/api/combinereducers) to
// aggregate our slice reducers into one higher-level one that will delegate
// automatically to ours on a slice-by-slice basis.
//
// However, noe action (`closeDay`) is not slice-specific, but root-level (it
// touches on `today`, `todaysProgress` and `history`), so we need to handle it
// through a root-level reducer  (`reduceCloseDay`).

// Let's first consolidate our “core” root reducer…
const coreReducer = combineReducers({
  // …based on our individual slice reducers.
  config,
  currentUser,
  goals,
  history,
  today,
  todaysProgress,
})

// To avoid circular definition issues with auto-defined / inferred types in TS
// and Redux-Toolkit, we'll define `RootState` based not on our final reducer,
// but on the core combined reducer (the types are structurally identical).
export type RootState = ReturnType<typeof coreReducer>

// Then we'll define the final reducer exported by this module, that will be the
// one used in the Redux store to process all our actions.  Reduce-Reducers
// doesn't do so well on typing, so we need explicit typing on the result
// reducer to meet our expectations.
const goalTrackerReducer = reduceReducers(
  coreReducer,
  reduceCloseDay
) as Reducer<RootState>

/*
Other possible implementations:

## Naive, hardcoded variant

```js
function goalTrackerReducer(state, action) {
  state = coreReducer(state, action)
  state = closeDay(state, action)
  return state
}
```

## A-bit-more-generic variant

```js
function goalTrackerReducer(state, action) {
  for (const reducer of [coreReducer, closeDay]) {
    state = reducer(state, action)
  }
  return state
}
```

## Handwritten, legit `reduce`

```js
function goalTrackerReducer(state, action) {
  return [coreReducer, closeDay].reduce(
    (prev, reducer) => reducer(prev, action),
    state
  )
}
```
*/

export default goalTrackerReducer
