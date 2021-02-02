// Goal-tracking screen
// ====================

import { Link } from 'react-router-dom'
import { useEffect } from 'react'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import HistoryIcon from '@mui/icons-material/History'
import SettingsIcon from '@mui/icons-material/Settings'
import Slide from '@mui/material/Slide'
import Snackbar from '@mui/material/Snackbar'

// Note how we're importing a CSS on the fly through a regular import.  We use
// [CSS Modules](https://github.com/css-modules/css-modules#readme) here to get
// unique classes in production in order to avoid CSS scope conflicts.
//
// Create React App [presets
// that](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet) for
// us.
import classes from './TrackerScreen.module.css'
import { formatDate, getDayCounts } from '../lib/helpers'
import Gauge from '../shared/Gauge'
import type { Goal } from '../reducers/goals'
import GoalTrackerWidget from './GoalTrackerWidget'
import { progressOnGoal } from '../reducers/todaysProgress'
import { requestNotificationPermission } from '../reducers/config'
import type { RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store'

export default function TrackerScreen() {
  // At first render, we adjust the document title to make the browsing history
  // usable (and not a ton of identical titles).  The [second
  // argument](https://beta.reactjs.org/learn/synchronizing-with-effects#step-2-specify-the-effect-dependencies)
  // is an empty dependency list that tells React only to run the side effect at
  // mount time.
  useEffect(() => {
    document.title = 'My goals today'
  }, [])

  // We're interested only in the `canPromptForNotify`, `goals`, `today` and
  // `todaysProgress` parts of our App State.  As a consequence, changes to
  // other parts of the App State wouldn't trigger a re-render here.  The
  // `selectState` selector is defined further down in this file.
  const { canPromptForNotify, goals, today, todaysProgress } =
    useAppSelector(selectState)
  // As we're about to ask the store to progress on goals, we need its
  // `dispatch` to send it our actions.
  const dispatch = useAppDispatch()

  return (
    <>
      <Card className={classes.goalTracker}>
        <CardHeader
          subheader={<Gauge {...overallProgress()} />}
          title={formatDate(today, 'medium')}
        />
        <CardContent>
          {goals.map((goal) => (
            <GoalTrackerWidget
              goal={goal}
              key={goal.id}
              onProgress={markGoalProgression}
              progress={todaysProgress[goal.id] ?? 0}
            />
          ))}
        </CardContent>
        <CardActions>
          <Button
            color='secondary'
            component={Link}
            startIcon={<HistoryIcon />}
            to='/history'
            variant='contained'
          >
            History
          </Button>
          <Button
            component={Link}
            startIcon={<SettingsIcon />}
            to='/settings'
            variant='contained'
          >
            Settings
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        action={
          <Button
            color='info'
            onClick={() => dispatch(requestNotificationPermission())}
            variant='text'
          >
            Tell us
          </Button>
        }
        message='Would you like to get reminded when your day gets historized?'
        open={canPromptForNotify}
        TransitionComponent={Slide}
      />
    </>
  )

  // Callback for the `onProgress` prop of `<GoalTrackerWidget />` instances,
  // that will trigger the actual progress on the goal in the app state. As it
  // is not inline, TS can't infer its signature in a reliable way and we have
  // to make it explicit.
  function markGoalProgression({ id }: Goal) {
    dispatch(progressOnGoal({ goalId: id }))
  }

  // Tiny business method that computes the overall progress percentage on our
  // daily goals today.
  function overallProgress() {
    const { totalProgress, totalTarget } = getDayCounts(todaysProgress, goals)

    return { value: totalProgress, max: totalTarget }
  }
}

// Selector for the app state parts our component is interested in.  The single
// argument is the whole App State, the returned value will be returned by the
// [`useAppSelector()`](https://react-redux.js.org/using-react-redux/usage-with-typescript#define-typed-hooks)
// call we pass this selector to. As it is not inline, TS can't infer its
// signature in a reliable way and we have to make it explicit.
function selectState({
  config: { canPromptForNotify },
  goals,
  today,
  todaysProgress,
}: RootState) {
  return {
    canPromptForNotify,
    goals,
    today,
    todaysProgress,
  }
}
