import { Link } from 'react-router-dom';
import { supabase } from './supabase';

export default function Layout({ user, children }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <header className="flex justify-between items-center px-6 py-4 border-b border-slate-300 dark:border-slate-700">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded hover:bg-gray-200 dark:hover:bg-slate-600"
        >
          Log Out
        </button>

        <div className="flex gap-2 items-center">
          <Link
            to="/"
            className="px-4 py-2 bg-green-100 dark:bg-slate-700 text-green-800 dark:text-white rounded hover:bg-green-200 dark:hover:bg-slate-600 transition flex items-center gap-1"
          >
            <span role="img" aria-label="home">🏡</span> Home
          </Link>

          <Link
            to="/profile"
            className="px-4 py-2 bg-purple-100 dark:bg-slate-700 text-purple-800 dark:text-white rounded hover:bg-purple-200 dark:hover:bg-slate-600 transition"
          >
            Profile
          </Link>

        </div>
      </header>
      <main className="px-6 py-8">{children}</main>
    </div>
  );
}