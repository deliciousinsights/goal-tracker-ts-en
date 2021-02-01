// Default state (dev / test)
// ==========================

import { subDays } from 'date-fns'

import { isoDate } from './lib/helpers'

const DEFAULT_STATE = {
  currentUser: {
    loginState: 'logged-in',
    email: 'christophe@delicious-insights.com',
  },
  goals: [
    {
      id: '5bf57a79890a6e2c11ec9665',
      name: 'Learn React',
      target: 5,
      units: 'facets',
    },
    {
      id: '5bf57a79890a6e2c11ec9666',
      name: 'Learn Redux',
      target: 2,
      units: 'videos',
    },
    {
      id: '5bf57a79890a6e2c11ec9667',
      name: 'Learn Webpack',
      target: 3,
      units: 'doc pages',
    },
  ],
  today: isoDate(new Date()),
  todaysProgress: {
    '5bf57a79890a6e2c11ec9665': 1,
    '5bf57a79890a6e2c11ec9666': 1,
    '5bf57a79890a6e2c11ec9667': 1,
  },
  history: [
    {
      date: isoDate(subDays(new Date(), 1)),
      progresses: {
        '5bf57a79890a6e2c11ec9665': [2, 5],
        '5bf57a79890a6e2c11ec9666': [1, 2],
      },
    },
    {
      date: isoDate(subDays(new Date(), 2)),
      progresses: {
        '5bf57a79890a6e2c11ec9665': [4, 5],
        '5bf57a79890a6e2c11ec9666': [1, 2],
        '5bf57a79890a6e2c11ec9667': [2, 3],
      },
    },
    {
      date: isoDate(subDays(new Date(), 3)),
      progresses: {
        '5bf57a79890a6e2c11ec9665': [3, 5],
        '5bf57a79890a6e2c11ec9666': [2, 2],
        '5bf57a79890a6e2c11ec9667': [1, 3],
      },
    },
  ],
}

export default DEFAULT_STATE
