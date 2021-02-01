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
  useEffect(() => {
    document.title = 'My goals today'
  }, [])

  const { canPromptForNotify, goals, today, todaysProgress } =
    useAppSelector(selectState)
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

  function markGoalProgression({ id }: Goal) {
    dispatch(progressOnGoal({ goalId: id }))
  }

  function overallProgress() {
    const { totalProgress, totalTarget } = getDayCounts(todaysProgress, goals)

    return { value: totalProgress, max: totalTarget }
  }
}

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
