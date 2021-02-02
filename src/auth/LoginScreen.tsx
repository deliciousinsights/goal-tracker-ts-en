// Login Screen
// ============

import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'

import ArrowForward from '@mui/icons-material/ArrowForward'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'

import classes from './LoginScreen.module.css'
import { logIn } from '../reducers/currentUser'
import TogglablePasswordField from './TogglablePasswordField'
import { useAppDispatch, useAppSelector } from '../store'

const MIN_PASSWORD_LENGTH = 6

export default function LoginScreen() {
  // At first render, we adjust the document title to make the browsing history
  // usable (and not a ton of identical titles).  The [second
  // argument](https://beta.reactjs.org/learn/synchronizing-with-effects#step-2-specify-the-effect-dependencies)
  // is an empty dependency list that tells React only to run the side effect at
  // mount time.
  useEffect(() => {
    document.title = 'Sign in'
  }, [])

  // We use controlled inputs for the form, allowing us to easily access their
  // current value, but also to normalize these on-the-fly.  It is important to
  // use an empty string instead of `undefined` for the default value, so the
  // inputs are always controlled.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // We grab the info we need from the application state in the Redux store.
  // Here we're only interested in the `currentUser.loginState` value.
  const loginState = useAppSelector((state) => state.currentUser.loginState)
  // As we're about to ask the store to trigger sign-in, we need its `dispatch`
  // to send it our action.
  const dispatch = useAppDispatch()

  // We define a few flags and variable UI elements depending on the current
  // login state: logged-out, pending, logged-in or failure.
  const loggingIn = loginState === 'pending'
  const logInIcon = loggingIn ? null : <ArrowForward />
  const canLogIn =
    !loggingIn && email !== '' && password.trim().length >= MIN_PASSWORD_LENGTH

  // Explicit failures will show a
  // [snackbar](https://mui.com/material-ui/react-snackbar/) at the bottom to
  // notify the user of the issue.
  const snackBar =
    loginState === 'failure' ? (
      <Snackbar message='Invalid identifier or password' open />
    ) : (
      ''
    )

  return (
    <form onSubmit={handleSubmit}>
      <Card className={classes.loginScreen}>
        <CardHeader title='Goal Tracker' subheader='Sign in' />
        <CardContent>
          <TextField
            autoComplete='home email'
            fullWidth
            id='email'
            label='E-mail'
            margin='normal'
            name='email'
            onChange={(event) => setEmail(normalizeEmail(event.target.value))}
            placeholder='my@email.tld'
            required
            type='email'
            value={email}
          />
          <TogglablePasswordField
            autoComplete='current-password'
            fullWidth
            helperText={`${MIN_PASSWORD_LENGTH} caractères minimum`}
            id='password'
            label='Password'
            margin='normal'
            name='password'
            onChange={(event) => setPassword(event.target.value)}
            placeholder='one heck of a password'
            required
            value={password}
          />
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            color='primary'
            disabled={!canLogIn}
            startIcon={logInIcon}
            type='submit'
            variant='contained'
          >
            Sign in
          </Button>
        </CardActions>
      </Card>
      {snackBar}
    </form>
  )

  // Form submission handler, which switches to an API call instead.
  function handleSubmit(event: FormEvent) {
    // First, prevent the default behavior for the `submit` event, which would
    // trigger a full-page server request.
    event.preventDefault()
    // Ask the Redux store to handle this, using the proper Action Creator to
    // generate the action we then dispatch.
    dispatch(logIn({ email, password }))
  }
}

// Normalize e-mail values (used on-the-fly in the controlled input) by removing
// whitespace and lowercasing anything before the '@'. (Believe it or not, the
// later part is actually case-sensitive. Ugh.)
function normalizeEmail(email: string) {
  return email
    .replace(/\s+/g, '')
    .replace(/^[^@]+/, (text) => text.toLowerCase())
}
