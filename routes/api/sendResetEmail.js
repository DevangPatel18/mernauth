const express = require('express');
const router = express.Router();
const Users = require('../../models/User');

const crypto = require('crypto');

router.post('/', async (req, res, next) => {
  try {
    let { email } = req.body;

    let UserReset = await Users.findOne(req.body);

    if (UserReset.length === 0) {
      return res.status(400).json({ message: 'Email not found.' });
    }

    const token = crypto.randomBytes(20).toString('hex');

    UserReset.updateOne({
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 360000,
    });

    return res.status(200).json({ message: 'Recovery email sent!' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
