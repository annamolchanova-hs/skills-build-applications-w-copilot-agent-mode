import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  type: string;
  durationMinutes: number;
  calories: number;
  userId: string;
}

const activitySchema = new Schema<IActivity>({
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, required: true },
  userId: { type: String, required: true },
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
