import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false })(req, res, next);
};

export default requireAuth;
