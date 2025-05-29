// src/MapPage.jsx
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import { supabase } from './supabase';
import 'leaflet/dist/leaflet.css';

const API_KEY = 'ed4d79f647bb468c88f90543ffa693b1';

export default function MapPage({ user }) {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
        .from('relationship_info')
        .select('*')
        .eq('user_id', user.id)
        .limit(1)
        .maybeSingle();

        if (error) throw error;
        console.log("Fetching coords for:", data.location_1, data.location_2);

      const [startRes, endRes] = await Promise.all([
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(data.location_1)}&key=${API_KEY}`, {
    headers: {
      'Accept': 'application/json'
    }
  }),
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(data.location_2)}&key=${API_KEY}`, {
    headers: {
      'Accept': 'application/json'
    }
  })
]);

        const [startData, endData] = await Promise.all([startRes.json(), endRes.json()]);

        const coords1 = startData?.results?.[0]?.geometry;
        const coords2 = endData?.results?.[0]?.geometry;

        console.log('Start coords:', coords1);
        console.log('End coords:', coords2);

        if (!coords1 || !coords2) throw new Error('Coordinates not found');

        setCoords({ start: coords1, end: coords2 });
      } catch (err) {
        console.error('Error loading map data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading map...</div>;
  if (!coords) return <div className="text-center mt-10 text-red-500">Could not load coordinates.</div>;

  const center = [
    (coords.start.lat + coords.end.lat) / 2,
    (coords.start.lng + coords.end.lng) / 2,
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">📍 Your Long Distance Map</h2>
      <MapContainer center={center} zoom={4} scrollWheelZoom={false} style={{ height: '500px', width: '100%', borderRadius: '12px' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coords.start.lat, coords.start.lng]}>
          <Popup>Start: {coords.start.lat.toFixed(2)}, {coords.start.lng.toFixed(2)}</Popup>
        </Marker>
        <Marker position={[coords.end.lat, coords.end.lng]}>
          <Popup>End: {coords.end.lat.toFixed(2)}, {coords.end.lng.toFixed(2)}</Popup>
        </Marker>
        <Polyline
          positions={[[coords.start.lat, coords.start.lng], [coords.end.lat, coords.end.lng]]}
          pathOptions={{ color: 'purple', dashArray: '6' }}
        />
      </MapContainer>
    </div>
  );
}