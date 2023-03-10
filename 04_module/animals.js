const animals = ['puppy', 'cat'];

function showAnimals() {
  animals.map((el) => console.log(el));
}

exports.animals = animals; // 하나씩

module.exports = {
  // 한 번에 모듈화
  animals,
  showAnimals,
};
