const { MongoClient, ServerApiVersion } = require('mongodb');

const { MONGO_DB_URL } = process.env;

const client = new MongoClient(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// client.connect((err) => {
//   const test = client.db('kdt5').collection('test'); // 스키마, 테이블
//   test.deleteMany({}, (delErr, delResult) => {
//     if (delErr) throw delErr;
//     console.log(delResult);
//     test.insertOne(
//       {
//         name: 'park',
//         age: 28,
//       },
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);
//       },
//     );
//   });
// });

// -------- insert --------
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test'); // 스키마, 테이블
//   test.insertOne(
//     {
//       id: 'qkrtjdwo5662',
//       password: '1111',
//     },
//     (insertErr, insertResult) => {
//       if (insertErr) throw insertErr;
//       console.log(insertResult);
//     },
//   );
//   console.log(err);
//   // client.close();
// });

// ----------------------------

// client.connect((err) => {
//   const test = client.db('kdt5').collection('test'); // 스키마, 테이블
//   test.deleteMany({}, (delErr, delResult) => {
//     if (delErr) throw delErr;
//     console.log(delResult);
//     test.insertMany(
//       [
//         {
//           name: 'park',
//           age: 28,
//         },
//         {
//           name: 'park2',
//           age: 28,
//         },
//         {
//           name: 'park3',
//           age: 28,
//         },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);
//         client.close();
//       },
//     );
//   });
// });

// client.connect((err) => {
//   const test = client.db('kdt5').collection('test'); // 스키마, 테이블
//   test.deleteMany({}, (delErr, delResult) => {
//     if (delErr) throw delErr;
//     console.log(delResult);
//     test.insertMany(
//       [
//         {
//           name: 'park',
//           age: 28,
//         },
//         {
//           name: 'park2',
//           age: 28,
//         },
//         {
//           name: 'park3',
//           age: 28,
//         },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);
//         test.deleteMany(
//           { age: { $gte: 5 } },
//           (deleteOneErr, deleteOneResult) => {
//             if (deleteOneErr) throw deleteOneErr;
//             console.log(deleteOneResult);
//             client.close();
//           },
//         );
//       },
//     );
//   });
// });

async function exercise() {
  try {
    await client.connect();

    const test = client.db('kdt5').collection('test');
    await test.deleteMany({});

    await test.insertMany([
      {
        name: '박성재',
        age: 28,
      },
      {
        name: '양재연',
        age: 28,
      },
      {
        name: '백진솔',
        age: 30,
      },
      {
        name: '김은정',
        age: 22,
      },
      {
        name: '김성현',
        age: 30,
      },
    ]);
    await test.insertOne({
      name: '김계환',
      age: 30,
    });
    await test.deleteOne({
      name: '양재연',
    });
    await test.updateOne(
      {
        name: '김계환',
      },
      {
        $set: {
          name: '양재연',
          age: 28,
        },
      },
    );
    const findCursor = test.find({
      age: {
        $gte: 25,
      },
    });
    const arr = await findCursor.toArray();
    console.log(arr);

    await client.close();
  } catch (err) {
    console.error(err);
  }
}

exercise();
// client.close();
