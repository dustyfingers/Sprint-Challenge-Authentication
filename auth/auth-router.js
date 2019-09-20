const router = require('express').Router();
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const Users = require('../models/users');
const db = require('../database/dbConfig');
const jwt = require('jsonwebtoken');
const isUserLoggedIn = require('./authenticate-middleware');

router.post('/register', isUserLoggedIn, async (req, res) => {
  try {
    let { USERNAME, PASSWORD } = req.body;
    bcrypt.hash(PASSWORD, 8, async (err, hash) => {
      const savedUser = await Users.add({ USERNAME, PASSWORD: hash });
      savedUser ?
        res.status(201).json(savedUser) :
        res.status(500).json({ message: 'There was an error while signing up a user with those credentials.' });
    });
  } catch (err) {
    console.log(err.message);
  }
});

router.post('/login', isUserLoggedIn, async (req, res) => {
  try {
    let { USERNAME, PASSWORD } = req.body;
    let user = await Users.findBy({ USERNAME });
    const response = await bcrypt.compare(PASSWORD, user.PASSWORD);
    
    if (response) {
      const secret = uuid.v4();
      const token = jwt.sign({
        data: user.USERNAME
      }, secret, { expiresIn: '1h' });

      res.status(200).json({ token });
    } else {
      res.status(500).json({ message: err.message });
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
