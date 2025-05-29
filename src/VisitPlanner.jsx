import { useState, useEffect } from 'react';
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
  const [visits, setVisits] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);

  // ✅ Make this reusable across functions
  const fetchVisits = async () => {
    const { data, error } = await supabase
      .from('visits')
      .select('*')
      .eq('user_id', user.id);
    if (!error) {
      setVisits(data);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, [user]);

  useEffect(() => {
    const match = visits.find(
      (v) => new Date(v.visit_date).toDateString() === date.toDateString()
    );
    setSelectedVisit(match || null);
  }, [date, visits]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    const { error } = await supabase.from('visits').insert([
      {
        user_id: user.id,
        visit_date: date.toISOString().slice(0, 10),
        plan: plan,
        cancel_requested: false,
      },
    ]);

    if (error) {
      console.error('Error saving visit:', error);
      setMessage('❌ Failed to save. Please try again.');
    } else {
      setMessage('✅ Visit saved!');
      setPlan('');
      fetchVisits();
    }

    setSaving(false);
  };

  const handleCancelRequest = async () => {
    if (!selectedVisit) return;

    const { error } = await supabase
      .from('visits')
      .delete()
      .eq('id', selectedVisit.id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting visit:', error);
      setMessage('❌ Failed to delete visit. Try again.');
    } else {
      setMessage('✅ Visit cancelled.');
      setSelectedVisit(null);
      fetchVisits(); // ✅ works now
    }
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
          tileClassName={({ date: tileDate }) =>
            visits.some(
              (v) =>
                new Date(v.visit_date).toDateString() === tileDate.toDateString()
            )
              ? 'react-calendar__tile--has-visit'
              : null
          }
        />
      </div>

      {selectedVisit ? (
        <div className="mb-4 p-4 bg-purple-100 dark:bg-purple-900 rounded-xl">
          <h3 className="font-semibold text-lg mb-2">🎉 Visit Plan:</h3>
          <p>{selectedVisit.plan}</p>
          {selectedVisit.cancel_requested ? (
            <p className="text-sm text-red-500 mt-2">Cancel request pending</p>
          ) : (
            <button
              onClick={handleCancelRequest}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Request Cancel
            </button>
          )}
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="What's the plan? ✈️"
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
        </>
      )}

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