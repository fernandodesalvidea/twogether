import { useState } from 'react';
import { supabase } from './supabase';

export default function Profile({ user }) {
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
  const redirectUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:5173/reset-password'
      : 'https://twogether.vercel.app/reset-password';

  const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
    redirectTo: redirectUrl,
  });

  if (error) {
    setMessage('❌ Failed to send reset email. Try again.');
  } else {
    setMessage('✅ Password reset email sent!');
  }
};

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-slate-800 shadow-xl rounded-xl text-slate-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p className="mb-2"><strong>Email:</strong> {user.email}</p>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Reset Password</h3>
        <button
          onClick={handleResetPassword}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Send Reset Email
        </button>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </div>
    </div>
  );
}