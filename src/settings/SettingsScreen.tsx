// Settings screen
// ===============

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

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

import { addGoal, removeGoal, updateGoal } from '../reducers/goals'
import AddSettingDialog from './AddSettingDialog'
import type { ASDState } from './AddSettingDialog'
import DeleteSettingDialog from './DeleteSettingDialog'
import type { Goal } from '../reducers/goals'
import GoalSetting from './GoalSetting'
import { logOut } from '../reducers/currentUser'
import type { RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store'

const DEFAULT_STATE: { goal: Goal | {}; dialog: string | null } = {
  goal: {},
  dialog: null,
}

export default function SettingsScreen() {
  // At first render, we adjust the document title to make the browsing history
  // usable (and not a ton of identical titles).  The [second
  // argument](https://beta.reactjs.org/learn/synchronizing-with-effects#step-2-specify-the-effect-dependencies)
  // is an empty dependency list that tells React only to run the side effect at
  // mount time.
  useEffect(() => {
    document.title = 'My settings'
  }, [])

  const [{ goal, dialog }, setState] = useState(DEFAULT_STATE)

  // We're interested in the `goals` and `history` slices of our App State.  As
  // a consequence, changes to other parts of the App State wouldn't trigger a
  // re-render here. The `selectState` selector is defined further below.
  const { goals, email } = useAppSelector(selectState)
  // As we're about to ask the store to trigger log-out or handle goals, we need
  // its `dispatch` to send it our actions.
  const dispatch = useAppDispatch()

  return (
    // When you use a button for something that is actually a link, especially a
    // [`<Link>`](https://reactrouter.com/en/main/components/link), use MUI's
    // [`component`](https://mui.com/material-ui/api/button/#props) prop to
    // alter its outermost rendered component (instead of the default `button`).
    // Props unused by `Button` are then passed as-is to the alternative
    // component (in our case, that would be the `to` prop).
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
              <GoalSetting
                goal={goal}
                key={goal.id}
                onDeleteClick={openGoalDeleter}
                onEditClick={openGoalEditor}
              />
            ))}
            {goals.length === 0 && (
              <ListItem>
                <ListItemText secondary='No goal yet. Get on it!' />
              </ListItem>
            )}
          </List>
        </CardContent>
        <CardActions>
          <Button
            color='primary'
            onClick={openGoalAdder}
            startIcon={<Add />}
            variant='contained'
          >
            Add a goal
          </Button>
        </CardActions>
      </Card>
      <AddSettingDialog
        goal={goal}
        key={'id' in goal ? goal.id : null}
        onAdd={addOrUpdateGoal}
        onCancel={closeDialogs}
        onClosed={resetGoal}
        open={dialog === 'add-or-update'}
      />
      <DeleteSettingDialog
        goal={goal}
        onCancel={closeDialogs}
        onClosed={resetGoal}
        onDelete={deleteSelectedGoal}
        open={dialog === 'delete'}
      />
    </>
  )

  // As this callback isn't inlined, TS can't guarantee its argument type, so we
  // need to type it explicitly.
  function addOrUpdateGoal({ id, name, target, units, keepOpen }: ASDState) {
    if (id !== undefined) {
      dispatch(updateGoal({ id, name, target, units }))
      keepOpen = false
    } else {
      dispatch(addGoal({ name, target, units }))
    }
    if (!keepOpen) {
      closeDialogs()
    }
  }

  function closeDialogs() {
    setState({ goal, dialog: null })
  }

  function deleteSelectedGoal() {
    // `goal` may be either `{}` or a `Goal`, so we need to narrow the type to
    // access its `id` property (we do know this function won't ever be called
    // with an empty goal object).
    dispatch(removeGoal({ id: (goal as Goal).id }))
    closeDialogs()
  }

  function openGoalAdder() {
    setState({ goal: {}, dialog: 'add-or-update' })
  }

  function openGoalDeleter(goal: Goal) {
    setState({ goal, dialog: 'delete' })
  }

  function openGoalEditor(goal: Goal) {
    setState({ goal, dialog: 'add-or-update' })
  }

  function resetGoal() {
    setState(DEFAULT_STATE)
  }
}

// Selector for the app state parts our component is interested in.  The single
// argument is the whole App State, the returned value will be returned by the
// [`useAppSelector()`](https://react-redux.js.org/using-react-redux/usage-with-typescript#define-typed-hooks)
// call we pass this selector to. As it is not inline, TS can't infer its
// signature in a reliable way and we have to make it explicit.
function selectState({ goals, currentUser }: RootState) {
  // In order to obey the typing (`UserInfo`), we can't just read
  // `currentUser.email` and get `undefined` when we're not signed-in, as we
  // would in vanilla JS: we need
  // [narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-in-operator-narrowing)
  // to access the property, hence the `in` condition.
  const email =
    currentUser.loginState === 'logged-in' ? currentUser.email : null
  return { goals, email }
}
