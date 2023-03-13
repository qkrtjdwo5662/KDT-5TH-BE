// alert('!');
async function deleteUser(id) {
  const res = await fetch(`http://localhost:4000/users/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (res.status === 200) location.reload();
  else console.log(res);
}

// function deleteArticle(title) {
//   console.log('시발련아');
//   fetch(`/board/delete/${title}`, {
//     method: 'delete',
//     headers: {
//       'Content-type': 'application/json',
//     },
//   }).then((res) => {
//     location.href = '/board';
//   });
// }
