const express = require('express');
const usersDB = require('../controllers/Mongo_userController');

const router = express.Router();

router.get('/', async (req, res) => {
  const USER = await usersDB.getAllUsers();
  res.render('Mongo_users.ejs', { USER });
});

router.post('/add', (req, res) => {});

router.delete('/delete/:id', (req, res) => {});

module.exports = router;
