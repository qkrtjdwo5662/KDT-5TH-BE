const MongoClient = require('./mongoConnect');

const boardDB = {
  getAllArticles: async () => {
    try {
      const client = await MongoClient.connect();
      const board = client.db('kdt').collection('board');
      const allBoards = await board.find({});
      return allBoards.toArray();
    } catch (err) {
      console.error(err);
    }
  },
  createArticle: async (newArticle, id) => {
    try {
      const client = await MongoClient.connect();
      const board = client.db('kdt').collection('board');
      await board.insertOne({
        title: newArticle.title,
        content: newArticle.content,
        userId: id,
      });
      return true;
    } catch (err) {
      console.error(err);
    }
  },
  getArticle: async (id) => {
    try {
      const client = await MongoClient.connect();
      const board = client.db('kdt').collection('board');
      const findBoard = board.findOne({
        _id: id,
      });
      return findBoard;
    } catch (err) {
      console.error(err);
    }
  },
  updateArticle: async (id, modifyArticle) => {
    try {
      const client = await MongoClient.connect();
      const board = client.db('kdt').collection('board');
      await board.updateOne(
        {
          _id: id,
        },
        {
          $set: { title: modifyArticle.title, content: modifyArticle.content },
        },
      );
      return true;
    } catch (err) {
      console.error(err);
    }
  },
  deleteArticle: async (id) => {
    try {
      const client = await MongoClient.connect();
      const board = client.db('kdt').collection('board');
      await board.deleteOne({
        _id: id,
      });
      return true;
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = boardDB;
