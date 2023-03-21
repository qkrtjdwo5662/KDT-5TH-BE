const express = require('express');
const boardDB = require('../controllers/SQL_boardController');

const router = express.Router();

// 로그인 확인용 미들웨어
function isLogin(req, res, next) {
  if (req.session.login || req.signedCookies.user) {
    next();
  } else {
    res.status(400);
    res.send(
      '로그인하고 들어와라.<br><a href="/sqlLogin">로그인 페이지로 이동</a>',
    );
  }
}

router.get('/', isLogin, (req, res) => {
  boardDB.getAllArticles((data) => {
    const ARTICLE = data;
    const { userId } = req.session;
    res.render('SQL_board.ejs', { ARTICLE, userId });
  });
});

router.get('/write', isLogin, (req, res) => {
  res.render('SQL_board_write.ejs');
});

router.post('/write', isLogin, (req, res) => {
  // userid -> req.session.userId
  if (req.body.title && req.body.content) {
    const { userId } = req.session;
    boardDB.createArticle(req.body, userId, (data) => {
      console.log(data);
      if (data.affectedRows >= 1) {
        res.redirect('/sqlBoard');
      } else {
        const err = new Error('글 쓰기 실패');
        err.statusCode = 500;
        throw err;
      }
    });
  } else {
    const err = new Error('내용 확인해보세요');
    err.statusCode = 400;
    throw err;
  }
});

router.get('/modify/:id', isLogin, (req, res) => {
  boardDB.getArticle(req.params.id, (data) => {
    if (data.length > 0) {
      console.log(data);
      res.render('SQL_board_modify.ejs', { selectedArticle: data[0] });
    } else {
      const err = new Error('해당 ID 값을 가지는 게시글 존재 X');
      err.statusCode = 500;
      throw err;
    }
  });
});

router.post('/modify/:id', isLogin, (req, res) => {
  if (req.body.title && req.body.content) {
    boardDB.updateArticle(req.body, req.params.id, (data) => {
      console.log(data);
      if (data.affectedRows >= 1) {
        res.redirect('/sqlBoard');
      } else {
        const err = new Error('수정 실패');
        err.statusCode = 500;
        throw err;
      }
    });
  } else {
    const err = new Error('내용 확인해보세요');
    err.statusCode = 400;
    throw err;
  }
});

router.delete('/delete/:id', isLogin, (req, res) => {
  boardDB.deleteArticle(req.params.id, (data) => {
    // console.log('삭제 완');
    // res.statusCode = 200;
    if (data.affectedRows >= 1) {
      res.status(200).send('삭제 완');
    } else {
      const err = new Error('삭제 실패');
      err.statusCode = 500;
      throw err;
    }
  });
});

router.get('/getAll', (req, res) => {
  boardDB.getAllArticles((data) => {
    console.log(data);
    res.send(data);
  });
});

module.exports = router;
