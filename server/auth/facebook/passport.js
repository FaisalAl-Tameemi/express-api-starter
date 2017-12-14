import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

exports.setup = function (User, config) {
  passport.use(new FacebookStrategy(
    {
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
      profileFields: [
        'displayName',
        'emails',
      ],
    },
    ((accessToken, refreshToken, profile, done) => {
      User.find({
        'facebook.id': profile.id,
      })
        .then((user) => {
          if (!user) {
            user = User.build({
              name: profile.displayName,
              email: profile.emails[0].value,
              role: 'user',
              provider: 'facebook',
              facebook: profile._json,
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
