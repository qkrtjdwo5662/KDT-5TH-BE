const promise = new Promise((resolve, reject) => {
  const park = 'notold';
  if (park === 'old') {
    setTimeout(() => {
      resolve('park is old');
    }, 0);
  } else {
    reject('그건 아님');
  }
});

promise
  .then((data) => {
    console.log(data);
  })
  .catch((data) => {
    console.log(data);
  });
