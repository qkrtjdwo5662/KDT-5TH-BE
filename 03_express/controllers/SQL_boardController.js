const connection = require('./dbConnect');

const getAllArticles = (req, res) => {
  connection.query('select * from board', (err, data) => {
    if (err) throw err;
    const ARTICLE = data;
    const { userId } = req.session;
    console.log(ARTICLE[0].TITLE);
    res.render('SQL_board.ejs', { ARTICLE, userId });
  });
};

const createArticle = (req, res) => {
  connection.query(
    `insert into board(TITLE, CONTENT, USERID) values('${req.body.title}','${req.body.content}','${req.session.userId}')`,
    (err, data) => {
      if (err) throw err;
      if (data.affectedRows === 0) return res.staus(500).send('글쓰기 실패');
      res.redirect('/sqlBoard');
    },
  );
};

const selectArticle = (req, res) => {
  connection.query(
    `select * from board where ID_PK = ${req.params.id}`,
    (err, data) => {
      if (err) throw err;
      const selectedArticle = data[0]; // 데이터를 하나만 가져온다는 보장이 없어서
      console.log(selectedArticle);
      res.render('SQL_board_modify.ejs', { selectedArticle });
    },
  );
};

const updateArticle = (req, res) => {
  connection.query(
    `update board set TITLE='${req.body.title}', CONTENT='${req.body.content}' where ID_PK=${req.params.id}`,
    (err, data) => {
      if (err) throw err;
      if (data.affectedRows === 0) return res.status(500).send('수정실패');
      res.redirect('/sqlBoard');
    },
  );
};

const deleteArticle = (req, res) => {
  connection.query(
    `delete from board where ID_PK = ${req.params.id}`,
    (err, data) => {
      if (err) throw err;
      if (data.affectedRows === 0) return res.status(500).send('삭제실패');
      res.status(200);
    },
  );
};

module.exports = {
  getAllArticles,
  createArticle,
  selectArticle,
  updateArticle,
  deleteArticle,
};
