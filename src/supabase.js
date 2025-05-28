import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pnsdjanfacxdrqjmtcll.supabase.co/'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuc2RqYW5mYWN4ZHJxam10Y2xsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NTM3MjksImV4cCI6MjA2NDAyOTcyOX0.2gaYOhs1jKXA3LZbhKpWGOwW3UP3UdVeW2jmEaDQCqo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)