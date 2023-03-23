const { MongoClient, ServerApiVersion } = require('mongodb');

const { MONGO_DB_URL } = process.env;

const client = new MongoClient(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
