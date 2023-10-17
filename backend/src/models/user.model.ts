import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the user schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add more fields as needed
});

// Create a TypeScript interface to describe the user document
interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  // Define additional fields here
}

// Create the User model
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10); // 10 is the number of salt rounds
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next();
  }
});

// Verify the user's password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('error', error);
    throw error;
  }
};

// Create the User model
const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
