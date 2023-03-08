const fs = require('fs');

fs.readFile('test.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log('없어요 읽을 파일이');
  } else {
    console.log(data);
  }
});

const str = '파일 쓰기 테스트';

fs.writeFile('testWrite.txt', str, 'utf-8', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('write file succeed');
  }
});
