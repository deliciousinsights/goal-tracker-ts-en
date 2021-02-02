// Add/Update Goal Dialog
// ======================

// This is always included in the Settings screen, so can be "rendered" with a
// nullish or empty goal.  Its props get updated as the screen changes which
// goal it operates on (an existing goal will have an `id` property).

import type { ChangeEvent } from 'react'
import { useState } from 'react'

import Add from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Edit from '@mui/icons-material/Create'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import useMediaQuery from '@mui/material/useMediaQuery'

import type { Goal } from '../reducers/goals'

// The callback passed by the parent component for `onAdd` might need a type for
// its argument (e.g. if it's not inlined), so we export that.
export interface ASDState {
  id?: string
  name: string
  target: number
  units: string
  keepOpen?: boolean
}

const DEFAULT_STATE: ASDState = {
  id: undefined,
  name: '',
  target: 5,
  units: '',
  keepOpen: true,
}

interface ASDProps {
  goal: Goal | { id?: string }
  onAdd: (state: ASDState) => void
  onCancel: () => void
  onClosed?: () => void
  open: boolean
}

export default function AddSettingDialog({
  goal,
  onAdd,
  onCancel,
  onClosed,
  open,
}: ASDProps) {
  const smallViewport = useMediaQuery('(max-width: 480px)')
  const [state, setState] = useState<ASDState>({ ...DEFAULT_STATE, ...goal })

  // If the passed goal has an `id` property, it's an existing goal and we're
  // editing it, otherwise it's a fresh goal and we're adding it.
  const isEditing = 'id' in goal

  return (
    <Dialog
      aria-labelledby='addGoalTitle'
      fullScreen={smallViewport}
      onClose={onCancel}
      open={open}
      TransitionProps={{
        onExited: onClosed,
      }}
    >
      <DialogTitle id='addGoalTitle'>
        {isEditing ? 'Edit a goal' : 'Add a goal'}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label='Name'
          margin='normal'
          name='name'
          onChange={(event) => handleChange(event, 'name')}
          required
          value={state.name}
        />
        <TextField
          label='Daily target'
          margin='normal'
          name='target'
          onChange={(event) => handleChange(event, 'target')}
          required
          type='number'
          value={state.target}
        />{' '}
        <TextField
          label='Unit'
          margin='normal'
          name='units'
          onChange={(event) => handleChange(event, 'units')}
          placeholder='steps, minutes…'
          required
          value={state.units}
        />
        {isEditing || (
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.keepOpen}
                  onChange={(event, checked) =>
                    handleChange(event, 'keepOpen', checked)
                  }
                />
              }
              label='Keep open for the next add'
            />
          </FormGroup>
        )}
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={onCancel} variant='text'>
          Cancel
        </Button>
        {isEditing ? (
          <Button
            color='primary'
            onClick={triggerAdd}
            startIcon={<Edit />}
            variant='text'
          >
            Edit
          </Button>
        ) : (
          <Button
            color='primary'
            onClick={triggerAdd}
            startIcon={<Add />}
            variant='text'
          >
            Add
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )

  // Generic field change handler that stores the field's value (which, coming
  // from the DOM, is always a `String`) into the correct `state` property, with
  // on-the-fly conversion when applicable.
  //
  // There is a special case for check boxes, who need that third argument as
  // we're not focusing on value but on checked state.
  //
  // This is an interesting bit of code, as it demonstrates:
  //
  // - Dynamic function selection (`Number` or `String`)
  // - Computed Property Names (`[field]: …`), part of ES2015 Shorthands
  // - Object spread (`...state`), as the function returned by `useState` isn't
  //   for partial updates but for full replacements, unlike the legacy
  //   `React.Component#setState(…)` behavior.
  function handleChange(
    // Les joies du typage de gestionnaire d'événements en React…
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    checked?: boolean
  ) {
    if (field === 'keepOpen') {
      setState({ ...state, keepOpen: checked })
    } else {
      const caster = field === 'target' ? Number : String
      setState({ ...state, [field]: caster(event.target.value) })
    }
  }

  function triggerAdd() {
    onAdd(state)
    // We reset the state only if we intend on keeping the dialog open for
    // further addition; otherwise it would alter the general aspect during the
    // closing fade-out, which is visually annoying.
    if (state.keepOpen) {
      setState(DEFAULT_STATE)
    }
  }
}
