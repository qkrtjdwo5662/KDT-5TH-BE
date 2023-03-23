const MongooseConnect = require('./mongooseConnect');
const User = require('../models/user');

MongooseConnect();

const UNEXPECTED_MSG =
  '알 수 없는 문 발생<br><a href="/mongooseRegister">회원가입으로 이동</a>';
const DUPLICATED_MSG =
  '중복 ID 회원 존재<br><a href="/mongooseRegister">회원가입으로 이동</a>';
const REGISTER_SUCCESS_MSG =
  '회원가입 완료<br><a href="/mongooseLogin">로그인으로 이동</a>';
const LOGIN_SUCCESS_MSG = '로그인성공';
const LOGIN_FAIL_MSG =
  '로그인 실패 회원가입 먼저<br><a href="/mongooseRegister">회원가입으로 이동</a>';

const registerUser = async (req, res) => {
  try {
    const duplicatedUser = await User.findOne({ id: req.body.id });
    if (duplicatedUser) return res.status(400).send(DUPLICATED_MSG);

    await User.create({
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
    const findUser = await User.findOne({
      $and: [{ id: req.body.id }, { password: req.body.password }],
    });
    if (!findUser) return res.status(400).send(LOGIN_FAIL_MSG);
    req.session.login = true;
    req.session.userId = req.body.id;
    res.cookie('user', req.body.id, {
      maxAge: 1000 * 10,
      httpOnly: true,
      signed: true, // 암호화
    });

    res.status(200);
    console.log('?');
    res.redirect('/mongooseBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(UNEXPECTED_MSG);
  }
};

const allUsers = async (req, res) => {
  try {
    const findCursor = User.find({});
    const findUsers = await findCursor;
    if (!findUsers) return res.status(400).send(UNEXPECTED_MSG);
    res.render('Mongoose_users.ejs', { USER: findUsers });
  } catch (err) {
    console.error(err);
    res.status(500).send(UNEXPECTED_MSG);
  }
};

module.exports = {
  registerUser,
  loginUser,
  allUsers,
};
