import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';



import Landing from './Landing';
import Auth from './Auth';
import Layout from './Layout';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Home from './Home';
import Setup from './Setup';
import MapPage from './MapPage';
import VisitPlanner from './VisitPlanner';
import ResetPassword from './ResetPassword';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session?.user || null);
      setLoading(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session?.user || null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  if (loading) return <div className="text-center mt-10 text-slate-500">Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {!session && (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}

        {/* Private Routes */}
        {session && (
          <Route
            path="/*"
            element={
              <Layout user={session}>
                <Routes>
                  <Route path="/" element={<Home user={session} />} />
                  <Route path="/dashboard" element={<Dashboard user={session} />} />
                  <Route path="/profile" element={<Profile user={session} />} />
                  <Route path="/setup" element={<Setup user={session} />} />
                  <Route path="/map" element={<MapPage user={session} />} />
                  <Route path="/plan" element={<VisitPlanner user={session} />} />
                  <Route path="*" element={<Navigate to="/" />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
              </Layout>
            }
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;