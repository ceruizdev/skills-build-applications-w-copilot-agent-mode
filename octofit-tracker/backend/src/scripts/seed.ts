import mongoose from 'mongoose';
import { Activity, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([User.deleteMany({}), Team.deleteMany({}), Activity.deleteMany({}), Workout.deleteMany({})]);

    const users = await User.create([
      { username: 'alex.runner', email: 'alex.runner@example.com', displayName: 'Alex Runner', fitnessLevel: 'intermediate' },
      { username: 'sam.cyclist', email: 'sam.cyclist@example.com', displayName: 'Sam Cyclist', fitnessLevel: 'advanced' },
      { username: 'jordan.moves', email: 'jordan.moves@example.com', displayName: 'Jordan Moves', fitnessLevel: 'beginner' },
      { username: 'taylor.strength', email: 'taylor.strength@example.com', displayName: 'Taylor Strength', fitnessLevel: 'intermediate' },
    ]);

    await Team.create([
      {
        name: 'Mergington Movers',
        description: 'Friendly daily activity challenge team.',
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Peak Performers',
        description: 'Training together and aiming higher each week.',
        members: [users[1]._id, users[3]._id],
      },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 35, distanceKm: 5.2, points: 52, notes: 'Morning neighborhood run' },
      { user: users[0]._id, type: 'strength', durationMinutes: 40, points: 40, notes: 'Full-body circuit' },
      { user: users[1]._id, type: 'cycling', durationMinutes: 60, distanceKm: 18.5, points: 74, notes: 'Trail ride' },
      { user: users[1]._id, type: 'running', durationMinutes: 28, distanceKm: 4.6, points: 46, notes: 'Tempo intervals' },
      { user: users[2]._id, type: 'walking', durationMinutes: 30, distanceKm: 2.4, points: 24, notes: 'Walk with friends' },
      { user: users[3]._id, type: 'strength', durationMinutes: 50, points: 50, notes: 'Upper-body strength session' },
      { user: users[3]._id, type: 'walking', durationMinutes: 25, distanceKm: 2, points: 20, notes: 'Recovery walk' },
    ]);

    await Workout.create([
      {
        title: 'Starter Step Circuit',
        description: 'A gentle full-body circuit to build consistency.',
        fitnessLevel: 'beginner',
        durationMinutes: 20,
        exercises: ['March in place', 'Bodyweight squats', 'Wall push-ups', 'Stretching'],
      },
      {
        title: 'Steady Run Builder',
        description: 'A balanced interval session for improving endurance.',
        fitnessLevel: 'intermediate',
        durationMinutes: 30,
        exercises: ['Warm-up walk', 'Easy run', 'Tempo intervals', 'Cool-down'],
      },
      {
        title: 'Peak Power Session',
        description: 'A demanding strength and conditioning workout.',
        fitnessLevel: 'advanced',
        durationMinutes: 45,
        exercises: ['Burpees', 'Jump squats', 'Push-ups', 'Mountain climbers', 'Plank'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
