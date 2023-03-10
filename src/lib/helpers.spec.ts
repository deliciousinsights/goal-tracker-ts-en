// Helpers (tests)
// ===============

import { subDays } from 'date-fns'

import { formatDate, getDayCounts, isoDate } from './helpers'
import { mockGoal } from '../testHelpers'

describe('formatDate', () => {
  it('should render today properly', () => {
    const today = new Date()
    expect(formatDate(today)).toBe('Today')
  })

  it('should render yesterday properly', () => {
    const yesterday = subDays(new Date(), 1)
    expect(formatDate(yesterday)).toBe('Yesterday')
  })

  it('should render any other date with a long date form', () => {
    expect(formatDate('2016-03-03', null, { refDate: '2016-03-06' })).toBe(
      'Thursday, 3 March 2016'
    )
  })

  it('should honor a custom format in French, if provided', () => {
    expect(formatDate('2016-03-06', 'medium')).toBe('6 March 2016')
  })
})

describe('getDayCounts', () => {
  const goals = [
    mockGoal({ id: '0', target: 10 }),
    mockGoal({ id: '1', target: 5 }),
    mockGoal({ id: '2', target: 27 }),
  ]

  it('should properly compute totals on full progress info', () => {
    expect(getDayCounts({ 0: 1, 1: 2, 2: 3 }, goals)).toEqual({
      totalProgress: 6,
      totalTarget: 42,
    })
  })

  it('should properly compute totals on partial progress info', () => {
    expect(getDayCounts({ 0: 1, 2: 3 }, goals)).toEqual({
      totalProgress: 4,
      totalTarget: 42,
    })
  })

  it('should properly compute zero totals on empty progress info', () => {
    expect(getDayCounts({}, goals)).toEqual({
      totalProgress: 0,
      totalTarget: 42,
    })
  })

  it('should properly compute zero totals on empty goals', () => {
    expect(getDayCounts({}, [])).toEqual({ totalProgress: 0, totalTarget: 0 })
    expect(getDayCounts({ 0: 1, 1: 2, 2: 3 }, [])).toEqual({
      totalProgress: 0,
      totalTarget: 0,
    })
  })
})

describe('isoDate', () => {
  it('should properly format its argument', () => {
    expect(isoDate(new Date(0))).toEqual('1970-01-01')
  })
})
