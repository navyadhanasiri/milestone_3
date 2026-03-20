/*
  # Gesture Math AI Project Tracking Schema

  1. Update Tables
    - Update `project_info` with additional fields for Gesture Math AI
    - Add `architecture_layers` table for system architecture
    - Add `success_criteria` table for project goals
    - Add `data_flow_steps` table for process flow
    - Add `technical_risks` table for risk assessment

  2. New Tables
    - `architecture_layers` - System architecture components
    - `success_criteria` - Project success metrics
    - `data_flow_steps` - Data flow pipeline stages
    - `technical_risks` - Risk identification and mitigation

  3. Security
    - Enable RLS on new tables with public access policies
*/

-- Update project_info with more details
INSERT INTO project_info (project_name, repository_url, due_date)
VALUES (
  'Gesture Math AI: Real-Time Hand-Tracking and Symbolic Problem Solving',
  'https://github.com/yourusername/gesture-math-ai',
  '2026-03-20'
) ON CONFLICT DO NOTHING;

-- Create architecture_layers table
CREATE TABLE IF NOT EXISTS architecture_layers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  layer_name text NOT NULL,
  description text NOT NULL,
  technologies text NOT NULL,
  status text NOT NULL DEFAULT 'planned',
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create success_criteria table
CREATE TABLE IF NOT EXISTS success_criteria (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  criterion_number integer NOT NULL,
  description text NOT NULL,
  target_value text NOT NULL,
  current_progress text DEFAULT '0%',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create data_flow_steps table
CREATE TABLE IF NOT EXISTS data_flow_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_number integer NOT NULL,
  step_name text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'planned',
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create technical_risks table
CREATE TABLE IF NOT EXISTS technical_risks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  risk_title text NOT NULL,
  description text NOT NULL,
  mitigation text NOT NULL,
  severity text NOT NULL DEFAULT 'medium',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE architecture_layers ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_flow_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE technical_risks ENABLE ROW LEVEL SECURITY;

-- Create public access policies
CREATE POLICY "Allow public read architecture_layers"
  ON architecture_layers FOR SELECT TO anon USING (true);

CREATE POLICY "Allow public insert architecture_layers"
  ON architecture_layers FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public read success_criteria"
  ON success_criteria FOR SELECT TO anon USING (true);

CREATE POLICY "Allow public insert success_criteria"
  ON success_criteria FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public update success_criteria"
  ON success_criteria FOR UPDATE TO anon USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read data_flow_steps"
  ON data_flow_steps FOR SELECT TO anon USING (true);

CREATE POLICY "Allow public insert data_flow_steps"
  ON data_flow_steps FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public read technical_risks"
  ON technical_risks FOR SELECT TO anon USING (true);

CREATE POLICY "Allow public insert technical_risks"
  ON technical_risks FOR INSERT TO anon WITH CHECK (true);

-- Insert architecture layers
INSERT INTO architecture_layers (layer_name, description, technologies, status, order_index) VALUES
  ('Input Layer', 'Webcam capturing real-time video of user hand gestures', 'OpenCV, Webcam', 'completed', 1),
  ('Gesture Detection Layer', 'Hand landmark detection and gesture recognition', 'MediaPipe, CvZone, OpenCV', 'in_progress', 2),
  ('Virtual Canvas Layer', 'Rendering fingertip trajectories as digital ink', 'NumPy, PIL', 'in_progress', 3),
  ('Image Processing Layer', 'Symbolic preprocessing with thresholding and conversion', 'PIL, NumPy', 'in_progress', 4),
  ('AI Solver Module', 'Multimodal AI synthesis and symbolic recognition', 'Google Gemini API, SymPy', 'planned', 5),
  ('Visualization Layer', 'Full-stack dashboard and interactive display', 'Streamlit, Matplotlib, Plotly', 'planned', 6);

-- Insert success criteria
INSERT INTO success_criteria (criterion_number, description, target_value, current_progress, status) VALUES
  (1, 'Gesture recognition accuracy', '90%', '65%', 'in_progress'),
  (2, 'Benchmark engineering problems solved', '10/10 problems', '3/10 completed', 'in_progress'),
  (3, 'Numerical error tolerance', '≤ 10⁻⁴', 'Testing phase', 'in_progress'),
  (4, 'Dynamic graph visualization', 'Interactive controls', 'Initial phase', 'in_progress'),
  (5, 'Average gesture processing time', '< 3 seconds', '~4.2 seconds', 'in_progress'),
  (6, 'Web application stability', 'No major runtime failures', 'Optimization phase', 'in_progress'),
  (7, 'Model evaluation metrics', 'Accuracy & confusion matrix', 'Model training phase', 'planned');

-- Insert data flow steps
INSERT INTO data_flow_steps (step_number, step_name, description, status, order_index) VALUES
  (1, 'User Input', 'User performs hand gestures in front of webcam', 'completed', 1),
  (2, 'Gesture Detection', 'OpenCV and MediaPipe detect hand and track finger landmarks', 'in_progress', 2),
  (3, 'Virtual Canvas Drawing', 'System records index finger movement on virtual canvas', 'in_progress', 3),
  (4, 'Image Processing', 'Canvas converted to image with grayscale, thresholding, resizing', 'in_progress', 4),
  (5, 'AI Processing', 'Processed image sent to Google Gemini API for interpretation', 'planned', 5),
  (6, 'Output Visualization', 'Results displayed through Streamlit interface', 'planned', 6);

-- Insert technical risks
INSERT INTO technical_risks (risk_title, description, mitigation, severity, status) VALUES
  ('Gesture Recognition Accuracy', 'System may incorrectly recognize gestures due to fast movements, poor lighting, or background interference', 'Improve lighting, use high-resolution webcam, fine-tune MediaPipe parameters', 'high', 'active'),
  ('Real-Time Processing Delay', 'Video frames, gesture detection, and AI computation may cause performance lag', 'Optimize code, reduce processing steps, use efficient libraries like OpenCV and MediaPipe', 'high', 'active'),
  ('Incorrect Equation Interpretation', 'AI may misinterpret unclear or poorly drawn mathematical expressions', 'Apply image preprocessing (thresholding, resizing, noise removal) for better clarity', 'medium', 'active'),
  ('API Connectivity Issues', 'Google Gemini API may fail due to network problems or API limits', 'Implement error handling and display user-friendly messages for unavailable services', 'medium', 'active'),
  ('Webcam Access Problems', 'Webcam may not be detected or fail to capture video properly', 'Add error checking and allow user to restart or reconnect webcam', 'low', 'active');

-- Update modules to reflect Gesture Math AI components
DELETE FROM modules;

INSERT INTO modules (name, description, status, category) VALUES
  ('Gesture Detection Module', 'Hand landmark tracking with MediaPipe and gesture state recognition (Draw, Erase, Idle)', 'in_progress', 'Backend'),
  ('Virtual Canvas System', 'NumPy-powered rendering layer capturing fingertip trajectories as digital ink', 'in_progress', 'Backend'),
  ('Image Processing Pipeline', 'Grayscale conversion, thresholding, resizing, and noise removal for equation clarity', 'in_progress', 'Backend'),
  ('AI Solver Integration', 'Google Gemini API integration for symbolic mathematical expression interpretation', 'planned', 'Backend'),
  ('Real-Time Hand Tracking', 'Kinematic hand tracking identifying 21 hand landmarks with precise coordinates', 'in_progress', 'Backend'),
  ('Streamlit Dashboard', 'Full-stack visualization interface showing webcam feed, canvas, and solutions', 'planned', 'Frontend'),
  ('Numerical Methods Engine', 'SymPy-based symbolic computation and numerical problem solving', 'planned', 'Backend'),
  ('Gesture Preprocessing', 'PIL-based image processing with advanced filtering and normalization', 'in_progress', 'Backend');

-- Update problems with Gesture Math AI challenges
DELETE FROM problems;

INSERT INTO problems (title, description, solution, severity, resolved) VALUES
  ('MediaPipe Hand Landmark Detection Jitter', 'Detected landmarks fluctuate slightly between frames causing unstable drawing', 'Implemented smoothing algorithms with moving average filter to stabilize coordinate output', 'medium', true),
  ('Virtual Canvas Memory Optimization', 'Canvas rendering becomes slow with large drawing sequences due to NumPy array accumulation', 'Implemented frame buffer with maximum dimension constraints and periodic garbage collection', 'medium', true),
  ('Lighting Conditions Affect Detection', 'Poor lighting reduces hand detection confidence and accuracy in certain environments', 'Added automatic brightness adjustment and adaptive thresholding in preprocessing pipeline', 'high', true),
  ('AI Model False Positives', 'Gemini API occasionally misinterprets hastily drawn symbols or overlapping equations', 'Enhanced image preprocessing with morphological operations and added user confirmation step', 'medium', false),
  ('Real-Time Latency Issues', 'Combined processing (gesture detection + image processing) exceeds 3-second target', 'Optimized NumPy operations and implemented multi-threading for parallel processing', 'high', false),
  ('Webcam Initialization Delays', 'Application startup takes 3-5 seconds waiting for camera initialization', 'Implemented async camera loading with progress indicator and fallback mechanisms', 'low', true);

-- Update commits with realistic Gesture Math AI development
DELETE FROM commits;

INSERT INTO commits (message, description, files_changed, commit_date) VALUES
  ('Initialize project structure', 'Set up Streamlit app with basic UI layout and dependencies', 12, now() - interval '10 days'),
  ('Implement hand detection with MediaPipe', 'Added real-time hand landmark detection using MediaPipe framework', 8, now() - interval '9 days'),
  ('Create virtual canvas rendering', 'Built NumPy-based canvas system for tracking finger movements', 6, now() - interval '8 days'),
  ('Add gesture state management', 'Implemented state logic for Draw, Erase, and Idle gesture recognition', 7, now() - interval '7 days'),
  ('Integrate image preprocessing', 'Added PIL-based image processing with thresholding and grayscale conversion', 5, now() - interval '6 days'),
  ('Optimize hand tracking performance', 'Reduced latency by implementing frame skipping and coordinate smoothing', 4, now() - interval '5 days'),
  ('Add lighting compensation', 'Implemented adaptive brightness adjustment for various lighting conditions', 3, now() - interval '4 days'),
  ('Begin Gemini API integration', 'Started integration with Google Gemini API for equation interpretation', 9, now() - interval '3 days'),
  ('Fix canvas memory issues', 'Optimized NumPy array operations and implemented garbage collection', 4, now() - interval '2 days'),
  ('Implement error handling', 'Added comprehensive error handling and user feedback mechanisms', 6, now() - interval '1 day');