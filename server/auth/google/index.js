

import express from 'express';
import passport from 'passport';
import auth from '../auth.service';

const router = express.Router();

router
  .get('/', passport.authenticate('google', {
    failureRedirect: '/signup',
    scope: [
      'profile',
      'email',
    ],
    session: false,
  }))

  .get('/callback', passport.authenticate('google', {
    failureRedirect: '/signup',
    session: false,
  }), auth.setTokenCookie);

module.exports = router;
