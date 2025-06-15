import React from 'react';
import { Calendar, Trophy, TrendingUp } from 'lucide-react';
import { WorkoutDay, WorkoutStats } from '../types/workout';

interface DaySelectorProps {
  days: WorkoutDay[];
  onSelectDay: (day: WorkoutDay) => void;
  workoutStats: WorkoutStats;
}

const DaySelector: React.FC<DaySelectorProps> = ({ days, onSelectDay, workoutStats }) => {
  const getLastWorkoutDate = (dayName: string) => {
    const stats = workoutStats[dayName];
    if (!stats?.lastWorkout) return null;
    
    const date = new Date(stats.lastWorkout);
    return date.toLocaleDateString();
  };

  const getTotalWorkouts = (dayName: string) => {
    return workoutStats[dayName]?.totalWorkouts || 0;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">SELECT WORKOUT DAY</h2>
        <p className="text-green-400">Choose your training session</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {days.map((day) => {
          const lastWorkout = getLastWorkoutDate(day.name);
          const totalWorkouts = getTotalWorkouts(day.name);

          return (
            <button
              key={day.name}
              onClick={() => onSelectDay(day)}
              className="group relative p-6 border border-green-500 rounded-lg hover:bg-green-500 hover:text-black transition-colors duration-300 text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{day.emoji}</span>
                <div className="flex items-center space-x-2 opacity-60 group-hover:opacity-80">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm">{totalWorkouts}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">{day.name}</h3>
              <p className="text-sm opacity-80 mb-3">
                {day.exercises.length} exercises
              </p>
              
              {lastWorkout && (
                <div className="flex items-center space-x-2 text-xs opacity-60">
                  <Calendar className="w-3 h-3" />
                  <span>Last: {lastWorkout}</span>
                </div>
              )}
              
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <TrendingUp className="w-4 h-4" />
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-center text-xs opacity-60 mt-8">
        <p>TAP A DAY TO START YOUR WORKOUT SESSION</p>
      </div>
    </div>
  );
};

export default DaySelector;