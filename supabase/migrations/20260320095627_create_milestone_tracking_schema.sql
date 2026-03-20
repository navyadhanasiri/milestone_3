/*
  # Milestone 3 Status Report Database Schema

  1. New Tables
    - `project_info`
      - `id` (uuid, primary key)
      - `project_name` (text)
      - `repository_url` (text)
      - `due_date` (date)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `modules`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `status` (text) - 'completed', 'in_progress', 'planned'
      - `category` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `problems`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `solution` (text)
      - `severity` (text) - 'low', 'medium', 'high'
      - `resolved` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `commits`
      - `id` (uuid, primary key)
      - `message` (text)
      - `description` (text)
      - `files_changed` (integer)
      - `commit_date` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public access (since this is a demo/report application)
*/

-- Create project_info table
CREATE TABLE IF NOT EXISTS project_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name text NOT NULL DEFAULT 'Milestone 3 Project',
  repository_url text DEFAULT '',
  due_date date DEFAULT '2026-03-20',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create modules table
CREATE TABLE IF NOT EXISTS modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'planned',
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create problems table
CREATE TABLE IF NOT EXISTS problems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  solution text DEFAULT '',
  severity text NOT NULL DEFAULT 'medium',
  resolved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create commits table
CREATE TABLE IF NOT EXISTS commits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL,
  description text DEFAULT '',
  files_changed integer DEFAULT 0,
  commit_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE project_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE commits ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (demo application)
CREATE POLICY "Allow public read access to project_info"
  ON project_info FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert to project_info"
  ON project_info FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update to project_info"
  ON project_info FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to modules"
  ON modules FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert to modules"
  ON modules FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update to modules"
  ON modules FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete from modules"
  ON modules FOR DELETE
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to problems"
  ON problems FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert to problems"
  ON problems FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update to problems"
  ON problems FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete from problems"
  ON problems FOR DELETE
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to commits"
  ON commits FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert to commits"
  ON commits FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public delete from commits"
  ON commits FOR DELETE
  TO anon
  USING (true);

-- Insert sample data
INSERT INTO project_info (project_name, repository_url, due_date)
VALUES ('Milestone 3 - Status Report System', 'https://github.com/yourusername/milestone3', '2026-03-20');

INSERT INTO modules (name, description, status, category) VALUES
  ('Database Schema', 'Designed and implemented Supabase database with tables for project tracking, modules, problems, and commits', 'completed', 'Backend'),
  ('Dashboard Layout', 'Created responsive dashboard with navigation and main content area', 'completed', 'Frontend'),
  ('Module Tracker', 'Interface for tracking implemented, in-progress, and planned modules', 'completed', 'Frontend'),
  ('Problem Logger', 'System for documenting technical challenges and solutions', 'completed', 'Frontend'),
  ('Commit History', 'Display of development activity and commit timeline', 'completed', 'Frontend'),
  ('Progress Visualization', 'Charts and metrics showing project completion status', 'in_progress', 'Frontend'),
  ('Export to PDF', 'Generate formatted PDF report from dashboard data', 'planned', 'Feature');

INSERT INTO problems (title, description, solution, severity, resolved) VALUES
  (
    'Supabase RLS Configuration',
    'Initial difficulty setting up Row Level Security policies for public access without authentication',
    'Configured policies to allow anonymous access using TO anon with appropriate USING(true) clauses for the demo application',
    'medium',
    true
  ),
  (
    'State Management Complexity',
    'Managing state across multiple components for modules, problems, and commits became complex',
    'Implemented custom hooks for data fetching and state management, creating useModules, useProblems, and useCommits hooks',
    'medium',
    true
  ),
  (
    'Real-time Updates',
    'Need to implement real-time updates when data changes in Supabase',
    'Planning to implement Supabase real-time subscriptions in next phase',
    'low',
    false
  );

INSERT INTO commits (message, description, files_changed, commit_date) VALUES
  ('Initial project setup', 'Set up Vite + React + TypeScript with Tailwind CSS', 8, now() - interval '7 days'),
  ('Add Supabase configuration', 'Integrated Supabase client and environment variables', 3, now() - interval '6 days'),
  ('Create database schema', 'Designed and implemented database tables with RLS policies', 1, now() - interval '5 days'),
  ('Build dashboard layout', 'Created main dashboard structure with responsive design', 4, now() - interval '4 days'),
  ('Implement module tracker', 'Added module tracking interface with status indicators', 5, now() - interval '3 days'),
  ('Add problem logging', 'Created problem/solution tracking component', 3, now() - interval '2 days'),
  ('Build commit history display', 'Implemented commit timeline visualization', 2, now() - interval '1 day'),
  ('Add progress metrics', 'Created progress calculation and display components', 4, now());