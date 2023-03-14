const connection = require('../dbConnect');

const db = {
  getUsers: (cb) => {
    connection.query('SELECT * FROM reunion.user;', (err, data) => {
      if (err) throw err;
      console.log(data);
      cb(data);
    });
  },
};

module.exports = db;
