# Assignment 2 of step 5: derive the `<GoalTrackerWidget />` test for reached/exceeded goal

We just wrote a test for `<GoalTrackerWidget />` in a context of unreached goal, which verifies many aspects of the final DOM are properly defined.

We now want to verify the render is good in a context of reached (or even exceeded) goal, specifically in terms of which icon is used. Implement the second test (_“it should render appropriately”_) to confirm that.

## Steps

1. Remove the `.todo` from the definition and prefix the signature with a `it.each([])`
2. Fill in the scenarios array with a few well-chosen progress values.
3. Make test names dynamic using `%i` for the progress, and declare the `progress` argument in the test callback.
4. Render `<GoalTrackerWidget />` with the appropriate `progress` prop.
5. Confirm the icon identified by the “completed” `testid` is indeed there.
6. Confirm the icon identified by the in-progress” `testid` **is not there**.

## Tips

- We don't care about other aspects of the render, they were tested already in the first scenario and are deemed invariant.
- To request something _that isn't supposed to be there_, use `queryBy…` instead of `getBy…`. Note that as long as you haven't inverted the assertion that follows, the Testing-Library plugin for ESLint will squeal, as a `queryBy` for a presence (as opposed to absence) test is bad practice.
- To invert an assertion, use `expect(…).not.to…` instead of `expect(…).to…`.
