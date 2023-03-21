const express = require('express');
const userDB = require('../controllers/testMongoController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login.ejs');
});

router.post('/', (req, res) => {
  userDB.login(req.body, (data) => {
    res.send('로그인 성공');
    console.log(req.body);
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
