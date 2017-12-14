import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

function localAuthenticate(User, email, password, done) {
  User
    .find({
      where: {
        email: email.toLowerCase(),
      },
    })
    .then((user) => {
      if (!user) {
        done(null, false, {
          message: 'This email is not registered.',
        });

        return null;
      }

      return user
        .authenticate(password)
        .then((authenticated) => {
          if (!authenticated) {
            done(null, false, {
              message: 'Password or email is not correct.',
            });
          } else {
            done(null, user);
          }

          return null;
        });
    })
    .catch(done);
}

exports.setup = function (User, config) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password', // this is the virtual field on the model
  }, ((email, password, done) => localAuthenticate(User, email, password, done))));
};
