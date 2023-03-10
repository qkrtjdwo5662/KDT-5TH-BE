const express = require('express');
// express 프레임워크 사용 선언

const server = express();
// express를 server라는 이름으로 변수화
const router = express.Router();

const userData = [
  {
    userId: 'qkrtjdwo5662',
    name: 'park',
    email: 'qkrtjdwo5662@naer.com',
  },
  {
    userId: '박',
    name: '박성재',
    email: '박성재@naver.com',
  },
];
// 사용자들 데이터 초기 세팅

server.use('/users', router); // '/users'로(localhost:4000/users) 접근 시 router 호출

// 라우터 호출 시작
// userData 읽기
router.get('/', (req, res) => {
  res.render('users.ejs', { userData });
});
// userData에 user추가
router.post('/add', (req, res) => {
  const newData = {
    userId: req.query.userId,
    name: req.query.name,
    email: req.query.email,
  }; // userData에 넣어줄 새로운 userData
  userData[userData.length] = newData;
  // 배열[배열.lengh-1]는 배열의 마지막 요소이므로
  // 배열[배열.length]은 배열의 마지막 요소 바로 그 다음에 빈요소를 만드는 개념
  // userData[userData.length] = newData; : 빈 요소에 새로운 데이터 추가
  res.send(
    `id:${req.query.userId}, name:${req.query.name}, email:${req.query.email} 추가`
  );
});

// userData에 원하는 user 지우기
router.delete('/remove:id', (req, res) => {
  res.send(userData[req.params.id]); // req.params.id를 userData의 index로 받음
  userData.splice(req.params.id, 1); // splice 메소드를 통해 userData[req.params.id]를 지움
});

// userData 원하는 user 수정
router.put('/update:id', (req, res) => {
  userData[req.params.id].userId = req.query.userId;
  userData[req.params.id].name = req.query.name;
  userData[req.params.id].email = req.query.email;
  res.send('수정완료');
});

module.exports = router;
