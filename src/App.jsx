import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import Auth from './Auth'
import Layout from './Layout'
import Dashboard from './Dashboard'
import Profile from './Profile'
import './index.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) return <Auth />

  return (
    <Router>
      <Layout user={session.user}>
        <Routes>
          <Route path="/" element={<Dashboard user={session.user} />} />
          <Route path="/profile" element={<Profile user={session.user} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App