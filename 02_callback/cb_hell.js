function funcHell(callback) {
  callback();
}

funcHell(() => {
  console.log('1번 인척');
  funcHell(() => {
    console.log('2번 인척');
    funcHell(() => {
      console.log('3번 인척');
    });
  });
});
