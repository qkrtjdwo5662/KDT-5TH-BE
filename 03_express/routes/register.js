const express = require('express');
const userDB = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('register.ejs');
});

router.post('/', (req, res) => {
  if (req.body.id && req.body.password) {
    userDB.userCheck(req.body.id, (data) => {
      // console.log(data);
      if (data.length === 0) {
        userDB.createUser(req.body, (data) => {
          if (data.affectedRows >= 1) {
            console.log('회원가입 완');
            res.status(200);
            res.redirect('/login');
          } else {
            res.status(400);
            res.send(
              '동일한 ID를 가진 회원이 존재함 <br><a href="/register">회원가입 이동</a>',
            );
          }
        });
      } else {
        res.status(400);
        res.send(
          '동일한 ID를 가진 회원이 존재함 <br><a href="/register">회원가입 이동</a>',
        );
      }
    });
  } else {
    const err = new Error('똑디 입력');
    throw err;
  }
});
module.exports = router;
