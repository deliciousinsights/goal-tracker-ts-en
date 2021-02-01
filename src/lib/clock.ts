import { addSeconds, differenceInCalendarDays, parseISO } from 'date-fns'

import clockIcon from '../icons/clock-reset.png'
import { closeDay } from '../reducers/closeDay'
import store from '../store'

const STAMP_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

const clock = setInterval(checkClock, 1000)

checkForTodaysFirstUse()

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => {
    clearInterval(clock)
  })
}

const HISTORY_TRIGGER_TIME =
  process.env.NODE_ENV === 'production'
    ? '00:00:00'
    : STAMP_FORMATTER.format(addSeconds(new Date(), 5))

function checkClock() {
  const now = STAMP_FORMATTER.format(new Date())

  if (now === HISTORY_TRIGGER_TIME) {
    closePreviousDay()
  }
}

function checkForTodaysFirstUse() {
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

function closePreviousDay() {
  store.dispatch(closeDay())

  notify({
    title: 'Done for today!',
    text: 'Your progress was historized and starts anew.',
    icon: clockIcon,
    secondsVisible: 4,
  })
}

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