import { useEffect } from 'react'

export default function HistoryScreen() {
  useEffect(() => {
    document.title = 'My history'
  }, [])

  return <h1>History coming soon</h1>
}
