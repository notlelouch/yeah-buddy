import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          password: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          password: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          password?: string;
          created_at?: string;
        };
      };
      workout_records: {
        Row: {
          id: string;
          user_id: string;
          exercise_name: string;
          day_name: string;
          weight: number;
          reps: number;
          workout_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          exercise_name: string;
          day_name: string;
          weight: number;
          reps: number;
          workout_date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          exercise_name?: string;
          day_name?: string;
          weight?: number;
          reps?: number;
          workout_date?: string;
          created_at?: string;
        };
      };
      user_stats: {
        Row: {
          id: string;
          user_id: string;
          day_name: string;
          total_workouts: number;
          last_workout: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          day_name: string;
          total_workouts?: number;
          last_workout?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          day_name?: string;
          total_workouts?: number;
          last_workout?: string | null;
          updated_at?: string;
        };
      };
    };
  };
};