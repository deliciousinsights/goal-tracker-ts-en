# Assignment for step 16: finalize `HistoryScreen`

The history screen's skeleton is already in `HistoryScreen.tsx`: we declare the component, do a fair bit of the rendering, define its connection to the app state and make `dispatch`, `goals` and `history` available.

## Objectives

1. Display the history correctly, with no errors or warnings in your browser's console.
2. Make the Clear history button work.

## Steps

1. Replace the "Coming soon…" element with a JSX expression that uses the adequate `map`. Be sure to use a stable and unique `key=` prop for each `HistoryDay`!
2. Implement the `Button`’s `onClick`

## Tips

The `HistoryDay` is all set, and imported in your module.

Look at its source (especially the `HDProps` interface) to know which props it accepts. The `stats` prop looks pretty familiar, wouldn't you say?

The `clearHistory()` action creator was imported already as well, ready to use!
