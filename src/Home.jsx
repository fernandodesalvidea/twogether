import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';

export default function Home({ user }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name1: '',
    name2: '',
    location1: '',
    location2: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValidLocation = async (location) => {
    try {
      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=ed4d79f647bb468c88f90543ffa693b1`
      );
      if (!res.ok) return false;

      const data = await res.json();
      return data?.results?.length > 0;
    } catch (err) {
      console.error('Validation error:', err);
      return false;
    }
  };

  const handleSave = async () => {
    const { name1, name2, location1, location2 } = form;

    if (!name1 || !name2 || !location1 || !location2) {
      alert('Please fill out all fields.');
      return;
    }

    const [isValid1, isValid2] = await Promise.all([
      isValidLocation(location1),
      isValidLocation(location2),
    ]);

    if (!isValid1 || !isValid2) {
      alert('Please enter valid cities (e.g., Dallas, TX or Boston, MA)');
      return;
    }

    const { error } = await supabase.from('relationship_info').insert([
      {
        user_id: user.id,
        name_1: name1,
        name_2: name2,
        location_1: location1,
        location_2: location2,
      },
    ]);

    if (error) {
      console.error('Insert error:', error);
      alert('Failed to save info.');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-2">
        Welcome to TwoDo <span role="img" aria-label="heart">💖</span>
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Let's personalize your experience.
      </p>
      <div className="space-y-4">
        <input
          name="name1"
          placeholder="Your name"
          value={form.name1}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="name2"
          placeholder="Partner's name"
          value={form.name2}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="location1"
          placeholder="Your location (e.g., Dallas, TX)"
          value={form.location1}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="location2"
          placeholder="Partner's location (e.g., Boston, MA)"
          value={form.location2}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <button
          onClick={handleSave}
          className="w-full py-2 text-white rounded bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}