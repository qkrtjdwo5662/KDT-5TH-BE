// @ts-nocheck
const express = require('express');

const router = express.Router();

const USER = [
  {
    id: 'qkrtjdwo5662',
    name: 'park',
    email: 'qkrtjdwo5662@naer.com',
  },
  {
    id: 'test',
    name: 'testname',
    email: 'test@naver.com',
  },
];

router.get('/', (req, res) => {
  res.render('users.ejs', { USER });
});

router.get('/id/:id', (req, res) => {
  const userData = USER.find((user) => user.id === req.params.id);
  if (userData) {
    res.send(userData);
  } else {
    const err = new Error('ID가 없다');
    err.statusCode = 404;
    throw err;
    // res.end('ID를 못찾겠어요');
  }
});

router.post('/add', (req, res) => {
  if (Object.keys(req.query) > 1) {
    if (req.query.id && req.query.name && req.query.email) {
      const newUserData = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
      };
      USER[USER.length] = newUserData;
      res.redirect('/users');
    } else {
      const err = new Error('폼태그 확인하셔요 등록실패요');
      err.statusCode = 400;
      throw err;
    }
  } else if (req.body) {
    const newUserData = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
    };
    USER[USER.length] = newUserData;
    res.redirect('/users');
  } else {
    const err = new Error('등록 실패요');
    err.statusCode = 400;
    throw err;
  }
});

router.put('/modify/:id', (req, res) => {
  if (req.query.name && req.query.email) {
    const userIndex = USER.findIndex((user) => user.id === req.params.id);
    if (userIndex !== -1) {
      USER[userIndex] = {
        name: req.query.name,
        email: req.query.email,
      };
      res.send('수정 완');
    } else {
      const err = new Error('ID가 없다 수정 실패');
      err.statusCode = 400;
      throw err;
    }
  } else {
    const err = new Error('정보 제대로 입력 수정 실패');
    err.statusCode = 400;
    throw err;
  }
});

router.delete('/delete/:id', (req, res) => {
  const userIndex = USER.findIndex((user) => user.id === req.params.id);
  if (userIndex !== -1) {
    USER.splice(userIndex, 1);
    res.send('삭제 완');
  } else {
    const err = new Error('정보 제대로 입력 삭제 실패');
    err.statusCode = 400;
    throw err;
  }
});

router.get('/show', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  res.write('<h1>Hello, dynamic</h1>');

  for (let i = 0; i < USER.length; i += 1) {
    res.write(`<h2>id : ${USER[i].id}</h2>`);
    res.write(`<h2>name : ${USER[i].name}</h2>`);
    res.write(`<h2>name : ${USER[i].email}</h2>`);
  }
  res.send('end');
});

module.exports = router;
