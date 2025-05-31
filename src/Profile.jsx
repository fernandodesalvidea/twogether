import { useState } from 'react';
import { supabase } from './supabase';

export default function Profile({ user }) {
  const [name, setName] = useState(user.user_metadata?.name || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    const { error } = await supabase.auth.updateUser({
      data: { name }
    });

    if (error) {
      setMessage('❌ Failed to update.');
    } else {
      setMessage('✅ Profile updated!');
    }

    setSaving(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">My Profile</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300">Email</label>
        <input
          type="email"
          value={user.email}
          disabled
          className="w-full px-4 py-2 rounded border border-slate-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 text-slate-800 dark:text-white"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>

      {message && <p className="mt-4 text-center text-sm text-red-500 dark:text-red-400">{message}</p>}
    </div>
  );
}