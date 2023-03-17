const express = require('express');
const userDB = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login.ejs');
});

router.post('/', (req, res) => {
  userDB.userCheck(req.body.id, (data) => {
    if (data.length === 1) {
      if (data[0].PASSWORD === req.body.password) {
        req.session.login = true;
        req.session.userId = req.body.id;
        res.status(200);
        res.redirect('/dbBoard');
        // userDB.login(req.body, (data) => {});
      } else {
        res.status(400);
        res.send('비밀번호 잘못됨 <br><a href="/login">로그인으로 이동</a>');
      }
    } else {
      res.status(400);
      res.send(
        '아이디가 잘못됨 <br><a href="/register">회원가입 창 으로 이동</a>',
      );
    }
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  });
});
module.exports = router;
