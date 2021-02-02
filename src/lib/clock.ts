// Daily reset (core engine)
// =========================

// The day's progress are reset every night at midnight, after having been added
// to our history.  The more common trigger, though, is when the app boots and
// its app state stores an earlier day: we then need to historize and reset
// immediately.
//
// The data processing is done by the reducer: this module is all about
// dispatching the action at the right times, and notifying the user.

import { addSeconds, differenceInCalendarDays, parseISO } from 'date-fns'

import clockIcon from '../icons/clock-reset.png'
import { closeDay } from '../reducers/closeDay'
import store from '../store'

const STAMP_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

// Start checking the time every second, so we can trigger at midnight.
const clock = setInterval(checkClock, 1000)

// Also check whether we're operating on an earlier day, hydrated back at app
// boot time, which would need an immediate trigger.
checkForTodaysFirstUse()

if (module.hot) {
  module.hot.accept()
  // During dev, HMR on this module means we need to be careful not to have
  // multiple timer intervals overlapping.  So before a new version of the
  // module comes in and gets run again, we clean up resources the current
  // version booked, such as the interval timer.
  module.hot.dispose(() => {
    clearInterval(clock)
  })
}

// In production, we reset at midnight.  In dev, we reset 5 seconds post-load,
// which is easier for interactive testing.
const HISTORY_TRIGGER_TIME =
  process.env.NODE_ENV === 'production'
    ? '00:00:00'
    : STAMP_FORMATTER.format(addSeconds(new Date(), 5))

// Deadline trigger
// ----------------

// When the webapp is open, we check for time every second to see whether we
// reached Midnight and need to trigger.
function checkClock() {
  const now = STAMP_FORMATTER.format(new Date())

  if (now === HISTORY_TRIGGER_TIME) {
    closePreviousDay()
  }
}

// Stale-state boot trigger
// ------------------------

// When the webapp loads and this module runs, we subscribe to the store in
// order to wait for its hydration to be complete (before hydration, our app
// state would default to today anyway, which needs no trigger).  Once hydration
// is over, we can check whether we're on the current day, or an older day that
// needs triggering.
function checkForTodaysFirstUse() {
  // In order to unsub once we're hydrated, we grab the bespoke unsub function
  // we get as a result of the `subscribe()`call, for later use.  This is a
  // common pub/sub API pattern.
  const unsub = store.subscribe(() => {
    const { config, today } = store.getState()
    if (!config.rehydrated) {
      return
    }

    unsub()

    const storesLastDay = parseISO(today)
    if (differenceInCalendarDays(storesLastDay, new Date()) < 0) {
      closePreviousDay()
    }
  })
}

// Internal utilities
// ------------------

// Trigger historization and notify the user (if we can).
function closePreviousDay() {
  store.dispatch(closeDay())

  notify({
    title: 'Done for today!',
    text: 'Your progress was historized and starts anew.',
    // Notice that `clockIcon` is actually a URL here, obtained through `import`
    // thanks to the bundler's asset import configuration (e.g. Webpack's
    // [`url-loader`](https://github.com/webpack/url-loader) and
    // [`file-loader`](https://github.com/webpack/file-loader)).  If that PNG is
    // below 10KB, it'll get inlined as Base64 in our bundle instead of getting
    // its own file, which is deemed a better tradeoff.
    icon: clockIcon,
    secondsVisible: 4,
  })
}

// Generic notification with controlled automatic closure.
function notify({
  title,
  text,
  icon,
  secondsVisible = 0,
}: {
  title: string
  text: string
  icon: string
  secondsVisible?: number
}) {
  if (!store.getState().config.canNotify) {
    return
  }

  const requireInteraction =
    typeof window.Notification.prototype.close === 'function' &&
    secondsVisible > 0
  const notif = new window.Notification(title, {
    body: text,
    icon,
    lang: 'en',
    requireInteraction,
    tag: 'goal-tracker',
    vibrate: [100, 50, 100, 50, 100],
  })

  if (requireInteraction) {
    notif.addEventListener('show', () => {
      setTimeout(() => notif.close(), secondsVisible * 1000)
    })
  }
}
