import { Link } from 'react-router-dom';
import { supabase } from './supabase';

export default function Layout({ user, children }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <header className="flex flex-wrap sm:flex-nowrap justify-between items-center px-6 py-4 border-b border-slate-300 dark:border-slate-700 shadow-sm">
        <div className="mb-2 sm:mb-0 text-lg font-semibold text-purple-700 dark:text-purple-300">
          Twogether
        </div>

        <div className="flex flex-wrap gap-2 justify-center sm:justify-end w-full sm:w-auto">
          <Link
            to="/"
            className="px-4 py-2 bg-purple-100 dark:bg-purple-800 text-purple-900 dark:text-white rounded-lg hover:bg-purple-200 dark:hover:bg-purple-700 transition font-medium"
          >
            Home
          </Link>

          <Link
            to="/profile"
            className="px-4 py-2 bg-purple-100 dark:bg-purple-800 text-purple-900 dark:text-white rounded-lg hover:bg-purple-200 dark:hover:bg-purple-700 transition font-medium"
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition font-medium"
          >
            Log Out
          </button>
        </div>
      </header>

      <main className="px-6 py-8 flex justify-center">
        <div className="w-full max-w-3xl">{children}</div>
      </main>
    </div>
  );
}