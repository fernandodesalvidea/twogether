import { useState } from 'react';
import { supabase } from './supabase';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) setMessage('❌ ' + error.message);
    else setMessage('✅ Check your email!' + (isSignUp ? ' Confirm your account.' : ''));

    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage('❌ Enter your email to reset password.');
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://twogether.vercel.app/reset-password',
    });

    if (error) setMessage('❌ ' + error.message);
    else setMessage('✅ Reset link sent to your email!');
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-300 mb-2">
          Welcome to Twogether
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          A space for couples who love and plan together 💜
        </p>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            disabled={loading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all"
          >
            {loading ? 'Loading…' : isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        {!isSignUp && (
          <button
            onClick={handleForgotPassword}
            className="mt-3 text-sm text-purple-700 dark:text-purple-300 hover:underline transition"
          >
            Forgot your password?
          </button>
        )}

        {message && <p className="mt-4 text-sm text-center">{message}</p>}

        <div className="text-center mt-6">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMessage('');
            }}
            className="text-sm text-purple-700 dark:text-purple-300 hover:underline transition"
          >
            {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}