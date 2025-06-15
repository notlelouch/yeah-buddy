import React, { useState } from 'react';
import { Activity, User, Lock, LogIn } from 'lucide-react';

interface LoginFormProps {
  onLogin: (name: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isLoading, error }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && password.trim()) {
      await onLogin(name.trim(), password.trim());
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Activity className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Yeah Buddyyy!</h1>
          </div>
          <p className="text-green-400 opacity-80">Enter your credentials to track your gains</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border border-green-500 rounded-lg p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Username</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black border border-green-500 rounded px-3 py-2 text-green-500 focus:outline-none focus:border-green-400 transition-colors"
                placeholder="Enter your username"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Password</span>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-green-500 rounded px-3 py-2 text-green-500 focus:outline-none focus:border-green-400 transition-colors"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm p-2 border border-red-400 rounded bg-red-400/10">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !name.trim() || !password.trim()}
              className="w-full bg-green-500 text-black rounded-lg py-3 font-semibold hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>LOGIN</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center text-xs opacity-60 mt-6">
          <p>New user? Just enter your desired username and password to create an account</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;