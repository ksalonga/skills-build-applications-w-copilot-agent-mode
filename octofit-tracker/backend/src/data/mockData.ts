export type User = {
  id: string;
  name: string;
  email: string;
  teamId: string | null;
  fitnessLevel: string;
};

export type Team = {
  id: string;
  name: string;
  description: string;
  members: string[];
};

export type Activity = {
  id: string;
  userId: string;
  type: 'run' | 'workout' | 'cycling' | 'walk';
  durationMinutes: number;
  caloriesBurned: number;
  date: string;
};

export type LeaderboardEntry = {
  id: string;
  userId: string;
  userName: string;
  score: number;
  streak: number;
};

export type Workout = {
  id: string;
  title: string;
  focus: string;
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: string[];
};

export const users: User[] = [
  {
    id: 'u1',
    name: 'Ava Thompson',
    email: 'ava@example.com',
    teamId: 't1',
    fitnessLevel: 'intermediate',
  },
  {
    id: 'u2',
    name: 'Liam Chen',
    email: 'liam@example.com',
    teamId: 't1',
    fitnessLevel: 'advanced',
  },
  {
    id: 'u3',
    name: 'Sofia Rivera',
    email: 'sofia@example.com',
    teamId: 't2',
    fitnessLevel: 'beginner',
  },
];

export const teams: Team[] = [
  {
    id: 't1',
    name: 'Trail Blazers',
    description: 'Endurance and long-distance performance group.',
    members: ['u1', 'u2'],
  },
  {
    id: 't2',
    name: 'Core Crew',
    description: 'Strength-focused team building consistent weekly progress.',
    members: ['u3'],
  },
];

export const activities: Activity[] = [
  {
    id: 'a1',
    userId: 'u1',
    type: 'run',
    durationMinutes: 42,
    caloriesBurned: 540,
    date: '2026-09-20',
  },
  {
    id: 'a2',
    userId: 'u2',
    type: 'workout',
    durationMinutes: 35,
    caloriesBurned: 410,
    date: '2026-09-21',
  },
  {
    id: 'a3',
    userId: 'u3',
    type: 'walk',
    durationMinutes: 28,
    caloriesBurned: 180,
    date: '2026-09-22',
  },
];

export const leaderboard: LeaderboardEntry[] = [
  { id: 'l1', userId: 'u2', userName: 'Liam Chen', score: 980, streak: 8 },
  { id: 'l2', userId: 'u1', userName: 'Ava Thompson', score: 910, streak: 6 },
  { id: 'l3', userId: 'u3', userName: 'Sofia Rivera', score: 760, streak: 4 },
];

export const workouts: Workout[] = [
  {
    id: 'w1',
    title: 'Power Circuit',
    focus: 'full-body strength',
    durationMinutes: 30,
    difficulty: 'intermediate',
    equipment: ['dumbbells', 'mat'],
  },
  {
    id: 'w2',
    title: 'Tempo Run',
    focus: 'cardio endurance',
    durationMinutes: 40,
    difficulty: 'advanced',
    equipment: ['running shoes'],
  },
  {
    id: 'w3',
    title: 'Mobility Reset',
    focus: 'recovery and flexibility',
    durationMinutes: 20,
    difficulty: 'beginner',
    equipment: ['yoga mat'],
  },
];
