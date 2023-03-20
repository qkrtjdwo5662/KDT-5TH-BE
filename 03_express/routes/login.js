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
        // 쿠키 발행
        res.cookie('user', req.body.id, {
          maxAge: 1000 * 10,
          httpOnly: true,
          signed: true, // 암호화
        });
        res.status(200);
        res.redirect('/dbBoard');
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
  console.log(req.session);
  req.session.destroy((err) => {
    console.log('지우기중');
    if (err) throw err;
    res.clearCookie('user');
    res.redirect('/');
    console.log('지우기 완료');
    console.log(req.session);
  });
});
module.exports = router;
