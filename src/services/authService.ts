import { supabase } from '../lib/supabase';
import type { User } from '../types/workout';

export class AuthService {
  static async login(name: string, password: string): Promise<User> {
    try {
      // First, try to find existing user
      const { data: existingUser, error: findError } = await supabase
        .from('users')
        .select('*')
        .eq('name', name)
        .single();

      if (findError && findError.code !== 'PGRST116') {
        throw new Error('Database error occurred');
      }

      if (existingUser) {
        // User exists, verify password
        if (existingUser.password === password) {
          return {
            id: existingUser.id,
            name: existingUser.name,
            created_at: existingUser.created_at
          };
        } else {
          throw new Error('Invalid password');
        }
      } else {
        // User doesn't exist, create new user
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert([{ name, password }])
          .select()
          .single();

        if (createError) {
          if (createError.code === '23505') {
            throw new Error('Username already exists');
          }
          throw new Error('Failed to create account');
        }

        return {
          id: newUser.id,
          name: newUser.name,
          created_at: newUser.created_at
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  static logout(): void {
    localStorage.removeItem('currentUser');
  }

  static getCurrentUser(): User | null {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  static setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}