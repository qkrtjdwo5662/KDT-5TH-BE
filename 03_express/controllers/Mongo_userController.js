const MongoClient = require('./mongoConnect');

const userDB = {
  getAllUsers: async () => {
    try {
      const client = await MongoClient.connect();
      const user = client.db('kdt').collection('user');
      const allUsers = await user.find({});
      return allUsers.toArray();
    } catch (err) {
      console.error(err);
    }
  },
  userCheck: async (userId) => {
    try {
      const client = await MongoClient.connect();
      const user = client.db('kdt').collection('user');
      const findUser = await user.findOne({ id: userId });
      return findUser;
    } catch (err) {
      console.error(err);
    }
  },
  createUser: async (userInfo) => {
    try {
      const client = await MongoClient.connect();
      const user = client.db('kdt').collection('user');
      await user.insertOne({ id: userInfo.id, password: userInfo.password });
      return true;
    } catch (err) {
      console.error(err);
    }
  },
  login: async (userInfo) => {
    try {
      const client = await MongoClient.connect();
      const user = client.db('kdt').collection('user');
      const findUser = await user.findOne({
        $and: [{ id: userInfo.id }, { password: userInfo.password }],
      });
      return findUser;
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = userDB;
