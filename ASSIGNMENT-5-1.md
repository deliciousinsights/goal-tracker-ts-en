# Assigment 1 of step 5: derive the 2nd test for `<Gauge />`

We just wrote the first test for `<Gauge />`, which verifies many aspects of the final DOM are properly defined.

We now want to verify the component correctly accounts for the `max` prop. Implement the second test (_“it should normalize value on custom max”_) to confirm that.

## Steps

1. Remove the `.todo` from the definition and add the test function's body.
2. Render `<Gauge />` with appropriate `value` and `max` props.
3. Confirm that the `aria-valuenow` attribute does reflect the normalized percentage of `value` over `max`

## Tips

- Don't use the default value for your explicit `max`, otherwise you won't actually verify it's taken into account!
- Define `value` in such a way that the percentage obtained in `aria-valuenow` is different from that in the first test, to verify as you go that the percentage isn't hard-coded 😉
