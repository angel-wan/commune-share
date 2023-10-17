import express, { Request, Response, NextFunction } from 'express';

const app = express();

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const { method, url } = req;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${method} ${url}`);
  next(); // Move on to the next middleware or route handler
});

// Your routes and other middleware go here

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
