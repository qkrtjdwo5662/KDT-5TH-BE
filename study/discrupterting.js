const arr = [1, 2, 3];

const one = arr[0];
const two = arr[1];
const three = arr[2];

const [a, b, c] = arr;

console.log(one, two, three);
console.log(a, b, c);

const today = new Date();
console.log(today);

const formmatedDate = today.toISOString().substring(0, 10);
console.log(formmatedDate);

const [year, month, day] = formmatedDate.split('-');
console.log(year, month, day);

const obj = {
  firstName: 'Seong-Jae',
  lastName: 'Park',
};

const { firstName } = obj;
const { lastName } = obj;
console.log(firstName);
console.log(obj.firstName);
console.log(lastName);
console.log(obj.lastName);

const person = {
  name: 'Lee',
  address: {
    zipCode: '1111',
    city: 'Seoul',
  },
};

const {
  name,
  address: { zipCode, city },
} = person;
console.log(name, zipCode, city);
