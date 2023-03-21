const express = require('express');
const userDB = require('../controllers/Mongo_userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('Mongo_login.ejs');
});

router.post('/', async (req, res) => {
  // const loginUser = await userDB.login(req.body);
  // if (loginUser) {
  //   res.status(200);
  //   console.log('로그인성공');
  //   res.redirect('/mongoBoard');
  // } else {
  //   res.status(400);
  //   res.send('회원가입먼저 <br><a href="/mongoRegister">회원가입 이동</a>');
  // }
  const loginUser = await userDB.userCheck(req.body.id);
  if (loginUser) {
    if (loginUser.password === req.body.password) {
      req.session.login = true;
      req.session.userId = req.body.id;
      res.cookie('user', req.body.id, {
        maxAge: 1000 * 10,
        httpOnly: true,
        signed: true, // 암호화
      });
      res.status(200);
      res.redirect('/mongoBoard');
    } else {
      res.status(400);
      res.send('비밀번호 잘못됨 <br><a href="/sqlLogin">로그인으로 이동</a>');
    }
  } else {
    res.status(400);
    res.send(
      '아이디가 잘못됨 <br><a href="/sqlRegister">회원가입 창 으로 이동</a>',
    );
  }
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
