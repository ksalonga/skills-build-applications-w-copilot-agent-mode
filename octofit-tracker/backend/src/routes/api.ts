import { Router } from 'express';

import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
} from '../models/index.js';

const router = Router();

const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const sanitizeDocument = <T extends Record<string, unknown>>(doc: T) => {
  const sanitized = { ...doc };
  delete sanitized._id;
  delete sanitized.__v;
  delete sanitized.createdAt;
  delete sanitized.updatedAt;
  return sanitized;
};

router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    apiBaseUrl,
    service: 'octofit-tracker-backend',
  });
});

router.get('/config', (_req, res) => {
  res.json({
    apiBaseUrl,
    codespaceName: codespaceName ?? null,
    port: 8000,
  });
});

router.get('/users/', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json({ data: users.map((user) => sanitizeDocument(user)), count: users.length });
});

router.post('/users/', async (req, res) => {
  const user = await User.create({
    id: `u${Date.now()}`,
    name: req.body.name ?? 'New User',
    email: req.body.email ?? 'newuser@example.com',
    teamId: req.body.teamId ?? null,
    fitnessLevel: req.body.fitnessLevel ?? 'beginner',
  });

  res.status(201).json({ data: sanitizeDocument(user.toObject()) });
});

router.get('/teams/', async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json({ data: teams.map((team) => sanitizeDocument(team)), count: teams.length });
});

router.post('/teams/', async (req, res) => {
  const team = await Team.create({
    id: `t${Date.now()}`,
    name: req.body.name ?? 'New Team',
    description: req.body.description ?? 'Team description',
    members: Array.isArray(req.body.members) ? req.body.members : [],
  });

  res.status(201).json({ data: sanitizeDocument(team.toObject()) });
});

router.get('/activities/', async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json({ data: activities.map((activity) => sanitizeDocument(activity)), count: activities.length });
});

router.post('/activities/', async (req, res) => {
  const activity = await Activity.create({
    id: `a${Date.now()}`,
    userId: req.body.userId ?? 'unknown-user',
    type: req.body.type ?? 'walk',
    durationMinutes: req.body.durationMinutes ?? 0,
    caloriesBurned: req.body.caloriesBurned ?? 0,
    date: req.body.date ?? new Date().toISOString().slice(0, 10),
  });

  res.status(201).json({ data: sanitizeDocument(activity.toObject()) });
});

router.get('/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).lean();
  res.json({ data: leaderboard.map((entry) => sanitizeDocument(entry)), count: leaderboard.length });
});

router.post('/leaderboard/', async (req, res) => {
  const entry = await LeaderboardEntry.create({
    id: `l${Date.now()}`,
    userId: req.body.userId ?? 'unknown-user',
    userName: req.body.userName ?? 'New User',
    score: req.body.score ?? 0,
    streak: req.body.streak ?? 0,
  });

  res.status(201).json({ data: sanitizeDocument(entry.toObject()) });
});

router.get('/workouts/', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json({ data: workouts.map((workout) => sanitizeDocument(workout)), count: workouts.length });
});

router.post('/workouts/', async (req, res) => {
  const workout = await Workout.create({
    id: `w${Date.now()}`,
    title: req.body.title ?? 'New Workout',
    focus: req.body.focus ?? 'general fitness',
    durationMinutes: req.body.durationMinutes ?? 20,
    difficulty: req.body.difficulty ?? 'beginner',
    equipment: Array.isArray(req.body.equipment) ? req.body.equipment : [],
  });

  res.status(201).json({ data: sanitizeDocument(workout.toObject()) });
});

export { apiBaseUrl };
export default router;
