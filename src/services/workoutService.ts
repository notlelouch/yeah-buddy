import { supabase } from '../lib/supabase';
import type { Exercise, WorkoutStats, DayStats, ExerciseStats } from '../types/workout';

export class WorkoutService {
  static async saveWorkoutRecord(
    userId: string,
    dayName: string,
    exerciseName: string,
    weight: number,
    reps: number
  ): Promise<void> {
    const { error } = await supabase
      .from('workout_records')
      .insert([{
        user_id: userId,
        day_name: dayName,
        exercise_name: exerciseName,
        weight,
        reps
      }]);

    if (error) {
      throw new Error('Failed to save workout record');
    }
  }

  static async updateUserStats(userId: string, dayName: string): Promise<void> {
    const today = new Date().toISOString().split('T')[0];

    const { error } = await supabase
      .from('user_stats')
      .upsert([{
        user_id: userId,
        day_name: dayName,
        total_workouts: 1,
        last_workout: today,
        updated_at: new Date().toISOString()
      }], {
        onConflict: 'user_id,day_name',
        ignoreDuplicates: false
      });

    if (error) {
      // If upsert fails, try to update existing record
      const { data: existing } = await supabase
        .from('user_stats')
        .select('total_workouts')
        .eq('user_id', userId)
        .eq('day_name', dayName)
        .single();

      if (existing) {
        await supabase
          .from('user_stats')
          .update({
            total_workouts: existing.total_workouts + 1,
            last_workout: today,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId)
          .eq('day_name', dayName);
      }
    }
  }

  static async getWorkoutStats(userId: string): Promise<WorkoutStats> {
    try {
      // Get user stats
      const { data: userStats, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', userId);

      if (statsError) {
        console.error('Error fetching user stats:', statsError);
        return {};
      }

      // Get workout records for exercise PRs
      const { data: workoutRecords, error: recordsError } = await supabase
        .from('workout_records')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (recordsError) {
        console.error('Error fetching workout records:', recordsError);
        return {};
      }

      // Process data into WorkoutStats format
      const stats: WorkoutStats = {};

      // Initialize with user stats
      userStats?.forEach(stat => {
        stats[stat.day_name] = {
          lastWorkout: stat.last_workout || '',
          totalWorkouts: stat.total_workouts,
          exercises: {}
        };
      });

      // Add exercise data
      workoutRecords?.forEach(record => {
        if (!stats[record.day_name]) {
          stats[record.day_name] = {
            lastWorkout: record.workout_date,
            totalWorkouts: 0,
            exercises: {}
          };
        }

        const exerciseName = record.exercise_name;
        const currentExercise = stats[record.day_name].exercises[exerciseName];

        if (!currentExercise) {
          stats[record.day_name].exercises[exerciseName] = {
            maxWeight: record.weight,
            lastWeight: record.weight,
            lastReps: record.reps,
            totalSets: 1
          };
        } else {
          // Update max weight if current is higher
          if (record.weight > currentExercise.maxWeight) {
            stats[record.day_name].exercises[exerciseName].maxWeight = record.weight;
          }
          // Update last weight and reps (most recent)
          stats[record.day_name].exercises[exerciseName].lastWeight = record.weight;
          stats[record.day_name].exercises[exerciseName].lastReps = record.reps;
          stats[record.day_name].exercises[exerciseName].totalSets += 1;
        }
      });

      return stats;
    } catch (error) {
      console.error('Error in getWorkoutStats:', error);
      return {};
    }
  }

  static async completeWorkout(
    userId: string,
    dayName: string,
    exercises: Exercise[]
  ): Promise<void> {
    try {
      // Save workout records for exercises with completed sets
      const completedExercises = exercises.filter(ex => ex.completed && ex.lastSet);
      
      for (const exercise of completedExercises) {
        if (exercise.lastSet) {
          await this.saveWorkoutRecord(
            userId,
            dayName,
            exercise.name,
            exercise.lastSet.weight,
            exercise.lastSet.reps
          );
        }
      }

      // Update user stats
      await this.updateUserStats(userId, dayName);
    } catch (error) {
      console.error('Error completing workout:', error);
      throw new Error('Failed to save workout data');
    }
  }
}