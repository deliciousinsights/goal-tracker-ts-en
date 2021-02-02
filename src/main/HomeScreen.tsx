// Main screen
// ===========

import LoginScreen from '../auth/LoginScreen'
import TrackerScreen from './TrackerScreen'
import { useAppSelector } from '../store'

export default function HomeScreen() {
  // We're interested only in the `currentUser.loginState` part of our App
  // State.  As a consequence, changes to other parts of the App State wouldn't
  // trigger a re-render here.
  const loggedIn = useAppSelector(
    (state) => state.currentUser.loginState === 'logged-in'
  )

  // If we are logged in, our URL (the app's root) should display the
  // goal-tracking screen. Otherwise, it should display the login screen.
  return loggedIn ? <TrackerScreen /> : <LoginScreen />
}
