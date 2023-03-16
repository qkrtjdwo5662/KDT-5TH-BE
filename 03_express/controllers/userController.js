const connection = require('./dbConnect');

const db = {
  getUsers: (cb) => {
    connection.query('SELECT * FROM user;', (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },
  createUser: (newUser, cb) => {
    connection.query(
      `INSERT INTO USER(NAME, EMAIL, PASSWORD, ADDRESS, AGE) values('${newUser.name}', '${newUser.email}', '${newUser.password}', '${newUser.address}', ${newUser.age});`,
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
};

module.exports = db;
