// Gauge (tests)
// =============

import { render, screen } from '@testing-library/react'

import Gauge from './Gauge'

describe('<Gauge />', () => {
  it('should render appropriately', () => {
    render(<Gauge value={50} />)
    // We grab the component with an ARIA role of progress bar (defined
    // internally by the `<LinearProgress/>` in our `<Gauge/>`).
    const progressBar = screen.getByRole('progressbar')
    // We check it is in “determinate” mode (it doesn't cycle over and over)
    expect(progressBar).toHaveClass('MuiLinearProgress-determinate')
    // We check our custom style is indeed applied
    expect(progressBar).toHaveStyle({ height: '8px' })
    // We check the normalized value
    expect(progressBar).toHaveAttribute('aria-valuenow', '50')
  })

  it('should normalize value on custom max', () => {
    render(<Gauge value={20} max={80} />)
    // We check the normalized value
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '25'
    )
  })

  it('should otherwise match the expected snapshots', () => {
    const { container } = render(<Gauge value={50} />)

    // We just make sure the
    // [snapshot](https://jestjs.io/docs/en/snapshot-testing) vetted in
    // development matches the current one.
    expect(container).toMatchSnapshot()
  })
})
