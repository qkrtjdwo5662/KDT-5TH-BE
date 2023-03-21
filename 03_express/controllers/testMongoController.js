const client = require('./testMongo');

// const test = client.db('kdt5').collection('test'); // 스키마, 테이블
// async function main() {
//   await client.connect();
//   // const test = client.db('kdt5').collection('test'); // 스키마, 테이블
// }
// main();
// client.connect();
const DB = {
  login: (userInfo, cb) => {
    client
      .db('kdt5')
      .collection('test')
      .findOne(
        {
          $and: [{ password: userInfo.password }, { id: userInfo.id }],
        },
        (findErr, data) => {
          if (findErr) throw findErr;
          console.log(data);
          cb(data);
        },
      );
  },
};
module.exports = DB;
