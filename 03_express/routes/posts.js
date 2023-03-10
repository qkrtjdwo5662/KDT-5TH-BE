// @ts-nocheck
const express = require('express');

const router = express.Router();

const POST = [
  {
    title: '아무제목',
    content: '아무내용',
  },
  {
    title: '아무아무제목',
    content: '아무아무내용',
  },
];

router.get('/', (req, res) => {
  res.render('posts.ejs', { POST });
});

router.post('/add', (req, res) => {
  if (Object.keys(req.body).length >= 1) {
    if (req.body.title && req.body.content) {
      const newPostData = {
        title: req.body.title,
        content: req.body.content,
      };
      POST[POST.length] = newPostData;
      res.redirect('/posts');
    } else {
      const err = new Error('입력창에 글을 채우세요');
      err.statusCode = 400;
      throw err;
    }
  } else {
    const err = new Error('실패요');
    err.statusCode = 400;
    throw err;
  }
});

module.exports = router;
