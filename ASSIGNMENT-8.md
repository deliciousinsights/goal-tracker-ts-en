# Assignment for step 8: implement the missing actions in the Goals reducer

We need to implement the goal removal and update actions. Use the provided tests to verify your implementation.

# Steps

1. Implement the `addCase(removeGoal)` in the reducer.
2. Implement the `addCase(updateGoal)` in the reducer.

# Tips

- Even if Immer.js is built into Redux Toolkit and lets you do this the mutative / imperative way, a more functional / immutable approach will be more concise and easier to use here, as if you were doing vanilla Redux.
- Removal is a direct `return`, as long as you use [the correct array method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)…
- Updating also boils down to a direct `return`, using the appropriate array derivation method…
