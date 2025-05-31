import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setMessage('❌ Failed to update password. Try again.');
    } else {
      setMessage('✅ Password updated! Redirecting...');
      setTimeout(() => navigate('/profile'), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center text-slate-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
          >
            Update Password
          </button>
        </form>
        {message && <p className="mt-4 text-sm">{message}</p>}
      </div>
    </div>
  );
}