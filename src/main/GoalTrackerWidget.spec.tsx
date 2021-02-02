// Goal progress for today (tests)
// ===============================

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import GoalTrackerWidget from './GoalTrackerWidget'

// It's customary when describing a React component to use its JSX tag as the
// subject. This one should…
describe('<GoalTrackerWidget />', () => {
  const goal = {
    id: '0123456789abcdef01234567',
    name: 'My goal',
    target: 42,
    units: 'wombats',
  }
  describe('when not completed', () => {
    // …render as expected for an unreached goal
    // -----------------------------------------
    // We'll test four values for rate of completion: “boundaries” such as 0, 1
    // and 41 on the one hand; and another value, here 21 smack in the midddle,
    // on the other hand.
    it.each`
      progress | percentage
      ${0}     | ${0}
      ${1}     | ${2}
      ${21}    | ${50}
      ${41}    | ${98}
    `(
      'should render appropriately at progress $progress',
      ({ progress, percentage }) => {
        render(<GoalTrackerWidget goal={goal} progress={progress} />)
        // The heading component (h1, h2 or some other) should contain exactly
        // the name of the goal.
        expect(screen.getByRole('heading')).toHaveTextContent(goal.name)
        // The component with a progressbar ARIA role (which is created
        // internally by the `<LinearProgress/>` used in `<Gauge/>`) should have
        // the correct ARIA progress attribute.  This is cleaner than checking
        // for derived styling / dimensions, etc.
        expect(screen.getByRole('progressbar')).toHaveAttribute(
          'aria-valuenow',
          String(percentage)
        )
        // There should be this specific text somewhere in there for context.
        expect(
          screen.getByText(`${progress} out of ${goal.target} ${goal.units}`)
        ).toBeInTheDocument()

        // Sometimes components cannot be targeted in a meaningful way by RTL's
        // built-in selectors, because how how they're implemented React-wise.
        // For such scenarios, we have the `data-testid` prop escape hatch.  It
        // so happens that MUI's icons do have that set to their icon name, but
        // it is less semantical / resilient to change than meaningful values,
        // so we provided our own here.
        expect(screen.getByTestId('in-progress')).toBeInTheDocument()
      }
    )

    // …trigger its `onProgress` as expected
    // -------------------------------------
    it('should trigger its onProgress on click', async () => {
      const progress = 21
      // To verify that the provided callback is called correctly, the simplest
      // way is to go with a spy provided by
      // [jest.fn()](https://jestjs.io/docs/en/jest-object#mock-functions).
      const onProgress = jest.fn()
      render(
        <GoalTrackerWidget
          goal={goal}
          onProgress={onProgress}
          progress={progress}
        />
      )

      // Faithfully simulate the click.
      await userEvent.click(screen.getByRole('button'))
      expect(onProgress).toHaveBeenCalledTimes(1)
      expect(onProgress).toHaveBeenCalledWith(goal)
    })

    // …satisfy the snapshot
    // ---------------------
    // (It should have a detailed structure that is identical to the last one
    // vetted by developers using the snapshot.)
    it('should otherwise match the expected snapshot', () => {
      const { container } = render(
        <GoalTrackerWidget goal={goal} progress={21} />
      )

      expect(container).toMatchSnapshot()
    })
  })

  describe('when completed (or exceeded)', () => {
    // …render as expected for a reached (or exceeded) goal
    // ----------------------------------------------------
    // We'll test 3 values for the progress: the boundary (exact target), and
    // two higher ones (goal exceeded).
    it.each([goal.target, goal.target + 1, goal.target + 10])(
      'should render appropriately at progress %i',
      (progress) => {
        render(<GoalTrackerWidget goal={goal} progress={progress} />)

        // If we reached or exceeded the goal, we're not supposed to still see
        // the "progress on" icon, but instead should see the thumbs-up icon
        // that marks the goal as being reached.
        expect(screen.queryByTestId('in-progress')).not.toBeInTheDocument()
        expect(screen.getByTestId('completed')).toBeInTheDocument()
      }
    )

    // …satisfy the snapshot
    // ---------------------
    // (It should have a detailed structure that is identical to the last one
    // vetted by developers using the snapshot.)
    it('should otherwise match the expected snapshot', () => {
      const { container } = render(
        <GoalTrackerWidget goal={goal} progress={42} />
      )

      expect(container).toMatchSnapshot()
    })
  })
})
