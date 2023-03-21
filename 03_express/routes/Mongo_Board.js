const express = require('express');
const boardDB = require('../controllers/Mongo_boardController');

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

router.get('/', isLogin, async (req, res) => {
  const ARTICLE = await boardDB.getAllArticles();
  console.log(ARTICLE[0]);
  const { userId } = req.session;
  res.render('Mongo_board.ejs', { ARTICLE, userId });
});

router.get('/write', isLogin, (req, res) => {
  res.render('Mongo_board_write.ejs');
});

router.post('/write', isLogin, (req, res) => {
  // userid -> req.session.userId
  const { userId } = req.session;
  if (boardDB.createArticle(req.body, userId)) {
    res.redirect('/mongoBoard');
  } else {
    const err = new Error('글 쓰기 실패');
    err.statusCode = 500;
    throw err;
  }
});

router.get('/modify/:id', isLogin, async (req, res) => {
  const selectedArticle = await boardDB.getArticle(req.params.id);
  console.log(selectedArticle);
  if (!selectedArticle) {
    console.log(selectedArticle);
    res.render('Mongo_board_modify.ejs', { selectedArticle });
  } else {
    const err = new Error('해당 ID 값을 가지는 게시글 존재 X');
    err.statusCode = 500;
    throw err;
  }
});

router.post('/modify/:id', isLogin, async (req, res) => {
  if (await boardDB.updateArticle(req.params.id, req.body)) {
    res.redirect('/dbBoard');
  } else {
    const err = new Error('수정 실패');
    err.statusCode = 500;
    throw err;
  }
});

router.delete('/delete/:id', isLogin, async (req, res) => {
  if (await boardDB.deleteArticle(req.params.id)) {
    console.log('삭제성공');
  } else {
    const err = new Error('삭제 실패');
    err.statusCode = 500;
    throw err;
  }
});

router.get('/getAll', (req, res) => {
  boardDB.getAllArticles((data) => {
    console.log(data);
    res.send(data);
  });
});

module.exports = router;
