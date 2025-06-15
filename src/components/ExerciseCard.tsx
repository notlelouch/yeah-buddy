import React, { useState } from 'react';
import { CheckCircle, Weight, RotateCcw } from 'lucide-react';
import { Exercise } from '../types/workout';

interface ExerciseCardProps {
  exercise: Exercise;
  currentSet: number;
  onSetComplete: (weight?: number, reps?: number) => void;
  showWeightInput: boolean;
  isLoading?: boolean;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  currentSet,
  onSetComplete,
  showWeightInput,
  isLoading = false
}) => {
  const [weight, setWeight] = useState<string>('');
  const [reps, setReps] = useState<string>('');

  const handleSubmit = () => {
    if (showWeightInput && weight && reps) {
      onSetComplete(parseFloat(weight), parseInt(reps));
    } else {
      onSetComplete();
    }
  };

  const isLastSet = currentSet === exercise.sets;

  return (
    <div className="border border-green-500 rounded-lg p-6 space-y-6">
      {/* Exercise Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">{exercise.name}</h3>
        <div className="flex justify-center items-center space-x-4 text-green-400">
          <span>Set {currentSet}/{exercise.sets}</span>
          <span>•</span>
          <span>{exercise.reps} reps</span>
        </div>
      </div>

      {/* Set Progress */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: exercise.sets }, (_, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm ${
              i < currentSet - 1
                ? 'bg-green-500 border-green-500 text-black'
                : i === currentSet - 1
                ? 'border-green-500 text-green-500'
                : 'border-gray-600 text-gray-600'
            }`}
          >
            {i < currentSet - 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
          </div>
        ))}
      </div>

      {/* Weight and Reps Input (Last Set Only) */}
      {showWeightInput && isLastSet && (
        <div className="space-y-4">
          <h4 className="text-center text-green-400 font-semibold">
            FINAL SET - RECORD YOUR PR
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm opacity-80 mb-2">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0"
                disabled={isLoading}
                className="w-full bg-black border border-green-500 rounded px-3 py-2 text-green-500 focus:outline-none focus:border-green-400 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm opacity-80 mb-2">Reps</label>
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                placeholder="0"
                disabled={isLoading}
                className="w-full bg-black border border-green-500 rounded px-3 py-2 text-green-500 focus:outline-none focus:border-green-400 disabled:opacity-50"
              />
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={(showWeightInput && isLastSet && (!weight || !reps)) || isLoading}
          className="px-8 py-3 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : isLastSet ? (
            <>
              <Weight className="w-4 h-4" />
              <span>Complete Exercise</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Complete Set</span>
            </>
          )}
        </button>
      </div>

      {/* Instructions */}
      <div className="text-center text-xs opacity-60">
        {isLastSet ? (
          <p>Enter weight and reps for your final set to track PR</p>
        ) : (
          <p>Complete this set, then rest before the next one</p>
        )}
      </div>
    </div>
  );
};

export default ExerciseCard;