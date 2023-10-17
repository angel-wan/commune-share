import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

// eslint-disable-next-line import/prefer-default-export
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gathergulu';

