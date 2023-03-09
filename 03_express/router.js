// @ts-check
const express = require('express');

const app = express();
const userRouter = express.Router();

const PORT = 4000;

// /users
app.use('/users', userRouter); // /users 주소요청 시 처리
userRouter.get('/', (req, res) => {
  // http://localhost:4000/users
  res.end('회원 목록');
});
userRouter.get('/id/:id', (req, res) => {
  res.end('특정 회원 정보');
});
userRouter.post('/', (req, res) => {
  res.end('회원 등록');
});

// /
app.use('/', (req, res) => {
  res.end('Hello, express world!');
});

// PORT
app.listen(PORT, () => {
  console.log(`${PORT} 실행`);
});
