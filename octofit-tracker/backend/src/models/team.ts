import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: string[];
  goal: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  members: [{ type: String }],
  goal: { type: String, required: true },
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);
