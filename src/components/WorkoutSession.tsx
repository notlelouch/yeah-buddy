import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, SkipForward, Weight } from 'lucide-react';
import { WorkoutDay, Exercise } from '../types/workout';
import ExerciseCard from './ExerciseCard';
import RestTimer from './RestTimer';

interface WorkoutSessionProps {
  day: WorkoutDay;
  onComplete: (exercises: Exercise[]) => void;
  onExit: () => void;
  isLoading?: boolean;
}

const WorkoutSession: React.FC<WorkoutSessionProps> = ({ day, onComplete, onExit, isLoading = false }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>(day.exercises);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);

  const currentExercise = exercises[currentExerciseIndex];
  const isLastSet = currentSet === currentExercise.sets;
  const isLastExercise = currentExerciseIndex === exercises.length - 1;

  const handleSetComplete = (weight?: number, reps?: number) => {
    if (isLastSet && (weight !== undefined && reps !== undefined)) {
      // Update the exercise with last set data
      const updatedExercises = [...exercises];
      updatedExercises[currentExerciseIndex] = {
        ...currentExercise,
        lastSet: { weight, reps },
        completed: true
      };
      setExercises(updatedExercises);
      
      // Move to next exercise or complete workout
      if (isLastExercise) {
        onComplete(updatedExercises);
      } else {
        setCurrentExerciseIndex(prev => prev + 1);
        setCurrentSet(1);
      }
    } else {
      // Just move to next set
      if (currentSet < currentExercise.sets) {
        setCurrentSet(prev => prev + 1);
        setIsResting(true);
      }
    }
  };

  const handleRestComplete = () => {
    setIsResting(false);
  };

  const handleSkipRest = () => {
    setIsResting(false);
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
      setCurrentSet(1);
      setIsResting(false);
    }
  };

  const completedExercises = exercises.filter(ex => ex.completed).length;

  if (isResting) {
    return (
      <RestTimer
        onComplete={handleRestComplete}
        onSkip={handleSkipRest}
        duration={180} // 3 minutes
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onExit}
          disabled={isLoading}
          className="flex items-center space-x-2 text-green-400 hover:text-green-300 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit</span>
        </button>
        
        <div className="text-center">
          <h2 className="text-xl font-bold">{day.name}</h2>
          <p className="text-sm opacity-60">
            {completedExercises}/{exercises.length} exercises completed
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-green-400">
          <CheckCircle className="w-4 h-4" />
          <span>{Math.round((completedExercises / exercises.length) * 100)}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(completedExercises / exercises.length) * 100}%` }}
        />
      </div>

      {/* Current Exercise */}
      <ExerciseCard
        exercise={currentExercise}
        currentSet={currentSet}
        onSetComplete={handleSetComplete}
        showWeightInput={isLastSet}
        isLoading={isLoading}
      />

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePreviousExercise}
          disabled={currentExerciseIndex === 0 || isLoading}
          className="flex items-center space-x-2 px-4 py-2 border border-green-500 rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-green-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="text-center">
          <p className="text-sm opacity-60">
            Exercise {currentExerciseIndex + 1} of {exercises.length}
          </p>
        </div>

        <div className="flex items-center space-x-2 text-green-400">
          <Weight className="w-4 h-4" />
          <span>Set {currentSet}/{currentExercise.sets}</span>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black border border-green-500 rounded-lg p-6 flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
            <span>Saving workout...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutSession;