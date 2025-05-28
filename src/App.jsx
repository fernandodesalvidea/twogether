import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './Auth';
import Layout from './Layout';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Home from './Home';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);

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

  useEffect(() => {
    const checkOnboarding = async () => {
      if (!session) return;
      const { data } = await supabase
        .from('relationship_info')
        .select('*')
        .eq('user_id', session.id)
        .single();

      setHasOnboarded(!!data);
    };

    if (session) checkOnboarding();
  }, [session]);

  if (loading) return <div>Loading...</div>;
  if (!session) return <Auth />;

  return (
    <Router>
      <Layout user={session}>
<Routes>
  <Route path="/home" element={<Home user={session} />} />
  <Route path="/profile" element={<Profile user={session} />} />
  <Route path="/dashboard" element={<Dashboard user={session} />} />
  <Route path="/" element={
    hasOnboarded
      ? <Dashboard user={session} />
      : <Navigate to="/home" />
  } />
  <Route path="*" element={<Navigate to="/" />} />
</Routes>
      </Layout>
    </Router>
  );
}

export default App;