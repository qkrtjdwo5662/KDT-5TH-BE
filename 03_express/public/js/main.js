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
