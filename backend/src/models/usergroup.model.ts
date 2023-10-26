import mongoose, { Schema, Document } from 'mongoose';

// Define the user schema

const userGroupSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  creator: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who created the event
  code: { type: String, required: true, unique: true },
  // Add more fields as needed
});

// Create a TypeScript interface to describe the user document
export interface UserGroupDocument extends Document {
  users: Array<string>;
  code: string;
  creator: string;
}

// Create the User model
const UserGroup = mongoose.model<UserGroupDocument>('UserGroup', userGroupSchema);

export default UserGroup;
