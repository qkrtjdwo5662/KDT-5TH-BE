const express = require('express');
const userDB = require('../controllers/Mongo_userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('Mongo_register.ejs');
});

router.post('/', async (req, res) => {
  const dupliacatedUser = await userDB.userCheck(req.body.id);
  if (!dupliacatedUser) {
    const registerUser = await userDB.createUser(req.body);
    if (registerUser) {
      res.status(200);
      res.redirect('/mongoLogin');
    } else {
      res.status(400);
      res.send('회원가입 실패 <br><a href="/mongoRegister">회원가입 이동</a>');
    }
  } else {
    res.status(400);
    res.send(
      '동일한 ID를 가진 회원이 존재함 <br><a href="/mongoRegister">회원가입 이동</a>',
    );
  }
});

module.exports = router;
