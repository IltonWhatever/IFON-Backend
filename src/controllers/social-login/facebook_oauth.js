const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const authRepositoy = require('../../repositories/auth/authUserRepository');
const refreshTokenRepository = require('../../repositories/refresh-token/refreshTokenRepository');
const tokenJWT = require('../../services/createTokensJWT');

require('dotenv').config();

passport.use(
  new FacebookStrategy(
    {
      callbackURL: `http://localhost:4000/auth/facebook/redirect`, // same URI as registered in faebook developers
      clientID: process.env.FACEBOOK_APP_ID, // replace with copied value from Google console
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      profile: ['public_profile']
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const { email } = profile; // profile object has the user info
        const userAuth = await authRepositoy.findUser({ email });
        if (userAuth) {
          // criar o token
          const { id } = userAuth;
          const token = tokenJWT.createTokenJWT(id);
          const refreshTokenIfon = await refreshTokenRepository.create(id);

          return done(null, { token, refreshTokenIfon });
        }
      } catch (error) {
        done(error);
      }
    }
  )
);
