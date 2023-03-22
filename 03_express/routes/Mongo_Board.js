const express = require('express');
const {
  getAllArticles,
  createArticle,
  selectArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/Mongo_boardController');

const router = express.Router();

// 로그인 확인용 미들웨어
function isLogin(req, res, next) {
  if (req.session.login || req.signedCookies.user) {
    next();
  } else {
    res.status(400);
    res.send(
      '로그인하고 들어와라.<br><a href="/mongoLogin">로그인 페이지로 이동</a>',
    );
  }
}

router.get('/', isLogin, getAllArticles);

router.get('/write', isLogin, (req, res) => {
  res.render('Mongo_board_write.ejs');
});

router.post('/write', isLogin, createArticle);

router.get('/modify/:id', isLogin, selectArticle);

router.post('/modify/:id', isLogin, updateArticle);

router.delete('/delete/:id', isLogin, deleteArticle);

router.get('/getAll', getAllArticles);

module.exports = router;
