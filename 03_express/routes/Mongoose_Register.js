const express = require('express');

const { registerUser } = require('../controllers/Mongoose_userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('Mongoose_register.ejs');
});

router.post('/', registerUser);

module.exports = router;
