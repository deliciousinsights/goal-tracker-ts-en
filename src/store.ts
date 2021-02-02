// App State
// =========

import { configureStore } from '@reduxjs/toolkit'
import { offline } from '@redux-offline/redux-offline'
import type { StoreEnhancer } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'

import DEFAULT_STATE from './default-state'
import goalTrackerReducer from './reducers'
import type { RootState } from './reducers'

export { RootState }

// Definition of the default state (ignoring hydration).  In production we'd
// start empty, and all Redux slice reducers would provide granular defaults.
//
// The static import of `DEFAULT_STATE` (as opposed to a dynamic import) may
// seem like it burdens the production bundle, but it's actually preferable.
// First, the ternary below will inline to `{}` in a production build, resulting
// in *de facto* purge of the superfluous import during the Dead Code
// Elimination (DCE) phase. Second, it prevents superfluous code splitting in
// development.
const state = (
  process.env.NODE_ENV === 'production' ? {} : DEFAULT_STATE
) as RootState

// This export lets us easily build stores to our exact specs (usually for a
// specific initial state), e.g. in tests or Storybook.
export function makeStore(
  preloadedState = state,
  { shouldPersist = process.env.NODE_ENV !== 'test' } = {}
) {
  const store = configureStore({
    preloadedState,
    reducer: goalTrackerReducer,
    // redux-offline's typing isn't optimal yet, so we need to manually narrow
    // the result type ourselves.
    enhancers: shouldPersist ? [offline({}) as StoreEnhancer] : [],
  })

  // HMR management of reducers during development
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(goalTrackerReducer)
    )
  }

  return store
}

// Creation of the default store (for dev and prod mostly, tests and Storybook
// would create their own custom ones for every scenario).
const store = makeStore()

// [Recommended](https://react-redux.js.org/using-react-redux/usage-with-typescript#define-typed-hooks)
// wrapping, for automatic typing purposes, of the base `useDispatch` and
// `useSelector` hooks, so we can be spared explicit typing when providing
// inline selectors, mostly.
type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// The store for dev/prod is our default export.
export default store
