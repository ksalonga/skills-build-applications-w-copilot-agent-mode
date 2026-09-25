import mongoose, { Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    type: {
      type: String,
      enum: ['run', 'workout', 'cycling', 'walk'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    date: { type: String, required: true },
  },
  { timestamps: true },
);

const Activity = mongoose.model('Activity', activitySchema, 'activities');

export default Activity;
