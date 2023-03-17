const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('cookie.ejs');
});

router.get('/cook', (req, res) => {
  res.cookie('alert', true, {
    maxAge: 1000 * 5,
    httpOnly: false,
  });
  res.status(200).json('ㅇㅇ');
  console.log('쿠키 다굽');
});
// router.modify('/modify', (req, res) => {
//   res.cookie.
// })

module.exports = router;
