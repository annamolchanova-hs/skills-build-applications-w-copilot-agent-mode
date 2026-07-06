"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const router = (0, express_1.Router)();
router.get('/users/', async (_req, res) => {
    const users = await user_1.User.find({}).lean();
    res.json({ data: users, count: users.length });
});
router.post('/users/', async (req, res) => {
    const user = await user_1.User.create(req.body);
    res.status(201).json({ data: user });
});
router.get('/teams/', async (_req, res) => {
    const teams = await team_1.Team.find({}).lean();
    res.json({ data: teams, count: teams.length });
});
router.post('/teams/', async (req, res) => {
    const team = await team_1.Team.create(req.body);
    res.status(201).json({ data: team });
});
router.get('/activities/', async (_req, res) => {
    const activities = await activity_1.Activity.find({}).lean();
    res.json({ data: activities, count: activities.length });
});
router.post('/activities/', async (req, res) => {
    const activity = await activity_1.Activity.create(req.body);
    res.status(201).json({ data: activity });
});
router.get('/leaderboard/', async (_req, res) => {
    const leaderboard = await leaderboard_1.Leaderboard.find({}).lean();
    res.json({ data: leaderboard, count: leaderboard.length });
});
router.post('/leaderboard/', async (req, res) => {
    const entry = await leaderboard_1.Leaderboard.create(req.body);
    res.status(201).json({ data: entry });
});
router.get('/workouts/', async (_req, res) => {
    const workouts = await workout_1.Workout.find({}).lean();
    res.json({ data: workouts, count: workouts.length });
});
router.post('/workouts/', async (req, res) => {
    const workout = await workout_1.Workout.create(req.body);
    res.status(201).json({ data: workout });
});
exports.default = router;
