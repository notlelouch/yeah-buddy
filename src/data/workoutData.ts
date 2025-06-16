
import { WorkoutDay } from '../types/workout';

export const workoutData: WorkoutDay[] = [
  {
    name: "Push Strength",
    emoji: "Monday",
    exercises: [
      { name: "Barbell Bench Press", sets: 4, reps: "4-6" },
      { name: "Incline Barbell or Dumbbell Press", sets: 3, reps: "6-8" },
      { name: "Cable Flyes or Pec Deck Fly", sets: 3, reps: "12-15" },
      { name: "Standing Overhead Press (Barbell or Dumbbell)", sets: 3, reps: "4-6" },
      { name: "Lateral Raises", sets: 2, reps: "12-15" },
      { name: "Weighted Dips or Close-Grip Bench Press", sets: 3, reps: "6-8" },
      { name: "Skull Crushers or Overhead Tricep Extension", sets: 2, reps: "8-10" }
      // (Optional brief core stability; uncomment if you track core here)
      // { name: "Pallof Press or Plank", sets: 1, reps: "30-45 sec or 10-12 each side" }
    ]
  },
  {
    name: "Pull Strength",
    emoji: "Tuesday",
    exercises: [
      { name: "Deadlift Variation (Conventional/Sumo/Trap-Bar)", sets: 4, reps: "4-6" },
      { name: "Barbell Row or Pendlay Row", sets: 3, reps: "5-7" },
      { name: "Weighted Pull-Ups or Lat Pulldowns", sets: 3, reps: "6-8" },
      { name: "Barbell or EZ-Bar Curls", sets: 3, reps: "6-8" },
      { name: "Incline Dumbbell Curls or Hammer Curls", sets: 2, reps: "10-12" },
      { name: "Face Pulls or Reverse Pec Deck", sets: 2, reps: "12-15" }
      // { name: "Ab Wheel Rollouts or Side Plank", sets: 1, reps: "8-12 or 30-45 sec" }
    ]
  },
  {
    name: "Legs",
    emoji: "Wednesday",
    exercises: [
      { name: "Back Squat or Front Squat", sets: 4, reps: "5-8" },
      { name: "Romanian Deadlift or Hip Thrust", sets: 3, reps: "8-12" },
      { name: "Bulgarian Split Squats or Walking Lunges", sets: 3, reps: "8-10 each leg" },
      { name: "Leg Press", sets: 3, reps: "8-10 each leg" },
      { name: "Leg Curls (Machine or Nordic)", sets: 3, reps: "10-12" },
      { name: "Leg Extension (Machine)", sets: 3, reps: "10-12" },
      { name: "Calf Raises (Standing or Seated)", sets: 3, reps: "12-15" }
      // Optional light arm finisher or core can go here if desired and recovered.
    ]
  },
  {
    name: "Push Hypertrophy",
    emoji: "Thursday",
    exercises: [
    { name: "Chest Dips or Decline Dumbbell Press", sets: 3, reps: "8-12" },
    { name: "Low-Incline Dumbbell Press (15°-20°) or Machine Incline Press", sets: 3, reps: "10-12" },
    { name: "Flat Dumbbell Flyes or Cable Crossovers (from high to low)", sets: 3, reps: "12-15" },
    { name: "Incline Cable Flyes (or Pec Deck at incline angle)", sets: 2, reps: "12-15" },
    { name: "Dumbbell Pullover or Landmine Press (light-medium)", sets: 2, reps: "10-12" },
    { name: "Lateral Raises", sets: 3, reps: "12-15" },
    { name: "Cable Pushdowns or Skull Crushers", sets: 3, reps: "10-15" },
    { name: "Overhead Tricep Extension (Cable or Dumbbell)", sets: 2, reps: "12-15" },
    // (Optional superset finisher if you have energy)
    // { name: "Cable Chest Fly + Tricep Extension Superset", sets: 1, reps: "12-15 each" },
    // (Optional brief core)
    // { name: "Pallof Press or Plank", sets: 1, reps: "30-45 sec or 10-12 each side" }
    ]
  },
  {
    name: "Pull Hypertrophy",
    emoji: "Friday", 
    exercises: [
      { name: "Chest-Supported Row or Cable Row", sets: 3, reps: "8-12" },
      { name: "Lat Pulldown or Pull-Up Variation", sets: 3, reps: "8-12" },
      { name: "Single-Arm Dumbbell Row", sets: 3, reps: "10-12 each side" },
      { name: "Hammer Curls", sets: 3, reps: "6-8" },
      { name: "Preacher Curls", sets: 3, reps: "10-12" },
      { name: "Face Pulls or Reverse Pec Deck", sets: 2, reps: "12-15" }
      // { name: "Back Extensions (bodyweight or light)", sets: 1, reps: "10-12" },
      // { name: "Ab Wheel Rollouts or Side Plank", sets: 1, reps: "8-12 or 30-45 sec" }
    ]
  },
  {
    name: "Full Body (Optional / Recovery)",
    emoji: "Saturday",
    exercises: [
      { name: "Goblet Squat or Bodyweight Squat", sets: 2, reps: "10-12" },
      { name: "Push-Ups (bodyweight)", sets: 2, reps: "12-15" },
      { name: "Inverted Rows or Light Pull-Ups", sets: 2, reps: "8-12" },
      { name: "Dumbbell Lunges or Step-Ups", sets: 2, reps: "10-12 each leg" },
      { name: "Band Pull-Aparts / Face Pulls", sets: 2, reps: "15-20" },
      { name: "Plank or Pallof Press", sets: 2, reps: "30-45 sec or 10-12" }
    ]
  }
];
