// Goal progress for today
// =======================

import Add from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab'
import ThumbUp from '@mui/icons-material/ThumbUp'
import Typography from '@mui/material/Typography'

import classes from './TrackerScreen.module.css'
import Gauge from '../shared/Gauge'
import type { Goal } from '../reducers/goals'

interface GTWProps {
  goal: Goal
  progress: number
  onProgress?: (goal: Goal) => void
}

// Section of the main screen focusing on a single goal.  Provides a description
// and the progress button, if applicable.
export default function GoalTrackerWidget({
  // Destructuring FTW!
  goal,
  goal: { name, units, target },
  onProgress,
  progress,
}: GTWProps) {
  const adderComponent =
    target > progress ? (
      <Fab
        color='secondary'
        size='small'
        aria-label={`Make progress on ${name}`}
        onClick={() => onProgress?.(goal)}
      >
        <Add data-testid='in-progress' />
      </Fab>
    ) : (
      <Fab disabled size='small' aria-label='Goal achieved, bravo!'>
        <ThumbUp data-testid='completed' />
      </Fab>
    )

  return (
    <div className={classes.goal}>
      <div className={classes.summary}>
        <Typography variant='h6' component='h2'>
          {name}
        </Typography>
        <Gauge value={progress} max={target} />
        <Typography component='small'>
          {`${progress} out of ${target} ${units}`}
        </Typography>
      </div>
      <div className={classes.cta}>{adderComponent}</div>
    </div>
  )
}
