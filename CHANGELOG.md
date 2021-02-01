# Goal Tracker codebase changelog

## 8.2.0 - Jan 16, 2023

- Full English translation
- Sync AddSettingDialog local state with relevant goal in a much cleaner way
- Tackle local state / forms / events earlier (as we now do in the vanilla JS edition)
- Update all deps and address breaking changes.

## 8.1.0 - Dec 19, 2022

- Refactor Action Creators and Reducers for goal addition and daily reset so that the reducers become 100% pure again in order to facilitate their debugging, replay, etc.
- Remove obsolete "Debugger for Chrome" VSC extension (it's now a built-in feature).
- Add the "Jest" extension (its DX is now quite nice).

## 8.0.0 - Oct 8, 2022

- **TYPESCRIPT + RTK FULL MIGRATION.** A JS version is also maintained.
- Update all deps and address breaking changes.

_(former entries removed when starting the English-language fork)_
