import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';

export default function Profile({ user }) {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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

  const handleUpdateLocation = () => {
    navigate('/setup');
  };

  const handleInvitePartner = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail('', {
      redirectTo: window.location.origin + '/accept-invite'
    });

    if (error) {
      alert('❌ Failed to send invite.');
    } else {
      alert('✅ Invite email sent.');
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

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Update Location Info</h3>
        <button
          onClick={handleUpdateLocation}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Go to Setup Form
        </button>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Invite Your Partner</h3>
        <button
          onClick={handleInvitePartner}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
        >
          Send Invite Link
        </button>
      </div>
    </div>
  );
}