import React from 'react';
import { ArrowLeft, Trophy, TrendingUp, Calendar, Weight } from 'lucide-react';
import { WorkoutStats } from '../types/workout';

interface StatsViewProps {
  stats: WorkoutStats;
  onBack: () => void;
}

const StatsView: React.FC<StatsViewProps> = ({ stats, onBack }) => {
  const totalWorkouts = Object.values(stats).reduce((sum, day) => sum + (day.totalWorkouts || 0), 0);
  
  const getTopPRs = () => {
    const allPRs: Array<{ exercise: string, weight: number, day: string }> = [];
    
    Object.entries(stats).forEach(([dayName, dayStats]) => {
      Object.entries(dayStats.exercises || {}).forEach(([exerciseName, exerciseStats]) => {
        allPRs.push({
          exercise: exerciseName,
          weight: exerciseStats.maxWeight,
          day: dayName
        });
      });
    });
    
    return allPRs.sort((a, b) => b.weight - a.weight).slice(0, 5);
  };

  const topPRs = getTopPRs();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-green-400 hover:text-green-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        
        <h2 className="text-2xl font-bold">WORKOUT STATS</h2>
        
        <div className="flex items-center space-x-2 text-green-400">
          <Trophy className="w-4 h-4" />
          <span>{totalWorkouts} Total</span>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-green-500 rounded-lg p-4 text-center">
          <Calendar className="w-8 h-8 mx-auto mb-2 text-green-500" />
          <div className="text-2xl font-bold">{totalWorkouts}</div>
          <div className="text-sm opacity-80">Total Workouts</div>
        </div>
        
        <div className="border border-green-500 rounded-lg p-4 text-center">
          <Trophy className="w-8 h-8 mx-auto mb-2 text-green-500" />
          <div className="text-2xl font-bold">{Object.keys(stats).length}</div>
          <div className="text-sm opacity-80">Days Trained</div>
        </div>
        
        <div className="border border-green-500 rounded-lg p-4 text-center">
          <Weight className="w-8 h-8 mx-auto mb-2 text-green-500" />
          <div className="text-2xl font-bold">{topPRs[0]?.weight || 0}kg</div>
          <div className="text-sm opacity-80">Highest PR</div>
        </div>
      </div>

      {/* Top PRs */}
      {topPRs.length > 0 && (
        <div className="border border-green-500 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            TOP PERSONAL RECORDS
          </h3>
          <div className="space-y-3">
            {topPRs.map((pr, index) => (
              <div key={`${pr.day}-${pr.exercise}`} className="flex items-center justify-between py-2 border-b border-green-500/20 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <span className="text-green-400 font-bold text-lg">#{index + 1}</span>
                  <div>
                    <div className="font-semibold">{pr.exercise}</div>
                    <div className="text-sm opacity-60">{pr.day}</div>
                  </div>
                </div>
                <div className="text-xl font-bold text-green-500">{pr.weight}kg</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Day Breakdown */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">WORKOUT BREAKDOWN</h3>
        <div className="grid gap-4">
          {Object.entries(stats).map(([dayName, dayStats]) => (
            <div key={dayName} className="border border-green-500 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-lg">{dayName}</h4>
                <div className="text-green-400">
                  {dayStats.totalWorkouts} workout{dayStats.totalWorkouts !== 1 ? 's' : ''}
                </div>
              </div>
              
              {dayStats.lastWorkout && (
                <div className="text-sm opacity-60 mb-3">
                  Last workout: {new Date(dayStats.lastWorkout).toLocaleDateString()}
                </div>
              )}

              {dayStats.exercises && Object.keys(dayStats.exercises).length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-semibold opacity-80">Exercise PRs:</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    {Object.entries(dayStats.exercises).map(([exerciseName, exerciseStats]) => (
                      <div key={exerciseName} className="flex justify-between">
                        <span className="opacity-80">{exerciseName}</span>
                        <span className="text-green-400 font-semibold">
                          {exerciseStats.maxWeight}kg × {exerciseStats.lastReps}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {totalWorkouts === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <h3 className="text-xl font-bold mb-2">No Workouts Yet</h3>
          <p className="opacity-60">Start your first workout to see stats here</p>
        </div>
      )}
    </div>
  );
};

export default StatsView;