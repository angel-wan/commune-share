import express, { type Application, Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import passport from 'passport';
import requireAuth from './middlewares/AuthMiddleware';

const app: Application = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/usersdb', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
} as ConnectOptions);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define your routes and middleware here

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(passport.initialize());

app.get('/protected-route', requireAuth, (req: Request, res: Response) => {
  res.json({ message: 'This route is protected with JWT authentication.' });
});
