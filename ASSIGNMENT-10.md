# Assigment for step 10: finalize the switch to Redux

We connected Redux to our React tree by wrapping a `<Provider>` around it, then used that in `<HomeScreen>` with a `useAppSelector()` and a bespoke selector.

Do the same thing for `<TrackerScreen>`, which will allow us to decouple it from `store.ts`, which it currently directly taps into (and because its default export changed, it doesn't provide what we're looking for anyway).

## Steps

1. Connect `<TrackerScreen>` to the store using an appropriate `useAppSelector()`.
2. Provide a bespoke selector (e.g. `selectState()`) for this connection; as it is less concise than in `HomeScreen`, you may want to make it a function outside your component. However, if you choose that route, you'll need to explicitly type its argument, as is usual with TypeScript.
3. Verify that `<TrackerScreen>` is now correctly displayed again.
4. Remember to remove the now-superfluous import of `store.ts` (ESLint should be whining about it anyhow).
