// Current user (reducer)
// ======================

import { createAction, createReducer } from '@reduxjs/toolkit'

export type UserInfo =
  | { loginState: 'logged-out' | 'pending' | 'failure' }
  | { loginState: 'logged-in'; email: string }

// Action Creators
// ---------------

// This action creator is async, even if doesn't immediately show.  There are
// many ways of doing async actions in Redux (and Redux Toolkit presets thunk
// and promise middlewares, the latter of which we use for notification
// permission management in `config.ts`), but because this one is about a
// network API call, we leverage all the goodness from
// [redux-offline](https://github.com/redux-offline/redux-offline), itself built
// on top of the wonderful
// [redux-persist](https://github.com/rt2zz/redux-persist).  Once this module is
// [set up in the store](./store.html)), we can decorate ations with a
// `meta.offline` field, which can contain properties `effect` (describing the
// API call), `commit` (the action to dispatch on a successful response, with
// HTTP codes 2xx) and `rollback` (the action to dispatch on a failed network
// call or failure responses with e.g. HTTP code 401).
//
// We're using a *pessimistic* action here: we must consider it failed until
// proven successful (it's a login, after all).  So we finalize the login, via
// the `loginSuccess` action, in the `commit` descriptor.  The `rollback`
// descriptor triggers a `loginFailure` action so the UI can reflect the issue
// (with a snackbar in the login screen).
//
// Dev note: although action creators spawned by `createAction` have a default
// `toString()` behavior that returns their identifier, which lets us use as
// `case` arguments in our reducers, that conversion isn't automatically done by
// Redux-Offline when crafting its "result actions" for triggering, so we
// explicitly grab their string representation to keep a useful debug log.
export function logIn(payload: { email: string; password: string }) {
  return {
    type: logInStart.toString(),
    meta: {
      offline: {
        effect: {
          json: payload,
          method: 'POST',
          url: `http://${window.location.hostname}:3001/api/v1/sessions`,
        },
        commit: { type: logInSuccess.toString() },
        rollback: { type: logInFailure.toString() },
      },
    },
  }
}

// Note that these are synchrnoous “steps” for the otherwise-async login
// process.  They are just exported to we can test them individually in the test
// suite for this reducer.  Our app code would work without these being exported.
export const logInStart = createAction('goal-tracker/currentUser/logInStart')
export const logInSuccess = createAction<{ email: string }>(
  'goal-tracker/currentUser/logInSuccess'
)
export const logInFailure = createAction(
  'goal-tracker/currentUser/logInFailure'
)
export const logOut = createAction('goal-tracker/currentUser/logOut')

// Reducer
// -------

export default createReducer<UserInfo>(
  { loginState: 'logged-out' },
  (builder) => {
    builder
      .addCase(logInStart, () => ({ loginState: 'pending' }))
      .addCase(logInFailure, () => ({ loginState: 'failure' }))
      .addCase(logInSuccess, (state, { payload: { email } }) => ({
        loginState: 'logged-in',
        email,
      }))
      .addCase(logOut, () => ({ loginState: 'logged-out' }))
  }
)
