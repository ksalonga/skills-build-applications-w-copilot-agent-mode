import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    teamId: { type: String, default: null },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema, 'users');

export default User;
