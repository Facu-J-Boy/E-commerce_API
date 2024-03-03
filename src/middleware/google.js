const passport = require('passport');
const GoogleStrategy =
  require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();
const User = require('../models/User');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.use(
  'auth-google',
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/user/google',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let usuarioExistente = await User.findOne({
          googleId: profile.id,
        });

        if (usuarioExistente) {
          return done(null, usuarioExistente);
        } else {
          const nuevoUsuario = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
          });

          await nuevoUsuario.save();
          console.log('Nuevo usuario guardado en MongoDB');
          return done(null, nuevoUsuario);
        }
      } catch (err) {
        console.error(
          'Error al buscar o guardar usuario en MongoDB:',
          err
        );
        return done(err);
      }
    }
  )
);
