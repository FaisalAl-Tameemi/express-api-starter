'use strict';

import crypto from 'crypto';
const authTypes = ['github', 'twitter', 'facebook', 'google'];

const validatePresenceOf = function (value) {
  return value && value.length;
};

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {

    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'The specified email address is already in use.'
      },
      validate: {
        isEmail: true
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    provider: DataTypes.STRING,
    salt: DataTypes.STRING,
    facebook: DataTypes.TEXT,
    twitter: DataTypes.TEXT,
    google: DataTypes.TEXT,
    github: DataTypes.TEXT
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'users',
    /**
     * Virtual Getters
     */
    getterMethods: {
      // Public profile information
      profile: function () {
        return {
          'name': this.name,
          'role': this.role
        };
      },

      // Non-sensitive info we'll be putting in the token
      token: function () {
        return {
          'id': this.id,
          'role': this.role
        };
      }
    },

    /**
     * Pre-save hooks
     */
    hooks: {
      beforeBulkCreate: function (users, fields) {
        const updateUsers = users.map((user) => {
          return user.updatePassword();
        })

        return Promise.all(updateUsers)
      },
      beforeCreate: function (user, fields) {
        return user.updatePassword();
      },
      beforeUpdate: function (user, fields) {
        if (user.changed('password')) {
          return user.updatePassword();
        }

        return null;
      }
    }
  });

  /**
     * Instance Methods
     */
  /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} password
     * @param {Function} callback
     * @return {Boolean}
     * @api public
     */
  User.prototype.authenticate = function (password) {
    const _this = this;

    return this
      .encryptPassword(password)
      .then(hashedCheck => _this.password === hashedCheck);
  }

  /**
   * Make salt
   *
   * @param {Number} byteSize Optional salt byte size, default to 16
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  User.prototype.makeSalt = function (byteSize = 16) {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(byteSize, function (err, salt) {
        if (err) {
          return reject(err);
        }

        return resolve(salt.toString('base64'));
      });
    })
  }

  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  User.prototype.encryptPassword = function (password) {
    return new Promise((resolve, reject) => {
      if (!password || !this.salt) {
        return reject(new Error('No password or no salt'));
      }

      const defaultIterations = 10000;
      const defaultKeyLength = 64;
      const salt = new Buffer(this.salt, 'base64');

      crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha512', (err, key) => {
        if (err) {
          return reject(err);
        }

        return resolve(key.toString('base64'));
      });
    })
  }

  /**
   * Update password field
   *
   * @param {Function} fn
   * @return {String}
   * @api public
   */
  User.prototype.updatePassword = function () {
    return new Promise((resolve, reject) => {
      // Handle new/update passwords
      if (this.password) {
        if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1) {
          return reject(new Error('Invalid password'));
        }

        // Make salt
        var _this = this;
        this.makeSalt()
            .then((salt) => {
              _this.salt = salt;

              return _this
                .encryptPassword(_this.password)
                .then((hashedPassword) => {
                  _this.password = hashedPassword;
                  resolve(null);
                })
            })
      } else {
        resolve();
      }
    })
  }

  return User;
};
