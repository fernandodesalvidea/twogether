// src/Auth.js
import { useState } from 'react'
import { supabase } from './supabase'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) alert(error.message)
    else alert('Check your email!' + (isSignUp ? ' to confirm your account.' : ''))

    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h2>{isSignUp ? 'Sign Up' : 'Log In'} to TwoDo</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button disabled={loading}>
          {loading ? 'Loading…' : isSignUp ? 'Sign Up' : 'Log In'}
        </button>
      </form>
      <br />
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
      </button>
    </div>
  )
}