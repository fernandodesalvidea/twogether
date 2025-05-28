import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export default function Home({ user }) {
  const [relationship, setRelationship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelationship = async () => {
      const { data, error } = await supabase
        .from('relationship_info')
        .select('*')
        .eq('user_id', user.id)
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching relationship info:', error);
      } else {
        setRelationship(data);
      }

      setLoading(false);
    };

    fetchRelationship();
  }, [user]);

  if (loading) return <div className="text-center text-gray-500">Loading your relationship info...</div>;

  if (!relationship) return <div className="text-center text-red-500">No relationship info found.</div>;

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome back, {relationship.name_1} 💖</h1>
      <p>You and {relationship.name_2} are doing amazing 🌍</p>
      <p>
        From <strong>{relationship.location_1}</strong> to <strong>{relationship.location_2}</strong>
      </p>
      {/* Add visual distance graphic next step */}
    </div>
  );
}