import mongoose, { Schema, Document, Types } from 'mongoose';
import bcrypt from 'bcrypt';

export enum Period {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  NIGHT = 'NIGHT',
  ALL_DAY = 'ALL_DAY',
}

const VoteOptionSchema = new Schema({
  //   option: { type: String, required: false },
  //   votes: { type: Array<Schema.Types.ObjectId>, default: [] }, // Use default [] to represent 0 votes
  title: { type: String, required: false },
  options: { type: Array, default: [] },
});

const ScheduleSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
  slots: [
    {
      date: { type: Date, required: true },
      period: {
        type: String,
        required: true,
        enum: Object.values(Period),
      },
    },
  ],
});

// Define the event schema
const eventSchema = new Schema({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true, unique: false },
  description: { type: String, required: false, unique: false },
  location: { type: String, required: false },
  creator: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who created the event
  attendees: { type: Array, required: false },
  votes: [VoteOptionSchema], // Use the VoteOption schema for the votes property
  schedule: [ScheduleSchema], // Include the schedule field
  createdAt: { type: Date, required: true, default: Date.now },
  eventStartDatetime: { type: Date, required: false },
  eventEndDatetime: { type: Date, required: false },
});

// Create a TypeScript interface to describe the event document
export interface EventDocument extends Document {
  title: string;
  description: string;
  location: string | null;
  eventStartDatetime: Date | null;
  eventEndDatetime: Date | null;
  code: string;
  creator: string;
  attendees: Array<AttendeeType>;
  votes: Array<VotesType>;
  schedule: Array<ScheduleType>;
  createdAt: Date;
}

interface AttendeeType {
  userid: string;
  status: 'pending' | 'invited';
}

export interface VotesType {
  title: string;
  options: Array<VoteOptionType>;
}

export interface VoteOptionType {
  option: string;
  votes: Array<string> | []; //User Id String
}

export interface ScheduleType {
  user: string; // User ID who provided the schedule
  slots: Array<TimeSlotType>; // An array of time slot objects
}

export interface TimeSlotType {
  date: Date; // Date of the time slot
  period: Period; // Time period
}

// Create the Event model
const Event = mongoose.model<EventDocument>('Event', eventSchema);

export default Event;
