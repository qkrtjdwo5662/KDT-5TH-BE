const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://qkrtjdwo5662:1111@cluster0.s7poboc.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
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
client.connect((err) => {
  const test = client.db('kdt5').collection('test'); // 스키마, 테이블
  test.insertOne(
    {
      id: 'qkrtjdwo5662',
      password: '1111',
    },
    (insertErr, insertResult) => {
      if (insertErr) throw insertErr;
      console.log(insertResult);
    },
  );
  console.log(err);
  // client.close();
});

async function main() {
  try {
    await client.connect();

    const test = client.db('kdt5').collection('test'); // 스키마, 테이블

    // const deleteManyResult =
    await test.deleteMany({});
    // if (!deleteManyResult.acknowledged) return '삭제 에러 발생';

    // const insertManyResult
    await test.insertMany([
      { name: 'pororo', age: 5 },
      { name: 'loopy', age: 7 },
      { name: 'bb', age: 3 },
    ]);
    // if (!insertManyResult.acknowledged) return '삽입 에러 발생';

    // const deleteMany = await test.deleteMany({ age: { $gte: 5 } });
    // if (!deleteMany.acknowledged) return '삭제 에러 발생';
    // console.log(deleteMany);

    // const updateManyResult =
    await test.updateMany({ age: { $gte: 5 } }, { $set: { name: '5살 이상' } });
    // if (!updateManyResult.acknowledged) return '수정 에러 발생';

    const findCursor = test.find({ age: { $gte: 5 } });
    console.log(findCursor);
    // const dataArr = await findCursor.toArray();
    // console.log(dataArr);
    await client.close();
  } catch (err) {
    console.error(err);
  }
  // await client.connect();

  // const test = client.db('kdt5').collection('test'); // 스키마, 테이블

  // const deleteManyResult = await test.deleteMany({});
  // if (!deleteManyResult.acknowledged) return '삭제 에러 발생';

  // const insertManyResult = await test.insertMany([
  //   { name: 'pororo', age: 5 },
  //   { name: 'loopy', age: 7 },
  //   { name: 'bb', age: 3 },
  // ]);
  // if (!insertManyResult.acknowledged) return '삽입 에러 발생';

  // // const deleteMany = await test.deleteMany({ age: { $gte: 5 } });
  // // if (!deleteMany.acknowledged) return '삭제 에러 발생';
  // // console.log(deleteMany);

  // const updateManyResult = await test.updateMany(
  //   { age: { $gte: 5 } },
  //   { $set: { name: '5살 이상' } },
  // );
  // if (!updateManyResult.acknowledged) return '수정 에러 발생';

  // const findCursor = test.find({ age: { $gte: 5 } });
  // console.log(findCursor);
  // // const dataArr = await findCursor.toArray();
  // // console.log(dataArr);
  // await client.close();
}

// main();
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

// client.connect((err) => {
//   const test = client.db('kdt5').collection('test'); // 스키마, 테이블
//   test.deleteMany({}, (delErr, delResult) => {
//     if (delErr) throw delErr;
//     console.log(delResult);
//     test.insertMany(
//       [
//         {
//           name: '박성재',
//           age: 28,
//         },
//         {
//           name: '양재연',
//           age: 28,
//         },
//         {
//           name: '백진솔',
//           age: 30,
//         },
//         {
//           name: '김은정',
//           age: 22,
//         },
//         {
//           name: '김성현',
//           age: 30,
//         },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);
//         test.insertOne(
//           {
//             name: '김계환',
//             age: 30,
//           },
//           (insertOneErr, insertOneResult) => {
//             if (insertOneErr) throw insertOneErr;
//             console.log(insertOneResult);
//             test.deleteOne(
//               {
//                 name: '양재연',
//               },
//               (delOneErr, delOneResult) => {
//                 if (delOneErr) throw delOneErr;
//                 console.log(delOneResult);
//                 test.updateOne(
//                   { name: '김계환' },
//                   {
//                     $set: {
//                       name: '양재연',
//                       age: 28,
//                     },
//                   },
//                   (updateOneErr, updateOneResult) => {
//                     if (updateOneErr) throw updateOneErr;
//                     console.log(updateOneResult);
//                     const findCursor = test.find({ age: { $gte: 25 } });
//                     console.log(findCursor);
//                     findCursor.toArray((toArrErr, toArrData) => {
//                       if (toArrErr) throw toArrErr;
//                       console.log(toArrData);
//                       client.close();
//                     });
//                   },
//                 );
//               },
//             );
//           },
//         );
//       },
//     );
//   });
// });

// client.close();
