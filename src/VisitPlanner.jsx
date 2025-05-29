import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './CustomCalendar.css'; // custom styling
import { motion } from 'framer-motion';

export default function VisitPlanner() {
  const [date, setDate] = useState(new Date());

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

      <div className="flex justify-center">
        <Calendar
          onChange={setDate}
          value={date}
          className="rounded-xl shadow-md custom-calendar"
        />
      </div>

      <div className="mt-6 text-center text-lg text-slate-700 dark:text-slate-200">
        Selected date: <span className="font-semibold">{date.toDateString()}</span>
      </div>
    </motion.div>
  );
}