export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  lastSet?: {
    weight: number;
    reps: number;
  };
  completed?: boolean;
}

export interface WorkoutDay {
  name: string;
  emoji: string;
  exercises: Exercise[];
}

export interface ExerciseStats {
  maxWeight: number;
  lastWeight: number;
  lastReps: number;
  totalSets: number;
}

export interface DayStats {
  lastWorkout: string;
  totalWorkouts: number;
  exercises: Record<string, ExerciseStats>;
}

export interface WorkoutStats {
  [dayName: string]: DayStats;
}

export interface User {
  id: string;
  name: string;
  created_at: string;
}

export interface WorkoutRecord {
  id: string;
  user_id: string;
  exercise_name: string;
  day_name: string;
  weight: number;
  reps: number;
  workout_date: string;
  created_at: string;
}

export interface UserStats {
  id: string;
  user_id: string;
  day_name: string;
  total_workouts: number;
  last_workout: string | null;
  updated_at: string;
}