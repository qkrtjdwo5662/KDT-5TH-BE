const express = require('express');
const { allUsers } = require('../controllers/Mongo_userController');

const router = express.Router();

router.get('/', allUsers);

router.post('/add', (req, res) => {});

router.delete('/delete/:id', (req, res) => {});

module.exports = router;
