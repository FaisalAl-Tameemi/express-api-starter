import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';

exports.setup = function (User, config) {
  passport.use(new TwitterStrategy(
    {
      consumerKey: config.twitter.clientID,
      consumerSecret: config.twitter.clientSecret,
      callbackURL: config.twitter.callbackURL,
    },
    ((token, tokenSecret, profile, done) => {
      User.find({
        'twitter.id_str': profile.id,
      })
        .then((user) => {
          if (!user) {
            user = User.build({
              name: profile.displayName,
              username: profile.username,
              role: 'user',
              provider: 'twitter',
              twitter: profile._json,
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
