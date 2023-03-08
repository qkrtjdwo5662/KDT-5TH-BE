const fs = require('fs');

fs.readFileSync('test.txt', 'utf-8', function (err, data) {
  if (err) return console.log(err);
  console.log('1번', data.toString());
  fs.readFileSync('test.txt', 'utf-8', function (err, data) {
    if (err) return console.log(err);
    console.log('2번', data.toString());
    fs.readFileSync('test.txt', 'utf-8', function (err, data) {
      if (err) return console.log(err);
      console.log('2번', data.toString());
      fs.readFileSync('test.txt', 'utf-8', function (err, data) {
        if (err) return console.log(err);
        console.log('3번', data.toString());
      });
    });
  });
});
