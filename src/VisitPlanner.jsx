import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function VisitPlanner({ onDateSelect }) {
  const [date, setDate] = useState(new Date());

  const handleChange = (selectedDate) => {
    setDate(selectedDate);
    onDateSelect(selectedDate);
  };

  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md max-w-md mx-auto text-center">
      <h2 className="text-xl font-bold mb-4 text-purple-600">📅 Plan Your Next Visit</h2>
      <Calendar onChange={handleChange} value={date} />
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Selected date: <strong>{date.toDateString()}</strong>
      </p>
    </div>
  );
}