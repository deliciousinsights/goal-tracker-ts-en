# Assignment for step 17: displaying the Add/Update dialog

We just went through the process of wiring the “Delete” popup menu items to a deletion dialog box, and processing both cancellation and confirmation of that dialog.

We now need to do the same kind of show / cancel behavior for the other dialog, that works both in Add and Update modes.

## Objectives

1. Derive the path we took for deletion, this time for update, without implementing `onAdd` just yet.
2. Make the Add a goal button work, displaying the dialog in Add mode (instead of Update).

## Pitfall!

The dialog seems to always show up in Add mode, regardless of the selected goal for update. Look at the Redux Dev Tools and inspect the following:

- `SettingsScreen` local state (does it have the selected goal?)
- `AddSettingDialog` props (does it get passed the selected goal as `goal`?)
- `AddSettingDialog` local state (does it reflect the selected goal from its `goal` prop?)

What gives? Why do you think that is? Does that fit with what you understand from React's local state lifecycle? Then how can we (cleanly) force React to reset the dialog's state when the selected `goal` changes?

## Steps

1. Derive `openGoalDeleter` as `openGoalEditor`.
2. Pass it to the `onEditClick` prop of `GoalSetting`s.
3. Add in `AddSettingDialog`, set up similarly to `DeleteSettingDialog` but with neither `onDelete` nor `onAdd`, and looking for the `dialog` state value you used in (1).
4. Derive `openGoalEditor` as `openGoalAdder` (no argument though).
5. Pass it to the `onClick` of `Button`.
6. Verify that Update and Add modes both work well.
