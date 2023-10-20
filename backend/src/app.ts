import express, { type Application, Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import passport from 'passport';
import requireAuth from './middlewares/AuthMiddleware';
import userRouter from './routes/user.route';
import './passport.config';
import { MONGO_URI } from './config';
import eventRouter from './routes/event.route';
import cors from 'cors';

const app: Application = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization',
};
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  retryWrites: true,
  w: 'majority',
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
app.use(express.json());

app.get('/help', (req: Request, res: Response) => {
  res.send('Help page');
});

app.use('/user', userRouter);
app.use('/event', eventRouter);
