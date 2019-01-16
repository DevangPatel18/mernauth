const express = require('express');
const router = express.Router();
const Users = require('../../models/User');

router.get('/:userId', async (req, res, next) => {
  try {
    let userId = req.params.userId;
    let UsersInfo = await Users.findById(userId);
    return res.status(200).json(UsersInfo.favItems);
  } catch (err) {
    return next(err);
  }
});

router.put('/:userId/', async (req, res, next) => {
  try {
    let userId = req.params.userId;
    let UsersInfo = await Users.findById(userId);
    let { favItems } = UsersInfo;
    let { item } = req.body;
    let itemPos = favItems.indexOf(item);

    if (!item) {
      return res.status(400).json({ message: 'Item not specified.' });
    }

    if (itemPos === -1) {
      favItems.push(item);
    } else {
      return res.status(400).json({ message: 'Item already favorited.' });
    }

    UsersInfo.save();
    return res.status(200).send('Updated favItems');
  } catch (err) {
    return next(err);
  }
});

router.delete('/:userId/:itemIndex', async (req, res, next) => {
  try {
    let { userId, itemIndex } = req.params;
    let UsersInfo = await Users.findById(userId);
    let { favItems } = UsersInfo;

    favItems.splice(parseInt(itemIndex), 1);

    UsersInfo.save();
    return res.status(200).send('Updated favItems');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
