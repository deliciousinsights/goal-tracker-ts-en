import Add from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab'
import ThumbUp from '@mui/icons-material/ThumbUp'
import Typography from '@mui/material/Typography'

import classes from './TrackerScreen.module.css'
import Gauge from '../shared/Gauge'

// Expected props: `goal` and `progress`
export default function GoalTrackerWidget({ FIXME }) {
  const adderComponent =
    target > progress ? (
      <Fab
        color='secondary'
        size='small'
        aria-label={`Make progress on ${name}`}
      >
        <Add />
      </Fab>
    ) : (
      <Fab disabled size='small' aria-label='Goal achieved, bravo!'>
        <ThumbUp />
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
