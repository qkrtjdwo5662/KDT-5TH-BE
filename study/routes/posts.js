const express = require('express');

const router = express.Router();
// router의 변수화

const post = [
  {
    title: '제목 1',
    content: '내용 1',
  },
  {
    title: '제목 2',
    content: '내용 2',
  },
];

router.get('/', (req, res) => {
  res.render('posts.ejs', { post });
});
// post.ejs를 '/'(localhost:4000/post)로 접근 시 띄어줌

router.post('/add', (req, res) => {
  if (Object.keys(req.body).length >= 1) {
    // '/add' 요청 받았을 때 req.body object의 key 길이가 1보다 크면(즉, '/add' 요청 시에 넘어온 값이 있으면)
    if (req.body.title && req.body.content) {
      // 위의 if문 통과했으면, req.body에서 name 속성 값이 title과 content인 것을 받았는지 확인
      const newPostData = {
        title: req.body.title,
        content: req.body.content,
      };
      // req.body.title을 새로운 데이터를 처리하기 위한 변수인 newPostData의 title과 content에 저장하고
      post[post.length] = newPostData;
      // 요청 시 넘어온 데이터를 post 새로운 인덱스의 요소로 저장
      res.redirect('/post');
      // '/post로' redirect(새로고침)
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

router.delete('/delete/:title', (req, res) => {
  const postIndex = post.findIndex(
    (postdata) => postdata.title === req.params.title
  );
  // findIndex의 메소드로 postdata를 인자 값으로 넘겨 req.param.title과 일치하는 title을 찾아본다.
  // findIndex의 메소드는 일치하는 것이 있다면 해당 인덱스를 리턴해주고
  // 일치하는 것이 없다면 -1을 리턴한다. 밑의 -1과 postIndex를 비교하는 이유에 해당한다.
  if (postIndex !== -1) {
    post.splice(postIndex, 1);
    // 해당 title을 가진 post의 요소를 삭제
    res.send('삭제 완');
  } else {
    const err = new Error('post에 일치하는 title 없음, 삭제 실패');
    err.statusCode = 400;
    throw err;
  }
  res.redirect('/post');
});
module.exports = router;
// router를 모듈화하여 export
// app.js에서 pageRouter로 import
