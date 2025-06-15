import { WorkoutDay } from '../types/workout';

export const workoutData: WorkoutDay[] = [
  {
    name: "Push Day",
    emoji: "💪",
    exercises: [
      { name: "Barbell Bench Press", sets: 4, reps: "8-10" },
      { name: "Incline Dumbbell Press", sets: 3, reps: "10-12" },
      { name: "Overhead Press", sets: 4, reps: "8-10" },
      { name: "Lateral Raises", sets: 3, reps: "12-15" },
      { name: "Tricep Dips", sets: 3, reps: "10-12" },
      { name: "Close Grip Bench Press", sets: 3, reps: "10-12" },
      { name: "Overhead Tricep Extension", sets: 3, reps: "12-15" }
    ]
  },
  {
    name: "Pull Day",
    emoji: "🔙",
    exercises: [
      { name: "Deadlifts", sets: 4, reps: "6-8" },
      { name: "Pull-ups/Lat Pulldowns", sets: 4, reps: "8-12" },
      { name: "Barbell Rows", sets: 4, reps: "8-10" },
      { name: "Cable Rows", sets: 3, reps: "10-12" },
      { name: "Face Pulls", sets: 3, reps: "12-15" },
      { name: "Barbell Curls", sets: 3, reps: "10-12" },
      { name: "Hammer Curls", sets: 3, reps: "12-15" },
      { name: "Cable Curls", sets: 3, reps: "12-15" }
    ]
  },
  {
    name: "Legs Day",
    // emoji: "🦵",s
    exercises: [
      { name: "Squats", sets: 4, reps: "8-10" },
      { name: "Romanian Deadlifts", sets: 4, reps: "10-12" },
      { name: "Bulgarian Split Squats", sets: 3, reps: "12 each leg" },
      { name: "Leg Press", sets: 3, reps: "12-15" },
      { name: "Leg Curls", sets: 3, reps: "12-15" },
      { name: "Calf Raises", sets: 4, reps: "15-20" },
      { name: "Walking Lunges", sets: 3, reps: "12 each leg" }
    ]
  },
  {
    name: "Upper Body",
    emoji: "💯",
    exercises: [
      { name: "Incline Barbell Press", sets: 4, reps: "8-10" },
      { name: "T-Bar Rows", sets: 4, reps: "8-10" },
      { name: "Dumbbell Press", sets: 3, reps: "10-12" },
      { name: "Cable Crossovers", sets: 3, reps: "12-15" },
      { name: "Shrugs", sets: 3, reps: "12-15" },
      { name: "Upright Rows", sets: 3, reps: "10-12" },
      { name: "Skull Crushers", sets: 3, reps: "12-15" },
      { name: "Preacher Curls", sets: 3, reps: "12-15" }
    ]
  },
  {
    name: "Lower Body",
    emoji: "🏋️",
    exercises: [
      { name: "Front Squats", sets: 4, reps: "8-10" },
      { name: "Stiff Leg Deadlifts", sets: 4, reps: "10-12" },
      { name: "Leg Extensions", sets: 3, reps: "12-15" },
      { name: "Leg Curls", sets: 3, reps: "12-15" },
      { name: "Hip Thrusts", sets: 3, reps: "12-15" },
      { name: "Calf Raises", sets: 4, reps: "15-20" },
      { name: "Glute Bridges", sets: 3, reps: "15-20" }
    ]
  },
  {
    name: "Full Body",
    emoji: "🔥",
    exercises: [
      { name: "Compound Squats", sets: 3, reps: "10-12" },
      { name: "Push-ups", sets: 3, reps: "12-15" },
      { name: "Pull-ups", sets: 3, reps: "8-12" },
      { name: "Overhead Press", sets: 3, reps: "10-12" },
      { name: "Bent Over Rows", sets: 3, reps: "10-12" },
      { name: "Dumbbell Lunges", sets: 3, reps: "12 each leg" },
      { name: "Plank", sets: 3, reps: "60 seconds" },
      { name: "Burpees", sets: 3, reps: "10-15" }
    ]
  }
];