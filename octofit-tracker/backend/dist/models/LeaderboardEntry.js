import mongoose, { Schema } from 'mongoose';
const leaderboardEntrySchema = new Schema({
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    score: { type: Number, required: true, min: 0 },
    streak: { type: Number, required: true, min: 0 },
}, { timestamps: true });
const LeaderboardEntry = mongoose.model('Leaderboard', leaderboardEntrySchema, 'leaderboard');
export default LeaderboardEntry;
