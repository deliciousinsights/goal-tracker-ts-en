// Helpers
// =======

import { differenceInCalendarDays, formatISO } from 'date-fns'

import type { Goal } from '../reducers/goals'

const FORMATTERS = {
  full: new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }),
  medium: new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }),
}

type FormatterKey = keyof typeof FORMATTERS

const SPECIAL_FORMATS = ['Today', 'Yesterday']

/**
 * Format a date in a “handy” way.
 *
 * If a format is passed (as `String`), use it directly (this is what
 * TrackerScreen does, ofr instance, using the `'medium'` format), otherwise use
 * special texts for today and yesterday, and long formats otherwise.
 *
 * @export
 * @param {Date | string} date - The date to format
 * @param {FormatterKey | null} [format] - The format
 * @param {Object} [options]
 * @param {Date | string } [options.refDate=new Date()] - The date to use as a
 * reference for distance computation in order to favor special formats, if
 * available.
 * @return {String} The formatted date.
 */
export function formatDate(
  date: Date | string,
  format?: FormatterKey | null,
  { refDate = new Date() }: { refDate?: Date | string } = {}
) {
  if (typeof date === 'string') {
    date = new Date(date)
  }
  if (typeof refDate === 'string') {
    refDate = new Date(refDate)
  }
  if (format) {
    return FORMATTERS[format].format(date)
  }
  const diff = differenceInCalendarDays(refDate, date)
  return SPECIAL_FORMATS[diff] || FORMATTERS.full.format(date)
}

/**
 * Computes today's total progress and the settings' total goal value, so the
 * caller may for instance compute the overall progress rate, or the possible
 * lag-behind at the current time, etc.
 *
 * @export
 * @param {TodaysProgress} todaysProgress - Today's progress
 * @param {Goal[]} goals - Goal definitions
 * @return {{ totalProgress: number, totalTarget: number }} - Today's total
 * progression and the cumulative goal target.
 */
export function getDayCounts(todaysProgress: TodaysProgress, goals: Goal[]) {
  let [totalProgress, totalTarget] = [0, 0]

  for (const { id, target } of goals) {
    totalProgress += todaysProgress[id] || 0
    totalTarget += target
  }

  return { totalProgress, totalTarget }
}

/**
 * Formats a date as IO8601 (YYYY-MM-DD)
 *
 * @export
 * @param {Date} date - The date to format
 * @return {String} The formatted date
 */
export function isoDate(date: Date) {
  return formatISO(date, { representation: 'date' })
}
