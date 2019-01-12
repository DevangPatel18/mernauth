const express = require('express');
const router = express.Router();
const Users = require('../../models/User');

router.put('/itemlist/:userId/', async (req, res, data) => {
  let userId = req.params.userId;
  let UsersInfo = await Users.findById(userId);
  let { favItems } = UsersInfo;
  let { item } = req.body;
  let itemPos = favItems.indexOf(item);
  let err;

  if (itemPos === -1) {
    favItems.push(item);
  } else {
    err = 'Item already favorited.';
  }

  if (!err) {
    UsersInfo.save();
    return res.status(200).send('Updated favItems');
  }
  return res.status(400).send(err);
});

router.delete('/itemlist/:userId/', async (req, res, data) => {
  let userId = req.params.userId;
  let UsersInfo = await Users.findById(userId);
  let { favItems } = UsersInfo;
  let { item } = req.body;
  let itemPos = favItems.indexOf(item);
  let err;

  if (itemPos !== -1) {
    favItems.splice(itemPos, 1);
  } else {
    err = 'Item not in list to begin with.';
  }

  if (!err) {
    UsersInfo.save();
    return res.status(200).send('Updated favItems');
  }
  return res.status(400).send(err);
});

module.exports = router;
