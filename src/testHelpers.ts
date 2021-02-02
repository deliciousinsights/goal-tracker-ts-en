// Test Helpers
// ============

import ObjectID from 'bson-objectid'

import type { Goal } from './reducers/goals'

// With TS, we can't just slap partial literal objects everywhere for our tests.
// Our mock goals need to “look like a Goal", hence this shared mocking helper.
export function mockGoal(data: Partial<Goal>) {
  return {
    id: ObjectID().toHexString(),
    name: 'A goal',
    target: 1,
    units: 'units',
    ...data,
  }
}
