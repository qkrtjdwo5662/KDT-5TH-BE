const express = require('express');
const { loginUser } = require('../controllers/Mongoose_userController');

const router = express.Router();

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
