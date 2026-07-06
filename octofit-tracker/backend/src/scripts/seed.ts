import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ava Patel', email: 'ava@example.com', age: 29, fitnessGoal: 'Improve endurance' },
      { name: 'Noah Kim', email: 'noah@example.com', age: 34, fitnessGoal: 'Build strength' },
      { name: 'Mina Chen', email: 'mina@example.com', age: 27, fitnessGoal: 'Increase mobility' },
    ]);

    await Team.insertMany([
      { name: 'River Runners', members: [users[0].name, users[1].name], goal: 'Complete a 10K relay' },
      { name: 'Core Crew', members: [users[2].name], goal: 'Master bodyweight strength' },
    ]);

    await Activity.insertMany([
      { type: 'Run', durationMinutes: 30, calories: 320, userId: users[0]._id.toString() },
      { type: 'Yoga', durationMinutes: 45, calories: 180, userId: users[2]._id.toString() },
      { type: 'Strength', durationMinutes: 60, calories: 410, userId: users[1]._id.toString() },
    ]);

    await Leaderboard.insertMany([
      { user: users[0].name, score: 1280, streak: 6 },
      { user: users[1].name, score: 1160, streak: 4 },
      { user: users[2].name, score: 1100, streak: 5 },
    ]);

    await Workout.insertMany([
      { title: 'Morning Mobility', durationMinutes: 20, difficulty: 'Easy', target: 'Flexibility' },
      { title: 'Interval Sprint Circuit', durationMinutes: 35, difficulty: 'Hard', target: 'Cardio' },
      { title: 'Upper Body Strength', durationMinutes: 50, difficulty: 'Moderate', target: 'Strength' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
