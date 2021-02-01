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
  useEffect(() => {
    document.title = 'My history'
  }, [])

  const { goals, history } = useAppSelector(({ goals, history }) => ({
    goals,
    history,
  }))
  const dispatch = useAppDispatch()

  return (
    <>
      <Button component={Link} startIcon={<ArrowBack />} to='/' variant='text'>
        Back
      </Button>
      <Card className='history'>
        <CardHeader title='History' />
        <CardContent>
          {history.map((dayStats) => (
            <HistoryDay goals={goals} key={dayStats.date} stats={dayStats} />
          ))}
          {history.length === 0 && <Typography>No history yet</Typography>}
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
