const express = require('express');
const router = express.Router();
const Users = require('../../models/User');

router.put('/itemlist/:userId/', (req, res, data) => {
  return res.status(200).send('Updated favItems');
});

module.exports = router;
