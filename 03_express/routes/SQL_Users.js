const express = require('express');
const usersDB = require('../controllers/SQL_userController');

const router = express.Router();

router.get('/', (req, res) => {
  usersDB.getAllUsers((data) => {
    res.render('SQL_users.ejs', { USER: data });
  });
});

router.post('/add', (req, res) => {
  console.log(req.body);
  usersDB.createUser(req.body, (data) => {
    res.redirect('/sqlUsers');
  });
});

router.delete('/delete/:id', (req, res) => {
  usersDB.deleteUser(req.params.id, (data) => {
    if (data.affectedRows >= 1) {
      res.status(200).send('삭제 완');
    } else {
      const err = new Error('삭제 실패');
      err.statusCode = 500;
      throw err;
    }
  });
});

module.exports = router;
