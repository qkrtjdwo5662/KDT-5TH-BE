const express = require('express');

const router = express.Router();

const { loginUser } = require('../controllers/Mongoose_userController');

router.get('/', (req, res) => {
  res.render('Mongo_login.ejs');
});

router.post('/', loginUser);

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
