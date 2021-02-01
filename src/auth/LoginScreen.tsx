import ArrowForward from '@mui/icons-material/ArrowForward'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import TextField from '@mui/material/TextField'

import classes from './LoginScreen.module.css'
import TogglablePasswordField from './TogglablePasswordField'

export default function LoginScreen() {
  return (
    <form>
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
            placeholder='my@email.tld'
            required
            type='email'
          />
          <TogglablePasswordField
            autoComplete='current-password'
            fullWidth
            id='password'
            label='Password'
            margin='normal'
            name='password'
            placeholder='one heck of a password'
            required
          />
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            color='primary'
            startIcon={<ArrowForward />}
            type='submit'
            variant='contained'
          >
            Sign in
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}
