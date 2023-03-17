const connection = require('./dbConnect');

const db = {
  getAllUsers: (cb) => {
    connection.query('SELECT * FROM user;', (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },
  userCheck: (userId, cb) => {
    connection.query(
      `select * from user where USERID='${userId}';`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
  createUser: (newUser, cb) => {
    connection.query(
      `INSERT INTO USER(USERID, PASSWORD) values('${newUser.id}', '${newUser.password}');`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
  deleteUser: (id, cb) => {
    connection.query(`delete from user where ID_PK='${id}'`, (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },
  login: (userInfo, cb) => {
    connection.query(
      `select * from user where USERID='${userInfo.id}' AND PASSWORD='${userInfo.password}'`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
};

module.exports = db;
