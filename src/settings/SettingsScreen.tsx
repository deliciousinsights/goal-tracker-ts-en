import { useEffect } from 'react'

export default function SettingsScreen() {
  useEffect(() => {
    document.title = 'My settings'
  }, [])

  return <h1>Settings coming soon</h1>
}
