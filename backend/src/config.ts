import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

// eslint-disable-next-line import/prefer-default-export
const JWT_SECRET = process.env.JWT_SECRET
export {JWT_SECRET}
