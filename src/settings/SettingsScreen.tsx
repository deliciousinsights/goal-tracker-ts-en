import { Link } from 'react-router-dom'
import { useEffect } from 'react'

import Add from '@mui/icons-material/Add'
import ArrowBack from '@mui/icons-material/ArrowBack'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import Logout from '@mui/icons-material/ExitToApp'
import Typography from '@mui/material/Typography'

import DeleteSettingDialog from './DeleteSettingDialog'
import GoalSetting from './GoalSetting'
import { logOut } from '../reducers/currentUser'
import { removeGoal } from '../reducers/goals'
import type { RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store'

export default function SettingsScreen() {
  useEffect(() => {
    document.title = 'My settings'
  }, [])

  const { goals, email } = useAppSelector(selectState)
  const dispatch = useAppDispatch()

  return (
    <>
      <Button component={Link} startIcon={<ArrowBack />} to='/' variant='text'>
        Back
      </Button>
      <Card className='settings'>
        <CardHeader title='Settings' />
        <CardContent>
          <List>
            <ListItem>
              <ListItemText primary='You are logged in as' secondary={email} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => dispatch(logOut())}>
                  <Logout />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <Divider />
          <List>
            <Typography variant='subtitle1'>My goals</Typography>
            {goals.map((goal) => (
              <GoalSetting goal={goal} key={goal.id} />
            ))}
            {goals.length === 0 && (
              <ListItem>
                <ListItemText secondary='No goal yet. Get on it!' />
              </ListItem>
            )}
          </List>
        </CardContent>
        <CardActions>
          <Button color='primary' startIcon={<Add />} variant='contained'>
            Add a goal
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

function selectState({ goals, currentUser }: RootState) {
  const email =
    currentUser.loginState === 'logged-in' ? currentUser.email : null
  return { goals, email }
}