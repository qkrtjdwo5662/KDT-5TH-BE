const { ObjectId } = require('mongodb');
const MongooseConnect = require('./mongooseConnect');
const Board = require('../models/board');

const UNEXPECTED_MSG = '<br><a href="/">메인페이지</a>';

const getAllArticles = async (req, res) => {
  try {
    const allArticleCursor = Board.find({});
    const ARTICLE = await allArticleCursor;
    console.log(ARTICLE);
    const { userId } = req.session;
    res.render('Mongoose_board.ejs', { ARTICLE, userId });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

const createArticle = async (req, res) => {
  try {
    const { userId } = req.session;
    await Board.create({
      USERID: userId,
      TITLE: req.body.title,
      CONTENT: req.body.content,
      IMAGE: req.file ? req.file.filename : null,
    });
    res.redirect('/mongooseBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

const selectArticle = async (req, res) => {
  try {
    const selectedArticle = await Board.findOne({
      _id: ObjectId(req.params.id),
    });
    res.render('Mongoose_board_modify.ejs', { selectedArticle });
  } catch (err) {
    console.error(err);
  }
};

const updateArticle = async (req, res) => {
  try {
    const modify = {
      TITLE: req.body.title,
      CONTENT: req.body.content,
    };
    if (req.file) modify.IMAGE = req.file.filename;
    await Board.updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: modify,
      },
    );
    res.status(200);
    res.redirect('/MongooseBoard');
  } catch (err) {
    console.error(err);
  }
};

const deleteArticle = async (req, res) => {
  try {
    await Board.deleteOne({
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
