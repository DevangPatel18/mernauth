const express = require('express');
const router = express.Router();
const Users = require('../../models/User');

router.get('/', async (req, res, next) => {
  try {
    let { token } = req.body;

    let UserReset = await Users.findOne({ resetPasswordToken: token });

    if (!UserReset) {
      return res.status(400).json({
        token: false,
        message: 'Invalid password reset URL, please try again.',
      });
    }

    if (UserReset.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        token: false,
        message: 'This password reset URL has expired, please try again.',
      });
    }

    res.status(200).json({ token: true });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
