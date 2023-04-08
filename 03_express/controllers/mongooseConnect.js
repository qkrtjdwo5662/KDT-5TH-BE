const mongoose = require('mongoose');

const MONGO_DB_URI =
  'mongodb+srv://qkrtjdwo5662:1111@cluster0.s7poboc.mongodb.net/?retryWrites=true&w=majority';

const connect = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI, {
      dbName: 'kdt5',
      useNewUrlParser: true,
    });
    console.log('몽구스 접속 성공');

    mongoose.connection.on('error', (err) => {
      console.error('몽고 디비 연결 에러', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.error('몽고 디비 연결 끊어짐, 연결 재시도..');
      connect();
    });
  } catch (err) {
    console.error(err);
  }
};
connect();

module.exports = connect;
