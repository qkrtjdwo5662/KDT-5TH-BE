function knockDoor(name, second, callback) {
  console.log('노크를 하고 기다립니다.');
  setTimeout(() => {
    callback(name, second);
  }, second * 1000);
}

function callName(name, second) {
  console.log(`${name}이가 ${second}초 만에 문을 열고 나왔습니다.`);
}

knockDoor('영식', 3, callName);
