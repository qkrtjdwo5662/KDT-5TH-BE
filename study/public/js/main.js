function deletePost(title) {
  // title을 인자로 받아서
  fetch(`http://localhost:4000/post/delete/${title}`, {
    // localhost:4000/post/delete/:title로 주소를 받으니
    // 인자로 받은 title을 :title위치에 넣어줌(req.params.title의 역할)
    method: 'DELETE', // delete 요청
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => {
    console.log(res);
    location.reload(); // 새로고침
  });
}
