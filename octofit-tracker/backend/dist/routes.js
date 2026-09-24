import { Router } from 'express';
import { Activity, SiteStat, Team, User, Workout } from './models.js';
const router = Router();
router.post('/visits', async (_request, response, next) => {
    try {
        const siteStat = await SiteStat.findOneAndUpdate({ key: 'site' }, { $inc: { visits: 1 } }, { new: true, upsert: true, setDefaultsOnInsert: true });
        response.json({ visits: siteStat.visits });
    }
    catch (error) {
        next(error);
    }
});
router.get('/users', async (_request, response, next) => {
    try {
        response.json(await User.find().sort({ createdAt: -1 }));
    }
    catch (error) {
        next(error);
    }
});
router.post('/users', async (request, response, next) => {
    try {
        response.status(201).json(await User.create(request.body));
    }
    catch (error) {
        next(error);
    }
});
router.get('/users/:id', async (request, response, next) => {
    try {
        const user = await User.findById(request.params.id);
        if (!user) {
            response.status(404).json({ error: 'User not found' });
            return;
        }
        response.json(user);
    }
    catch (error) {
        next(error);
    }
});
router.get('/teams', async (_request, response, next) => {
    try {
        response.json(await Team.find().populate('members', 'username displayName'));
    }
    catch (error) {
        next(error);
    }
});
router.post('/teams', async (request, response, next) => {
    try {
        response.status(201).json(await Team.create(request.body));
    }
    catch (error) {
        next(error);
    }
});
router.post('/teams/:id/members', async (request, response, next) => {
    try {
        const team = await Team.findByIdAndUpdate(request.params.id, { $addToSet: { members: request.body.userId } }, { new: true, runValidators: true }).populate('members', 'username displayName');
        if (!team) {
            response.status(404).json({ error: 'Team not found' });
            return;
        }
        response.json(team);
    }
    catch (error) {
        next(error);
    }
});
router.get('/activities', async (request, response, next) => {
    try {
        const filter = typeof request.query.user === 'string' ? { user: request.query.user } : {};
        response.json(await Activity.find(filter).populate('user', 'username displayName').sort({ completedAt: -1 }));
    }
    catch (error) {
        next(error);
    }
});
router.post('/activities', async (request, response, next) => {
    try {
        response.status(201).json(await Activity.create(request.body));
    }
    catch (error) {
        next(error);
    }
});
router.get('/leaderboard', async (_request, response, next) => {
    try {
        const leaderboard = await Activity.aggregate([
            { $group: { _id: '$user', points: { $sum: '$points' }, activities: { $sum: 1 } } },
            { $sort: { points: -1 } },
            { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
            { $unwind: '$user' },
            { $project: { _id: 0, user: { _id: '$user._id', username: '$user.username', displayName: '$user.displayName' }, points: 1, activities: 1 } },
        ]);
        response.json(leaderboard);
    }
    catch (error) {
        next(error);
    }
});
router.get('/workouts', async (request, response, next) => {
    try {
        const filter = {};
        if (typeof request.query.fitnessLevel === 'string') {
            filter.fitnessLevel = request.query.fitnessLevel;
        }
        response.json(await Workout.find(filter).sort({ createdAt: -1 }));
    }
    catch (error) {
        next(error);
    }
});
router.post('/workouts', async (request, response, next) => {
    try {
        response.status(201).json(await Workout.create(request.body));
    }
    catch (error) {
        next(error);
    }
});
export default router;
