const connection = require('./dbConnect');

const boardDB = {
  getAllArticles: (cb) => {
    connection.query('select * from board', (err, data) => {
      if (err) throw err;
      console.log(data);
      cb(data);
    });
  },
  createArticle: (newArticle, userId, cb) => {
    connection.query(
      `insert into mydb.board (TITLE, CONTENT, USERID) values('${newArticle.title}','${newArticle.content}', '${userId}');`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
  getArticle: (id, cb) => {
    connection.query(`select * from board where ID_PK=${id};`, (err, data) => {
      if (err) throw err;
      console.log(data);
      cb(data);
    });
  },
  updateArticle: (modifyArticle, id, cb) => {
    connection.query(
      `update board set TITLE = '${modifyArticle.title}', CONTENT = '${modifyArticle.content}' where ID_PK=${id};`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
  deleteArticle: (id, cb) => {
    connection.query(`delete from board where ID_PK=${id};`, (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },
};

module.exports = boardDB;
