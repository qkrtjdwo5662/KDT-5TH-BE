const connection = require('./dbConnect');

const registerUser = (req, res) => {
  connection.query(
    `select * from user where USERID='${req.body.id}';`,
    (checkErr, checkData) => {
      if (checkErr) throw checkErr;
      if (checkData.length !== 0) return res.status(400).send('중복 검출');
      connection.query(
        `INSERT INTO USER(USERID, PASSWORD) values('${req.body.id}', '${req.body.password}');`,
        (insertErr, insertData) => {
          if (insertErr) throw insertErr;
          if (insertData.affectedRows === 0)
            return res.status(400).send('회원가입 실패');
          res.status(200).send('회원가입 성공');
        },
      );
    },
  );
};

const loginUser = (req, res) => {
  connection.query(
    `select * from user where USERID='${req.body.id}' and PASSWORD='${req.body.password}'`,
    (err, data) => {
      if (err) throw err;
      if (!data.length) return res.status(400).send('로그인 불가');
      req.session.login = true;
      req.session.userId = req.body.id;
      // 쿠키 발행
      res.cookie('user', req.body.id, {
        maxAge: 1000 * 10,
        httpOnly: true,
        signed: true, // 암호화
      });
      res.status(200);
      res.redirect('/sqlBoard');
    },
  );
};

module.exports = {
  registerUser,
  loginUser,
};
