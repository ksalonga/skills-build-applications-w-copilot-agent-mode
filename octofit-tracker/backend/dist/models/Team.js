import mongoose, { Schema } from 'mongoose';
const teamSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    members: { type: [String], default: [] },
}, { timestamps: true });
const Team = mongoose.model('Team', teamSchema, 'teams');
export default Team;
