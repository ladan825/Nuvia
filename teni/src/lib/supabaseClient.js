import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://nlorjvnqesbqcukhaiez.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sb3Jqdm5xZXNicWN1a2hhaWV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2NDY4OTAsImV4cCI6MjA2OTIyMjg5MH0.IXhiFQkjMxa8hhS_UeyqJcgJvN1JF71nVVvyABqqdfI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
