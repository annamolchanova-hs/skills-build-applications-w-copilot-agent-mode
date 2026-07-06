import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: string;
  score: number;
  streak: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: String, required: true },
  score: { type: Number, required: true },
  streak: { type: Number, required: true },
});

export const Leaderboard = mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
