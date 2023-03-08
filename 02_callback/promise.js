const promise = new Promise((resolve, reject) => {
  const park = 'old';

  if (park === 'old') {
    setTimeout(() => {
      resolve('park is old');
    }, 3000);
  } else {
    reject('park is getting old');
  }
});

promise
  .then((data) => {
    console.log(data);
  })
  .catch((data) => {
    console.log(data);
  });
