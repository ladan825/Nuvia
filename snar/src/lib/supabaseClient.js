import { createClient } from "@supabase/supabase-js";

// Replace with your actual project credentials
const supabaseUrl = "https://bzzgrlkeqxzpobeoeqly.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6emdybGtlcXh6cG9iZW9lcWx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNDA3NzYsImV4cCI6MjA3NTgxNjc3Nn0.IpjpuZbefyLrK9m4f8yFSFwsfOHLnYIkEr01HWY3vRs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
