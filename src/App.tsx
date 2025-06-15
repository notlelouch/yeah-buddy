import React, { useState, useEffect } from 'react';
import { Activity, Calendar, Trophy, Target, LogOut } from 'lucide-react';
import LoginForm from './components/LoginForm';
import DaySelector from './components/DaySelector';
import WorkoutSession from './components/WorkoutSession';
import StatsView from './components/StatsView';
import { workoutData } from './data/workoutData';
import { AuthService } from './services/authService';
import { WorkoutService } from './services/workoutService';
import type { WorkoutDay, Exercise, WorkoutStats, User } from './types/workout';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'workout' | 'stats'>('home');
  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);
  const [workoutStats, setWorkoutStats] = useState<WorkoutStats>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for existing user on mount
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      loadWorkoutStats(user.id);
    }
  }, []);

  const loadWorkoutStats = async (userId: string) => {
    try {
      const stats = await WorkoutService.getWorkoutStats(userId);
      setWorkoutStats(stats);
    } catch (error) {
      console.error('Failed to load workout stats:', error);
    }
  };

  const handleLogin = async (name: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const user = await AuthService.login(name, password);
      AuthService.setCurrentUser(user);
      setCurrentUser(user);
      await loadWorkoutStats(user.id);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setWorkoutStats({});
    setCurrentView('home');
    setSelectedDay(null);
    setError(null);
  };

  const handleStartWorkout = (day: WorkoutDay) => {
    setSelectedDay(day);
    setCurrentView('workout');
  };

  const handleCompleteWorkout = async (completedExercises: Exercise[]) => {
    if (!selectedDay || !currentUser) return;

    try {
      setIsLoading(true);
      await WorkoutService.completeWorkout(currentUser.id, selectedDay.name, completedExercises);
      await loadWorkoutStats(currentUser.id);
      setCurrentView('home');
      setSelectedDay(null);
    } catch (error) {
      setError('Failed to save workout data');
      console.error('Error completing workout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'workout':
        return selectedDay ? (
          <WorkoutSession
            day={selectedDay}
            onComplete={handleCompleteWorkout}
            onExit={() => {
              setCurrentView('home');
              setSelectedDay(null);
            }}
            isLoading={isLoading}
          />
        ) : null;
      case 'stats':
        return (
          <StatsView
            stats={workoutStats}
            onBack={() => setCurrentView('home')}
          />
        );
      default:
        return (
          <DaySelector
            days={workoutData}
            onSelectDay={handleStartWorkout}
            workoutStats={workoutStats}
          />
        );
    }
  };

  // Show login form if user is not authenticated
  if (!currentUser) {
    return (
      <LoginForm
        onLogin={handleLogin}
        isLoading={isLoading}
        error={error}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono">
      {/* Header */}
      <header className="border-b border-green-500 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-6 h-6" />
            <h1 className="text-xl font-bold">Go Hard, {currentUser.name}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* <span className="text-sm opacity-80">Welcome, {currentUser.name}</span> */}
            
            {currentView === 'home' && (
              <button
                onClick={() => setCurrentView('stats')}
                className="flex items-center space-x-2 px-3 py-2 rounded border border-green-500 hover:bg-green-500 hover:text-black transition-colors"
              >
                <Trophy className="w-4 h-4" />
                <span>Stats</span>
              </button>
            )}
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Error Display */}
      {error && (
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-2 text-red-300 hover:text-red-100"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;
