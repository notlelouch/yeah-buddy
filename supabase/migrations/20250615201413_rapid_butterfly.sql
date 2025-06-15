/*
  # Create users and workout tracking tables

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `password` (text)
      - `created_at` (timestamp)
    - `workout_records`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `exercise_name` (text)
      - `day_name` (text)
      - `weight` (numeric)
      - `reps` (integer)
      - `workout_date` (date)
      - `created_at` (timestamp)
    - `user_stats`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `day_name` (text)
      - `total_workouts` (integer)
      - `last_workout` (date)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  password text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workout_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  exercise_name text NOT NULL,
  day_name text NOT NULL,
  weight numeric NOT NULL DEFAULT 0,
  reps integer NOT NULL DEFAULT 0,
  workout_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  day_name text NOT NULL,
  total_workouts integer DEFAULT 0,
  last_workout date,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, day_name)
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Users can read and update their own data
CREATE POLICY "Users can manage own data"
  ON users
  FOR ALL
  USING (true);

-- Users can manage their own workout records
CREATE POLICY "Users can manage own workout records"
  ON workout_records
  FOR ALL
  USING (true);

-- Users can manage their own stats
CREATE POLICY "Users can manage own stats"
  ON user_stats
  FOR ALL
  USING (true);