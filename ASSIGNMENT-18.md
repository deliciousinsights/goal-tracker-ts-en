# Assignment for step 18: combine root-level reducers

Our `reduceCloseDay()` reducer is ready, but not used yet.

## Objectives

We now have two reducers that both operate at root level:

1. The main reducer, or “core” one, produced by `combineReducers()` on slice reducers. It provides default state values and handles most actions.
2. Our `reduceCloseDay()` reducer, that focuses on a single action.

We need to make it so that both are used at that level. Ideally, we'll write code that can be easily augmented with new reducers of the same level, without needing to add more lines, but that's just a bonus.

## Steps

1. Implement the missing part in `src/reducers/index.ts`

## Tips

If it's not on yet, launch `npm test`: the spec in `src/reducers/index.spec.ts` will help you know when you're done (and remind you of what behavior we're expecting).

A naive implementation is absolutely possible; ideally though, we'll try to go for something a bit less repetitive, using a `for…of` loop or full-on `reduce()` call to drive the many steps of refining our final result state, one reducer at a time.

Once you wrote a working implementation, check out [reduce-reducers](https://github.com/redux-utilities/reduce-reducers#readme), that automates exactly that, and is available in our installed third-party modules. Using it will however require explicit result typing.
