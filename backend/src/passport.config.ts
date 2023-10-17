import passport from 'passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import UserModel from './models/user.model'; // Import your user model
import { JWT_SECRET } from './config'; // Import your JWT secret key

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const jwtStrategy = new Strategy(jwtOptions, async (payload, done) => {
  try {
    // Replace 'UserModel' with your actual user model type
    const user = await UserModel.findById(payload.sub);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(jwtStrategy);

export default passport;
