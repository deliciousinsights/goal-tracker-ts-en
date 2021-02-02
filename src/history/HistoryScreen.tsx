// Historique
// ==========

import { Link } from 'react-router-dom'
import { useEffect } from 'react'

import ArrowBack from '@mui/icons-material/ArrowBack'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import ClearIcon from '@mui/icons-material/Clear'
import Typography from '@mui/material/Typography'

import { clearHistory } from '../reducers/history'
import HistoryDay from './HistoryDay'
import { useAppDispatch, useAppSelector } from '../store'

export default function HistoryScreen() {
  // At first render, we adjust the document title to make the browsing history
  // usable (and not a ton of identical titles).  The [second
  // argument](https://beta.reactjs.org/learn/synchronizing-with-effects#step-2-specify-the-effect-dependencies)
  // is an empty dependency list that tells React only to run the side effect at
  // mount time.
  useEffect(() => {
    document.title = 'My history'
  }, [])

  // We're interested in the `goals` and `history` slices of our App State.  As
  // a consequence, changes to other parts of the App State wouldn't trigger a
  // re-render here.
  const { goals, history } = useAppSelector(({ goals, history }) => ({
    goals,
    history,
  }))
  // As we're about to ask the store to trigger history clearing, we need its
  // `dispatch` to send it our action.
  const dispatch = useAppDispatch()

  return (
    // When you use a button for something that is actually a link, especially a
    // [`<Link>`](https://reactrouter.com/en/main/components/link), use MUI's
    // [`component`](https://mui.com/material-ui/api/button/#props) prop to
    // alter its outermost rendered component (instead of the default `button`).
    // Props unused by `Button` are then passed as-is to the alternative
    // component (in our case, that would be the `to` prop).
    <>
      <Button component={Link} startIcon={<ArrowBack />} to='/' variant='text'>
        Back
      </Button>
      <Card className='history'>
        <CardHeader title='History' />
        <CardContent>
          {history.map((dayStats) => (
            // Always remember to define a *stable*, unique association between
            // the original data item and its component inside a `map`, [using
            // the `key=`
            // prop](https://beta.reactjs.org/learn/rendering-lists#keeping-list-items-in-order-with-key).
            // Otherwise things could get bizarre in some situations (or just
            // needlessly slow).
            <HistoryDay goals={goals} key={dayStats.date} stats={dayStats} />
          ))}
          {
            // Here's a classic example of [conditional
            // rendering](https://beta.reactjs.org/learn/conditional-rendering):
            // a condition followed by `&&` and the element.  If we also had an
            // “else” we'd go with a ternary.
            history.length === 0 && <Typography>No history yet</Typography>
          }
        </CardContent>
        {history.length > 0 && (
          <CardActions>
            <Button
              onClick={() => dispatch(clearHistory())}
              startIcon={<ClearIcon />}
              variant='contained'
            >
              Clear history
            </Button>
          </CardActions>
        )}
      </Card>
    </>
  )
}
