const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://qkrtjdwo5662:1111@cluster0.s7poboc.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect();
// main();
module.exports = client;
