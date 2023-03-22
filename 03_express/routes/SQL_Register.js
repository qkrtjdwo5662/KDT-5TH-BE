const express = require('express');
// const userDB = require('../controllers/SQL_userController');
const { registerUser } = require('../controllers/SQL_userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('SQL_register.ejs');
});

router.post('/', registerUser);
module.exports = router;
