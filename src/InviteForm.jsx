// src/InviteForm.jsx
import { useState } from 'react';
import { supabase } from './supabase';

export default function InviteForm({ user }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendInvite = async (e) => {
    e.preventDefault();
    setMessage('');

    if (email === user.email) {
      setMessage("❌ You can't invite yourself.");
      return;
    }

    const { data: existingInvite, error: checkError } = await supabase
      .from('invites')
      .select('*')
      .eq('from_user_id', user.id)
      .eq('to_email', email)
      .single();

    if (existingInvite) {
      setMessage('❌ You already sent an invite to this user.');
      return;
    }

    const { error } = await supabase.from('invites').insert([
      {
        from_user_id: user.id,
        to_email: email,
      },
    ]);

    if (error) {
      setMessage('❌ Failed to send invite.');
    } else {
      setMessage('✅ Invite sent successfully!');
      setEmail('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-slate-800 rounded-xl shadow text-center">
      <h2 className="text-xl font-semibold mb-4">Invite Your Partner</h2>
      <form onSubmit={handleSendInvite} className="space-y-4">
        <input
          type="email"
          placeholder="Partner's Email"
          className="w-full p-3 border rounded-lg dark:bg-slate-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
        >
          Send Invite
        </button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}