/* eslint-disable camelcase */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { OAuth2Client } = require('google-auth-library');
const authRepositoy = require('../../repositories/auth/authUserRepository');
const refreshTokenRepository = require('../../repositories/refresh-token/refreshTokenRepository');
const tokenJWT = require('../../services/createTokensJWT');
const userRepository = require('../../repositories/user/userRepository');

require('dotenv').config();

const client = new OAuth2Client(
  '1071992627488-ck8ddaljp1prsdd0f3sav36j5sks3gan.apps.googleusercontent.com'
);

passport.use(
  new GoogleStrategy(
    {
      callbackURL: `http://localhost:3000/auth/google`, // same URI as registered in Google console portal
      clientID: process.env.GOOGLE_CLIENT_ID, // replace with copied value from Google console
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0].value; // profile object has the user info
        const userAuth = await authRepositoy.findUserGoogle({ email });
        if (userAuth) {
          // criar o token
          const { id } = userAuth;
          const token = tokenJWT.createTokenJWT(id);
          const refreshTokenIfon = await refreshTokenRepository.create(id);

          return done(null, {
            msg: 'Usuário logado com sucesso',
            token,
            refreshTokenIfon
          }); // redirect_url will get appended to req.user object : passport.js in action
        }

        const newUser = {
          name: profile.name.givenName,
          email: profile.emails[0].value,
          password: profile.id,
          permissions_id: '842e249b-ae0c-4e95-b1ff-1b8b1f98f384'
        };

        const user = await userRepository.create(newUser);
        const { id } = user;
        const token = tokenJWT.createTokenJWT(id);
        const refreshTokenIfon = await refreshTokenRepository.create(id);

        return done(null, {
          msg: 'Usuário cadastrado com sucesso',
          token,
          refreshTokenIfon
        });
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = {
  async loginGoogle(req, res) {
    try {
      const { tokenId } = req.body;

      const loginTicket = await client.verifyIdToken({
        idToken: tokenId,
        audience: [
          '1071992627488-ck8ddaljp1prsdd0f3sav36j5sks3gan.apps.googleusercontent.com',
          '1071992627488-nef0cg6eur1hksb9q73aelr35pqho2il.apps.googleusercontent.com',
          '1071992627488-q979b5ncorofh0nkboa8kkl0prf1h0hv.apps.googleusercontent.com'
        ]
      });

      console.log('loginTicket', loginTicket);

      const { email_verified, name, email } = loginTicket.payload;

      if (!email_verified) throw new Error('Email não verificado');

      const userAuth = await authRepositoy.findUserGoogle({ email });
      if (userAuth) {
        const { id } = userAuth;
        const token = tokenJWT.createTokenJWT(id);
        const refreshTokenIfon = await refreshTokenRepository.create(id);

        console.log('Usuário já tem conta, logando ...');

        return res.status(200).json({
          message: 'Usuário logado com sucesso',
          id,
          name,
          email,
          token,
          refreshToken: refreshTokenIfon.token
        });
      }

      console.log('criando conta para o usuário');

      const newUser = {
        name,
        email,
        password: loginTicket.payload.jti,
        permissions_id: '842e249b-ae0c-4e95-b1ff-1b8b1f98f384'
      };

      const user = await userRepository.create(newUser);
      const { id } = user;
      const token = tokenJWT.createTokenJWT(id);
      const refreshToken = await refreshTokenRepository.create(id);

      return res.status(200).json({
        message: 'Usuário logado com sucesso',
        id,
        name,
        email,
        token,
        refreshToken: refreshToken.token
      });
    } catch (error) {
      console.error('Erro ao logar com google', error);
      return res.status(400).json({
        message: error.message
      });
    }
  }
};
