// History Day > Goal
// ==================

// Subsection of the history screen, within a specific day, for a given goal.
// Rendered inside a `<HistoryDay/>`.

import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

import Gauge from '../shared/Gauge'
import type { Goal } from '../reducers/goals'

interface HDGProps {
  goal: Goal
  stats: [progress: number, target: number]
}

// Destructuring FTW!
export default function HistoryDayGoal({
  goal: { name, units },
  stats: [progress, target],
}: HDGProps) {
  const details = (
    <div>
      <Gauge value={progress} max={target} />
      {progress} out of {target} {units}
    </div>
  )

  return (
    <ListItem>
      <ListItemText
        primary={name}
        secondary={details}
        secondaryTypographyProps={{ component: 'div' }}
      />
    </ListItem>
  )
}
