const MongoClient = require('./mongoConnect');

const UNEXPECTED_MSG =
  '알 수 없는 문 발생<br><a href="/mongoRegister">회원가입으로 이동</a>';
const DUPLICATED_MSG =
  '중복 ID 회원 존재<br><a href="/mongoRegister">회원가입으로 이동</a>';
const REGISTER_SUCCESS_MSG =
  '회원가입 완료<br><a href="/mongoLogin">로그인으로 이동</a>';
const LOGIN_SUCCESS_MSG = '로그인성공';
const LOGIN_FAIL_MSG =
  '로그인 실패 회원가입 먼저<br><a href="/mongoRegister">회원가입으로 이동</a>';

const registerUser = async (req, res) => {
  try {
    const client = await MongoClient.connect();
    const user = client.db('kdt').collection('user');

    const duplicatedUser = await user.findOne({ id: req.body.id });
    if (duplicatedUser) return res.status(400).send(DUPLICATED_MSG);

    await user.insertOne({
      id: req.body.id,
      password: req.body.password,
    });
    res.status(200).send(REGISTER_SUCCESS_MSG);
  } catch (err) {
    console.error(err);
    res.status(500).send(UNEXPECTED_MSG);
  }
};

const loginUser = async (req, res) => {
  try {
    const client = await MongoClient.connect();
    const user = client.db('kdt').collection('user');

    const findUser = await user.findOne({
      $and: [{ id: req.body.id }, { password: req.body.password }],
    });
    if (!findUser) return res.status(400).send(LOGIN_FAIL_MSG);
    // const findUser = await user.findOne({
    //   id: req.body.id,
    // });
    // if (!findUser) return res.status(400).send(LOGIN_FAIL_MSG);

    // if (findUser.password !== req.body.password)
    //   return res.status(400).send(LOGIN_FAIL_MSG);
    req.session.login = true;
    req.session.userId = req.body.id;
    res.cookie('user', req.body.id, {
      maxAge: 1000 * 10,
      httpOnly: true,
      signed: true, // 암호화
    });

    res.status(200);
    res.redirect('/mongoBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(UNEXPECTED_MSG);
  }
};

const allUsers = async (req, res) => {
  try {
    const client = await MongoClient.connect();
    const user = client.db('kdt').collection('user');

    const findCursor = user.find({});
    const findUsers = await findCursor.toArray();
    if (!findUsers) return res.status(400).send(UNEXPECTED_MSG);
    res.render('Mongo_users.ejs', { USER: findUsers });
  } catch (err) {
    console.error(err);
    res.status(500).send(UNEXPECTED_MSG);
  }
};
// const userDB = {
//   getAllUsers: async () => {
//     try {
//       const client = await MongoClient.connect();
//       const user = client.db('kdt').collection('user');
//       const allUsers = await user.find({});
//       return allUsers.toArray();
//     } catch (err) {
//       console.error(err);
//     }
//   },
//   userCheck: async (userId) => {
//     try {
//       const client = await MongoClient.connect();
//       const user = client.db('kdt').collection('user');
//       const findUser = await user.findOne({ id: userId });
//       return findUser;
//     } catch (err) {
//       console.error(err);
//     }
//   },
//   createUser: async (userInfo) => {
//     try {
//       const client = await MongoClient.connect();
//       const user = client.db('kdt').collection('user');
//       await user.insertOne({ id: userInfo.id, password: userInfo.password });
//       return true;
//     } catch (err) {
//       console.error(err);
//     }
//   },
//   login: async (userInfo) => {
//     try {
//       const client = await MongoClient.connect();
//       const user = client.db('kdt').collection('user');
//       const findUser = await user.findOne({
//         $and: [{ id: userInfo.id }, { password: userInfo.password }],
//       });
//       return findUser;
//     } catch (err) {
//       console.error(err);
//     }
//   },
// };

// module.exports = userDB;

module.exports = {
  registerUser,
  loginUser,
  allUsers,
};
