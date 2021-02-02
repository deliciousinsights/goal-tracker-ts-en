// "System" config for the app
// ===========================
//
// By listening to redux-persist's rehydration action, we can maintain a flag
// about our app state being hydrated (or not yet), which enables our
// `RehydrationWaiter` component.
//
// We also handle notification permission management here, both for its initial
// state (the API is available and we weren't blocked yet) and later requests
// through a [generic async
// action](https://redux-toolkit.js.org/usage/usage-guide#async-requests-with-createasyncthunk),
// process through the middleware preconfigured by Redux Toolkit.

import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
// Redux-Persist apparently doesn't export types for its constants, so…
// @ts-ignore
import { REHYDRATE } from 'redux-persist/constants'

type Config = {
  // - Should we prompt the user at all?
  canPromptForNotify: boolean
  // - Do we have permission to notify?
  canNotify: boolean
  // - Was the state hydrated by redux-persist already?
  rehydrated: boolean
}

const bootNotificationPermission =
  (typeof window !== 'undefined' && window.Notification?.permission) || 'denied'

// Action Creators
// ---------------

// This is dispatched by the UI -see `TrackerScreen` and triggers the
// notification permission prompt.  Chromium doesn't require it be triggered
// from an interactive event, but Firefox obeys spec recommendations and does.
export const requestNotificationPermission = createAsyncThunk(
  'goal-tracker/config/requestNotificationPermission',
  // As our callback is async, any direct return of something other than a
  // promise is automatically wrapped as a fulfilled promise.
  async () => {
    if (bootNotificationPermission === 'denied') {
      return 'denied'
    }

    // Leveraging system-based
    // [notifications](https://developer.mozilla.org/fr/docs/Web/API/notification/Using_Web_Notifications)
    // isn't automatically allowed: the user must have granted us permission.
    // This function returns a promise to the resulting status, used following
    // the permission request action.
    return window.Notification.requestPermission()
  }
)

// Reducer
// -------

export default createReducer<Config>(
  {
    canPromptForNotify: bootNotificationPermission === 'default',
    canNotify: bootNotificationPermission === 'granted',
    rehydrated: false,
  },
  (builder) => {
    builder
      .addCase(REHYDRATE, (state) => {
        state.rehydrated = true
      })
      .addCase(
        requestNotificationPermission.fulfilled,
        (state, { payload: status }) => {
          state.canPromptForNotify = status === 'default'
          state.canNotify = status === 'granted'
        }
      )
  }
)
