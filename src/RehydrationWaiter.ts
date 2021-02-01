// Rehydration Waiter
// ==================
//
// Tiny component based on the `rehydrated` flag in the App State, allowing us
// to avoid rendering UI too early (before the app state is hydrated back by
// redux-persist). We are thus spared a double rendering (which would be very
// visible due to CSS transitions on the gauges) when the app boots up.

import { useAppSelector } from './store'

export default function RehydrationWaiter({
  children,
}: {
  children: JSX.Element
}) {
  // @ts-expect-error
  const rehydrated = useAppSelector(({ config: { rehydrated } }) => rehydrated)
  return rehydrated ? children : null
}
