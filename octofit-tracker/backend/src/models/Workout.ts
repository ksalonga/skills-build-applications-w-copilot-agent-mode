import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    equipment: { type: [String], default: [] },
  },
  { timestamps: true },
);

const Workout = mongoose.model('Workout', workoutSchema, 'workouts');

export default Workout;
