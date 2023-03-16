const express = require('express');
const boardDB = require('../controllers/boardController');

const router = express.Router();

router.get('/', (req, res) => {
  boardDB.getAllArticles((data) => {
    const ARTICLE = data;
    res.render('db_board.ejs', { ARTICLE });
  });
});

router.get('/write', (req, res) => {
  res.render('db_board_write.ejs');
});

router.post('/write', (req, res) => {
  if (req.body.title && req.body.content) {
    boardDB.createArticle(req.body, (data) => {
      console.log(data);
      if (data.affectedRows >= 1) {
        res.redirect('/dbBoard');
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

router.get('/modify/:id', (req, res) => {
  boardDB.getArticle(req.params.id, (data) => {
    if (data.length > 0) {
      console.log(data);
      res.render('db_board_modify.ejs', { selectedArticle: data[0] });
    } else {
      const err = new Error('해당 ID 값을 가지는 게시글 존재 X');
      err.statusCode = 500;
      throw err;
    }
  });
});

router.post('/modify/:id', (req, res) => {
  if (req.body.title && req.body.content) {
    boardDB.updateArticle(req.body, req.params.id, (data) => {
      console.log(data);
      if (data.affectedRows >= 1) {
        res.redirect('/dbBoard');
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

router.delete('/delete/:id', (req, res) => {
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
