import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';

const API_KEY = 'ed4d79f647bb468c88f90543ffa693b1'; // Replace this with your actual OpenCage key

export default function Home({ user }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name1: '',
    name2: '',
    location1: '',
    location2: '',
  });

  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);

 
const fetchSuggestions = async (query, setSuggestions) => {
  if (!query) {
    setSuggestions([]);
    return;
  }

  try {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        query
      )}&key=${API_KEY}&limit=5`
    );
    const data = await res.json();
    const results = data.results.map((result) => result.formatted);
    setSuggestions(results);
  } catch (err) {
    console.error('Error fetching suggestions:', err);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'location1') fetchSuggestions(value, setSuggestions1);
    if (name === 'location2') fetchSuggestions(value, setSuggestions2);
  };

  const selectSuggestion = (locationKey, suggestion) => {
    setForm((prev) => ({ ...prev, [locationKey]: suggestion }));
    if (locationKey === 'location1') setSuggestions1([]);
    if (locationKey === 'location2') setSuggestions2([]);
  };

  

  const handleSave = async () => {
    const { name1, name2, location1, location2 } = form;

    if (!name1 || !name2 || !location1 || !location2) {
      alert('Please fill out all fields.');
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
        <div className="relative">
          <input
            name="location1"
            placeholder="Your location"
            value={form.location1}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          {suggestions1.length > 0 && (
            <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border rounded shadow mt-1 max-h-40 overflow-y-auto">
              {suggestions1.map((sugg, i) => (
                <li
                  key={i}
                  onClick={() => selectSuggestion('location1', sugg)}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                >
                  {sugg}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative">
          <input
            name="location2"
            placeholder="Partner's location"
            value={form.location2}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          {suggestions2.length > 0 && (
            <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border rounded shadow mt-1 max-h-40 overflow-y-auto">
              {suggestions2.map((sugg, i) => (
                <li
                  key={i}
                  onClick={() => selectSuggestion('location2', sugg)}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                >
                  {sugg}
                </li>
              ))}
            </ul>
          )}
        </div>

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