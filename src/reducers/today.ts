// Today's date (reducer)
// ======================

import type { AnyAction } from 'redux'

import { isoDate } from '../lib/helpers'

// No particular action, this reducer only exists to provide a default value for
// the slice.
export default function today(
  state: string = isoDate(new Date()),
  action: AnyAction
) {
  return state
}
