const express = require('express');
const router = express.Router();
const Users = require('../../models/User');

router.post('/', async (req, res, next) => {
  try {
    let { email } = req.body;

    let UserReset = await Users.find(req.body);

    if (UserReset.length === 0) {
      return res.status(400).json({ message: 'Email not found.' });
    }

    return res.status(200).json({ message: 'Recovery email sent!' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
