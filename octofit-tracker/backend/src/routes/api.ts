import { Router } from 'express';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

const router = Router();

router.get('/users/', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json({ data: users, count: users.length });
});

router.post('/users/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ data: user });
});

router.get('/teams/', async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json({ data: teams, count: teams.length });
});

router.post('/teams/', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json({ data: team });
});

router.get('/activities/', async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json({ data: activities, count: activities.length });
});

router.post('/activities/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json({ data: activity });
});

router.get('/leaderboard/', async (_req, res) => {
  const leaderboard = await Leaderboard.find({}).lean();
  res.json({ data: leaderboard, count: leaderboard.length });
});

router.post('/leaderboard/', async (req, res) => {
  const entry = await Leaderboard.create(req.body);
  res.status(201).json({ data: entry });
});

router.get('/workouts/', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json({ data: workouts, count: workouts.length });
});

router.post('/workouts/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json({ data: workout });
});

export default router;
