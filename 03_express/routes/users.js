// @ts-check
const express = require('express');

const app = express();
const router = express.Router();

const PORT = 4000;

const USER = {
  1: {
    id: 'qkrtjdwo5662',
    name: 'park',
  },
};

const USER2 = [
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

app.use('/users', router);

router.get('/', (req, res) => {
  res.render('users.ejs', { USER2 });
});

router.get('/id/:id', (req, res) => {
  const userData = USER[req.params.id];
  if (userData) {
    res.end(userData);
  } else {
    res.end('ID를 못찾겠어요');
  }
});
router.post('/add', (req, res) => {
  if (req.query.id && req.query.name) {
    const newUserData = {
      id: req.query.id,
      name: req.query.name,
    };
    USER[Object.keys[USER].length + 1] = newUserData;
    // 1. Object.keys[USER].length + 1 : USER object의 키 값의 길이를 +1한 값을
    // 2. USER[Object.keys[USER].length + 1] : USER의 키로 받아서(즉, 최신상태의 USER의 마지막 key에 바로 다음 키)
    // 3. USER[Object.keys[USER].length + 1] = newUserData; : newUserData의 값(key[id, name])을 저장해준다.

    res.send('회원 등록 완료');
  } else {
    res.send('제대로 입력해라');
  }
});

router.get('/show', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  res.write('<h1>Hello, dynamic</h1>');

  for (let i = 0; i < USER2.length; i += 1) {
    res.write(`<h2>id : ${USER2[i].id}</h2>`);
    res.write(`<h2>name : ${USER2[i].name}</h2>`);
  }
  res.send('end');
});

app.listen(PORT, () => {
  console.log(`${PORT}시작`);
});

module.exports = router;
