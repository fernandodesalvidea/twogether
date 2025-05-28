import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import HomeVisual from './HomeVisual'; // ✅ make sure this file exists in src/

const API_KEY = 'ed4d79f647bb468c88f90543ffa693b1';

export default function Home({ user }) {
  const [relationship, setRelationship] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCoords = async (location) => {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${API_KEY}`
    );
    const data = await res.json();
    return data?.results?.[0]?.geometry;
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const toRad = (deg) => deg * (Math.PI / 180);
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = R * c;
    const distanceMi = distanceKm * 0.621371;
    return { km: distanceKm.toFixed(1), mi: distanceMi.toFixed(1) };
  };

  useEffect(() => {
    const fetchRelationship = async () => {
      const { data, error } = await supabase
        .from('relationship_info')
        .select('*')
        .eq('user_id', user.id)
        .limit(1)
        .maybeSingle();

      if (error || !data) {
        console.error('Error fetching relationship info:', error);
        setLoading(false);
        return;
      }

      setRelationship(data);

      try {
        const [coords1, coords2] = await Promise.all([
          fetchCoords(data.location_1),
          fetchCoords(data.location_2),
        ]);

        if (coords1 && coords2) {
          const result = calculateDistance(
            coords1.lat,
            coords1.lng,
            coords2.lat,
            coords2.lng
          );
          setDistance(result);
        }
      } catch (err) {
        console.error('Error calculating distance:', err);
      }

      setLoading(false);
    };

    fetchRelationship();
  }, [user]);

  if (loading)
    return <div className="text-center text-gray-500">Loading your relationship info...</div>;

  if (!relationship)
    return <div className="text-center text-red-500">No relationship info found.</div>;

  return (
    <HomeVisual
      name1={relationship.name_1}
      name2={relationship.name_2}
      loc1={relationship.location_1}
      loc2={relationship.location_2}
      km={distance?.km}
      mi={distance?.mi}
    />
  );
}