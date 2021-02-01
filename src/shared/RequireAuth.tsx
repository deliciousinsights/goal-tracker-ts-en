// Authenticated tree wrapper
// ==========================
//
// Lets us define parts of the UI that demand existing authentication (i.e. that
// the user be logged in).  In practice, this taps into the store to verify
// we're logged in, in which case it just renders its children.  Otherwise, it
// uses React-Router's `<Navigate/>` component to immediately take us back to
// the login screen.

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../store'

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const loggedIn = useAppSelector(
    (state) => state.currentUser.loginState === 'logged-in'
  )

  return loggedIn ? children : <Navigate to='/' />
}
