// Current user (reducer spec)
// ===========================

import reducer, {
  logIn,
  logInFailure,
  logInSuccess,
  logOut,
} from './currentUser'
import type { UserInfo } from './currentUser'

// The reducer should…
describe('Current User reducer', () => {
  // …provide its default state
  // --------------------------
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState = { loginState: 'logged-out' }

    // We always verify that the default state is correctly provided.  The
    // simplest way to do this is to call it with an `undefined` initial state
    // and an unknown-type action, then verify the result (here, a signed-out
    // user).
    expect(reducer(initialState, { type: 'unknown' })).toEqual(expectedState)
  })

  // …handle sign-in
  // ---------------
  it('should handle login steps', () => {
    const email = 'john@example.com'
    // Always the same playbook:
    //
    // 1) Define the initial state and action elements
    const initialState: UserInfo = { loginState: 'logged-out' }

    // 2) Call the reducer with an appropriate prior state (`initialState`) and
    //    the action **produced by the creator** (this makes it a dual test of
    //    both the reducer and the action creator).  Then verify the returned
    //    new state.
    expect(reducer(initialState, logIn({ email, password: 'foobar' }))).toEqual(
      {
        loginState: 'pending',
      }
    )

    expect(reducer(initialState, logInSuccess({ email }))).toEqual({
      loginState: 'logged-in',
      email,
    })

    expect(reducer(initialState, logInFailure())).toEqual({
      loginState: 'failure',
    })
  })

  // …handle sign-out
  // ----------------
  it('should handle logout', () => {
    // Let's use the opposite (signed-in) state and verify the result, hence a
    // signed-out state.
    const initialState: UserInfo = {
      loginState: 'logged-in',
      email: 'john@example.com',
    }
    const expectedState: UserInfo = { loginState: 'logged-out' }

    expect(reducer(initialState, logOut())).toEqual(expectedState)
  })

  // Note that we might also test, for sheer completeness, that on any unknown
  // action the state is untouched.  Try it maybe?  When using TypeScript with
  // Redux Toolkit though, things would get dicey as we'd get type errors!
})
