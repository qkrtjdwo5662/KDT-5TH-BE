const arr = [1, 2, 3, 4, 5, 6, 7];

console.log(arr);
console.log(...arr);

const obj = [
  {
    name: 'park',
    status: 'not bad',
  },
  {
    name: 'park',
    status: 'not bad',
  },
  {
    name: 'park',
    status: 'not bad',
  },
];
console.log(obj);
console.log(...obj);

const arr1 = [1, 2, 3];
const arr2 = ['4', '5', '6'];

const merge = [...arr1, ...arr2];

console.log(merge);

const str = 'qkrtjdwo5662';
console.log(...str);

const park = {
  name: '박성재',
  gender: 'M',
  nickname: 'parkpark',
  email: 'qkrtjdwo5662@naver.com',
};

const { name, ...restInfo } = park;
console.log(name, restInfo);

const arr3 = [1, 2, 3, 4, 5, 6, 7];

const [first, ...rest] = arr3;
console.log(first, rest);

function spread(first, second, ...rest) {
  console.log(first);
  console.log(second);
  console.log(rest);
}

spread(1, 2, 3, 4, 5, 6, 7);
