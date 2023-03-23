const express = require('express');
const fs = require('fs');
const multer = require('multer');

const {
  getAllArticles,
  createArticle,
  selectArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/Mongoose_boardController');

const router = express.Router();

// 파일 업로드 설정
const dir = './uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now());
  },
});

const limits = {
  fileSize: 1024 * 1024 * 2,
};

const upload = multer({ storage, limits });

if (!fs.existsSync(dir)) fs.mkdirSync(dir);

// 로그인 확인용 미들웨어
function isLogin(req, res, next) {
  if (req.session.login || req.signedCookies.user) {
    next();
  } else {
    res.status(400);
    res.send(
      '로그인하고 들어와라.<br><a href="/mongooseLogin">로그인 페이지로 이동</a>',
    );
  }
}

router.get('/', isLogin, getAllArticles);

router.get('/write', isLogin, (req, res) => {
  res.render('Mongoose_board_write.ejs');
});

router.post('/write', isLogin, upload.single('img'), createArticle);

router.get('/modify/:id', isLogin, selectArticle);

router.post('/modify/:id', isLogin, upload.single('img'), updateArticle);

router.delete('/delete/:id', isLogin, deleteArticle);

router.get('/getAll', getAllArticles);

module.exports = router;
