import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

exports.setup = function (User, config) {
  passport.use(new GoogleStrategy(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL,
    },
    ((accessToken, refreshToken, profile, done) => {
      User.find({
        'google.id': profile.id,
      })
        .then((user) => {
          if (!user) {
            user = User.build({
              name: profile.displayName,
              email: profile.emails[0].value,
              role: 'user',
              username: profile.emails[0].value.split('@')[0],
              provider: 'google',
              google: profile._json,
            });
            user.save()
              .then(user => done(null, user))
              .catch(err => done(err));
          } else {
            return done(null, user);
          }
        })
        .catch(err => done(err));
    }),
  ));
};
