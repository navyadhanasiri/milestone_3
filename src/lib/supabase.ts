import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Module = {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in_progress' | 'planned';
  category: string;
  created_at: string;
  updated_at: string;
};

export type Problem = {
  id: string;
  title: string;
  description: string;
  solution: string;
  severity: 'low' | 'medium' | 'high';
  resolved: boolean;
  created_at: string;
  updated_at: string;
};

export type Commit = {
  id: string;
  message: string;
  description: string;
  files_changed: number;
  commit_date: string;
  created_at: string;
};

export type ProjectInfo = {
  id: string;
  project_name: string;
  repository_url: string;
  due_date: string;
  created_at: string;
  updated_at: string;
};
