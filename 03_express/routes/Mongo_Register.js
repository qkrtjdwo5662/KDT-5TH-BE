const express = require('express');

const { registerUser } = require('../controllers/Mongo_userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('Mongo_register.ejs');
});

router.post('/', registerUser);

module.exports = router;
