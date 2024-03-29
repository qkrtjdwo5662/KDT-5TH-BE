const { ObjectId } = require('mongodb');
const MongoClient = require('./mongoConnect');

const UNEXPECTED_MSG = '<br><a href="/">메인페이지</a>';

const getAllArticles = async (req, res) => {
  try {
    const client = await MongoClient.connect();
    const board = client.db('kdt').collection('board');

    const allArticleCursor = board.find({});
    const ARTICLE = await allArticleCursor.toArray();
    const { userId } = req.session;
    res.render('Mongo_board.ejs', { ARTICLE, userId });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

const createArticle = async (req, res) => {
  try {
    const client = await MongoClient.connect();
    const board = client.db('kdt').collection('board');
    const { userId } = req.session;
    await board.insertOne({
      USERID: userId,
      TITLE: req.body.title,
      CONTENT: req.body.content,
      IMAGE: req.file ? req.file.filename : null,
    });
    console.log(req.file);
    res.redirect('/mongoBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

const selectArticle = async (req, res) => {
  try {
    const client = await MongoClient.connect();
    const board = client.db('kdt').collection('board');

    const selectedArticle = await board.findOne({
      _id: ObjectId(req.params.id),
    });
    console.log(selectedArticle);
    res.render('Mongo_board_modify.ejs', { selectedArticle });
  } catch (err) {
    console.error(err);
  }
};

const updateArticle = async (req, res) => {
  try {
    const client = await MongoClient.connect();
    const board = client.db('kdt').collection('board');

    const modify = {
      TITLE: req.body.title,
      CONTENT: req.body.content,
    };

    if (req.file) {
      modify.IMAGE = req.file.filename;
      console.log('수정파일존재');
      console.log(modify);
    }
    await board.updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: modify,
      },
    );
    res.status(200);
    res.redirect('/MongoBoard');
  } catch (err) {
    console.error(err);
  }
};

const deleteArticle = async (req, res) => {
  try {
    const client = await MongoClient.connect();
    const board = client.db('kdt').collection('board');

    await board.deleteOne({
      _id: ObjectId(req.params.id),
    });
    res.status(200).json('삭제 성공');
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllArticles,
  createArticle,
  updateArticle,
  selectArticle,
  deleteArticle,
};
