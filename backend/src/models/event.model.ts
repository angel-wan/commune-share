import mongoose, { Schema, Document, Types } from 'mongoose';
import bcrypt from 'bcrypt';

const VoteOptionSchema = new Schema({
  //   option: { type: String, required: false },
  //   votes: { type: Array<Schema.Types.ObjectId>, default: [] }, // Use default [] to represent 0 votes
  title: { type: String, required: false },
  options: { type: Array, default: [] },
});

// Define the event schema
const eventSchema = new Schema({
  title: { type: String, required: true, unique: false },
  description: { type: String, required: false, unique: false },
  location: { type: String, required: false },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  attendees: { type: Array, required: false },
  votes: [VoteOptionSchema], // Use the VoteOption schema for the votes property
});

// Create a TypeScript interface to describe the event document
export interface EventDocument extends Document {
  title: string;
  description: string;
  location: string | null;
  creator: string;
  attendees: Array<AttendeeType>;
  votes: Array<VotesType>;
}

interface AttendeeType {
  user: string;
  status: string;
}

export interface VotesType {
  title: string;
  options: Array<VoteOptionType>;
}

export interface VoteOptionType {
  option: string;
  votes: Array<string> | []; //User Id String
}

// Create the Event model
const Event = mongoose.model<EventDocument>('Event', eventSchema);

export default Event;
