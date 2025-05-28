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



<Link to="/" className="text-2xl font-bold flex items-center gap-1">
  <span>🏠</span> <span>TwoDo</span> <span>💖</span>
</Link>

        <Link to="/profile">
          <button>Profile</button>
        </Link>
      </nav>

      <main style={{ padding: '2rem' }}>{children}</main>
    </div>
  )
}