const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://qkrtjdwo5662:1111@cluster0.s7poboc.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const test = client.db('kdt5').collection('test'); // 스키마, 테이블
  test.deleteMany({}, (delErr, delResult) => {
    if (delErr) throw delErr;
    console.log(delResult);
    test.insertOne(
      {
        name: 'park',
        nickname: 'parkpark',
      },
      (insertErr, insertResult) => {
        console.log(insertResult);
        const findCursor = test.find({});
        findCursor.toArray((err, data) => {
          console.log(data);
        });
      },
    );
  });
});
