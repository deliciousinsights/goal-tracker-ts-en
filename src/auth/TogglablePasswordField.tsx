// Togglable Password Field
// ========================
//
// Utility component that adds to the native password field a graphic toggler
// for viewing the password or not; this type of UI is preferable to a
// confirmation field, for instance, as it allows a visual check during input.

import { useState } from 'react'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import type { TextFieldProps } from '@mui/material/TextField'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export default function TogglablePasswordField(props: TextFieldProps) {
  const [visible, setVisible] = useState(false)

  const type = visible ? 'text' : 'password'
  const label = visible ? 'Hide the password' : 'See the password'
  const icon = visible ? <VisibilityOff /> : <Visibility />
  const endAdornment = (
    <InputAdornment position='end'>
      <IconButton arial-label={label} onClick={toggleVisible} title={label}>
        {icon}
      </IconButton>
    </InputAdornment>
  )

  return <TextField {...props} InputProps={{ endAdornment }} type={type} />

  function toggleVisible() {
    setVisible((visible) => !visible)
  }
}
