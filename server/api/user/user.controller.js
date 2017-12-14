

import db from '../../sqldb';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import responses from '../../components/utils/responses';

const { User } = db;

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function (req, res) {
  User
    .findAll({
      attributes: [
        'id',
        'name',
        'email',
        'role',
        'provider',
      ],
    })
    .then(responses.handleEntityNotFound(res))
    .then(responses.responseWithResult(res))
    .catch(responses.handleError(res));
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  const newUser = User.build(req.body);

  newUser.setDataValue('provider', 'local');
  newUser.setDataValue('role', 'user');

  newUser
    .save()
    .then((user) => {
      const token = jwt.sign({ id: user.id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5,
      });

      res.json({ token });

      return null;
    })
    .catch(responses.validationError(res));
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  const userId = req.params.id;

  User
    .find({
      where: {
        id: userId,
      },
    })
    .then(responses.handleEntityNotFound(res))
    .then(responses.responseWithResult(res))
    .catch(responses.handleError(res));
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function (req, res) {
  User
    .destroy({ id: req.params.id })
    .then(() => {
      res.status(204).end();
    })
    .catch(responses.handleError(res));
};

/**
 * Change a users password
 */
exports.changePassword = function (req, res, next) {
  const userId = req.user.id;
  const oldPass = String(req.body.oldPassword);
  const newPass = String(req.body.newPassword);

  User
    .find({
      where: {
        id: userId,
      },
    })
    .then((user) => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      }
      return res.status(403).end();
    });
};

/**
 * Get my info
 */
exports.me = function (req, res, next) {
  const userId = req.user.id;

  User
    .find({
      where: {
        id: userId,
      },
      attributes: [
        'id',
        'name',
        'email',
        'role',
        'provider',
      ],
    })
    .then((user) => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }

      res.json(user);
    })
    .catch(err => next(err));
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
  res.redirect('/');
};
