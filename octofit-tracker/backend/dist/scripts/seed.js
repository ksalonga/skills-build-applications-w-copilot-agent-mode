import 'dotenv/config';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const seedUsers = [
    { id: 'u1', name: 'Ava Thompson', email: 'ava@example.com', teamId: 't1', fitnessLevel: 'intermediate' },
    { id: 'u2', name: 'Liam Chen', email: 'liam@example.com', teamId: 't1', fitnessLevel: 'advanced' },
    { id: 'u3', name: 'Sofia Rivera', email: 'sofia@example.com', teamId: 't2', fitnessLevel: 'beginner' },
    { id: 'u4', name: 'Noah Patel', email: 'noah@example.com', teamId: 't2', fitnessLevel: 'intermediate' },
];
const seedTeams = [
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
        members: ['u3', 'u4'],
    },
];
const seedActivities = [
    { id: 'a1', userId: 'u1', type: 'run', durationMinutes: 42, caloriesBurned: 540, date: '2026-09-20' },
    { id: 'a2', userId: 'u2', type: 'workout', durationMinutes: 35, caloriesBurned: 410, date: '2026-09-21' },
    { id: 'a3', userId: 'u3', type: 'walk', durationMinutes: 28, caloriesBurned: 180, date: '2026-09-22' },
    { id: 'a4', userId: 'u4', type: 'cycling', durationMinutes: 50, caloriesBurned: 610, date: '2026-09-23' },
];
const seedLeaderboard = [
    { id: 'l1', userId: 'u2', userName: 'Liam Chen', score: 980, streak: 8 },
    { id: 'l2', userId: 'u1', userName: 'Ava Thompson', score: 910, streak: 6 },
    { id: 'l3', userId: 'u4', userName: 'Noah Patel', score: 840, streak: 5 },
    { id: 'l4', userId: 'u3', userName: 'Sofia Rivera', score: 760, streak: 4 },
];
const seedWorkouts = [
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
    {
        id: 'w4',
        title: 'Hill Intervals',
        focus: 'explosive power',
        durationMinutes: 25,
        difficulty: 'advanced',
        equipment: ['stopwatch'],
    },
];
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await User.deleteMany({});
        await Team.deleteMany({});
        await Activity.deleteMany({});
        await LeaderboardEntry.deleteMany({});
        await Workout.deleteMany({});
        await User.insertMany(seedUsers);
        await Team.insertMany(seedTeams);
        await Activity.insertMany(seedActivities);
        await LeaderboardEntry.insertMany(seedLeaderboard);
        await Workout.insertMany(seedWorkouts);
        console.log('Database seeding complete');
        console.log(`Seeded ${seedUsers.length} users, ${seedTeams.length} teams, ${seedActivities.length} activities, ${seedLeaderboard.length} leaderboard entries, and ${seedWorkouts.length} workouts.`);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
    finally {
        await mongoose.disconnect();
    }
}
if (import.meta.url === `file://${process.argv[1]}`) {
    seedDatabase();
}
export { seedDatabase };
