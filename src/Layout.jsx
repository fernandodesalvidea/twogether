import { Link } from 'react-router-dom'
import { supabase } from './supabase'

export default function Layout({ children, user }) {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <div>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          borderBottom: '1px solid #ccc',
        }}
      >
        <button onClick={handleLogout}>Log Out</button>

        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
            TwoDo 💖
          </div>
        </Link>

        <Link to="/profile">
          <button>Profile</button>
        </Link>
      </nav>

      <main style={{ padding: '2rem' }}>{children}</main>
    </div>
  )
}