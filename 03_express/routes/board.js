const express = require('express');

const router = express.Router();

const ARTICLE = [
  {
    title: '제목1',
    content: '내용1',
  },
  {
    title: '제목2',
    content: '내용2',
  },
];

router.get('/', (req, res) => {
  res.render('board.ejs', { ARTICLE });
});

router.get('/write', (req, res) => {
  res.render('board_write.ejs');
});

router.post('/write', (req, res) => {
  console.log(req.body);
  if (req.body.title && req.body.content) {
    const newArticle = {
      title: req.body.title,
      content: req.body.content,
    };
    ARTICLE[ARTICLE.length] = newArticle;
  } else {
    res.send('오류');
  }
  res.redirect('/board');
});

router.get('/modify/:title', (req, res) => {
  const index = ARTICLE.findIndex(
    (article) => article.title === req.params.title
  );
  const selectedArticle = ARTICLE[index];
  res.render('board_modify.ejs', { selectedArticle });
});

router.post('/modify/:title', (req, res) => {
  const index = ARTICLE.findIndex(
    (article) => article.title === req.params.title
  );
  ARTICLE[index].title = req.body.title;
  ARTICLE[index].content = req.body.content;
  res.redirect('/board');
});

router.delete('/delete/:title', (req, res) => {
  const index = ARTICLE.findIndex(
    (article) => article.title === req.params.title
  );
  if (index !== -1) {
    ARTICLE.splice(index, 1);
    res.send('삭제 완료!');
  } else {
    const err = new Error('해당 제목을 가진 글이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
