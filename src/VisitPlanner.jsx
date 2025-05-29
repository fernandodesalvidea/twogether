import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';
import { motion } from 'framer-motion';
import { supabase } from './supabase';

export default function VisitPlanner({ user }) {
  const [date, setDate] = useState(new Date());
  const [plan, setPlan] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    const { error } = await supabase.from('visits').insert([
      {
        user_id: user.id,
        visit_date: date.toISOString().slice(0, 10), // store as YYYY-MM-DD
        plan: plan
      }
    ]);

    if (error) {
      console.error('Error saving visit:', error);
      setMessage('❌ Failed to save. Please try again.');
    } else {
      setMessage('✅ Visit saved!');
      setPlan('');
    }

    setSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-2xl mx-auto p-6 mt-10 bg-white dark:bg-slate-800 rounded-2xl shadow-xl"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-slate-800 dark:text-white">
        📅 Plan Your Next Visit
      </h2>

      <p className="text-center text-slate-600 dark:text-slate-300 mb-4">
        Choose a date to look forward to!
      </p>

      <div className="flex justify-center mb-4">
        <Calendar
          onChange={setDate}
          value={date}
          className="rounded-xl shadow-md custom-calendar"
        />
      </div>

      <input
        type="text"
        placeholder="What's the plan?"
        value={plan}
        onChange={(e) => setPlan(e.target.value)}
        className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 mb-3"
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
      >
        {saving ? 'Saving...' : 'Save Visit'}
      </button>

      {message && (
        <p className="mt-3 text-center text-sm text-red-500 dark:text-red-400">
          {message}
        </p>
      )}

      <div className="mt-6 text-center text-lg text-slate-700 dark:text-slate-200">
        Selected date: <span className="font-semibold">{date.toDateString()}</span>
      </div>
    </motion.div>
  );
}