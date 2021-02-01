// Goal Deletion Dialog
// ====================

// This is always included in the Settings screen, so can be "rendered" with a
// nullish or empty goal.  Its props get updated as the screen changes which
// goal it operates on.

import Button from '@mui/material/Button'
import Clear from '@mui/icons-material/Clear'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'

import type { Goal } from '../reducers/goals'

interface DSDProps {
  goal: Goal | { name?: string }
  onDelete: () => void
  onCancel: () => void
  onClosed?: () => void
  open: boolean
}

export default function DeleteSettingDialog({
  goal = {},
  onCancel,
  onClosed,
  onDelete,
  open,
}: DSDProps) {
  const smallViewport = useMediaQuery('(max-width: 480px)')
  return (
    <Dialog
      aria-labelledby='deleteGoalTitle'
      fullScreen={smallViewport}
      onClose={onCancel}
      open={open}
      TransitionProps={{
        onExited: onClosed,
      }}
    >
      <DialogTitle id='deleteGoalTitle'>Delete a goal</DialogTitle>
      <DialogContent>
        <DialogContentText>Delete the “{goal.name}” goal?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={onCancel}>
          Oh noes!
        </Button>
        <Button color='primary' onClick={onDelete} startIcon={<Clear />}>
          Drop it.
        </Button>
      </DialogActions>
    </Dialog>
  )
}
