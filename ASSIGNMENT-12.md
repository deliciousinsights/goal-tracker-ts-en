# Assignment for step 12: progressing on goals in TrackerScreen

We need to make the "+" buttons on the main screen actually work.

# Tips

- Grab the store's dispatch using `useAppDispatch()`.
- You'll need the correct action creator, imported from the appropriate reducer module.
- The `<GoalTrackerWidget/>` components have an `onProgress` prop, remember? It takes a function that will be passed the entire goal as argument. Create a local business function you can pass to this prop, say `markGoalProgression(goal)`?
