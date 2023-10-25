import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the user schema

const userSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
});

const userGroupSchema = new Schema({
  users: [userSchema],
  creator: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who created the event
  code: { type: String, required: true, unique: true },
  // Add more fields as needed
});

// Create a TypeScript interface to describe the user document
interface UserGroupDocument extends Document {
  users: Array<AttendeeType>;
  code: string;
  creator: string;
}

interface AttendeeType {
  userid: string;
}

// Create the User model
const UserGroup = mongoose.model<UserGroupDocument>('UserGroup', userGroupSchema);

export default UserGroup;
