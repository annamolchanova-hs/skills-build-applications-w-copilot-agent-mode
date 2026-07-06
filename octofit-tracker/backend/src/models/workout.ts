import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  durationMinutes: number;
  difficulty: string;
  target: string;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  target: { type: String, required: true },
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
