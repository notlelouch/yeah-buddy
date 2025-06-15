import React, { useState, useEffect } from 'react';
import { Clock, SkipForward, Play, Pause } from 'lucide-react';

interface RestTimerProps {
  onComplete: () => void;
  onSkip: () => void;
  duration: number; // in seconds
}

const RestTimer: React.FC<RestTimerProps> = ({ onComplete, onSkip, duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isRunning, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((duration - timeLeft) / duration) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      {/* Timer Display */}
      <div className="text-center">
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgba(34, 197, 94, 0.2)"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#22c55e"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Clock className="w-8 h-8 mb-2 text-green-500" />
            <span className="text-4xl font-bold text-green-500">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">REST TIME</h2>
        <p className="text-green-400 opacity-80">Recover before your next set</p>
      </div>

      {/* Controls */}
      <div className="flex space-x-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="flex items-center space-x-2 px-6 py-3 border border-green-500 rounded-lg hover:bg-green-500 hover:text-black transition-colors"
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isRunning ? 'Pause' : 'Resume'}</span>
        </button>
        
        <button
          onClick={onSkip}
          className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-black rounded-lg hover:bg-green-400 transition-colors"
        >
          <SkipForward className="w-4 h-4" />
          <span>Skip Rest</span>
        </button>
      </div>

      {/* Tips */}
      <div className="text-center text-sm opacity-60 max-w-md">
        <p>Use this time to hydrate, breathe deeply, and prepare for your next set. Rest is crucial for performance and recovery.</p>
      </div>
    </div>
  );
};

export default RestTimer;